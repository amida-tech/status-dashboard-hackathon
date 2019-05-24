#!/usr/bin/env bash
pushd "$(dirname "$0")"
docker start k8s-status-service
# hackish way to get this script to exit when container goes down
# this is a simple way to let us use systemd to keep the service alive
# in general a terrible thing, but in this case consistent with the other services
docker exec -it k8s-status-service sh
popd
