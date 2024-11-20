import { test, devices, expect } from '@playwright/test';
import { HeaderPage } from '../../../../pages/header.page';
import { ProductPage } from '../../../../pages/product.page';
import { BasePage } from '../../../../pages/base.page';

test.use({
	locale: "ru-RU",
	geolocation: {latitude: 50.272796, longitude: 127.526943},
	permissions: ['geolocation'],
	...devices["Pixel 7"],
	isMobile: true
});

test.beforeEach(async({page}) => {
	await page.goto("/", {waitUntil: "domcontentloaded"});
});

test("Переключение табов при выборе результата в селектах на странице мед услуг", async({page}) => {
  const headerPage = new HeaderPage(page);
  const productPage = new ProductPage(page);
  const basePage = new BasePage(page);

  await basePage.btnYes.tap();
  await headerPage.burgerMenuBtn.tap();
  await headerPage.medicalServicesLink.tap();
  await productPage.medicalServices.nth(0).click();
  await productPage.clickTabItemMobile();
});

test("Переключение табов при выборе результата в селектах на странице анализов", async({page}) => {
  const headerPage = new HeaderPage(page);
  const productPage = new ProductPage(page);
  const basePage = new BasePage(page);

  await basePage.btnYes.tap();
  await headerPage.burgerMenuBtn.tap();
  await headerPage.analysisLink.tap();
  await productPage.medicalServices.nth(0).click();
  await productPage.clickTabItemMobile();
});