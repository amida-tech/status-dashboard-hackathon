require('dotenv').config()

module.exports = {
  port: process.env.K8S_STATUS_SERVICE_PORT,
  dockerHubUsername: process.env.K8S_STATUS_SERVICE_DOCKER_HUB_USERNAME,
  dockerHubPassword: process.env.K8S_STATUS_SERVICE_DOCKER_HUB_PASSWORD
}
