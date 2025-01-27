
export interface INacosConfig {
  serverAddr: string;
  namespace?: string;
  username?: string;
  password?: string;
  dataId: string;
  serviceName: string;
  ip: string;
  port: number;
  metadata?: Record<string, string>;
}

export interface INacosManagerConfig extends INacosConfig {
  dataId: string;
  serviceName: string;
  ip: string;
  port: number;
  metadata?: Record<string, string>;
}

export interface INacosResponseConfig {
  NODE_ENV: 'development' | 'production' | 'test';
  PORT: string;
  HOST: string;
  AUTH_SECRET: string;
  SALT_SECRET: string;
  DB_USERNAME: string;
  DB_DATABASE: string; 
  DB_PASSWORD: string;
  DB_PORT: string;
  DB_HOST: string;
  DB_DIALECT: 'postgres';
  APP_DOMAIN: string;
  JET_LOGGER_MODE: 'CONSOLE' | 'FILE';
  JET_LOGGER_FILEPATH: string;
  JET_LOGGER_TIMESTAMP: 'TRUE' | 'FALSE';
  JET_LOGGER_FORMAT: 'LINE';
 }