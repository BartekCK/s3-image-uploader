import { Readable } from 'stream';
import { ManagedUpload } from 'aws-sdk/clients/s3';
import {
  Body,
  Controller,
  Get,
  Header,
  Param,
  Post,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileDataDto } from './dto';
import { BucketClient } from './bucket/client/bucket.client';

@Controller()
export class AppController {
  constructor(private readonly bucketClient: BucketClient) {}

  @Post('images')
  @UseInterceptors(FileInterceptor('image'))
  async uploadFile(
    @UploadedFile() image: Express.Multer.File,
    @Body() body: FileDataDto,
  ): Promise<string> {
    const data: ManagedUpload.SendData = await this.bucketClient.uploadFile(
      image,
    );

    return data.Key;
  }

  @Get('images/:key')
  @Header('Content-Type', 'image/*')
  getFile(@Param('key') key: string, @Res() res): Readable {
    const stream = this.bucketClient.getFile(key);

    return stream.pipe(res);
  }
}
