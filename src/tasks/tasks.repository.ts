import { EntityRepository, Repository } from 'typeorm';
import { Task } from './task.entity';

@EntityRepository(Task)
export class TasksRepository extends Repository<Task> {
  public async getTask(id: number): Promise<Task> {
    const task = await this.findOne(id);

    if (!task) {
      throw new Error('Task not found');
    }

    return task;
  }

  public async createTask(task: Task): Promise<Task> {
    await this.save(task);

    return task;
  }

  public async updateTask(id: number, task: Task): Promise<Task> {
    const taskToUpdate = await this.getTask(id);

    taskToUpdate.title = task.title;
    taskToUpdate.description = task.description;
    taskToUpdate.status = task.status;

    await this.save(taskToUpdate);

    return taskToUpdate;
  }

  public async deleteTask(id: number): Promise<void> {
    await this.delete(id);
  }
}
