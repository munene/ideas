import { NewsArticle } from "../../..";
import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";
import { IsDateString, IsOptional, IsString } from "class-validator";

@Entity()
export class PostgresNewsArticle extends NewsArticle {
  @PrimaryGeneratedColumn('uuid')
  @IsString()
  id: string;

  @Column()
  @IsString()
  title: string;

  @Column()
  @IsString()
  @IsOptional()
  text?: string;

  @Column({default: new Date()})
  @IsDateString()
  creation_date: Date;
}