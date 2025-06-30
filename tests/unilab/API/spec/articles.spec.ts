import { test, expect } from '@playwright/test';
import { AuthAPI, ArticleAPI } from '../helpers/api-helpers';
import { pageTestCases, sizeTestCases } from '../test-data/testcase-data';
import { BaseAPI } from '../helpers/base-api';

let token: string;
test.beforeAll(async ({ request }) => {
  token = await AuthAPI.getToken(request);
  expect(token).toBeTruthy();
});

test("Проверка структуры ответа на получение статей", async({request}) => {
  const articles = await ArticleAPI.getAllArticles(request, token);
  expect(articles).toHaveProperty("items", expect.any(Array));
  expect(articles).toHaveProperty("page", expect.any(Number));
  expect(articles).toHaveProperty("size", expect.any(Number));
  expect(articles).toHaveProperty("total", expect.any(Number));
  articles.items.forEach(element => {
    expect(element).toHaveProperty('id', expect.any(Number));
    expect(element).toHaveProperty('imageUrl', expect.any(String));
    expect(element).toHaveProperty('title', expect.any(String));
    expect(element).toHaveProperty('contentPreview', expect.any(String));
    expect(element).toHaveProperty('content', expect.any(String));
    expect(element).toHaveProperty('date', expect.any(String));
  });
});

test("Получение списка статей без параметров", async({request}) => {
  const articles = await ArticleAPI.getAllArticles(request, token);
  expect(articles.size).toBe(50);
});

test("Получение списка статей с параметрами", async({request}) => {
  const articles = await ArticleAPI.getArticlesWithParam(request, token, 2, 10, 200);
  expect(articles.size).toBe(10);
});

sizeTestCases.forEach(({name, size, expected, status}) => {
  test(`Проверка границ параметра size: ${name}`, async({request}) => {
    const articles = await ArticleAPI.getArticlesWithParam(request, token, 1, size, status);
    status === 200 ? expect(articles.size).toBe(expected.size) : expect(articles).toStrictEqual(expected)
  });
});

pageTestCases.forEach(({name, page, expected, status}) => {
	test(`Проверка границ параметра page: ${name}`, async({request}) => {
		const articles = await ArticleAPI.getArticlesWithParam(request, token, page, 50, status);
		expect(articles).toStrictEqual(expected);
	});
});

test("Проверка пагинации параметра page", async({request}) => {
  const page1 = await ArticleAPI.getArticlesWithParam(request, token, 1, 10, 200);
  await ArticleAPI.validatePaginationResponse(page1, 1, 10);

  const page2 = await ArticleAPI.getArticlesWithParam(request, token, 2, 10, 200);
  await BaseAPI.validatePaginationResponse(page2, 2, 10);

  // Проверяем, что статьи на страницах не повторяются
  const dublicateIds = await BaseAPI.checkForDuplicates(page1, page2)
  expect(dublicateIds).toHaveLength(0);
});

test("Валидация формата даты в ответе", async({request}) => {
  const articles = await ArticleAPI.getAllArticles(request, token);
  articles.items.forEach(article => {
    expect(article.date).toMatch(/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\+\d{2}:\d{2}/);
  });
});

test("Валидация формата изображений (imageUrl)", async({request}) => {
  const articles = await ArticleAPI.getAllArticles(request, token);
  articles.items.forEach(article => {
    expect(article.imageUrl).toMatch(/^images\/[^\/]+\.(jpg|jpeg|png|gif|bmp|webp)$/i);
  });
});