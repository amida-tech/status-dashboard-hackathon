#!/usr/bin/env bash
pushd "$(dirname "$0")"
source env/bin/activate
export LC_ALL=C.UTF-8
export LANG=C.UTF-8
python3 -m flask run
popd
