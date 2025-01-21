import express, {
  json,
  urlencoded,
  Request,
  Response,
  NextFunction,
} from 'express';
import {RegisterRoutes} from '../build/routes';
import swaggerUi from 'swagger-ui-express';
import {CustomError} from './helpers/errorManager/customError';

export const app = express();

// Use body parser to read sent json payloads
app.use(
  urlencoded({
    extended: true,
  }),
);

app.use(json());

RegisterRoutes(app);

app.use('/api-docs', swaggerUi.serve, async (_: Request, res: Response) => {
  res.send(swaggerUi.generateHTML(await import('../build/swagger.json')));
});

function errorHandler(
  err: CustomError,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  res.status(err.code || 500).json({message: err.message});
}

app.use(errorHandler);
