const dotenv = require('dotenv');

dotenv.config();

const {PROT, NODE_ENV} = process.env;

const paths = require('./paths');
const definitions = require('./definitions');

const getHostURL = () => {
  switch(NODE_ENV) {
    default:
      return `localhost:${PORT}`;
  }
};

const options = {
  swagger: "2.0",
  info: {
    version: "1.0.0", //version of the OpenAPI Specification
    title: "My User Project CRUD",
    description: "My User Project Application API",
    license: {
      name: "MIT",
      url: "https://opensource.org/licenses/MIT",
    },
  },
  host: getHostURL(),
  basePath: "/",
  tags: [
    {
      name: "Users",
      description: "API for users in the system",
    },
  ],
  schemes: ["http", "https"],
  consumes: ["application/json"],
  produces: ["application/json"],
  paths: {
    ...paths,
  },
  definitions: {
    ...definitions
  },
};

module.exports.specs = options;
