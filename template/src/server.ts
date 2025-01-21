import dotenvFlow from 'dotenv-flow';
dotenvFlow.config();

import morgan from 'morgan';
import helmet from 'helmet';
import {app} from './app';
import {AppDataSource} from './data-source';


const {NODE_ENV, PORT = 3000} = process.env;

AppDataSource.initialize()
  .then(() => {
    if (NODE_ENV === 'production') {
      app.use(helmet());
    } else {
      app.use(morgan('dev'));
    }

    app.listen(PORT, async () =>
      console.log(`Example app listening at http://localhost:${PORT}`),
    );
    // console.log("Inserting a new user into the database...")
    // const user = new User()
    // user.name = "Timber Saw"
    // user.phone = "0987654321"
    // user.password = 'a12345678'
    // await AppDataSource.manager.save(user)
    // console.log("Saved a new user with id: " + user.id)

    // console.log("Loading users from the database...")
    // const users = await AppDataSource.manager.find(User);
    // console.log('Loaded users: ', users);

    // console.log("Here you can setup and run express / fastify / any other framework.")
  })
  .catch((error: Error) => {
    console.log(
      '🚀 ~ AppDataSource.initialize ~ error.message:',
      error.message,
    );
  });
