import {Controller, Get, Render} from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/')
  @Render('index.hbs')
  getIndexPage(){
   return{ isLoggedIn: true };
  }

  @Get('/')
  @Render('auth.hbs')
  getAuthPage(){
    return{ isLoggedIn: false };
  }

}
