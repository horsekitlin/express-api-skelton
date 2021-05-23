#!/bin/bash

echo "copy template..."
cp -a ./template/** ./
echo "please update .env file"
cp -a ./template/.env.example ./.env

echo "setup database"
npx sequelize-cli db:migrate

echo "create seeders"
npx sequelize-cli db:seed:all
