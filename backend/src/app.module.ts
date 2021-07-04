import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { EnvModule } from './core/config/config.module';
import { BucketModule } from './bucket/bucket.module';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [EnvModule, BucketModule, MulterModule.register({})],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
