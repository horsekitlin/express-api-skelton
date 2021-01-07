#!/bin/bash

PROJ_NAME=$1
npx socketcluster create $PROJ_NAME
cd $PROJ_NAME
mv ./* ./.* ..
cd ..
rmdir $PROJ_NAME