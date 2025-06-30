import { APIRequestContext, expect } from '@playwright/test';
import { BaseAPI } from './base-api';
import { Data } from '../interface/data.model';
import { City } from '../interface/city.model';
import { TArticle, TArticleItem } from '../interface/article.model';
import 'dotenv/config'
import { TQuestionData, TQuestionCategory } from '../interface/question.model';

const BASE_URL = process.env['URL'];

export class AuthAPI {
  static async getToken(request: APIRequestContext): Promise<string> {
    const response = await request.post(`${BASE_URL}/users/authByEmail`, {
      data: {
        email: process.env['EMAIL'],
        password: process.env['PASSWORD'],
        app_id: process.env['APP_ID']
      }
    });
    expect(response.status()).toBe(200);
    return(await response.json()).access_token;
  }
}

export class CitiesAPI extends BaseAPI{
  static async getAllCities(request: APIRequestContext, token: string): Promise<City> {
    const response = await request.get(`${BASE_URL}/dictionaries/cities`, {
      headers: this.getHeaders(token)
    });
    expect(response.status()).toBe(200);
    return response.json();
  };
};

export class ArticleAPI extends BaseAPI {
  static async getAllArticles(request: APIRequestContext, token: string): Promise<TArticle> {
    const response = await request.get(`${BASE_URL}/dictionaries/articles`, {
      headers: this.getHeaders(token)
    });
    expect(response.status()).toBe(200);
    return response.json();
  };
  static async getArticlesWithParam(request: APIRequestContext, token: string, page: string | number, size: string | number, status: number): Promise<TArticle> {
    const response = await request.get(`${BASE_URL}/dictionaries/articles?page=${page}&size=${size}`, {
      headers: this.getHeaders(token)
    });
    expect(response.status()).toBe(status);
    return response.json();
  };
  static async getArticle(request: APIRequestContext, token: string, id: number | string, status:number): Promise<TArticleItem> {
    const response = await request.get(`${BASE_URL}/dictionaries/articles/${id}`, {
      headers: this.getHeaders(token)
    });
    expect(response.status()).toBe(status);
    return response.json();
  };
};

export class QuestionAPI extends BaseAPI {
  static async getQuestionsCategorys(request: APIRequestContext, token: string): Promise<TQuestionCategory[]> {
    const response = await request.get(`${BASE_URL}/dictionaries/questionsCategorys`, {
      headers: this.getHeaders(token)
    });
    expect(response.status()).toBe(200);
    return response.json();
  };
  static async getQuestionsByCategoryId(request: APIRequestContext, token: string, id: number | string): Promise<TQuestionData> {
    const response = await request.get(`${BASE_URL}/dictionaries/questionsByCategory/${id}`, {
      headers: this.getHeaders(token)
    });
    expect(response.status()).toBe(200);
    return response.json();
  };
  static async getQuestionsByCategoryIdWithParam(request: APIRequestContext, token: string, id: number | string, page: number | string, size: number | string, status: number): Promise<TQuestionData> {
    const response = await request.get(`${BASE_URL}/dictionaries/questionsByCategory/${id}?page=${page}&size=${size}`, {
      headers: this.getHeaders(token)
    });
    expect(response.status()).toBe(status);
    return response.json();
  };
  static async getAllQuestions(request: APIRequestContext, token: string): Promise<TQuestionData> {
    const response = await request.get(`${BASE_URL}/dictionaries/questions`, {
      headers: this.getHeaders(token)
    });
    expect(response.status()).toBe(200);
    return response.json();
  };
  static async getQuestionsWithParam(request: APIRequestContext, token: string, page: string | number, size: string | number, status: number): Promise<TQuestionData> {
    const response = await request.get(`${BASE_URL}/dictionaries/questions?page=${page}&size=${size}`, {
      headers: this.getHeaders(token)
    });
    expect(response.status()).toBe(status);
    return response.json();
  };
};

export class RegistrationAPI extends BaseAPI {
  static async registerByEmail(request: APIRequestContext, token: string, data: {data: Partial<Data>}) {
    return request.post(`${BASE_URL}/users/registerByEmail`, {
      headers: this.getHeaders(token),
      ...data
    });
  };
};
