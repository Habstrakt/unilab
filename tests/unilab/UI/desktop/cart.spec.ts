import { test, expect } from "@playwright/test";
import { HeaderPage } from "../../../../pages/header.page";
import { ProductPage } from "../../../../pages/product.page";
import { BasePage } from "../../../../pages/base.page";

test.beforeEach(async({page}) => {
	await page.goto("/", {waitUntil: "domcontentloaded"});
});

test.only("Удалить услугу в корзине", async({page}) => {
  const headerPage = new HeaderPage(page);
  const productPage = new ProductPage(page);
  const basePage = new BasePage(page);


  await headerPage.medicalServicesLink.click();
  await productPage.clickRandomMedicalServices();
  await basePage.addToCartBtn.click();


  await page.locator(".header__cart-link").click();
  await page.locator(".cart__item-delete").click();
  await expect(page.locator("#cartDetail > div > div").nth(0)).toContainText("Корзина пуста");
  await expect(page.locator("#cartDetail > div > div").nth(1)).toContainText("Перейдите в раздел «Анализы», чтобы добавить необходимые исследования");
});

test.only("удалить мед. услугу в корзине", async({page}) => {
  const headerPage = new HeaderPage(page);
  const productPage = new ProductPage(page);
  const basePage = new BasePage(page);

  await headerPage.analysisLink.click();
  await productPage.clickRandomMedicalServices();
  await basePage.addToCartBtn.click();

  await page.locator(".header__cart-link").click();
  await page.locator(".cart__item-delete").click();
  await expect(page.locator("#cartDetail > div > div").nth(0)).toContainText("Корзина пуста");
  await expect(page.locator("#cartDetail > div > div").nth(1)).toContainText("Перейдите в раздел «Анализы», чтобы добавить необходимые исследования");

});