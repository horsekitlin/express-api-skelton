#!/bin/bash

PROJ_NAME=$1
npx socketcluster create $PROJ_NAME
cd $PROJ_NAME
rm -rf node_modules package-lock.json
cp -a ./* ./.* ..
cd ..
rm -rf $PROJ_NAME

yarn install
