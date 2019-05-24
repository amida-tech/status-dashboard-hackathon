#!/usr/bin/env bash
pushd "$(dirname "$0")"
docker build -t k8s-status-service:0.0.1 .
docker rm k8s-status-service
docker create --name k8s-status-service -p 6000:6000 \
-e K8S_STATUS_SERVICE_PORT=6000 \
-v ${BASEDIR}/kubecfg:/root/.kube/config \
k8s-status-service:0.0.1
popd
