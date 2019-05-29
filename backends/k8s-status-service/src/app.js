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

// const request = require('request-promise');
// let dockerTokenHeader = null;
// const dockerRoot = 'https://hub.docker.com/v';
// const dockerVersion = '2/';

// let _deployments = [];

// const FIVE_MINUTES = 300000;

// async function dockerHubLogin() {
//   var options = {
//     method: 'POST',
//     uri: dockerRoot + dockerVersion + 'users/login/',
//     body: {
//       username: config.dockerHubUsername, 
//       password: config.dockerHubPassword,
//     },
//     json: true
//   };

//   try {
//     const res = await request(options)
//     return dockerTokenHeader = 'JWT ' + res.token;
//   }
//   catch (e) {
//     console.log('Call to DockerHub for auth token failed. Server aborting...');
//     console.log(e)
//     process.exit(1);
//   }
// }

// dockerHubLogin();

// async function fetchDockerBuilds(deployment) {
//   if (!deployment.checkUpdate) {
//     return deployment;
//   }

//   var options = {
//     method: 'GET',
//     uri: `https://cloud.docker.com/api/audit/v1/action/?include_related=true&limit=100&object=%2Fapi%2Frepo%2Fv1%2Frepository%2Famidatech%2F${deployment.image}%2F`,
//     headers: {
//       authorization: dockerTokenHeader,
//     },
//     json: true 
//   };
//   try {
//     const res = await request(options)

//     const successfulBuildsOfThisTag = _.filter(res.objects, (build) => {
//       const tokenizedBuildObject = build.object.split('/');
//       const buildTag = tokenizedBuildObject[tokenizedBuildObject.length - 2]
//       return (buildTag === deployment.tag && build.state === 'Success')
//     })

//     const mostRecentSuccessfulBuildOfThisTag = _.maxBy(successfulBuildsOfThisTag, 'end_date')

//     return {
//       build: mostRecentSuccessfulBuildOfThisTag,
//       commit: undefined,
//       ...deployment
//     };

//   }
//   catch (e) {
//     console.log(`Call to DockerHub for ${deployment.name} with image of ${deployment.image} failed.`);
//     return {
//       build: undefined,
//       commit: undefined,
//       ...deployment
//     };
//   }
// }

// async function fetchDeployments() {
//   try {
//     const response = await k8sAppsApi.listNamespacedDeployment('default');
//     return response.body.items.map(item => {
//       const containers = _.get(item, 'spec.template.spec.containers', []);
//       const wholeImage = _.get(containers[0], 'image')

//       return { 
//         name: _.get(item, 'metadata.name'),
//         createTimestamp: _.get(item, 'metadata.creationTimestamp'),
//         containerName: _.get(containers[0], 'name'),
//         image: wholeImage.substring(wholeImage.indexOf('/') + 1, wholeImage.indexOf(':')),
//         tag: wholeImage.substring(wholeImage.indexOf(':') + 1),
//       }
//     });
//   }
//   catch (e) {
//     console.log('k8sAppsApi.listNamespacedDeployment("default") threw error:');
//     console.log(e);
//   }
// };

// function bucketUpdateCheck(fetchedDeployments) {
//   if (_deployments.length === 0) {
//     _deployments = fetchedDeployments;
//     _deployments.forEach((existingDeployment) => {
//       existingDeployment.checkUpdate = true;
//     });
//     return;
//   }

//   _deployments.forEach((existingDeployment) => {
//     const fetchedDeploymentIndex = _.findIndex(fetchedDeployments, (fetchedDeployment) => { return _.get(fetchedDeployment, 'name') === existingDeployment.containerName });
//     if (fetchedDeploymentIndex > 0) {
//       existingDeployment.checkUpdate = _.get(fetchedDeployments[fetchedDeploymentIndex], 'createTimestamp') !== existingDeployment.createTimestamp;
//     } else { // New deployment! Woo!
//       _deployments.push({ ...fetchedDeployments[fetchedDeploymentIndex], checkUpdate: true });
//     }
//   });
// }

// async function bucket() {
//   try {
//     const deployments = await fetchDeployments()
//     bucketUpdateCheck(deployments);

//     const deploymentWithBuild = await Promise.all(_deployments.map(async deployment => fetchDockerBuilds(deployment)))
//     for (var i = 0; i < deploymentWithBuild.length; i++) {
//       if (deploymentWithBuild[i].checkUpdate && deploymentWithBuild[i].build != undefined && deploymentWithBuild[i].build.user_agent != '') {
//         deploymentWithBuild[i].commit = deploymentWithBuild[i].build.user_agent.match(/(?<=git-commit\/)(.......)/g)[0];
//       }
//       deploymentWithBuild[i].checkUpdate = false;
//     }
//     _deployments = deploymentWithBuild;
//     console.log('Deployments updated with build info.');
//   }
//   catch(e) {
//     console.log('Bucket call to fetch K8 and Docker build info failed with error:');
//     console.log(e);
//   }
// }

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
    const res = await k8sAppsApi.listNamespacedDeployment('default');
    ctx.status = 200
    // ctx.body = _deployments;
    ctx.body = res.body.items.map(item => {
      const containers = _.get(item, 'spec.template.spec.containers', []);
      const image = _.get(containers[0], 'image');
      return { 
        name: _.get(item, 'metadata.name'),
        createTimestamp: _.get(item, 'metadata.creationTimestamp'),
        containerName: _.get(containers[0], 'name'),
        image: image,
        tag: image.substring(image.indexOf(':') + 1),
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

// setInterval(() => {
//   console.log('Beginning next bucket update.');
//   bucket()
// }, FIVE_MINUTES);

app.listen(config.port, (err) => {
  if (err) {
    console.log(`Error starting server on port ${config.port}`)
    console.log(err)
    process.exit(1)
  }
  console.log(`Listening on port ${config.port}`);
  // bucket();
})
