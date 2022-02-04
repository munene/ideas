# Ideas App

This is a simple API used to return, add and modify news articles. It's written in Typescript and uses `NodeJS `and `Koa Server` to run. There are unit tests set up all around using `jest`

The project is setup of two modules, a lib and an api module. To run this app run `yarn` in both modules and `yarn build` in the lib module. The lib module is a dependency of the api module.

The library supports persistence using an in memory db or postgres. Currently, it's setup to run using postgres by default but that can be switched by changing what the `getNewsArticleService` function returns.

To use the postgres db, add a `.env` file in the root of the api module with the following content:

```
TYPEORM_HOST=localhost

TYPEORM_USERNAME=test

TYPEORM_PASSWORD=test

TYPEORM_DATABASE=test

TYPEORM_PORT=5432
```
Then on the lib module, run `yarn db:create && db:start` to create and run the database server. The lib is currently setup to generate the database based on the module, so no further action is required on the database side.

Afterwards, run `yarn start` on the api module to run the API.

The API endpoint documentation can be found in the `api` directory
