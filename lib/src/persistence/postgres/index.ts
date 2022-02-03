import { createConnection } from "typeorm";
import { PostgresNewsArticle } from "./entities/PostgresNewsArticle";

createConnection({
  type: "postgres",
  entities: [
    PostgresNewsArticle
  ],
  synchronize: true,
  logging: false
}).then(connection => {
  // here you can start to work with your entities
}).catch(error => console.log(error));