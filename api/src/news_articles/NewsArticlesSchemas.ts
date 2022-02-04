import { NewsArticle, Relevance } from "@ideas/lib";
import { Expose } from "class-transformer";
import { IsEnum, IsOptional, IsString, MinLength } from "class-validator";

/**
 * Payload used in the modify news article endpoint
 *
 * @export
 * @class ModifyNewsArticleRequest
 */
export class ModifyNewsArticleRequest {
  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  text?: string;
}

/**
 * Payload used in the add news article endpoint
 *
 * @export
 * @class AddNewsArticleRequest
 */
export class AddNewsArticleRequest {
  @IsString()
  @MinLength(1)
  title: string;

  @IsString()
  @IsOptional()
  text?: string;
}

export class NewsArticleResponse {
  @Expose()
  id: string;

  @Expose()
  title: string;

  @Expose()
  text: string;

  @Expose()
  creation_date: Date;

  @Expose()
  relevance: Relevance;
  
  static from(data:NewsArticle): NewsArticleResponse {
    return Object.assign(new NewsArticleResponse(), {
      id: data.id,
      title: data.title,
      text: data.text,
      creation_date: data.creation_date,
      relevance: data.relevance,
    });
  }
}