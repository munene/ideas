import Koa from 'koa';

const app = new Koa();

app.use(async ctx => {
  ctx.body = 'Ideas';
});

const port = 8080;
console.log(`Starting server on port: ${port}`);

app.listen(port, () => {
  console.log(`Started server on port: ${port}`);
});