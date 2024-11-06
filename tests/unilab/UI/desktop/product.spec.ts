import { expect } from '@playwright/test';
import { test } from "../../../../fixtures/Fixture";
import { Product } from '../../../../pages/Product.page';

test.beforeEach(async({mainPageInitialize}) => {
});

test("Работа кнопки 'в корзину' внутри карточки услуги", async({page}) => {
  const addToCart = new Product(page);
  await addToCart.medicalServicesMenuLink.click();
	await addToCart.clickRandomMedicalServices();
	await addToCart.addToCartBtn.click();

	await expect(page.locator(".service-item__toast")).toBeVisible();
});