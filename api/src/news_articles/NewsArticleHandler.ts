import {NewsArticleService, PersistenceModule} from '@ideas/lib';
import { Service } from 'typedi';
import { AddNewsArticleRequest, ModifyNewsArticleRequest, NewsArticleResponse } from './NewsArticlesSchemas';

@Service()
export class NewsArticleHandler {
  _newsArticleService: NewsArticleService;

  constructor() {
    this._newsArticleService = PersistenceModule.getNewsArticleService();
  }

  async list() {
    const articles = await this._newsArticleService.list();
    return articles.map(NewsArticleResponse.from);
  }

  async get(id: string) {
    const article = await this._newsArticleService.get(id);
    return NewsArticleResponse.from(article);
  }

  modify(id: string, data: ModifyNewsArticleRequest) {
    return this._newsArticleService.modify({id, newsArticle: data});
  }

  add(data: AddNewsArticleRequest) {
    return this._newsArticleService.add(data);
  }
}