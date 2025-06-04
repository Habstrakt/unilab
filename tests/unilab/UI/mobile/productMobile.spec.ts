import { test, devices, expect } from '@playwright/test';
import { HeaderPage } from '../../../../pages/header.page';
import { ProductPage } from '../../../../pages/product.page';
import { BasePage } from '../../../../pages/base.page';

let headerPage: HeaderPage;
let productPage: ProductPage;
let basePage: BasePage;

test.use({
	locale: "ru-RU",
	geolocation: {latitude: 50.272796, longitude: 127.526943},
	permissions: ['geolocation'],
	...devices["Pixel 7"],
	isMobile: true
});

test.beforeEach(async({page}) => {
  headerPage = new HeaderPage(page);
  productPage = new ProductPage(page);
  basePage = new BasePage(page);
	await page.goto("/", {waitUntil: "domcontentloaded"});
});

test("Проверить переключение табов при выборе результата в селектах на странице мед услуг", async() => {
  await test.step("Тапнуть на кнопку 'Да' в попапе определения города", async() => {
    await basePage.btnYes.tap();
  });
  await test.step("Тапнуть на бургер-меню", async() => {
    await headerPage.burgerMenuBtn.tap();
  })
  await test.step("Перейти в раздел 'Мед услуги'", async() => {
    await headerPage.medicalServicesLink.tap();
  });
  await test.step("Выбрать первую услугу из списка", async() => {
    await productPage.medicalServices.nth(0).click();
  });
  await test.step("Проверить что табы раскрываются в мобильной версии", async() => {
    await productPage.clickTabItemMobile();
  });
});

test("Проверить переключение табов при выборе результата в селектах на странице анализов", async() => {
  await test.step("Тапнуть на кнопку 'Да' в попапе определения города", async() => {
    await basePage.btnYes.tap();
  });
  await test.step("Тапнуть на бургер-меню", async() => {
    await headerPage.burgerMenuBtn.tap();
  })
  await test.step("Перейти в раздел 'Анализы'", async() => {
    await headerPage.analysisLink.tap();
  });
  await test.step("Выбрать первый анализ из списка", async() => {
    await productPage.medicalServices.nth(0).click();
  });
  await test.step("Проверить что табы раскрываются в мобильной версии", async() => {
    await productPage.clickTabItemMobile();
  });
});