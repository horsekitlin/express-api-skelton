# About Auth-Service

## Runtime Command line

```
$ yarn build
$ yarn dev
```

## Build docker image

```
$ docker build -t passon/auth-service -f ./deploy/auth-service/Dockerfile .
```

## Run docker container

```
$ docker run -v ./apps/auth-service/.env.local:/app/.env.local -p 3000:3000 --name auth-service-container passon/auth-service:latest
```
