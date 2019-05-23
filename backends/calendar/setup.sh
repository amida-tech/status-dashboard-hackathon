#!/usr/bin/env bash
pushd "$(dirname "$0")"
rm -f token.json
npm i
npm run token
popd
