# skelton

## Initial Project

```
  $ ./lastest/init_project.sh $ProjectName
```
## Setup

create .env

```
SOCKETCLUSTER_PORT=8000
AUTH_SECRET=test123
SALT_SECRET=test456
DB_USERNAME= //postgres username
DB_DATABASE= //postgres database name
DB_PASSWORD= //// postgres password 
DB_PORT=5432
DB_HOST= //postgres ip
DB_DIALECT=postgres
```

### package.json

```
{
  ...
  "jest": {
    "testURL": "http://localhost/",
    "collectCoverageFrom": [
      "routes/*.js",
      "!src/server.js",
      "!<rootDir>/node_modules/"
    ],
    "coverageReporters": [
      "text",
      "html"
    ]
  },
  ...
}
```