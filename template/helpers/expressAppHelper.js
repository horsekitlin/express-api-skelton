const morgan = require("morgan");
const express = require("express");
const cors = require("cors");
const passport = require("passport");
const cookieParser = require("cookie-parser");
const swaggerUi = require("swagger-ui-express");
const { specs } = require('../constants/swaggerOptions');
const { jwtAuthorizationMiddleware } = require("../helpers/passportManager");
const indexRouter = require("../controller/index");
const authRouter = require("../controller/authRouter");
const homeRouter = require("../controller/homeRouter");
const userRouter = require("../controller/userRouter");

const ENVIRONMENT = process.env.ENV || "dev";

let expressApp = express();
if (ENVIRONMENT === "dev") {
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
expressApp.use('/users', userRouter);
expressApp.use('/home', jwtAuthorizationMiddleware, homeRouter);

// Add GET /health-check express route
expressApp.get("/health-check", (req, res) => {
  res.json({
    success: true,
    data: { status: 'WORKING' }
  });
});

expressApp.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(specs)
);

module.exports = expressApp;