import {NacosConfigClient, NacosNamingClient, Instance} from 'nacos';
import {Console} from 'console';
import PackageJson from '../../package.json';
import {INacosResponseConfig, INacosManagerConfig} from '../interfaces/nacosInterface';

const {
  NODE_ENV = 'development',
  NACOS_SERVER_URL = '',
  NACOS_SERVICE_NAME = '',
  NACOS_NAMESPACE = '',
  NACOS_GROUP = '',
  NACOS_USERNAME = '',
  NACOS_PASSWORD = '',
  NACOS_DATAID = '',
  NACOS_HOST = '',
  NACOS_PORT = 0,
} = process.env;

const DEFAULT_CONFIG: INacosResponseConfig = {
  "NODE_ENV": "development",
  "PORT": "3001",
  "HOST": "localhost",
  "AUTH_SECRET": "localDevSecretKey123!@#",
  "SALT_SECRET": "localDevSaltKey456!@#",
  "DB_USERNAME": "postgres",
  "DB_DATABASE": "auth_users_local",
  "DB_PASSWORD": "postgres",
  "DB_PORT": "5432", 
  "DB_HOST": "localhost",
  "DB_DIALECT": "postgres",
  "APP_DOMAIN": "localhost:3001",
  "JET_LOGGER_MODE": "CONSOLE",
  "JET_LOGGER_FILEPATH": "logs/jet-logger-local.log",
  "JET_LOGGER_TIMESTAMP": "TRUE",
  "JET_LOGGER_FORMAT": "LINE"
 };

class NacosManagerClass {
  private configClient: NacosConfigClient;
  private namingClient: NacosNamingClient;
  private config: INacosResponseConfig = DEFAULT_CONFIG;
  private readonly logger = new Console({
    stdout: process.stdout,
    stderr: process.stderr,
  });

  constructor(private options: INacosManagerConfig) {
    // Config Client
    this.configClient = new NacosConfigClient({
      serverAddr: options.serverAddr,
      namespace: options.namespace,
      username: options.username,
      password: options.password,
    });

    // Naming Client
    this.namingClient = new NacosNamingClient({
      serverList: options.serverAddr,
      namespace: options.namespace,
      username: options.username,
      password: options.password,
      logger: this.logger,
    });
  }

  async init(): Promise<void> {
    // 初始化 Config Client
    await this.configClient.ready();
    const content = await this.configClient.getConfig(
      this.options.dataId,
      NACOS_GROUP,
    );
    this.config = this.parseConfig(content);

    // 初始化 Naming Client
    await this.namingClient.ready();
    await this.register();
  }

  async getAllInstances(): Promise<Instance[]> {
    return this.namingClient.getAllInstances(
      this.options.serviceName,
      NACOS_GROUP,
    );
  }

  async getHealthyInstances(): Promise<Instance[]> {
    // 將布爾值轉換為字符串
    return this.namingClient.getAllInstances(
      this.options.serviceName,
      NACOS_GROUP,
      'true',
    );
  }

  private async register(): Promise<void> {
    const instance: Instance = {
      ip: this.options.ip,
      port: this.options.port,
      enabled: true,
      healthy: true,
      instanceId: `${this.options.ip}#${this.options.port}#${this.options.serviceName}`,
      weight: 1,
      serviceName: this.options.serviceName,
      clusterName: 'DEFAULT',
      ephemeral: true,
    };

    await this.namingClient.registerInstance(
      this.options.serviceName,
      instance,
      NACOS_GROUP,
    );
  }

  getConfig<T>(): INacosResponseConfig {
    return this.config;
  }

  private parseConfig(content: string): INacosResponseConfig {
    try {
      return JSON.parse(content) as INacosResponseConfig;
    } catch (e) {
      return DEFAULT_CONFIG;
    }
  }

  async close(): Promise<void> {
    const instance: Instance = {
      ip: this.options.ip,
      port: this.options.port,
      enabled: true,
      healthy: true,
      instanceId: `${this.options.ip}#${this.options.port}#${this.options.serviceName}`,
      weight: 1,
      serviceName: this.options.serviceName,
      clusterName: 'DEFAULT',
      ephemeral: true,
    };

    await this.namingClient.deregisterInstance(
      this.options.serviceName,
      instance,
      NACOS_GROUP,
    );

    await this.configClient.close();
  }
}

const NacosManager = new NacosManagerClass({
  serverAddr: NACOS_SERVER_URL,
  namespace: NACOS_NAMESPACE,
  username: NACOS_USERNAME,
  password: NACOS_PASSWORD,
  serviceName: NACOS_SERVICE_NAME,
  dataId: NACOS_DATAID,
  ip: NACOS_HOST,
  port: Number(NACOS_PORT),
  metadata: {
    version: PackageJson.version,
    environment: NODE_ENV,
  },
});

export default NacosManager;

// NacosManager.init().then(() => {
//   module.exports = NacosManager;
//   module.exports.default = NacosManager;
// });
