import { createConnection } from "typeorm";
import { PostgresNewsArticle } from "./entities/PostgresNewsArticle";

createConnection({
  type: "postgres",
  host: process.env.TYPEORM_HOST,
  port: 5432,
  username: process.env.TYPEORM_USERNAME,
  password: process.env.TYPEORM_PASSWORD,
  database: process.env.TYPEORM_DATABASE,
  entities: [
    PostgresNewsArticle
  ],
  synchronize: true,
  logging: false
}).then(connection => {
  // here you can start to work with your entities
}).catch(error => console.log(error));

export * from './services';