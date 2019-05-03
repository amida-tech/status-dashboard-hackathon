const config = require('./config')

const Koa = require('koa')
const Router = require('koa-router')
const k8s = require('@kubernetes/client-node')
const _ = require('lodash');

const app = new Koa()
const router = new Router()
const kc = new k8s.KubeConfig();
kc.loadFromDefault();
const k8sCoreApi = kc.makeApiClient(k8s.Core_v1Api);
const k8sAppsApi = kc.makeApiClient(k8s.Apps_v1beta1Api);

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

router.get('/configmaps', async (ctx, next) => {
  try {
    const res = await k8sCoreApi.listNamespacedConfigMap('default');
    ctx.status = 200
    ctx.body = res.body
  }
  catch (e) {
    ctx.status = 500
    console.log(e)
  }
})

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
  console.log(`Listening on port ${config.port}`)
})
