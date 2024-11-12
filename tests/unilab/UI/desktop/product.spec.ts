import { test, expect } from '@playwright/test';
import { Product } from '../../../../pages/product.page';

test.beforeEach(async({page}) => {
	await page.goto("/", {waitUntil: "domcontentloaded"});
});

test("Работа кнопки 'в корзину' внутри карточки услуги", async({page}) => {
  const addToCart = new Product(page);
  await addToCart.medicalServicesMenuLink.click();
	await addToCart.clickRandomMedicalServices();
	await addToCart.addToCartBtn.click();

	await expect(page.locator(".service-item__toast")).toBeVisible();
});