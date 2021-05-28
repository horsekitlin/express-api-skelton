const paths = require('./paths');
const definitions = require('./definitions');

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
  host: "localhost:8888",
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
