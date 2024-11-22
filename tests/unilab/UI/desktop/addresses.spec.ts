import { test, expect } from '@playwright/test';
import { HeaderPage } from '../../../../pages/header.page';
import { BasePage } from '../../../../pages/base.page';
import { AddressPage } from '../../../../pages/addresses.page';

test.beforeEach(async({page}) => {
	await page.goto("/", {waitUntil: "domcontentloaded"})
});

test("поле ввода даты формы на странице отзыва о филиале", async({page}) => {
	const headerPage = new HeaderPage(page);
	const basePage = new BasePage(page);
	const addressPage = new AddressPage(page);
	await basePage.btnYes.click();
	await headerPage.addresses.click();
	await addressPage.clickRandomAddresses();
	await addressPage.todayDate();
	await expect(addressPage.visitorDate).not.toBeEmpty();
});


test("Работа фильтра на странице адресов", async({page}) => {
	const headerPage = new HeaderPage(page);
	const basePage = new BasePage(page);
	const addressPage = new AddressPage(page);
	await basePage.btnYes.click();
	await headerPage.addresses.click();

	await page.waitForTimeout(1000);
	const adressesList =  page.locator(".addresses__item");
	const adressesListCount = await adressesList.count();

	await page.locator("#id_properties_1").click();

	await page.waitForTimeout(1000);
	const fillteredAddress = page.locator(".addresses__item");
	const fillteredAddressCount = await fillteredAddress.count();

	await expect(fillteredAddressCount).toBeLessThan(adressesListCount);
});
