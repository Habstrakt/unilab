import { expect } from '@playwright/test';
import { TArticle } from '../interface/article.model';
import { TQuestionData } from '../interface/question.model';
export class BaseAPI {
  protected static getHeaders(token: string) {
    return {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    };
  };

  static async validatePaginationResponse(response: TArticle | TQuestionData, expectedPage: number, expectedSize: number) {
    expect(response.items).toHaveLength(expectedSize);
    expect(response.page).toBe(expectedPage);
    expect(response.size).toBe(expectedSize);
  };

  static async checkForDuplicates(page1: TArticle, page2: TArticle) {
    const page1Ids = page1.items.map(item => item.id);
    const page2Ids = page2.items.map(item => item.id);
    return page1Ids.filter(id => page2Ids.includes(id));
  };
}