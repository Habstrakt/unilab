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

test("Переключение табов при выборе результата в селектах на странице мед услуг", async() => {
  await basePage.btnYes.tap();
  await headerPage.burgerMenuBtn.tap();
  await headerPage.medicalServicesLink.tap();
  await productPage.medicalServices.nth(0).click();
  await productPage.clickTabItemMobile();
});

test("Переключение табов при выборе результата в селектах на странице анализов", async() => {
  await basePage.btnYes.tap();
  await headerPage.burgerMenuBtn.tap();
  await headerPage.analysisLink.tap();
  await productPage.medicalServices.nth(0).click();
  await productPage.clickTabItemMobile();
});