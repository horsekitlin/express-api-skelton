module.exports = {
  development: {
    username: "user",
    password: "pass",
    database: "express_demo",
    host: "127.0.0.1",
    dialect: "postgres",
  },
  test: {
    username: "root",
    password: "pass",
    database: "express_demo_test",
    host: "127.0.0.1",
    dialect: "postgres",
  },
  production: {
    username: "root",
    password: "pass",
    database: "express_demo_production",
    host: "127.0.0.1",
    dialect: "postgres",
  },
};
