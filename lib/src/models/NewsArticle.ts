import { Relevance } from "../enums";

export class NewsArticle {
  id?: string;
  title: string;
  text?: string;
  creation_date: Date;
  get relevance(): Relevance {
    const numberOfPeriods = this.text?.match(/\./g)?.length || 0;
    const numberOfExclamationMarks = this.text?.match(/\!/g)?.length || 0;
    const numberOfCommas = this.text?.match(/\,/g)?.length || 0;
    
    return numberOfExclamationMarks > numberOfPeriods && Math.abs(new Date().getTime() - this.creation_date.getTime()) <= 60000 ? Relevance.HOT : 
      numberOfCommas > numberOfPeriods && Math.abs(new Date().getTime() - this.creation_date.getTime()) <= 300000 ? Relevance.BORING :
      Relevance.STANDARD;
  }
}