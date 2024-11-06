import { expect } from "@playwright/test";
import { test } from "../../../../fixtures/Fixture"
import { Header } from "../../../../pages/header.component";
import { CollectionPage } from "../../../../pages/Collection.page";

test.beforeEach(async({mainPageInitialize}) => {
});

test("Работа кнопки 'в корзину' на странице 'анализы' в списке", async({page}) => {
  const collectionElement = new CollectionPage(page);
  const headerElement = new Header(page);
	await headerElement.analyseLink.click();
  await collectionElement.clickRandomAddToCartButton();
	await expect(page.locator(".service-item__toast")).toBeVisible();
});

test("Работа кнопки 'в корзину' на странице 'мед услуги' в списке", async({page}) => {
	const collectionElement = new CollectionPage(page);
	const headerElement = new Header(page);
	await headerElement.medicalServicesLink.click();
	await collectionElement.clickRandomAddToCartButton();
	await expect(page.locator(".service-item__toast")).toBeVisible();
});

