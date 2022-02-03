import { Service } from "typedi";
import {EntityRepository, Repository} from "typeorm"
import { PostgresNewsArticle } from "../entities";

@Service()
@EntityRepository(PostgresNewsArticle)
export class PostgresNewsArticleRepository extends Repository<PostgresNewsArticle>{}