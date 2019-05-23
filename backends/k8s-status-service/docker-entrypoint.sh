#!/bin/sh
kops export kubecfg $K8S_NAME --state=$K8S_CONFIG_BUCKET_NAME

node src/app.js
