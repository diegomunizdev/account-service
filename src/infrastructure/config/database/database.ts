import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Account } from '../../entities/account/account.entity';
import * as dotenv from 'dotenv';
dotenv.config();

const DATABASE = {
  postgres: 'postgres',
};

export const connectionDatabase: TypeOrmModuleOptions = {
  type: DATABASE[process.env.TYPE_DATABASE],
  host: process.env.HOST_DATABASE,
  port: +process.env.PORT_DATABASE,
  username: process.env.USERNAME_DATABASE,
  password: process.env.PASSWORD_DATABASE,
  entities: [Account],
  database: process.env.DATABASE,
  autoLoadEntities: true,
  synchronize: true,
};
