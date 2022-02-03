import { NewsArticle } from "../models";

export interface ModifyNewsArticleOptions {
  id: string;
  newsArticle: Pick<NewsArticle, 'title' | 'text'>;
}

export interface NewsArticleService {
  add(newsArticle: Pick<NewsArticle, 'title' | 'text'>): Promise<NewsArticle>;
  modify(options: ModifyNewsArticleOptions): Promise<NewsArticle>;
  get(id: string): Promise<NewsArticle>;
  list(): Promise<NewsArticle[]>;
}