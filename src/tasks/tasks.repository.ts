import { EntityRepository, Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { Task } from './task.entity';
import { TaskStatus } from './task-status.enum';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';

@EntityRepository(Task)
export class TasksRepository extends Repository<Task> {
  async getTasks(filterDto: GetTasksFilterDto): Promise<Task[]> {
    const { status, search } = filterDto;
    const query = this.createQueryBuilder('task');

    if (status) {
      query.andWhere('task.status = :status', { status });
    }

    if (search) {
      query.andWhere(
        'LOWER(task.title) LIKE LOWER(:search) OR LOWER(task.description) LIKE LOWER(:search)',
        { search: `%${search}%` },
      );
    }

    // clean your room ->CLEAN YOUR ROOM

    const tasks = await query.getMany(); // execute the query
    return tasks;
  }

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
