import { JsonController } from "routing-controllers";
import { Inject } from "typedi";
import { NewsArticleHandler } from "./NewsArticleHandler";

@JsonController('/news_article')
export class NewsArticleController {
  @Inject(() => NewsArticleHandler)
  private readonly service: NewsArticleHandler;
}