import { EntityRepository, Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { Task } from './task.entity';
import { TaskStatus } from './task-status.enum';

@EntityRepository(Task)
export class TasksRepository extends Repository<Task> {
  public async getTask(id: number): Promise<Task> {
    const task = await this.findOne(id);

    if (!task) {
      throw new Error('Task not found');
    }

    return task;
  }

  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    const { title, description } = createTaskDto;

    const newTask = this.create({
      title,
      description,
      status: TaskStatus.OPEN,
    });
    await this.save(newTask);
    return newTask;
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
