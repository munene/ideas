import sinon from "sinon";
import { NewsArticle, PersistenceModule } from "@ideas/lib";
import { NewsArticleHandler } from "./NewsArticleHandler";
import { NewsArticleController } from "./NewsArticleController";

const sandbox = sinon.createSandbox();

describe('NewsArticleController', () => {
  const handler = sandbox.createStubInstance(NewsArticleHandler);
  let controller: NewsArticleController;

  beforeAll(() => {
    controller = Object.assign(new NewsArticleController(), {service: handler});
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
  
      handler.add.resolves(newsArticle);
      const result = await controller.add({title: 'MOCK'});
      expect(result).toEqual(newsArticle);
      expect(handler.add.callCount).toBe(1);
    });
  });

  describe('modify', () => {
    it('should throw NotFoundError if the news article does not exist', async () => {
      handler.modify.rejects(new PersistenceModule.NotFoundError());
      await expect(() => controller.modify('MOCK_ID', {title: 'MOCK'})).rejects.toThrowError(PersistenceModule.NotFoundError);
    });

    it('should call the repo to modify the news article and return the modified news article', async () => {
      const newsArticle = Object.assign(new NewsArticle(), {
        id: 'MOCK_ID',
        creation_date: new Date(),
        title: 'MOCK_TITLE',
        text: 'MOCK_TEXT',
      });
  
      handler.modify.resolves(newsArticle);
      const result = await controller.modify('MOCK_ID', {title: 'MOCK'});
      expect(result).toEqual(newsArticle);
      expect(handler.modify.callCount).toBe(1);
    });
  });

  describe('get', () => {
    it('should throw NotFoundError if the news article does not exist', async () => {
      handler.get.rejects(new PersistenceModule.NotFoundError());
      await expect(() => controller.get('MOCK_ID')).rejects.toThrowError(PersistenceModule.NotFoundError);
    });

    it('should return the news article', async () => {
      const newsArticle = Object.assign(new NewsArticle(), {
        id: 'MOCK_ID',
        creation_date: new Date(),
        title: 'MOCK_TITLE',
        text: 'MOCK_TEXT',
      });
  
      handler.get.resolves(newsArticle);
      const result = await controller.get('MOCK_ID');
      expect(result).toEqual(newsArticle);
      expect(handler.get.callCount).toBe(1);
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
  
      handler.list.resolves(newsArticleList);
      const result = await controller.list();
      expect(result).toEqual(newsArticleList);
      expect(handler.list.callCount).toBe(1);
    });
  });
});