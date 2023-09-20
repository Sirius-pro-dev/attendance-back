#!/bin/sh
docker stop sirius_mongo
docker volume remove sirius_volume
docker volume create sirius_volume
docker run -e MONGO_INITDB_ROOT_USERNAME=test -e MONGO_INITDB_ROOT_PASSWORD=test -p 27017:27017 --name sirius_mongo -v sirius_volume:/data/db -d --rm mongo:4.4.23
