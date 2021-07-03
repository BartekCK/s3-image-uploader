import {
  Body,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AppService } from './app.service';
import { FileDataDto } from './dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('images')
  @UseInterceptors(FileInterceptor('image'))
  getHello(
    @UploadedFile() image: Express.Multer.File,
    @Body() body: FileDataDto,
  ): string {
    console.log(body);
    console.log(image);
    return this.appService.getHello();
  }
}
