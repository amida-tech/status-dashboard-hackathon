#!/usr/bin/env bash
pushd "$(dirname "$0")"
python3 -m venv env
source env/bin/activate
pip install -r requirements.txt
popd
