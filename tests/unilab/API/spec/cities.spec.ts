import { test, expect } from '@playwright/test';
import { mockCities } from "../test-data/city";
import { City } from '../interface/city.model';
import { TestContext } from '../interface/api.model';
import { AuthAPI, CitiesAPI } from '../helpers/api-helpers';


let token: string;
test.beforeAll(async ({ request }) => {
  token = await AuthAPI.getToken(request);
})

test.skip("Получение валидной структуры городов", async({request}: TestContext) => {
  const response = await CitiesAPI.getAllCities(request, token);

  await test.step("Проверяем статус ответа", async() => {
    expect(response.status()).toBe(200);
  });

  const cities: City[] = await response.json();
  await test.step("Валидация структуры ответа", async() => {
    cities.forEach((city: City) => {
      expect(city).toHaveProperty("id");
      expect(city).toHaveProperty("uid");
      expect(city).toHaveProperty("name");
      expect(city).toHaveProperty("phone");
      expect(city).toHaveProperty("record_button");
      expect(city).toHaveProperty("record_cashing");
      expect(city).toHaveProperty("parent_id");
    });
  });
});

test.skip("Проверка что город есть в списке допустимых", async({request}: TestContext) => {
  const response = await CitiesAPI.getAllCities(request, token);
  await test.step("Проверяем статус ответа", async() => {
    expect(response.status()).toBe(200);
  });

  const cities: City[] = await response.json();
  const allowedCityNames = new Set(mockCities.map(city => city.name));

  await test.step("Валидировать города", async() => {
    expect(cities.every(apiCity => allowedCityNames.has(apiCity.name))).toBe(true);
  });
});
