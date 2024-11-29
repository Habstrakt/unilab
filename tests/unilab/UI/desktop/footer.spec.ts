import { test, expect } from '@playwright/test';
import { FooterPage } from '../../../../pages/footer.page';

test.beforeEach(async({page}) => {
	await page.goto("/", {waitUntil: "domcontentloaded"});
});

test("Отображение всплывающего окна подписаться на новости и акции", async({page}) => {
	const footerPage = new FooterPage(page);
	await footerPage.subscribeBtn.click();
	await expect(footerPage.subscribeBtn).toBeVisible();
	await expect(footerPage.subscribeInput).toBeVisible();
	await expect(footerPage.subscribeAcceptBtn).toBeVisible();
	await expect(footerPage.subscribeCancelBtn).toBeVisible();
});