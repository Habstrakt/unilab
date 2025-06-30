import { test, expect } from '@playwright/test';
import { AuthAPI, QuestionAPI } from '../helpers/api-helpers';
import { pageTestCases, sizeTestCases } from '../test-data/testcase-data';

let token: string;

test.beforeAll(async ({request}) => {
  token = await AuthAPI.getToken(request);
  expect(token).toBeTruthy();
});

test("Получение списка вопросов/ответов бесплатных консультаций без параметров", async({request}) => {
  const questions = await QuestionAPI.getAllQuestions(request, token);
  expect(questions.size).toBe(50)
});

test("Проверка структуры ответа на получение списка вопросов/ответов бесплатных консультаций", async({request}) => {
  const questions = await QuestionAPI.getAllQuestions(request, token);
  expect(questions).toHaveProperty("items", expect.any(Array));
  expect(questions).toHaveProperty("total", expect.any(Number));
  expect(questions).toHaveProperty("page", expect.any(Number));
  expect(questions).toHaveProperty("size", expect.any(Number));
  expect(questions).toHaveProperty("pages", expect.any(Number));
  questions.items.forEach(question => {
    expect(question).toHaveProperty("id", expect.any(Number));
    expect(question).toHaveProperty("categoryId", expect.any(Number));
    expect(question).toHaveProperty("createdAt", expect.any(String));
    expect(question).toHaveProperty("fullName", expect.any(String));
    expect(question).toHaveProperty("content", expect.any(String));
    expect(question).toHaveProperty("cityName", expect.any(String));
    expect(question).toHaveProperty("answeredAt", expect.any(String));
    expect(question).toHaveProperty("answerContent", expect.any(String));
    expect(question.specialist).toHaveProperty("fullName", expect.any(String));
    expect(question.specialist).toHaveProperty("avatarUrl", expect.any(String));
    expect(question.specialist).toHaveProperty("female", expect.any(Boolean));
    expect(question.specialist).toHaveProperty("gender", expect.any(String));
  });
});

test("Получение списка вопросов/ответов бесплатных консультаций с параметрами", async({request}) => {
  const questions = await QuestionAPI.getQuestionsWithParam(request, token, 1, 10, 200);
  expect(questions.size).toBe(10);
});

sizeTestCases.forEach(({name, size, expected, status}) => {
  test(`Проверка границ параметра size: ${name}`, async({request}) => {
    const questions = await QuestionAPI.getQuestionsWithParam(request, token, 1, size, status);
    status === 200 ? expect(questions.size).toBe(expected.size) : expect(questions).toStrictEqual(expected);
  });
});

pageTestCases.forEach(({name, page, expected, status}) => {
  test(`Проверка границ параметра page: ${name}`, async({request}) => {
    const questions = await QuestionAPI.getQuestionsWithParam(request, token, page, 50, status);
    expect(questions).toStrictEqual(expected);
  });
});

test("Валидация формата изображений (imageUrl)", async({request}) => {
  const questions = await QuestionAPI.getQuestionsWithParam(request, token, 1, 1, 200);
  questions.items.forEach(question => {
    expect(question.specialist.avatarUrl).toMatch(/^images\/[^\/]+\.(jpg|jpeg|png|gif|bmp|webp)$/i);
  });
});
