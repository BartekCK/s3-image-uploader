import { S3 } from 'aws-sdk';
import { Readable } from 'stream';
import { v4 as uuidv4 } from 'uuid';
import { AwsSettings } from '../../core/config/types';

export class BucketClient {
  private readonly client: S3;
  private readonly name: string;

  constructor({ region, accessKey, secretKey, name }: AwsSettings) {
    this.client = new S3({
      region,
      accessKeyId: accessKey,
      secretAccessKey: secretKey,
    });
    this.name = name;
  }

  uploadFile(file: Express.Multer.File) {
    return this.client
      .upload({
        Bucket: this.name,
        Body: file.buffer,
        Key: uuidv4(),
        Metadata: { fileName: file.originalname },
      })
      .promise();
  }

  getFile(key: string): Readable {
    return this.client
      .getObject({ Bucket: this.name, Key: key })
      .createReadStream();
  }
}
