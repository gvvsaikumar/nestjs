import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './task.entity';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
  ) {}

  // Create
  async create(title: string, description: string): Promise<Task> {
    const task = this.taskRepository.create({ title, description });
    return this.taskRepository.save(task);
  }

  // Read (Get All)
  async findAll(): Promise<Task[]> {
    return this.taskRepository.find();
  }

  // Read (Get One)
  async findOne(id: number): Promise<Task> {
    const task = await this.taskRepository.findOneBy({ id });
    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
    return task;
  }

  // Update
  async update(id: number, title: string, description: string, completed: boolean): Promise<Task> {
    const task = await this.findOne(id); // This will throw if not found
    task.title = title || task.title;
    task.description = description || task.description;
    task.completed = completed !== undefined ? completed : task.completed;
    return this.taskRepository.save(task);
  }

  // Delete
  async delete(id: number): Promise<void> {
    const task = await this.findOne(id); // This will throw if not found
    await this.taskRepository.delete(task.id);
  }
}