import { SequelizeModuleOptions } from '@nestjs/sequelize';
import { Todo } from 'src/todo/entities/todo.entity';

export const dataBaseConfig: SequelizeModuleOptions = {
  dialect: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'Bebra123',
  database: 'test',
  autoLoadModels: true,
  synchronize: true,
  models: [Todo],
};
