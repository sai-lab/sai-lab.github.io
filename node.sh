#!/bin/bash

docker run -i --rm -u `id -u`:`id -g` \
  -v $(realpath "${PWD}"):${PWD} \
  -w $(realpath "${PWD}") \
  node:latest \
    "$@"
