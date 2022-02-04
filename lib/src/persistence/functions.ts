import Container from "typedi";
import { NewsArticleService } from "../interfaces";
import { PostgresNewsArticleService } from "./postgres";

export function getNewsArticleService(): NewsArticleService {
  return Container.get(PostgresNewsArticleService);
}