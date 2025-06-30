import { test, expect } from '@playwright/test';
import { AuthAPI, QuestionAPI } from '../helpers/api-helpers';
import { TQuestionCategory } from '../interface/question.model';
import { sizeTestCases } from '../test-data/testcase-data';

let token: string;

test.beforeAll(async ({ request }) => {
  token = await AuthAPI.getToken(request);
  expect(token).toBeTruthy();
});

test("Проверка структуры ответа категорий вопросов", async({request}) => {
  const questionsCategoryes = await QuestionAPI.getQuestionsCategorys(request, token);
  questionsCategoryes.forEach((category: TQuestionCategory) => {
    expect(category).toHaveProperty("id", expect.any(Number));
    expect(category).toHaveProperty("name", expect.any(String));
  });
});

// проверить название категорий

test("Получение элементов вопросов/ответов с корректным ID категории", async({request}) => {
  const questions = await QuestionAPI.getQuestionsByCategoryId(request, token, 1);
  expect(questions.size).toBe(50);
});

test("Проверка пагинации на дефолтные значения", async({request}) => {
  const questions = await QuestionAPI.getQuestionsByCategoryId(request, token, 1);
  expect(questions.size).toBe(50);
  expect(questions.page).toBe(1);
});

test.only("Проверка пагинации с пользовательскими значениями page и size", async({request}) => {
  const questions = await QuestionAPI.getQuestionsByCategoryIdWithParam(request, token, 1, 2, 20, 200);
  expect(questions.size).toBe(20);
  expect(questions.page).toBe(2);
});

sizeTestCases.forEach(({name, size, expected, status}) => {
  test.only(`Проверка границ параметра size: ${name}`, async({request}) => {
    const questions = await QuestionAPI.getQuestionsByCategoryIdWithParam(request, token, 1, 1, size, status);
    status === 200 ? expect(questions.size).toBe(expected.size) : expect(questions).toStrictEqual(expected)
  });
});


