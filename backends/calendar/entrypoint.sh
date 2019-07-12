#!/usr/bin/env sh
envsubst < credentials.envsubst.json > credentials.json
echo $GCAL_TOKEN > token.json
npm run serve
