import { test, expect } from "@playwright/test";
import { HeaderPage } from "../../../../pages/header.page";
import { SearchResultPage } from "../../../../pages/searchResult.page";
import { BasePage } from "../../../../pages/base.page";
import { CartPage } from "../../../../pages/cart.page";

let headerPage: HeaderPage;
let basePage: BasePage;
let searchResultPage: SearchResultPage;
let cartPage: CartPage;

test.beforeEach(async ({page}) => {
	headerPage = new HeaderPage(page);
	basePage = new BasePage(page);
	searchResultPage = new SearchResultPage(page);
	cartPage = new CartPage(page);
  await page.goto("/", {waitUntil: "domcontentloaded"});
});

test("Работа кнопки 'в корзину' на странице  результата поиска", async({page}) => {
	let serviceName: string;
	await test.step("В поисковую строку ввести 'анал'", async() => {
		await headerPage.serviceSearch("анал");
	});
	await test.step("Перейти в раздел 'Исследования'", async() => {
		await searchResultPage.analysisBtn.click();
	});
	await test.step("Добавить случайную услугу в корзину", async() => {
		serviceName = await basePage.clickRandomAddToCartButton();
		await expect(basePage.addToCartPopUp).toBeVisible();
	});
	await test.step("Перейти в корзину", async() => {
		await basePage.serviceName.click();
	});
	await test.step("Проверить что добавленная услуга отображается в корзине", async() => {
		await expect(cartPage.cartItemTitle).toContainText(serviceName!);
	});
});

test("Загрузка дополнительных результатов поиска на странице поиска", async({page}) => {
	await test.step("В поисковую строку ввести 'витамин'", async() => {
		await headerPage.serviceSearch("витамин");
	});
	await test.step("Проверить количество отображаемых услуг", async() => {
		await searchResultPage.analysisBtn.click();
	});
	await test.step("Проверить количество отображаемых услуг", async() => {
		expect(await searchResultPage.serviceItems.count()).toEqual(9);
	});
	await test.step("Нажать на кнопку 'Показать еще'", async() => {
		await searchResultPage.showMoreBtn.nth(0).click();
	});
	await test.step("Дождаться загрузки js-скрипта", async() => {
		await page.waitForTimeout(1000);
	});
	await test.step("Проверить что количество услуг увеличилось", async() => {
		expect(await searchResultPage.serviceItems.count()).toBeGreaterThan(9);
	});
});