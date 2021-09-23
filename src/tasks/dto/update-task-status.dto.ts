import { IsEnum } from 'class-validator';
import { TaskStatus } from '../task.model';

export class UpdarTaskStatusDto {
  @IsEnum(TaskStatus)
  status: TaskStatus;
}
