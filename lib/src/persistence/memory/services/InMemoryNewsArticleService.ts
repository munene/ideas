import {Inject, Service} from 'typedi';
import { ModifyNewsArticleOptions, NewsArticle, NewsArticleService } from '../../../interfaces';
import { InMemoryNewsArticleRepository } from '../repositories';

@Service()
export class InMemoryNewsArticleService implements NewsArticleService {
  @Inject(() => InMemoryNewsArticleRepository)
  private readonly inMemoryNewsArticleRepo: InMemoryNewsArticleRepository;

  /**
   * Adds an article using the in memory repository
   *
   * @param {(Pick<NewsArticle, 'title' | 'text'>)} newsArticle
   * @return {*}  {Promise<NewsArticle>}
   * @memberof InMemoryNewsArticleService
   */
  add(newsArticle: Pick<NewsArticle, 'title' | 'text'>): Promise<NewsArticle> {
    return this.inMemoryNewsArticleRepo.add(newsArticle);
  }

  /**
   * Modifies an article using the in memory repository
   *
   * @param {ModifyNewsArticleOptions} options
   * @return {*}  {Promise<NewsArticle>}
   * @memberof InMemoryNewsArticleService
   */
  modify(options: ModifyNewsArticleOptions): Promise<NewsArticle> {
    return this.inMemoryNewsArticleRepo.modify(options);
  }

  /**
   * Gets an article using the in memory repository
   *
   * @param {string} id
   * @return {*}  {Promise<NewsArticle>}
   * @memberof InMemoryNewsArticleService
   */
  get(id: string): Promise<NewsArticle> {
    return this.inMemoryNewsArticleRepo.get(id);
  }

  /**
   * Gets all the articles using the in memory repository
   *
   * @return {*}  {Promise<NewsArticle[]>}
   * @memberof InMemoryNewsArticleService
   */
  list(): Promise<NewsArticle[]> {
    return this.inMemoryNewsArticleRepo.list();
  }
  
}