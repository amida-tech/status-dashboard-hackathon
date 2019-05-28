#!/usr/bin/env bash
pushd "$(dirname "$0")"
docker start k8s-status-service
docker wait k8s-status-service
popd
