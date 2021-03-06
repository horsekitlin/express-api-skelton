#!/bin/bash


echo "remove package-lock.json..."
rm -f ./package-lock.json ./public

echo "Add dotenv..."
yarn add dotenv

echo "Add packages..."
yarn add passport passport-jwt passport-local cors cookie-parser lodash swagger-ui-express
