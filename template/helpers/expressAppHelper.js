const morgan = require("morgan");
const express = require("express");
const cors = require("cors");
const passport = require("passport");
const cookieParser = require("cookie-parser");
const swagger = require('express-swagger-generator');
const { jwtAuthorizationMiddleware } = require("../helpers/passportManager");
const indexRouter = require("../controllers/index");
const authRouter = require("../controllers/authRouter");
const homeRouter = require("../controllers/homeRouter");
const userRouter = require("../controllers/userRouter");
const packageJson = require('../package.json');

const { NODE_ENV, APP_DOMAIN } = process.env;

const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: 'Trip-backend-api',
      description: 'Trip backend api service.',
      version: `${packageJson.version} - ${NODE_ENV}`,
    },
    host: APP_DOMAIN,
    produces: ['application/json'],
    schemes: ['http', 'https'],
    securityDefinitions: {
      JWT: {
        type: 'apiKey',
        in: 'header',
        name: 'Authorization',
        description: 'JWT token',
      },
    },
  },
  route: {
    url: '/api-docs',
    docs: '/api-docs.json',
  },
  basedir: __dirname,
  files: ['../controllers/*.js'],
};

let expressApp = express();
if (NODE_ENV === "dev") {
  // Log every HTTP request. See https://github.com/expressjs/morgan for other
  // available formats.
  expressApp.use(morgan("dev"));
}

expressApp.use(cors());
expressApp.use(express.json());
expressApp.use(express.urlencoded({ extended: false }));
expressApp.use(cookieParser());

expressApp.use(passport.initialize());

expressApp.use('/', indexRouter);
expressApp.use('/auth', authRouter);
expressApp.use('/users', passport.authenticate('jwt', { session: false }), userRouter);
expressApp.use('/home', homeRouter);

// Add GET /health-check express route
expressApp.get("/health-check", (req, res) => {
  res.json({
    success: true,
    data: { status: 'WORKING' }
  });
});

swagger(expressApp)(swaggerOptions);

module.exports = expressApp;