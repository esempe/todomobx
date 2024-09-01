import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Todo } from './entities/todo.entity';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class TodoService {
  constructor(@InjectModel(Todo) private todoRep: typeof Todo) {}

  create(createTodoDto: CreateTodoDto) {
    if (!createTodoDto.title) {
      throw new BadRequestException('Title is required');
    }
    return this.todoRep.create(createTodoDto as any);
  }

  findAll() {
    return this.todoRep.findAll();
  }

  async findOne(id: number) {
    const todo = await this.todoRep.findByPk(id);
    if (!todo) {
      throw new NotFoundException(`Todo with id ${id} not found`);
    }
    return todo;
  }

  async update(id: number, updateTodoDto: UpdateTodoDto) {
    const todo = await this.todoRep.findByPk(id);
    if (!todo) {
      throw new NotFoundException(`Todo with id ${id} not found`);
    }
    await todo.update(updateTodoDto as any);
    return todo;
  }

  async remove(id: number) {
    const todo = await this.todoRep.findByPk(id);
    if (!todo) {
      throw new NotFoundException(`Todo with id ${id} not found`);
    }
    await todo.destroy();

    // TO DO: Implement standart for response
    return 'success deleted';
  }
}
