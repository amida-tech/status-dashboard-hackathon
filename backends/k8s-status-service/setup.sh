#!/usr/bin/env bash
pushd "$(dirname "$0")"
docker build -t k8s-status-service:0.0.1 .
docker stop k8s-status-service
docker rm k8s-status-service
docker create --name k8s-status-service -p 3001:3001 \
-e K8S_STATUS_SERVICE_PORT=3001 \
-v /home/odroid/dashboard/kubecfg:/root/.kube/config \
k8s-status-service:0.0.1
popd
