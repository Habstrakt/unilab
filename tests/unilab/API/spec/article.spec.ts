import { test, expect } from '@playwright/test';
import { AuthAPI, ArticleAPI } from '../helpers/api-helpers';
import { TArticle, TArticleItem } from '../interface/article.model';
import { articleIds } from '../test-data/testcase-data';

let token: string;
let firstArticleId: number | string;
test.beforeAll(async ({ request }) => {
  token = await AuthAPI.getToken(request);
  const articles = await ArticleAPI.getAllArticles(request, token) as TArticle;
  firstArticleId = articles.items[0]!.id;
  expect(token).toBeTruthy();
});


test("Проверка структуры ответа статьи по ID", async({request}) => {
  const article = await ArticleAPI.getArticle(request, token, firstArticleId, 200) as TArticleItem;
  expect(article.id).toBe(firstArticleId);
  expect(article).toHaveProperty("id", expect.any(Number));
  expect(article).toHaveProperty("imageUrl", expect.any(String));
  expect(article).toHaveProperty("title", expect.any(String));
  expect(article).toHaveProperty("content", expect.any(String));
  expect(article).toHaveProperty("date", expect.any(String));
});


//проверка границ ID статьи
articleIds.forEach(({name, id, expected, status, useDynamicId}) => {
  test(`${name}`, async({request}) => {
    const actualId = useDynamicId ? firstArticleId : id;
    const article = await ArticleAPI.getArticle(request, token, actualId!, status);
    if(status === 200) {
      expect(article).toHaveProperty("id");
      expect(article).toHaveProperty("title");
      expect(article).toHaveProperty("content");
    } else {
      expect(article).toStrictEqual(expected);
    };
  })
});


