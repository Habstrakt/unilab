import { test, expect } from "@playwright/test";
import { BasePage } from "../../../../pages/base.page";
import { HeaderPage } from "../../../../pages/header.page";
import { CollectionPage } from '../../../../pages/сollection.page';


test.beforeEach(async({page}) => {
	await page.goto("/", {waitUntil: "domcontentloaded"});
});

test("Работа кнопки 'в корзину' на странице 'анализы' в списке", async({page}) => {
	const basePage = new BasePage(page);
  const headerPage = new HeaderPage(page);
	await headerPage.analysisLink.click();
	const serviceName = await basePage.clickRandomAddToCartButton();
	await expect(page.locator(".service-item__toast")).toBeVisible();
	await basePage.serviceName.click();
	await expect(page.locator(".cart-item__title")).toContainText(serviceName!);
});

test("Работа кнопки 'в корзину' на странице 'мед услуги' в списке", async({page}) => {
	const basePage = new BasePage(page);
	const headerPage = new HeaderPage(page);
	await headerPage.medicalServicesLink.click();
	const serviceName = await basePage.clickRandomAddToCartButton();
	await expect(page.locator(".service-item__toast")).toBeVisible();
	await basePage.serviceName.click();
	await expect(page.locator(".cart-item__title")).toContainText(serviceName!);
});

test.only("", async({page}) => {
	const headerPage = new HeaderPage(page);
	const collectionPage = new CollectionPage(page);
	await headerPage.analysisLink.click();

	await collectionPage.clickToServiceTab();

	await expect(page.locator("[aria-current='Анализы']")).toBeVisible();
});

