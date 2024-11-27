import { test, expect } from "@playwright/test";
import { HeaderPage } from "../../../../pages/header.page";
import { BasePage } from "../../../../pages/base.page";

test.beforeEach(async ({page}) => {
  await page.goto("/", {waitUntil: "domcontentloaded"});
});

test("Работа кнопки 'в корзину' на странице  результата поиска", async({page}) => {
	const headerPage = new HeaderPage(page);
	const basePage = new BasePage(page);
	await headerPage.serviceSearch("анал");
	await page.locator("[data-path='analyzes']").click();
	const serviceName = await basePage.clickRandomAddToCartButton();
	await expect(page.locator(".service-item__toast")).toBeVisible();
	await basePage.serviceName.click();
	await expect(page.locator(".cart-item__title")).toContainText(serviceName!);
});

test("Загрузка дополнительных результатов поиска на странице поиска", async({page}) => {
	const headerPage = new HeaderPage(page);
	await headerPage.serviceSearch("витамин");
	await page.locator("[data-path='analyzes']").click();
	let serviceItem = page.locator(".service-item");
	expect(await serviceItem.count()).toEqual(9);
	await page.getByText('Показать ещё').nth(0).click();
	await page.waitForTimeout(1000);
	expect(await serviceItem.count()).toBeGreaterThan(9);
});