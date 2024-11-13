import { test, expect } from '@playwright/test';
import { ProductPage } from '../../../../pages/product.page';
import { BasePage } from '../../../../pages/base.page';

test.beforeEach(async({page}) => {
	await page.goto("/", {waitUntil: "domcontentloaded"});
});

test("Работа кнопки 'в корзину' внутри карточки услуги", async({page}) => {
  const productPage = new ProductPage(page);
	const basePage = new BasePage(page);
  await productPage.medicalServicesMenuLink.click();
	await productPage.clickRandomMedicalServices();
	await basePage.addToCartBtn.click();

	await expect(page.locator(".service-item__toast")).toBeVisible();
});