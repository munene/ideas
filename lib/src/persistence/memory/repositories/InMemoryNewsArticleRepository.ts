import { Service } from 'typedi';
import {v4 as uuid} from 'uuid';
import { NotFoundError } from '../../errors';
import { ModifyNewsArticleOptions, NewsArticle } from '../../../interfaces';

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
  add(newsArticle: Pick<NewsArticle, 'title' | 'text'>): NewsArticle {
    console.log(newsArticle);
    const newNewsArticle = {...newsArticle, id: uuid(), creation_date: new Date() }
    this.newsArticles.push(newNewsArticle);
    return newNewsArticle;
  }

  /**
   * Modifies a news article if it exists
   *
   * @param {ModifyNewsArticleOptions} options
   * @return {*}  {NewsArticle}
   * @memberof InMemoryNewsArticleRepository
   */
  modify(options: ModifyNewsArticleOptions): NewsArticle {
    this.newsArticles = this.newsArticles.map(newsArticle => newsArticle.id === options.id ? {...newsArticle, ...options.newsArticle} : newsArticle);
    return this.get(options.id);
  }

  get(id: string): NewsArticle {
    const newsArticle = this.newsArticles.find(newsArticle => newsArticle.id === id);

    if(newsArticle) {
      return newsArticle;
    }
    throw new NotFoundError();
  }

  list(): NewsArticle[] {
    return this.newsArticles;
  }
}