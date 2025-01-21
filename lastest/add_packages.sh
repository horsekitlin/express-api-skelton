#!/bin/bash

echo "Add packages..."
yarn add crypto dotenv-flow express helmet morgan passport passport-jwt passport-local pg reflect-metadata swagger-ui-express tsoa typeorm

echo "Add Develop Dependencies"
yarn add -D @types/express @types/jest @types/morgan @types/node @types/passport @types/passport-jwt @types/passport-local @types/supertest @types/swagger-ui-express concurrently jest nodemon supertest ts-ject ts-node typescript

echo "Set package.json scripts"
yarn set script dev "yarn build && concurrently \"nodemon\" \"nodemon -x tsoa spec-and-routes\""
yarn set script build tsoa spec-and-routes && tsc
yarn set script start "node build/src/server.js"
yarn set script test "ject"
yarn set script test:watch "jest --watch"
yarn set script test:coverage "jest --coverage --coverageReporters='html' --passWithNoTests"
yarn set script test:verbose "jest --verbose"
