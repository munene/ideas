import { Body, Get, HttpCode, JsonController, Param, Post, Put } from "routing-controllers";
import { Inject } from "typedi";
import { NewsArticleHandler } from "./NewsArticleHandler";
import { AddNewsArticleRequest, ModifyNewsArticleRequest } from "./NewsArticlesSchemas";

@JsonController('/news-articles')
export class NewsArticleController {
  @Inject(() => NewsArticleHandler)
  private readonly service: NewsArticleHandler;

  @Get()
  list() {
    return this.service.list();
  }

  @Get('/:id') 
  get(
    @Param('id') id: string
  ) {
    return this.service.get(id);
  }

  @Put('/:id')
  modify(
    @Param('id') id: string,
    @Body({validate: true, required: true}) data: ModifyNewsArticleRequest
  ) {
    return this.service.modify(id, data);
  }

  @Post()
  @HttpCode(201)
  add(
    @Body({validate: true, required: true}) data: AddNewsArticleRequest
  ) {
    return this.service.add(data);
  }
}