import sinon from "sinon";
import { NotFoundError } from "../..";
import { PostgresNewsArticle } from "../entities";
import { PostgresNewsArticleRepository } from "../repositories";
import { PostgresNewsArticleService } from "./PostgresNewsArticleService";

const sandbox = sinon.createSandbox();

describe('PostgresNewsArticleService', () => {
  const repo = sandbox.createStubInstance(PostgresNewsArticleRepository);
  let service: PostgresNewsArticleService;

  beforeAll(() => {
    service = Object.assign(new PostgresNewsArticleService(), {repo});
  });

  beforeEach(() => {
    sandbox.reset();
  });

  afterAll(() => {
    sandbox.restore();
  });

  describe('add', () => {
    it('should return a news article', async () => {
      const newsArticle = Object.assign(new PostgresNewsArticle(), {
        id: 'MOCK_ID',
        creation_date: new Date(),
        title: 'MOCK_TITLE',
        text: 'MOCK_TEXT',
      });
  
      repo.save.resolves(newsArticle);
      const result = await service.add({title: 'MOCK'});
      expect(result).toEqual(newsArticle);
      expect(repo.save.callCount).toBe(1);
    });
  });

  describe('modify', () => {
    it('should throw NotFoundError if the news article does not exist', async () => {
      repo.update.rejects(new NotFoundError());
      await expect(() => service.modify({id: 'MOCK_ID', newsArticle: {title: 'MOCK'}})).rejects.toThrowError(NotFoundError);
    });

    it('should call the repo to modify the news article and return the modified news article', async () => {
      const newsArticle = Object.assign(new PostgresNewsArticle(), {
        id: 'MOCK_ID',
        creation_date: new Date(),
        title: 'MOCK_TITLE',
        text: 'MOCK_TEXT',
      });
  
      repo.update.resolves();
      const newsArticleGetSpy = jest.spyOn(service, 'get').mockResolvedValueOnce(newsArticle)
      const result = await service.modify({id: 'MOCK_ID', newsArticle: {title: 'MOCK'}});
      expect(result).toEqual(newsArticle);
      expect(repo.update.callCount).toBe(1);
      expect(newsArticleGetSpy).toBeCalledTimes(1);
      expect(newsArticleGetSpy).toBeCalledWith('MOCK_ID');
    });
  });

  describe('get', () => {
    it('should throw NotFoundError if the news article does not exist', async () => {
      repo.findOne.resolves(undefined);
      await expect(() => service.get('MOCK_ID')).rejects.toThrowError(NotFoundError);
    });

    it('should return the news article', async () => {
      const newsArticle = Object.assign(new PostgresNewsArticle(), {
        id: 'MOCK_ID',
        creation_date: new Date(),
        title: 'MOCK_TITLE',
        text: 'MOCK_TEXT',
      });
  
      repo.findOne.resolves(newsArticle);
      const result = await service.get('MOCK_ID');
      expect(result).toEqual(newsArticle);
      expect(repo.findOne.callCount).toBe(1);
    });
  });

  describe('list', () => {
    it('should return a list of news articles', async () => {
      const newsArticleList = [
        Object.assign(new PostgresNewsArticle(), {
          id: 'MOCK_ID',
          creation_date: new Date(),
          title: 'MOCK_TITLE',
          text: 'MOCK_TEXT',
        }),
        Object.assign(new PostgresNewsArticle(), {
          id: 'MOCK_ID_2',
          creation_date: new Date(),
          title: 'MOCK_TITLE_2',
          text: 'MOCK_TEXT_2',
        }),
        Object.assign(new PostgresNewsArticle(), {
          id: 'MOCK_ID_3',
          creation_date: new Date(),
          title: 'MOCK_TITLE_3',
          text: 'MOCK_TEXT_3',
        }),
      ];
  
      repo.find.resolves(newsArticleList);
      const result = await service.list();
      expect(result).toEqual(newsArticleList);
      expect(repo.find.callCount).toBe(1);
    });
  });
});