import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import JSONbig from 'json-bigint';


@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/web3')
  getweb3(){
    return this.appService.getweb3instance()
  }

  @Get('/balance')
  getbalance(){
    return this.appService.getbalance()
  }

  @Get('/transfer')
  makeTranscation(){
    return this.appService.makeTransaction()
  }
  

  @Post('/contract')
  async Contract(@Body('x') x: number) {
    const result = await this.appService.smartContract(x);
    return {
      message: 'Contract updated successfully',
      updatedX: result.updatedX.toString(),
    };
  }
  
}
