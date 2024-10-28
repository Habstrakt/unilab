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

test.only("загрузка изображение слайдов", async({page, navigateAndInitialize}) => {
	const imgs = page.locator(".brd-rd16").all();

	for(const [i, img] of (await imgs).entries()) {
		await expect(img).toHaveAttribute("src");
	}
	//console.log(await img);
});