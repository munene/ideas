import {NewsArticleService, PersistenceModule} from '@ideas/lib';

export class NewsArticleHandler {
  _newsArticleService: NewsArticleService;

  constructor() {
    this._newsArticleService = PersistenceModule.getNewsArticleService();
  }

  
}