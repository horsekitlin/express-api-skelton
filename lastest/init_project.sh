#!/bin/bash

PROJ_NAME=$1
mkdir $PROJ_NAME
cd $PROJ_NAME
npx yarn init -y

sh ../lastest/add_packages.sh

mv ./* ./.* ..

cd ..
rmdir $PROJ_NAME

sh ./lastest/setup.sh

rm -rf lastest template .git