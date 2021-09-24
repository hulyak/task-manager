import { IsEnum } from 'class-validator';
import { TaskStatus } from '../task-status.enum';

export class UpdarTaskStatusDto {
  @IsEnum(TaskStatus)
  status: TaskStatus;
}
