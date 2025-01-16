import { test, expect } from '@playwright/test';
import { HeaderPage } from '../../../../pages/header.page';
import { BasePage } from '../../../../pages/base.page';
import { AddressPage } from '../../../../pages/addresses.page';

let headerPage: HeaderPage;
let basePage: BasePage;
let addressPage: AddressPage;

test.beforeEach(async({page}) => {
	headerPage = new HeaderPage(page);
	basePage = new BasePage(page);
	addressPage = new AddressPage(page);
	await page.goto("/", {waitUntil: "domcontentloaded"});
});

test("поле ввода даты формы на странице отзыва о филиале", async() => {
	await basePage.btnYes.click();
	await headerPage.addresses.click();
	await addressPage.clickRandomAddresses();
	await addressPage.todayDate();
	await expect(addressPage.visitorDate).not.toBeEmpty();
});


test("Работа фильтра на странице адресов", async({page}) => {
	await basePage.btnYes.click();
	await headerPage.addresses.click();
	await page.waitForSelector(".addresses__item");
	const initialAddressesCount = await addressPage.getAddressesCount();
	await addressPage.applyFilter();
	await page.waitForLoadState("load", { timeout: 5000 });
	const filteredAddressesCount = await addressPage.getAddressesCount();
	await expect(filteredAddressesCount).toBeLessThan(initialAddressesCount);
});
