import { test, expect } from "@playwright/test";
import { HeaderPage } from "../../../../pages/header.page";
import { CollectionPage } from "../../../../pages/Collection.page";

test.beforeEach(async({page}) => {
	await page.goto("/", {waitUntil: "domcontentloaded"});
});

test("Работа кнопки 'в корзину' на странице 'анализы' в списке", async({page}) => {
  const collectionPage = new CollectionPage(page);
  const headerElement = new HeaderPage(page);
	await headerElement.analysisLink.click();
  await collectionPage.clickRandomAddToCartButton();
	await expect(page.locator(".service-item__toast")).toBeVisible();
});

test("Работа кнопки 'в корзину' на странице 'мед услуги' в списке", async({page}) => {
	const collectionPage = new CollectionPage(page);
	const headerElement = new HeaderPage(page);
	await headerElement.medicalServicesLink.click();
	await collectionPage.clickRandomAddToCartButton();
	await expect(page.locator(".service-item__toast")).toBeVisible();
});

