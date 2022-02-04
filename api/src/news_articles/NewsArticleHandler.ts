import {NewsArticleService, PersistenceModule} from '@ideas/lib';
import { Service } from 'typedi';
import { NotFoundHttpError } from '../http_errors/NotFoundHttpError';
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
    try {
      const article = await this._newsArticleService.get(id);
      return NewsArticleResponse.from(article);
    } catch (error) {
      switch((error as any).constructor) {
        case PersistenceModule.NotFoundError:
          throw new NotFoundHttpError();
        default:
          throw error;
      }
    }
  }

  async modify(id: string, data: ModifyNewsArticleRequest) {
    try {
      const article = await this._newsArticleService.modify({id, newsArticle: data});
      return NewsArticleResponse.from(article);
    } catch (error) {
      switch((error as any).constructor) {
        case PersistenceModule.NotFoundError:
          throw new NotFoundHttpError();
        default:
          throw error;
      }
    }
  }

  async add(data: AddNewsArticleRequest) {
    const article = await this._newsArticleService.add(data);
    return NewsArticleResponse.from(article);
  }
}