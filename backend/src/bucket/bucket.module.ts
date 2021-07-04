import { Module } from '@nestjs/common';
import { EnvProvider } from '../core/config/env.provider';
import { BucketClient } from './client/bucket.client';
import { EnvModule } from '../core/config/config.module';

@Module({
  imports: [EnvModule],
  providers: [
    {
      provide: BucketClient,
      useFactory: (config: EnvProvider) => {
        return new BucketClient(config.getAws());
      },
      inject: [EnvProvider],
    },
  ],
  exports: [BucketClient],
})
export class BucketModule {}
