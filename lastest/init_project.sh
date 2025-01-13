#!/bin/bash

PROJ_NAME=$1
npx express-generator-typescript $PROJ_NAME

cd $PROJ_NAME
rm -rf ./config ./view

mv ./* ./.* ..
cd ..
rmdir $PROJ_NAME