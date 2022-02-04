import { NewsArticle } from "../../..";
import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";
import { IsDateString, IsOptional, IsString } from "class-validator";
import { Expose } from "class-transformer";

@Entity()
export class PostgresNewsArticle extends NewsArticle {
  @PrimaryGeneratedColumn('uuid')
  @IsString()
  @Expose()
  id: string;

  @Column()
  @IsString()
  @Expose()
  title: string;

  @Column({nullable: true})
  @IsString()
  @IsOptional()
  @Expose()
  text?: string;

  @Column({default: new Date()})
  @IsDateString()
  @Expose()
  creation_date: Date;
}