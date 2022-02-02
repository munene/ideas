import { NewsArticleService } from "../interfaces";
import { InMemoryNewsArticleService } from "./memory";

export function getNewsArticleService(): NewsArticleService {
  return new InMemoryNewsArticleService();
}