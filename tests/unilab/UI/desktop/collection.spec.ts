import { test, expect } from "@playwright/test";
import { BasePage } from "../../../../pages/base.page";
import { HeaderPage } from "../../../../pages/header.page";
import { CollectionPage } from '../../../../pages/сollection.page';

let basePage: BasePage;
let headerPage: HeaderPage;
let collectionPage: CollectionPage;

test.beforeEach(async({page}) => {
	basePage = new BasePage(page);
	headerPage = new HeaderPage(page);
	collectionPage = new CollectionPage(page);
	await page.goto("/", {waitUntil: "domcontentloaded"});
});

test("Работа кнопки 'в корзину' на странице 'анализы' в списке", async() => {
	await headerPage.analysisLink.click();
	const serviceName = await basePage.clickRandomAddToCartButton();
	await expect(collectionPage.addToCartPopUp).toBeVisible();
	await basePage.serviceName.click();
	await expect(collectionPage.cartItemTitle).toContainText(serviceName!);
});

test("Работа кнопки 'в корзину' на странице 'мед услуги' в списке", async() => {
	await headerPage.medicalServicesLink.click();
	const serviceName = await basePage.clickRandomAddToCartButton();
	await expect(collectionPage.addToCartPopUp).toBeVisible();
	await basePage.serviceName.click();
	await expect(collectionPage.cartItemTitle).toContainText(serviceName!);
});

test("Переключение табов на странице услуг", async() => {
	await headerPage.analysisLink.click();
	await collectionPage.clickToTab();
});






