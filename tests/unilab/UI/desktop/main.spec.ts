import { expect } from '@playwright/test';
import { test } from "../../../../fixtures/Fixture"

test("Отображение попапа согласия на использование кук при не установленных куках", async({context, navigateAndInitialize}) => {
	const header = navigateAndInitialize;

	expect(header.btnCookieAccept).toBeVisible()
	await header.btnCookieAccept.click()
	const cookie = await context.cookies();
	expect(cookie.find((c) => c.name == 'cookie_accepted')?.value).toBe('True');
});

test("Кнопка “вернуться наверх страницы” появляющаяся при скролле на десктопной версии", async({page, navigateAndInitialize}) => {
	const button = navigateAndInitialize;
	await page.mouse.wheel(0, 800);
	await button.upBtn.waitFor();
	expect(button.upBtn).toBeVisible();
});