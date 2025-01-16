import { test, expect } from "@playwright/test";
import { HeaderPage } from "../../../../pages/header.page";
import { CartPage } from '../../../../pages/cart.page';
import { CollectionPage } from '../../../../pages/сollection.page';

let headerPage: HeaderPage;
let cartPage: CartPage;
let collectionPage: CollectionPage;

test.beforeEach(async({page}) => {
  headerPage = new HeaderPage(page);
  cartPage = new CartPage(page);
  collectionPage = new CollectionPage(page);
	await page.goto("/", {waitUntil: "domcontentloaded"});
});

test("Удалить услугу в корзине", async() => {
  await headerPage.medicalServicesLink.click();
  await cartPage.addToCart();
  await cartPage.deleteItemBtn.click();
  await expect(cartPage.title).toContainText("Корзина пуста");
  await expect(cartPage.subTitle).toContainText("Перейдите в раздел «Анализы», чтобы добавить необходимые исследования");
});

test("Удалить мед. услугу в корзине", async() => {
  await headerPage.analysisLink.click();
  await cartPage.addToCart();
  await cartPage.deleteItemBtn.click();
  await expect(cartPage.title).toContainText("Корзина пуста");
  await expect(cartPage.subTitle).toContainText("Перейдите в раздел «Анализы», чтобы добавить необходимые исследования");
});

test("Кнопка очистить корзину", async() => {
  await headerPage.medicalServicesLink.click();
  await collectionPage.addToRandomService();
  await collectionPage.addToRandomService();
  await headerPage.cartLink.click();
  await cartPage.clearCartBtn.click();
  await expect(cartPage.title).toContainText("Корзина пуста");
  await expect(cartPage.subTitle).toContainText("Перейдите в раздел «Анализы», чтобы добавить необходимые исследования");
});