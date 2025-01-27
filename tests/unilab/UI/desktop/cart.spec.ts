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
  await test.step("Перейти в раздел медицинских услуг", async() => {
    await headerPage.medicalServicesLink.click();
  });
  await test.step("Добавить услугу в корзине", async() => {
    await cartPage.addToCart();
  });
  await test.step("Удалить услугу из корзины", async() => {
    await cartPage.deleteItemBtn.click();
  });
  await test.step("Проверить, что корзина пуста", async() => {
    await expect(cartPage.title).toContainText("Корзина пуста");
    await expect(cartPage.subTitle).toContainText("Перейдите в раздел «Анализы», чтобы добавить необходимые исследования");
  });
});

test("Удалить мед. услугу в корзине", async() => {
  await test.step("Перейти в раздел анализов", async() => {
    await headerPage.analysisLink.click();
  });
  await test.step("Добавить мед.услугу в корзину", async() => {
    await cartPage.addToCart();
  });
  await test.step("Удалить мед. услугу из корзины", async() => {
    await cartPage.deleteItemBtn.click();
  });
  await test.step("Проверить что корзина пуста", async() => {
    await expect(cartPage.title).toContainText("Корзина пуста");
    await expect(cartPage.subTitle).toContainText("Перейдите в раздел «Анализы», чтобы добавить необходимые исследования");
  });
});

test("Кнопка очистить корзину", async() => {
  await test.step("Перейти в раздел медицинских услуг", async() => {
    await headerPage.medicalServicesLink.click();
  });
  await test.step("Добавить две случайные услуги в корзину", async() => {
    await collectionPage.addToRandomService();
    await collectionPage.addToRandomService();
  });
  await test.step("Перейти в корзину", async() => {
    await headerPage.cartLink.click();
  });
  await test.step("Нажать на кнопку 'Очистить корзину'", async()=> {
    await cartPage.clearCartBtn.click();
  });
  await test.step("Проверить что корзина пуста", async() => {
    await expect(cartPage.title).toContainText("Корзина пуста");
    await expect(cartPage.subTitle).toContainText("Перейдите в раздел «Анализы», чтобы добавить необходимые исследования");
  })
});