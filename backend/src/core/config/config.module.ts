import {  Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { validation } from './models/required-env';
import { EnvProvider } from './env.provider';

@Module({
  imports: [ConfigModule.forRoot({ validate: validation })],
  providers: [EnvProvider],
  exports: [EnvProvider],
})
export class EnvModule {}
