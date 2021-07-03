import { Module } from '@nestjs/common';
import { EnvProvider } from '../core/config/env.provider';
import { BucketClient } from './client/bucket.client';

@Module({
  providers: [
    {
      provide: BucketClient,
      useFactory: (config: EnvProvider) => {
        return new BucketClient(config.getAws());
      },
      inject: [EnvProvider],
    },
  ],
})
export class BucketModule {}
