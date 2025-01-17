import { test, expect } from '@playwright/test';
import { ProductPage } from '../../../../pages/product.page';
import { BasePage } from '../../../../pages/base.page';
import { HeaderPage } from '../../../../pages/header.page';

let productPage: ProductPage;
let basePage: BasePage;
let headerPage: HeaderPage;

test.beforeEach(async({page}) => {
	productPage = new ProductPage(page);
	basePage = new BasePage(page);
	headerPage = new HeaderPage(page);
	await page.goto("/", {waitUntil: "domcontentloaded"});
});

test("Работа кнопки 'в корзину' внутри карточки услуги", async() => {
  await headerPage.medicalServicesLink.click();
	await productPage.clickRandomMedicalServices();
	await basePage.addToCartBtn.click();

	await expect(basePage.addToCartPopUp).toBeVisible();
});

test("Переключение табов на странице карточки мед. услуги", async() => {
	await headerPage.medicalServicesLink.click();
	await productPage.medicalServices.nth(0).click();
	await productPage.clickTabItem();
});

test("Переключение табов на странице карточки анализы", async() => {
	await headerPage.analysisLink.click();
	await productPage.medicalServices.nth(0).click();
	await productPage.clickTabItem();
});