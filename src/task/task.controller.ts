import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { TaskService } from './task.service';
import { Task } from './task.entity';

@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  create(@Body('title') title: string, @Body('description') description: string): Promise<Task> {
    return this.taskService.create(title, description);
  }

  @Get()
  findAll(): Promise<Task[]> {
    return this.taskService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Task> {
    return this.taskService.findOne(+id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body('title') title: string,
    @Body('description') description: string,
    @Body('completed') completed: boolean,
  ): Promise<Task> {
    return this.taskService.update(+id, title, description, completed);
  }

  @Delete(':id')
  delete(@Param('id') id: string): Promise<void> {
    return this.taskService.delete(+id);
  }
}