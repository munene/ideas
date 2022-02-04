import { NewsArticle } from "../../..";
import { NotFoundError } from "../../errors";
import { InMemoryNewsArticleRepository } from "./InMemoryNewsArticleRepository";

describe('InMemoryNewsArticleRepository', () => {
  let repo: InMemoryNewsArticleRepository;

  beforeAll(() => {
    repo = new InMemoryNewsArticleRepository();
    expect(repo['newsArticles']).toEqual([]);
  });

  beforeEach(() => {
    repo['newsArticles'] = [];
    jest.restoreAllMocks();

    repo['newsArticles'] = [
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
  });

  describe('add', () => {
    it.each`
    args
    ${{title: 'MOCK'}}
    ${{title: 'MOCK', text: 'MOCK_TEXT'}}
    `('should add a news article in the newsArticles array and append an id and creation date', async ({args}) => {
      const newsArticle = await repo.add(args);
      expect(newsArticle).toEqual({
        id: expect.any(String),
        creation_date: expect.any(Date),
        ...args
      });
    });
  });

  describe('modify', () => {
    it('should return a NotFoundError when the news article does not exist', async () => {
      const getSpy = jest.spyOn(repo, 'get');

      await expect(() => repo.modify({id: 'NONE_EXISTING', newsArticle: {title: 'MOCK_TEXT_FAILING'}})).rejects.toThrowError(NotFoundError);
      expect(getSpy).toBeCalledTimes(1);
      expect(getSpy).toBeCalledWith('NONE_EXISTING');
    });

    it.each`
    description | args | expected
    ${'title'} | ${{title: 'MOCK_TEXT_WORKING'}} | ${{title: 'MOCK_TEXT_WORKING', text: 'MOCK_TEXT_2'}}
    ${'title and text'} | ${{title: 'MOCK_TITLE_WORKING', text: 'MOCK_TEXT_WORKING'}} | ${{title: 'MOCK_TITLE_WORKING', text: 'MOCK_TEXT_WORKING'}}
    `('should modify the news article $description and return the modified news article', async ({args, expected}) => {
      const getSpy = jest.spyOn(repo, 'get');

      const newsArticle = await repo.modify({id: 'MOCK_ID_2', newsArticle: args});

      expect(newsArticle).toEqual(
        {
          id: 'MOCK_ID_2',
          creation_date: repo['newsArticles'][1].creation_date,
          ...expected,
        }
      );
      expect(repo['newsArticles'][1]).toEqual(
        {
          id: 'MOCK_ID_2',
          creation_date: repo['newsArticles'][1].creation_date,
          ...expected,
        }
      );
      expect(getSpy).toBeCalledTimes(1);
      expect(getSpy).toBeCalledWith('MOCK_ID_2');
    });
  });

  describe('get', () => {
    it('should throw a NotFoundError if the news article is not found', async () => {
      await expect(() => repo.get('NONE_EXISTING')).rejects.toThrowError(NotFoundError);
    });

    it('should return a news article', async () => {
      const newsArticle = await repo.get('MOCK_ID_2');
      expect(newsArticle).toEqual({
        id: 'MOCK_ID_2',
        creation_date: repo['newsArticles'][1].creation_date,
        title: 'MOCK_TITLE_2',
        text: 'MOCK_TEXT_2',
      });
    });
  });

  describe('list', () => {
    it('should return the list of news articles', async () => {
      await expect(repo.list()).resolves.toEqual(repo['newsArticles']);
    });
  });
});
