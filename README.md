# skelton

## Initial Project

```
  $ ./lastest/init_project.sh $ProjectName
```
## Setup

```
  $ ./lastest/add_packages.sh && ./lastest/setup.sh
```

create .env
```
PORT=8000
AUTH_SECRET=djsvkasklfkadshfkjashdhfas
SALT_SECRET=djfljskfjlsadjflalks
```

#### Remove

```
  $ rm -rf ./template ./lastest
```

### package.json

```
{
  ...
  "scripts": {
    "start": "node server.js",
    "start:watch": "./node_modules/nodemon/bin/nodemon.js server.js",
    "start:docker": "./node_modules/nodemon/bin/nodemon.js /usr/src/app/server.js",
    "test": "jest",
    "test:watch": "jest --watch test --color",
    "test:CI": "CI=true jest test --color --reporters=jest-junit --forceExit --coverage --coverageDirectory=output/coverage/jest"
  },
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