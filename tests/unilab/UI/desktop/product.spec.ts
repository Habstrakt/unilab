import { test, expect } from '@playwright/test';
import { ProductPage } from '../../../../pages/product.page';
import { BasePage } from '../../../../pages/base.page';
import { HeaderPage } from '../../../../pages/header.page';

test.beforeEach(async({page}) => {
	await page.goto("/", {waitUntil: "domcontentloaded"});
});

test("Работа кнопки 'в корзину' внутри карточки услуги", async({page}) => {
  const productPage = new ProductPage(page);
	const basePage = new BasePage(page);
	const headerPage = new HeaderPage(page);
  await headerPage.medicalServicesLink.click();
	await productPage.clickRandomMedicalServices();
	await basePage.addToCartBtn.click();

	await expect(page.locator(".service-item__toast")).toBeVisible();
});

test("Переключение табов на странице карточки мед. услуги", async({page}) => {
	const productPage = new ProductPage(page);
	const headerPage = new HeaderPage(page);
	await headerPage.medicalServicesLink.click();
	await productPage.medicalServices.nth(0).click();
	await productPage.clickTabItem();
});

test("Переключение табов на странице карточки анализы", async({page}) => {
	const productPage = new ProductPage(page);
	const headerPage = new HeaderPage(page);
	await headerPage.analysisLink.click();
	await productPage.medicalServices.nth(0).click();
	await productPage.clickTabItem();
});