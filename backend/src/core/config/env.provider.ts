import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { RequiredEnv } from './models/required-env';
import { AwsSettings } from './types';

@Injectable()
export class EnvProvider extends ConfigService {
  get<T extends keyof RequiredEnv>(key: T): T {
    return super.get(key);
  }

  getAws(): AwsSettings {
    const awsSettings: AwsSettings = {
      accessKey: this.get('AWS_ACCESS_KEY'),
      region: this.get('AWS_BUCKET_REGION'),
      name: this.get('AWS_BUCKET_NAME'),
      secretKey: this.get('AWS_SECRET_KEY'),
    };

    return awsSettings;
  }
}
