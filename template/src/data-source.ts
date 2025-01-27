import 'reflect-metadata';
import { DataSource, DataSourceOptions} from 'typeorm';
import {INacosResponseConfig} from './interfaces/nacosInterface';
import {User} from './entity/User';

class DatabaseManagerClass {
  private instance: DataSource;

  async initialize(
    nacosConfig: INacosResponseConfig,
  ): Promise<DataSource> {
    const options: DataSourceOptions = {
      type: 'postgres',
      host: nacosConfig.DB_HOST,
      port: Number(nacosConfig.DB_PORT),
      username: nacosConfig.DB_USERNAME,
      password: nacosConfig.DB_PASSWORD,
      database: nacosConfig.DB_DATABASE,
      synchronize: true,
      logging: false,
      entities: [User],
      migrations: [],
      subscribers: [],
    };

    this.instance = new DataSource(options);
    await this.instance.initialize();
    return this.instance;
  }

  getDataSource(): DataSource {
    if (!this.instance) {
      throw new Error('Database not initialized');
    }
    return this.instance;
  }

  async destroy(): Promise<void> {
    if (this.instance) {
      await this.instance.destroy();
    }
  }
}

const DatabaseManager = new DatabaseManagerClass();
export default DatabaseManager;
