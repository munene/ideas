import {Inject, Service} from 'typedi';
import { ModifyNewsArticleOptions, NewsArticle, NewsArticleService } from '../../../interfaces';
import { InMemoryNewsArticleRepository } from '../repositories';

@Service()
export class InMemoryNewsArticleService implements NewsArticleService {
  @Inject(() => InMemoryNewsArticleRepository)
  private readonly inMemoryNewsArticleRepo: InMemoryNewsArticleRepository;

  add(newsArticle: Pick<NewsArticle, 'title' | 'text'>): Promise<NewsArticle> {
    return this.inMemoryNewsArticleRepo.add(newsArticle);
  }
  modify(options: ModifyNewsArticleOptions): Promise<NewsArticle> {
    return this.inMemoryNewsArticleRepo.modify(options);
  }
  get(id: string): Promise<NewsArticle> {
    return this.inMemoryNewsArticleRepo.get(id);
  }
  list(): Promise<NewsArticle[]> {
    return this.inMemoryNewsArticleRepo.list();
  }
  
}