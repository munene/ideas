import {createKoaServer} from 'routing-controllers';
import { NewsArticleController } from './controllers';

const app = createKoaServer({
  controllers: [
    NewsArticleController
  ]
})

const port = 8080;
console.log(`Starting server on port: ${port}`);

app.listen(port, () => {
  console.log(`Started server on port: ${port}`);
});