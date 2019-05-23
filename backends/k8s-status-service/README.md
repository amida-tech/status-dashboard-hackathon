# k8s-status-service
Get status from your k8s cluster

# Environment Variables

`K8S_NAME`: Gets used by the kops command that configures kubectl.
`K8S_CONFIG_BUCKET_NAME`: The `s3://` URL of the S3 bucket that stores the state/config of your k8s cluster.
`K8S_STATUS_SERVICE_PORT`: The port the Node server runs on.
`DOCKER_HUB_USERNAME`: Username of dockerhub account that is a member of the amidatech organization.
`DOCKER_HUB_PASSWORD`: Username of dockerhub account that is a member of the amidatech organization.

# Local Dev Setup

Setup your `.env` file (see `.env.example`), then...

```sh
npm install
npm start
```

# Docker Deployment

```sh
docker run --name k8s-status-service -p SOME_PORT:{K8S_STATUS_SERVICE_PORT} -d --restart=unless-stopped \
-e K8S_NAME=XXXXX \
-e K8S_CONFIG_BUCKET_NAME=XXXXX \
-e K8S_STATUS_SERVICE_PORT=XXXXX \
-e K8S_STATUS_SERVICE_DOCKER_HUB_USERNAME=XXXXX \
-e K8S_STATUS_SERVICE_DOCKER_HUB_PASSWORD=XXXXX \
-v /path/to/aws/cli/config/file/for/kops/to/fetch/cluster/info:/root/.aws/config \
-v /path/to/aws/cli/credentials/file/for/kops/to/fetch/cluster/info:/root/.aws/credentials \
amidatech/k8s-status-service:0.0.1
```
