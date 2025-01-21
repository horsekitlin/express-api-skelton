#!/bin/bash

echo "Add packages..."
yarn add crypto dotenv-flow express helmet morgan passport passport-jwt passport-local pg reflect-metadata swagger-ui-express tsoa typeorm

echo "Add Develop Dependencies"
yarn add -D @types/express @types/jest @types/morgan @types/node @types/passport @types/passport-jwt @types/passport-local @types/supertest @types/swagger-ui-express concurrently jest nodemon supertest ts-jest ts-node typescript

echo "Set package.json scripts"
npm pkg set scripts.dev="yarn build && concurrently \"nodemon\" \"nodemon -x tsoa spec-and-routes\""
npm pkg set scripts.build="tsoa spec-and-routes && tsc"
npm pkg set scripts.start="node build/src/server.js"
npm pkg set scripts.test="ject"
npm pkg set scripts.test:watch="jest --watch"
npm pkg set scripts.test:coverage="jest --coverage --coverageReporters='html' --passWithNoTests"
npm pkg set scripts.test:verbose="jest --verbose"

