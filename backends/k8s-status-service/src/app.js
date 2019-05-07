const config = require('./config')

const Koa = require('koa')
const Router = require('koa-router')
const k8s = require('@kubernetes/client-node');
const _ = require('lodash');
const fakek8 = require('../fakek8.json');

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
    const response = await k8sAppsApi.listNamespacedDeployment('default');
    return response.body.items.map(item => {
      const containers = _.get(item, 'spec.template.spec.containers', []);
      const wholeImage = _.get(containers[0], 'image')
      return { 
        name: _.get(item, 'metadata.name'),
        createTimestamp: _.get(item, 'metadata.creationTimestamp'),
        containerName: _.get(containers[0], 'name'),
        image: wholeImage.substring(wholeImage.indexOf('/') + 1, wholeImage.indexOf(':')),
        tag: wholeImage.substring(wholeImage.indexOf(':') + 1),
        // containers: _.get(item, 'spec.template.spec.containers', []).map(container => { // More robust solution.
        //   return {
        //     containerName: _.get(container, 'name'),
        //     image: _.get(container, 'image'),
        //   }
        // }),
      }
    });
    // return await dockerHubApi.repositories('amidatech');
  } catch(e) {
    console.log(e);
    return fakek8.items.map(item => {
      const containers = _.get(item, 'spec.template.spec.containers', []);
      const wholeImage = _.get(containers[0], 'image')
      return { 
        name: _.get(item, 'metadata.name'),
        createTimestamp: _.get(item, 'metadata.creationTimestamp'),
        containerName: _.get(containers[0], 'name'),
        image: wholeImage.substring(wholeImage.indexOf('/') + 1, wholeImage.indexOf(':')),
        tag: wholeImage.substring(wholeImage.indexOf(':') + 1),
      }
    })
  }
};

async function fetchBuildHistory(repo) {
  try {
    const response = await dockerHubApi.buildHistory('amidatech', repo.image);
    return { build: _.maxBy(_.filter(response, { dockertag_name: repo.tag }), 'created_date'), ...repo };
  } catch(e) {
    console.log('No build history found for repository "' + repo.name + '" of image: "' + repo.image + '"');
    return { build: undefined, ...repo };
  }
}

async function fetchBuildDetails(repo) { // /GitCommit.+?\n?u'(\w......)/
  if (repo.build == undefined) {
    return { logs: undefined, build: undefined, ...repo };
  }
  try {
    const response = await dockerHubApi.buildDetails('amidatech', repo.image, repo.build.build_code);
    return { logs: response.build_results.logs, ...repo } 
  } catch(e) {
    // console.log(e);
    // console.log('No build details found for repository "' + repo.name + '" of image: "' + repo.image + '"');
    return { logs: undefined, build: undefined, ...repo };
  }
}

// CORRECTION:
// https://cloud.docker.com/api/audit/v1/action/?include_related=true&limit=100&object=%2Fapi%2Frepo%2Fv1%2Frepository%2Famidatech%2Forange-web%2F

function bucket() {
  let deploymentLists ='lol';
  fetchDeployments().then(repos => {
    return Promise.all(repos.map(async repo => fetchBuildHistory(repo)))
  }).then(repoWithCodes => {
    return Promise.all(_.compact(repoWithCodes).map(async repo => fetchBuildDetails(repo)))
  }).then(repoWithCommit => {
    // console.log(repoWithCommit);
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
