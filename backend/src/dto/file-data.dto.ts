import { IsString } from 'class-validator';

export class FileDataDto {
  @IsString()
  description: string;
}
