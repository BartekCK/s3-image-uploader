import S3 from 'aws-sdk/clients/s3';
import { AwsSettings } from '../../core/config/types';

export class BucketClient {
  private readonly client: S3;
  constructor({ region, accessKey, secretKey }: AwsSettings) {
    this.client = new S3({
      region,
      accessKeyId: accessKey,
      secretAccessKey: secretKey,
    });
  }
}
