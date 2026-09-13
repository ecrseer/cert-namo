import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  getRoot() {
    return { message: 'Cert Namo API' };
  }

  @Get('health')
  getHealth() {
    return { status: 'ok' };
  }

  @Get('hello')
  getHello() {
    return { hello: 'world' };
  }
}
