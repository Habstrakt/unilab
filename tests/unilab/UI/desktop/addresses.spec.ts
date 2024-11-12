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
