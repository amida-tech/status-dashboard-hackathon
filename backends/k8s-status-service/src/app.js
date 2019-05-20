const config = require('./config')

const Koa = require('koa')
const Router = require('koa-router')
const k8s = require('@kubernetes/client-node');
const _ = require('lodash');
// const fakek8 = require('../fakek8.json');

const app = new Koa()
const router = new Router()
const kc = new k8s.KubeConfig();
kc.loadFromDefault();
const k8sCoreApi = kc.makeApiClient(k8s.Core_v1Api);
const k8sAppsApi = kc.makeApiClient(k8s.Apps_v1beta1Api);

const request = require('request-promise');
let dockerTokenHeader = null;
const dockerRoot = 'https://hub.docker.com/v';
const dockerVersion = '2/';

let _deployments = [];

async function dockerHubLogin() {
  var options = {
    method: 'POST',
    uri: dockerRoot + dockerVersion + 'users/login/',
    body: {
      username: config.dockerHubUsername, 
      password: config.dockerHubPassword,
    },
    json: true
  };

  try {
    const res = await request(options)
    return dockerTokenHeader = 'JWT ' + res.token;
}
  catch (e) {
    console.log('Call to DockerHub for auth token failed. Server aborting...');
    console.log(e)
    process.exit(1);
  }
}

dockerHubLogin();

async function fetchDockerBuilds(deployment) {
  if (!deployment.checkUpdate) {
    return deployment;
  }

  var options = {
    method: 'GET',
    uri: `https://cloud.docker.com/api/audit/v1/action/?include_related=true&limit=100&object=%2Fapi%2Frepo%2Fv1%2Frepository%2Famidatech%2F${deployment.image}%2F`,
    headers: {
      authorization: dockerTokenHeader,
    },
    json: true 
  };
  try {
    return await request(options)
    .then(function(res) {
      return { build: _.maxBy(_.filter(res.objects, (build) => {
        const tag = build.object.split('/');
        return (tag[tag.length - 2] === deployment.tag && build.state === 'Success') }), 'end_date'), commit: undefined, ...deployment };
    })
  } catch(e) {
    console.log(`Call to DockerHub for ${deployment.name} with image of ${deployment.image} failed.`);
    return { build: undefined, commit: undefined, ...deployment };
  }
}

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
      }
    });
  } catch(e) {
    console.log(e);
    // return fakek8.items.map(item => {
    //   const containers = _.get(item, 'spec.template.spec.containers', []);
    //   const wholeImage = _.get(containers[0], 'image')
    //   return { 
    //     name: _.get(item, 'metadata.name'),
    //     createTimestamp: _.get(item, 'metadata.creationTimestamp'),
    //     containerName: _.get(containers[0], 'name'),
    //     image: wholeImage.substring(wholeImage.indexOf('/') + 1, wholeImage.indexOf(':')),
    //     tag: wholeImage.substring(wholeImage.indexOf(':') + 1),
    //   }
    // })
  }
};

function bucketUpdateCheck(repos) {
  if (_deployments.length === 0) {
    _deployments = repos;
    _deployments.forEach((existingDeployment) => {
      existingDeployment.checkUpdate = true;
    });
    return;
  }

  _deployments.forEach((existingDeployment) => {
    const repoIndex = _.findIndex(repos, (repo) => { return _.get(repo, 'name') === existingDeployment.containerName });
    if (repoIndex > 0) {
      existingDeployment.checkUpdate = _.get(repos[repoIndex], 'createTimestamp') !== existingDeployment.createTimestamp;
    } else { // New deployment! Woo!
      _deployments.push({ ...repos[repoIndex], checkUpdate: true });
    }
  });
}

function bucket() {
  fetchDeployments().then(repos => {
    bucketUpdateCheck(repos);
    return Promise.all(_deployments.map(async deployedRepo => fetchDockerBuilds(deployedRepo)))
  }).then(repoWithBuild => {
    for (var i = 0; i < repoWithBuild.length; i++) {
      if (repoWithBuild[i].checkUpdate && repoWithBuild[i].build != undefined && repoWithBuild[i].build.user_agent != '') {
        repoWithBuild[i].commit = repoWithBuild[i].build.user_agent.match(/(?<=git-commit\/)(.......)/g)[0];
      }
      repoWithBuild[i].checkUpdate = false;
    }
    _deployments = repoWithBuild;
    console.log('Deployments updated with build info.');
  })
  .catch(() => {
    console.log('Bucket call to fetch K8 and Docker build info failed.');
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
  try {
    // const res = await k8sAppsApi.listDeploymentForAllNamespaces();
    // const res = await k8sAppsApi.listNamespacedDeployment('default');
    ctx.status = 200
    ctx.body = _deployments;
    // ctx.body = res.body.items.map(item => {
    //   const containers = _.get(item, 'spec.template.spec.containers', []);
    //   return { 
    //     name: _.get(item, 'metadata.name'),
    //     createTimestamp: _.get(item, 'metadata.creationTimestamp'),
    //     containerName: _.get(containers[0], 'name'),
    //     image: _.get(containers[0], 'image'),
    //     // containers: _.get(item, 'spec.template.spec.containers', []).map(container => { // More robust solution.
    //     //   return {
    //     //     containerName: _.get(container, 'name'),
    //     //     image: _.get(container, 'image'),
    //     //   }
    //     // }),
    //   }
    // })
  }
  catch (e) {
    ctx.status = 500
    console.log(e)
  }
})

app.use(router.routes())
app.use(router.allowedMethods())

setInterval(function(){
  console.log('Beginning next bucket update.');
  bucket()
}, 300000);

app.listen(config.port, (err) => {
  if (err) {
    console.log(`Error starting server on port ${config.port}`)
    console.log(err)
    process.exit(1)
  }
  console.log(`Listening on port ${config.port}`);
  bucket();
})
