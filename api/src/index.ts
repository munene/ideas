
import 'reflect-metadata';
import 'dotenv/config';

import {createKoaServer, useContainer} from 'routing-controllers';
import Container from 'typedi';
import { NewsArticleController } from './controllers';

useContainer(Container);

const app = createKoaServer({
  cors: true,
  classTransformer: true,
  validation: {validationError: {target: false, value: false}},
  plainToClassTransformOptions: {
    strategy: 'exposeAll',
    excludeExtraneousValues: false,
  },
  classToPlainTransformOptions: {
    strategy: 'exposeAll',
    excludeExtraneousValues: true,
  },
  defaultErrorHandler: false,
  controllers: [
    NewsArticleController
  ],
  routePrefix: 'v1',
})

const port = 8080;
console.log(`Starting server on port: ${port}`);

app.listen(port, () => {
  console.log(`Started server on port: ${port}`);
});