import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { dataBaseConfig } from './database/database.config';
import { TodoModule } from './todo/todo.module';

@Module({
  imports: [SequelizeModule.forRoot(dataBaseConfig), TodoModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
