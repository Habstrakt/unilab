import { test, expect } from '@playwright/test';
import { AuthAPI, RegistrationAPI } from './helpers/api-helpers';
import { fakerRU as faker } from '@faker-js/faker';

let token: string;

test.beforeAll(async ({ request }) => {
  token = await AuthAPI.getToken(request);
});

test("Проверка регистрации по Email (создание аккаунта)", async({request}) => {
  const response = await RegistrationAPI.registerByEmail(request, token, {
    data: {
    email: faker.internet.email(),
    password: faker.internet.password(),
    is_dev: false,
    appId: "playwright-framework"
  }});
  await expect(response).toBeOK();
  expect(response.status()).toBe(201);
  expect(await response.json()).toEqual({
    "detail": "The user has been successfully registered. Email with a confirmation link has been sent to the mail.",
  });
});

test("Проверка регистрации с пустой data", async({request}) => {
  const response = await RegistrationAPI.registerByEmail(request, token, {data: {}});
  await test.step("Проверка статуса ответа", async() => {
    expect(response.status()).toBe(422);
  })
  expect(await response.json()).toEqual({
    "detail": [
      {
        "loc": ["body", "email"],
        "msg": "field required",
        "type": "value_error.missing",
      },
      {
        "loc": ["body", "password"],
        "msg": "field required",
        "type": "value_error.missing",
      },
      {
        "loc": ["body", "appId"],
        "msg": "field required",
        "type": "value_error.missing",
      },
    ],
  });
});


test("Попытка регистрации с существующим email", async({request}) => {
  const response = await RegistrationAPI.registerByEmail(request, token, {
    data: {
      email: "test_gribanov@unilab.su",
      password: faker.internet.password(),
      is_dev: false,
      appId: "playwright-framework"
    }
  });
  expect(response.status()).toBe(409);
  expect(await response.json()).toEqual({"detail": "Account with such an e-mail already exists"});
});

test("Проверка регистрации по Email (создание аккаунта) с пустым email", async({request}) => {
  const response = await RegistrationAPI.registerByEmail(request, token, {
    data: {
      email: "",
      password: faker.internet.password(),
      is_dev: false,
      appId: "playwright-framework"
    }
  })
  expect(response.status()).toBe(422);
  expect(await response.json()).toEqual({
    "detail": [
      {
        "loc": ["body", "email"],
        "msg": "value is not a valid email address",
        "type": "value_error.email",
      }
    ]
  });
});

test("Проверка регистрации по Email (создание аккаунта) с пустым паролем", async({request}) => {
  const response = await RegistrationAPI.registerByEmail(request, token, {
    data: {
      email: faker.internet.email(),
      password: "",
      is_dev: false,
      appId: "playwright-framework"
    }
  })
  expect(response.status()).toBe(422);
  expect(await response.json()).toEqual({
    "detail": [
      {
        "loc": ["body", "password"],
        "msg": 'string does not match regex "^(?=.*[a-z, а-я])(?=.*[A-Z, А-Я])(?=.*[0-9]).{8,}"',
        "type": "value_error.str.regex",
        "ctx": {"pattern": "^(?=.*[a-z, а-я])(?=.*[A-Z, А-Я])(?=.*[0-9]).{8,}"},
      }
    ]
  });
});

test("Проверка регистрации с некорректным Email", async({request}) => {
  const response = await RegistrationAPI.registerByEmail(request, token, {
    data: {
      email: "test_gribanovunilab.su",
      password: faker.internet.password(),
      is_dev: false,
      appId: "playwright-framework"
    }
  });
  expect(response.status()).toBe(422);
  expect(await response.json()).toEqual({
    "detail": [
      {
        "loc": ["body", "email"],
        "msg": "value is not a valid email address",
        "type": "value_error.email",
      }
    ]
  });
});

test("Проверка регистрации с коротким паролем", async({request}) => {
  const response = await RegistrationAPI.registerByEmail(request, token, {
    data: {
      email: faker.internet.email(),
      password: "asd1",
      is_dev: false,
      appId: "playwright-framework"
    }
  });
  expect(response.status()).toBe(422);
  expect(await response.json()).toEqual({
    "detail": [
      {
        "loc": ["body", "password"],
        "msg": 'string does not match regex "^(?=.*[a-z, а-я])(?=.*[A-Z, А-Я])(?=.*[0-9]).{8,}"',
        "type": "value_error.str.regex",
        "ctx": {"pattern": "^(?=.*[a-z, а-я])(?=.*[A-Z, А-Я])(?=.*[0-9]).{8,}"},
      }
    ]
  });
});