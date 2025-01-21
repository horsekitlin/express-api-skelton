import 'reflect-metadata';
import {DataSource} from 'typeorm';
import {User} from './entity/User';

const {DB_PORT, DB_HOST, DB_USERNAME, DB_DATABASE, DB_PASSWORD} = process.env;

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: DB_HOST,
  port: Number(DB_PORT),
  username: DB_USERNAME,
  password: DB_PASSWORD,
  database: DB_DATABASE,
  synchronize: true,
  logging: false,
  entities: [User],
  migrations: [],
  subscribers: [],
});
