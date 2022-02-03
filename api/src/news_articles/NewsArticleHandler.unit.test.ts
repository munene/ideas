import sinon from "sinon";
import {InMemoryNewsArticleService} from "@ideas/lib/dist/persistence/memory/services";
import { NewsArticle, PersistenceModule } from "@ideas/lib";
import { NewsArticleHandler } from "./NewsArticleHandler";

const sandbox = sinon.createSandbox();

describe('NewsArticleHandler', () => {
  const newsArticleService = sandbox.createStubInstance(InMemoryNewsArticleService);
  let handler: NewsArticleHandler;

  beforeAll(() => {
    handler = Object.assign(new NewsArticleHandler(), {_newsArticleService: newsArticleService});
  });

  beforeEach(() => {
    sandbox.reset();
  });

  describe('add', () => {
    it('should return a news article', async () => {
      const newsArticle = Object.assign(new NewsArticle(), {
        id: 'MOCK_ID',
        creation_date: new Date(),
        title: 'MOCK_TITLE',
        text: 'MOCK_TEXT',
      });
  
      newsArticleService.add.resolves(newsArticle);
      const result = await handler.add({title: 'MOCK'});
      expect(result).toEqual(newsArticle);
      expect(newsArticleService.add.callCount).toBe(1);
    });
  });

  describe('modify', () => {
    it('should throw NotFoundError if the news article does not exist', async () => {
      newsArticleService.modify.rejects(new PersistenceModule.NotFoundError());
      await expect(() => handler.modify('MOCK_ID', {title: 'MOCK'})).rejects.toThrowError(PersistenceModule.NotFoundError);
    });

    it('should call the repo to modify the news article and return the modified news article', async () => {
      const newsArticle = Object.assign(new NewsArticle(), {
        id: 'MOCK_ID',
        creation_date: new Date(),
        title: 'MOCK_TITLE',
        text: 'MOCK_TEXT',
      });
  
      newsArticleService.modify.resolves(newsArticle);
      const result = await handler.modify('MOCK_ID', {title: 'MOCK'});
      expect(result).toEqual(newsArticle);
      expect(newsArticleService.modify.callCount).toBe(1);
    });
  });

  describe('get', () => {
    it('should throw NotFoundError if the news article does not exist', async () => {
      newsArticleService.get.rejects(new PersistenceModule.NotFoundError());
      await expect(() => handler.get('MOCK_ID')).rejects.toThrowError(PersistenceModule.NotFoundError);
    });

    it('should return the news article', async () => {
      const newsArticle = Object.assign(new NewsArticle(), {
        id: 'MOCK_ID',
        creation_date: new Date(),
        title: 'MOCK_TITLE',
        text: 'MOCK_TEXT',
      });
  
      newsArticleService.get.resolves(newsArticle);
      const result = await handler.get('MOCK_ID');
      expect(result).toEqual(newsArticle);
      expect(newsArticleService.get.callCount).toBe(1);
    });
  });

  describe('list', () => {
    it('should return a list of news articles', async () => {
      const newsArticleList = [
        Object.assign(new NewsArticle(), {
          id: 'MOCK_ID',
          creation_date: new Date(),
          title: 'MOCK_TITLE',
          text: 'MOCK_TEXT',
        }),
        Object.assign(new NewsArticle(), {
          id: 'MOCK_ID_2',
          creation_date: new Date(),
          title: 'MOCK_TITLE_2',
          text: 'MOCK_TEXT_2',
        }),
        Object.assign(new NewsArticle(), {
          id: 'MOCK_ID_3',
          creation_date: new Date(),
          title: 'MOCK_TITLE_3',
          text: 'MOCK_TEXT_3',
        }),
      ];
  
      newsArticleService.list.resolves(newsArticleList);
      const result = await handler.list();
      expect(result).toEqual(newsArticleList);
      expect(newsArticleService.list.callCount).toBe(1);
    });
  });
});