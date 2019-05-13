# k8s-status-service
Get status from your k8s cluster

# Environmental variables:
`K8S_STATUS_SERVICE_PORT`: The port for which you want this to run.
`DOCKER_HUB_USERNAME`: A valid Dockerhub username.
`DOCKER_HUB_PASSWORD`: A valid Dockerhub password to the above username.

# Instructions

Setup your `.env` file (see `.env.example`), then...

```sh
npm install
npm start
```
