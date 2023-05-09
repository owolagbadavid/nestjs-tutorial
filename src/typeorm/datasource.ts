import { DataSource, DataSourceOptions } from 'typeorm';
import entities from '.';

export const dataSourceOptions: DataSourceOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'user1',
  password: '12345678',
  entities: entities,
  database: 'tutorial_db',

  synchronize: true,
};

export const dataSource = new DataSource(dataSourceOptions);
