#!/bin/bash

PROJ_NAME=$1
npx socketcluster create $PROJ_NAME
cd $PROJ_NAME
rm -rf node_modules
cp -a ./* ./.* ..
cd ..
rm -rf $PROJ_NAME

echo "setup project..."
./lastest/setup.sh

echo "add packages..."
./lastest/add_packages.sh

echo "remove lastest"
rm -rf ./lastest

echo "remove template"
rm -rf ./template

echo "remove public"
rm -rf ./public
