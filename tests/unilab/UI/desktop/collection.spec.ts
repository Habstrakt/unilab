import { test, expect } from "@playwright/test";
import { BasePage } from "../../../../pages/base.page";
import { HeaderPage } from "../../../../pages/header.page";
import { CollectionPage } from '../../../../pages/collection.page';

let basePage: BasePage;
let headerPage: HeaderPage;
let collectionPage: CollectionPage;

test.beforeEach(async({page}) => {
	basePage = new BasePage(page);
	headerPage = new HeaderPage(page);
	collectionPage = new CollectionPage(page);
	await page.goto("/", {waitUntil: "domcontentloaded"});
});

test("Проверить работу кнопки 'в корзину' на странице 'анализы' в списке", async() => {
	let serviceName: string;
	await test.step("Перейти в раздел 'Анализы'", async() => {
		await headerPage.analysisLink.click();
	});
	await test.step("Добавить случайную услугу в корзину", async() => {
		serviceName = await basePage.clickRandomAddToCartButton();
		await expect(basePage.addToCartPopUp).toBeVisible();
	});
	await test.step("Перейти в корзину", async() => {
		await basePage.serviceName.click();
	});
	await test.step("Проверить что добавленная услуга отображается в корзине", async() => {
		await expect(collectionPage.cartItemTitle).toContainText(serviceName!);
	});
});

test("Проверить работу кнопки 'в корзину' на странице 'мед услуги' в списке", async() => {
	let serviceName: string;
	await test.step("Перейти в разде 'Мед. Услуги'", async() => {
		await headerPage.medicalServicesLink.click();
	});
	await test.step("Добавить случайную услугу в корзину", async() => {
		serviceName = await basePage.clickRandomAddToCartButton();
		await expect(basePage.addToCartPopUp).toBeVisible();
	});
	await test.step("Перейти в корзину", async() => {
		await basePage.serviceName.click();
	});
	await test.step("Проверить что добавленная услуга отображается в корзине", async() => {
		await expect(collectionPage.cartItemTitle).toContainText(serviceName);
	});
});

test("Проверить переключение табов на странице услуг", async() => {
	await headerPage.analysisLink.click();
	await collectionPage.clickToTab();
});






