const config = require('./config')

const Koa = require('koa')
const Router = require('koa-router')
const k8s = require('@kubernetes/client-node');
const _ = require('lodash');

const app = new Koa()
const router = new Router()
const kc = new k8s.KubeConfig();
kc.loadFromDefault();
const k8sCoreApi = kc.makeApiClient(k8s.Core_v1Api);
const k8sAppsApi = kc.makeApiClient(k8s.Apps_v1beta1Api);

const dockerHubApi = require('docker-hub-api');
dockerHubApi.login(process.env.DOCKER_HUB_USERNAME, process.env.DOCKER_HUB_PASSWORD);

let deploymentsList = [];
async function fetchDeployments() {
  try {
    return await dockerHubApi.repositories('amidatech');
  } catch(e) {
    console.log(e);
  }
};

async function fetchBuildHistory(name) {
  try {
    const response = await dockerHubApi.buildHistory('amidatech', name);
    return { build: _.maxBy(response, 'last_updated'), name };
  } catch(e) {
    console.log('No build history details found for repository: ' + name);
  }
}

async function fetchBuildDetails(name, build) { // /GitCommit.+?\n?u'(\w......)/
  try {
    const response = await dockerHubApi.buildDetails('amidatech', name, build.build_code);
    return { logs: response.build_results.logs, name, build } 
  } catch(e) {
    console.log(e);
  }
}

function bucket() {
  let deploymentLists ='lol';
  fetchDeployments().then(repos => {
    return Promise.all(repos.map(async repo => fetchBuildHistory(repo.name)))
  }).then(repoWithCodes => {
    return Promise.all(_.compact(repoWithCodes).map(async repo => fetchBuildDetails(repo.name, repo.build)))
  }).then(repoWithCommit => {
    for (var i = 0; i < repoWithCommit.length; i++) {
      if (repoWithCommit[i].logs != undefined && repoWithCommit[i].logs != '') {
        repoWithCommit[i].commit = repoWithCommit[i].logs.match(/(?<=GitCommit: )(.......)/g)[0];
      }
      // delete repoWithCommit[i].logs;
    }
    console.log(repoWithCommit);
    return repoWithCommit;
  });
}

app.use(async (ctx, next) => {
  console.log(`${ctx.method} ${ctx.url} -------------------------------------`)
  await next();
})

app.use(async (ctx, next) => {
  ctx.set('Access-Control-Allow-Origin', '*');
  ctx.set('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  ctx.set('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
  await next();
});

// !! THIS RETURNS SECRET STUFF. DONT LET ANYONE GET AT IT
// router.get('/configmaps', async (ctx, next) => {
//   try {
//     const res = await k8sCoreApi.listNamespacedConfigMap('default');
//     ctx.status = 200
//     ctx.body = res.body
//   }
//   catch (e) {
//     ctx.status = 500
//     console.log(e)
//   }
// })

router.get('/pods', async (ctx, next) => {
  try {
    const res = await k8sCoreApi.listNamespacedPod('default');
    ctx.status = 200
    ctx.body = res.body
  }
  catch (e) {
    ctx.status = 500
    console.log(e)
  }
})

router.get('/deployments', async (ctx, next) => {
  console.log(deployments);
  try {
    // const res = await k8sAppsApi.listDeploymentForAllNamespaces();
    const res = await k8sAppsApi.listNamespacedDeployment('default');
    ctx.status = 200
    ctx.body = res.body.items.map(item => {
      const containers = _.get(item, 'spec.template.spec.containers', []);
      return { 
        name: _.get(item, 'metadata.name'),
        createTimestamp: _.get(item, 'metadata.creationTimestamp'),
        containerName: _.get(containers[0], 'name'),
        image: _.get(containers[0], 'image'),
        // containers: _.get(item, 'spec.template.spec.containers', []).map(container => { // More robust solution.
        //   return {
        //     containerName: _.get(container, 'name'),
        //     image: _.get(container, 'image'),
        //   }
        // }),
      }
    })
  }
  catch (e) {
    ctx.status = 500
    console.log(e)
  }
})

app.use(router.routes())
app.use(router.allowedMethods())

app.listen(config.port, (err) => {
  if (err) {
    console.log(`Error starting server on port ${config.port}`)
    console.log(err)
    process.exit(1)
  }
  console.log(`Listening on port ${config.port}`);
  bucket();
})
