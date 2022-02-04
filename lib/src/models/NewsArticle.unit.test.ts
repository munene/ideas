import { NewsArticle } from ".";
import { Relevance } from "..";
import moment from "moment";

describe('NewsArticle', () => {
  describe('from', () => {
    it('should return HOT when the text contains more exclamation marks than full stops and was created less than a minute ago', () => {
      expect(Object.assign(new NewsArticle(), {
        id: 'MOCK_ID',
        title: 'MOCK_TITLE',
        text: '..!!!!!. test test',
        creation_date: new Date(),
      }).relevance).toBe(Relevance.HOT);
    });

    it('should return BORING when the text contains more commas than fullstops and more full stops than exclamation marks and was created less than 5 mins ago', () => {
      expect(Object.assign(new NewsArticle(), {
        id: 'MOCK_ID',
        title: 'MOCK_TITLE',
        text: '..!z,,,,. test test',
        creation_date: moment().add(-2, 'minutes').toDate(),
      }).relevance).toBe(Relevance.BORING);
    });

    it('should return STANDARD when the text has more periods than exclamation marks or commas', () => {
      expect(Object.assign(new NewsArticle(), {
        id: 'MOCK_ID',
        title: 'MOCK_TITLE',
        text: '...,,!. test test',
        creation_date: moment().add(-2, 'minutes').toDate(),
      }).relevance).toBe(Relevance.STANDARD);
    });

    it('should return STANDARD when the news article was created more than 5 minutes ago', () => {
      expect(Object.assign(new NewsArticle(), {
        id: 'MOCK_ID',
        title: 'MOCK_TITLE',
        text: '..!z,,,. test test',
        creation_date: moment().add(-6, 'minutes').toDate(),
      }).relevance).toBe(Relevance.STANDARD);
    });
  });
})