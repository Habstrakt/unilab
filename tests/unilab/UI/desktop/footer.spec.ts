import { test, expect } from '@playwright/test';
import { FooterPage } from '../../../../pages/footer.page';

let footerPage: FooterPage;

test.beforeEach(async({page}) => {
	footerPage = new FooterPage(page);
	await page.goto("/", {waitUntil: "domcontentloaded"});
});

test("Проверить отображение всплывающего окна подписаться на новости и акции", async() => {
	await test.step("Нажать на кнопку 'Подписаться на новости и акции' в футере", async() => {
		await expect(footerPage.subscribeBtn).toHaveText(/Подписаться на новости и акции/);
		await footerPage.subscribeBtn.click();
	});
	await test.step("Всплывающее окно 'Подписаться на новости и акции' отображается", async() => {
		await expect(footerPage.subscribePopUp).toBeVisible();
	});
	await test.step("Проверить что поле ввода email отображается", async() => {
		await expect(footerPage.subscribeInput).toHaveAttribute("placeholder", "Введите email");
		await expect(footerPage.subscribeInput).toBeVisible();
	});
	await test.step("Проверить что кнопка 'Подтвердить' отображается", async() => {
		await expect(footerPage.subscribeAcceptBtn).toBeVisible();
		await expect(footerPage.subscribeAcceptBtn).toHaveText(/Подтвердить/);
	});
	await test.step("Проверить что кнопка 'Отменить' отображается", async() => {
		await expect(footerPage.subscribeCancelBtn).toBeVisible();
		await expect(footerPage.subscribeCancelBtn).toHaveText(/Отменить/);
	});
});