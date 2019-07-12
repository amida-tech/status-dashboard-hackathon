#!/usr/bin/env bash
node pull_locations.js > locations.raw
cat locations.raw | grep . | sort | uniq > locations
