import { IsNotEmpty, IsString, validateSync } from 'class-validator';
import { plainToClass } from 'class-transformer';

export class RequiredEnv {
  @IsString()
  @IsNotEmpty()
  AWS_BUCKET_NAME: string;

  @IsString()
  @IsNotEmpty()
  AWS_BUCKET_REGION: string;

  @IsString()
  @IsNotEmpty()
  AWS_ACCESS_KEY: string;

  @IsString()
  @IsNotEmpty()
  AWS_SECRET_KEY: string;
}

export const validation = (data: Record<string, any>) => {
  const result = plainToClass(RequiredEnv, data);

  const err = validateSync(result, {
    whitelist: true,
    forbidUnknownValues: true,
  });

  if (err.length > 0) {
    throw new Error(err.toString());
  }

  return data;
};
