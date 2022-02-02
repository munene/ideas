import sinon from "sinon";
import { NotFoundError } from "../..";
import { NewsArticle } from "../../..";
import { InMemoryNewsArticleRepository } from "../repositories";
import { InMemoryNewsArticleService } from "./InMemoryNewsArticleService";

const sandbox = sinon.createSandbox();

describe('InMemoryNewsArticleService', () => {
  const repo = sandbox.createStubInstance(InMemoryNewsArticleRepository);
  let service: InMemoryNewsArticleService;

  beforeAll(() => {
    service = Object.assign(new InMemoryNewsArticleService(), {inMemoryNewsArticleRepo: repo});
  });

  beforeEach(() => {
    sandbox.reset();
  });

  describe('add', () => {
    it('should return a news article', () => {
      const newsArticle = Object.assign(new NewsArticle(), {
        id: 'MOCK_ID',
        creation_date: new Date(),
        title: 'MOCK_TITLE',
        text: 'MOCK_TEXT',
      });
  
      repo.add.returns(newsArticle);
      const result = repo.add({title: 'MOCK'});
      expect(result).toEqual(newsArticle);
      expect(repo.add.callCount).toBe(1);
    });
  });

  describe('modify', () => {
    it('should throw NotFoundError if the news article does not exist', () => {
      repo.modify.throws(new NotFoundError());
      expect(() => service.modify({id: 'MOCK_ID', newsArticle: {title: 'MOCK'}})).toThrowError(NotFoundError);
    });

    it('should call the repo to modify the news article and return the modified news article', () => {
      const newsArticle = Object.assign(new NewsArticle(), {
        id: 'MOCK_ID',
        creation_date: new Date(),
        title: 'MOCK_TITLE',
        text: 'MOCK_TEXT',
      });
  
      repo.modify.returns(newsArticle);
      const result = repo.modify({id: 'MOCK_ID', newsArticle: {title: 'MOCK'}});
      expect(result).toEqual(newsArticle);
      expect(repo.modify.callCount).toBe(1);
    });
  });

  describe('get', () => {
    it('should throw NotFoundError if the news article does not exist', () => {
      repo.get.throws(new NotFoundError());
      expect(() => service.get('MOCK_ID')).toThrowError(NotFoundError);
    });

    it('should return the news article', () => {
      const newsArticle = Object.assign(new NewsArticle(), {
        id: 'MOCK_ID',
        creation_date: new Date(),
        title: 'MOCK_TITLE',
        text: 'MOCK_TEXT',
      });
  
      repo.get.returns(newsArticle);
      const result = repo.get('MOCK_ID');
      expect(result).toEqual(newsArticle);
      expect(repo.get.callCount).toBe(1);
    });
  });

  describe('list', () => {
    it('should return a list of news articles', () => {
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
  
      repo.list.returns(newsArticleList);
      const result = repo.list();
      expect(result).toEqual(newsArticleList);
      expect(repo.list.callCount).toBe(1);
    });
  });
});