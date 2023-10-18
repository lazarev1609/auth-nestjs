import { DataSource, DataSourceOptions } from 'typeorm';
import * as dotenv from 'dotenv';
import { ConfigService } from '@nestjs/config';

dotenv.config();

const configService: ConfigService = new ConfigService();

const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: configService.get('POSTGRES_HOST'),
  port: configService.get('POSTGRES_PORT'),
  username: configService.get('POSTGRES_USER'),
  password: configService.get('POSTGRES_PASSWORD'),
  database: configService.get('POSTGRES_DB'),
  entities: ['dist/**/*.entity.js'],
  migrations: ['dist/src/migrations/*.js'],
  migrationsTableName: 'migrations',
};

const dataSource = new DataSource(dataSourceOptions);

export default dataSource;
