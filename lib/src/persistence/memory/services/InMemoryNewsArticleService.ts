import {Inject, Service} from 'typedi';
import { ModifyNewsArticleOptions, NewsArticle, NewsArticleService } from '../../../interfaces';
import { InMemoryNewsArticleRepository } from '../repositories';

@Service()
export class InMemoryNewsArticleService implements NewsArticleService {
  @Inject(() => InMemoryNewsArticleRepository)
  private readonly inMemoryNewsArticleRepo: InMemoryNewsArticleRepository;

  add(newsArticle: Pick<NewsArticle, 'title' | 'text'>): NewsArticle {
    return this.inMemoryNewsArticleRepo.add(newsArticle);
  }
  modify(options: ModifyNewsArticleOptions): NewsArticle {
    return this.inMemoryNewsArticleRepo.modify(options);
  }
  get(id: string): NewsArticle {
    return this.inMemoryNewsArticleRepo.get(id);
  }
  list(): NewsArticle[] {
    return this.inMemoryNewsArticleRepo.list();
  }
  
}