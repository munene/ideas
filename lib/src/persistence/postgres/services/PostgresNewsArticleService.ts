import { Service } from "typedi";
import { NotFoundError } from "../..";
import { ModifyNewsArticleOptions, NewsArticleService } from '../../../interfaces';
import { NewsArticle } from "../../../models";
import { PostgresNewsArticleRepository } from "../repositories";
import { InjectRepository } from 'typeorm-typedi-extensions';
import { PostgresNewsArticle } from "../entities";

@Service()
export class PostgresNewsArticleService implements NewsArticleService {
  @InjectRepository(() => PostgresNewsArticleRepository)
  private readonly repo: PostgresNewsArticleRepository;

  /**
   * Inserts a news article in the postgres db
   *
   * @param {(Pick<NewsArticle, "title" | "text">)} newsArticle
   * @return {*}  {Promise<NewsArticle>}
   * @memberof PostgresNewsArticleService
   */
  add(newsArticle: Pick<NewsArticle, "title" | "text">): Promise<NewsArticle> {
    const article = Object.assign(new PostgresNewsArticle(), newsArticle);
    return this.repo.save(article);
  }

  /**
   * Updates the news article in the postgres db
   *
   * @param {ModifyNewsArticleOptions} options
   * @return {*}  {Promise<NewsArticle>}
   * @memberof PostgresNewsArticleService
   */
  async modify(options: ModifyNewsArticleOptions): Promise<NewsArticle> {
    await this.repo.update({id: options.id}, options.newsArticle);
    return this.get(options.id);
  }

  /**
   * Retrieves the news article from the db by id
   *
   * @param {string} id
   * @return {*}  {Promise<NewsArticle>}
   * @memberof PostgresNewsArticleService
   */
  async get(id: string): Promise<NewsArticle> {
    const newsArticle = await this.repo.findOne(id);

    if (newsArticle) return newsArticle;
    throw new NotFoundError();
  }

  /**
   * Retrieves a list of all the news articles from the db
   *
   * @return {*}  {Promise<NewsArticle[]>}
   * @memberof PostgresNewsArticleService
   */
  async list(): Promise<NewsArticle[]> {
    return this.repo.find();
  }

}