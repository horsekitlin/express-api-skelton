const SCWorker = require('socketcluster/scworker');
const express = require('express');
const serveStatic = require('serve-static');
const path = require('path');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const healthChecker = require('sc-framework-health-check');
const dotenv = require('dotenv');
const cors = require('cors');
const passport = require('passport');

dotenv.config();

const { jwtAuthorizationMiddleware } = require("./helpers/passportManager")
const indexRouter = require('./routes/index');
const authRouter = require('./routes/authRouter');
const homeRouter = require('./routes/homeRouter');

class Worker extends SCWorker {
  run() {
    console.log('   >> Worker PID:', process.pid);
    const environment = this.options.environment;

    const app = express();

    const httpServer = this.httpServer;
    const scServer = this.scServer;

    if (environment === 'dev') {
      // Log every HTTP request.
      // See https://github.com/expressjs/morgan for other available formats.
      app.use(morgan('dev'));
    }
    app.use(cors());
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    app.use(cookieParser());

    app.use(passport.initialize());
    app.use(serveStatic(path.resolve(__dirname, 'public')));

    // Listen for HTTP GET "/health-check".
    healthChecker.attach(this, app);

    httpServer.on('request', app);


    app.use('/', indexRouter);
    app.use('/auth', authRouter);
    app.use('/home', jwtAuthorizationMiddleware, homeRouter);

    app.get('/health-check', (req, res) => {
      res.status(200).send('OK');
    });

    /**
     * NOTE: Be sure to replace the following sample logic with your own logic.
     */

    /**
    const count = 0;
    // Handle incoming websocket connections and listen for events.
    scServer.on('connection', function (socket) {

      socket.on('sampleClientEvent', function (data) {
        count++;
        console.log('Handled sampleClientEvent', data);
        scServer.exchange.publish('sample', count);
      });

      const interval = setInterval(function () {
        socket.emit('random', {
          number: Math.floor(Math.random() * 5)
        });
      }, 1000);

      socket.on('disconnect', function () {
        clearInterval(interval);
      });

    });
    */
  }
}

new Worker();
