import Container from "typedi";
import { NewsArticleService } from "../interfaces";
import { InMemoryNewsArticleService } from "./memory";

export function getNewsArticleService(): NewsArticleService {
  return Container.get(InMemoryNewsArticleService);
}