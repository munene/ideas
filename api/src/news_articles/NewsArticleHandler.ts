import {NewsArticleService, PersistenceModule} from '@ideas/lib';
import { Service } from 'typedi';
import { AddNewsArticleRequest, ModifyNewsArticleRequest } from './NewsArticlesSchemas';

@Service()
export class NewsArticleHandler {
  _newsArticleService: NewsArticleService;

  constructor() {
    this._newsArticleService = PersistenceModule.getNewsArticleService();
  }

  list() {
    return this._newsArticleService.list();
  }

  get(id: string) {
    return this._newsArticleService.get(id);
  }

  modify(id: string, data: ModifyNewsArticleRequest) {
    return this._newsArticleService.modify({id, newsArticle: data});
  }

  add(data: AddNewsArticleRequest) {
    return this._newsArticleService.add(data);
  }
}