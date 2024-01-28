#!/bin/bash

PROJ_NAME=$1
npx socketcluster create $PROJ_NAME
cd $PROJ_NAME

echo "remove node_modules and package-lock.json"

rm -rf node_modules
rm -f package-lock.json

echo "update package.json type to commonjs"
npm pkg set 'type'='commonjs'

echo "setup scripts in package.json"
npm pkg set 'scripts.start:watch'='./node_modules/nodemon/bin/nodemon.js server.js'

npm pkg set 'scripts.migrate:db'='cd database && npx sequelize-cli db:migrate && cd ..'
npm pkg set 'scripts.migrate:db:drop'='cd database && npx sequelize-cli db:migrate:undo:all && cd ..'
npm pkg set 'scripts.seed:db'='cd database && npx sequelize-cli db:seed:all && cd ..'

npm pkg set 'scripts.test:watch'='jest --watch test --color'
npm pkg set 'scripts.test:CI'='CI=true jest test --color --reporters=jest-junit --forceExit --coverage --coverageDirectory=output/coverage/jest'

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
