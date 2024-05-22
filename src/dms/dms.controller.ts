import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';

@Controller('api/worspaces/:url/dms')
export class DmsController {
  @Get(':id/chats')
  getChat(@Query() query, @Param() param) {
    console.log(query.perPage, query.page);
    console.log(param.id, param.url);
  }

  @Post(':id/chats')
  postChat(@Body() body) {
    console.log(body);
  }
}
