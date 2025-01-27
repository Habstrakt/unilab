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
	await test.step("Перейти на страницу 'Медицинских услуг' в шапке сайта", async() => {
		await headerPage.medicalServicesLink.click();
	});
  await test.step("Выбрать случайную медицинскую услугу", async() => {
		await productPage.clickRandomMedicalServices();
	});
	await test.step("Кликнуть на кнопку 'В корзину'", async() => {
		await basePage.addToCartBtn.click();
	});
	await test.step("Проверить что всплывающее окно добавления в корзину отображается", async() => {
		await expect(basePage.addToCartPopUp).toBeVisible();
	});
});

test("Переключение табов на странице карточки мед. услуги", async() => {
	await test.step("Перейти на страницу 'Медицинских услуг' в шапке сайта", async() => {
		await headerPage.medicalServicesLink.click();
	});
	await test.step("Выбрать первую медицинскую услугу", async() => {
		await productPage.medicalServices.nth(0).click();
	});
	await test.step("Переключить табы на странице услуги", async() => {
		await productPage.clickTabItem();
	});
});

test("Переключение табов на странице карточки анализы", async() => {
	await test.step("Перейти на страницу 'Анализы' в шапке сайта", async() => {
		await headerPage.analysisLink.click();
	});
	await test.step("Выбрать первый анализ", async() => {
		await productPage.medicalServices.nth(0).click();
	});
	await test.step("Переключить табы на странице анализа", async() => {
		await productPage.clickTabItem();
	});
});