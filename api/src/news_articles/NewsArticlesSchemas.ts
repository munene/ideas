import { NewsArticle } from "@ideas/lib";
import { IsOptional, IsString, MinLength } from "class-validator";
import Container from "typedi";

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
