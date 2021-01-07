#!/bin/bash

echo "copy template..."
cp -a ./template/** ./
cp -a ./template/.env.example ./.env

echo "please update .env file"
