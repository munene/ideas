import { Service } from 'typedi';
import {v4 as uuid} from 'uuid';
import { NotFoundError } from '../../errors';
import { ModifyNewsArticleOptions } from '../../../interfaces';
import { NewsArticle } from '../../../models';

@Service()
export class InMemoryNewsArticleRepository {
  private newsArticles: NewsArticle[] = [];

  /**
   * Appends an news article to the in memory news articles array
   *
   * @param {(Pick<NewsArticle, 'title' | 'text'>)} newsArticle
   * @return {*}  {NewsArticle}
   * @memberof InMemoryNewsArticleRepository
   */
  add(newsArticle: Pick<NewsArticle, 'title' | 'text'>): Promise<NewsArticle> {
    const newNewsArticle = Object.assign(new NewsArticle(), {...newsArticle, id: uuid(), creation_date: new Date() })
    this.newsArticles.push(newNewsArticle);
    return Promise.resolve(newNewsArticle);
  }

  /**
   * Modifies a news article if it exists
   *
   * @param {ModifyNewsArticleOptions} options
   * @return {*}  {NewsArticle}
   * @memberof InMemoryNewsArticleRepository
   */
  modify(options: ModifyNewsArticleOptions): Promise<NewsArticle> {
    this.newsArticles = this.newsArticles.map(newsArticle => newsArticle.id === options.id ? Object.assign(new NewsArticle(), {...newsArticle, ...options.newsArticle}) : newsArticle);
    return this.get(options.id);
  }

  get(id: string): Promise<NewsArticle> {
    const newsArticle = this.newsArticles.find(newsArticle => newsArticle.id === id);

    if(newsArticle) {
      return Promise.resolve(newsArticle);
    }
    return Promise.reject(new NotFoundError());
  }

  list(): Promise<NewsArticle[]> {
    return Promise.resolve(this.newsArticles);
  }
}