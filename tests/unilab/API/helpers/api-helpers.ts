import { APIRequestContext, expect } from '@playwright/test';
import { BaseAPI } from './base-api';
import 'dotenv/config'
import { fakerRU as faker } from '@faker-js/faker';

const BASE_URL = process.env.URL;

export class AuthAPI {
  static async getToken(request: APIRequestContext) {
    const response = await request.post(`${BASE_URL}/users/authByEmail`, {
      data: {
        email: process.env.EMAIL,
        password: process.env.PASSWORD,
        app_id: process.env.APP_ID
      }
    });
    expect(response.status()).toBe(200);
    return(await response.json()).access_token;
  }
}

export class CitiesAPI extends BaseAPI{
  static async getAllCities(request: APIRequestContext, token: string) {
    return request.get(`${BASE_URL}/dictionaries/cities`, {
      headers: this.getHeaders(token)
    });
  };
};

export class RegistrationAPI extends BaseAPI {
  static async registerByEmail(request: APIRequestContext, token: string, data: Record<string, any>) {
    return request.post(`${BASE_URL}/users/registerByEmail`, {
      headers: this.getHeaders(token),
      ...data
    });
  };
};

