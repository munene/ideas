import { NewsArticle } from "../models";

export interface ModifyNewsArticleOptions {
  id: string;
  newsArticle: Pick<NewsArticle, 'title' | 'text'>;
}

export interface NewsArticleService {
  add(newsArticle: Pick<NewsArticle, 'title' | 'text'>): NewsArticle;
  modify(options: ModifyNewsArticleOptions): NewsArticle;
  get(id: string): NewsArticle;
  list(): NewsArticle[];
}