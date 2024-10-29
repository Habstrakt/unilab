import { expect } from '@playwright/test';
import { test } from "../../../../fixtures/Fixture"

test("Отображение попапа согласия на использование кук при не установленных куках", async({context, navigateAndInitialize}) => {
	const header = navigateAndInitialize;

	expect(header.btnCookieAccept).toBeVisible()
	await header.btnCookieAccept.click()
	const cookie = await context.cookies();
	expect(cookie.find((c) => c.name == "cookie_accepted")?.value).toBe("True");
});

test("Кнопка “вернуться наверх страницы” появляющаяся при скролле на десктопной версии", async({page, navigateAndInitialize}) => {
	const button = navigateAndInitialize;
	await page.mouse.wheel(0, 800);
	await button.upBtn.waitFor();
	expect(button.upBtn).toBeVisible();
});

test("загрузка изображение слайдов", async({page, navigateAndInitialize}) => {
	const imgs = page.locator(".brd-rd16").all();

	for(const [i, img] of (await imgs).entries()) {
		expect(await img.getAttribute("src")).toContain("/media/images");
	}
});

test("кнопки переключение слайдов на главной странице", async({page, navigateAndInitialize}) => {
	const btnPrev = page.locator(".promo-swiper-button-prev");
	const btnNext = page.locator(".promo-swiper-button-next");

	await expect(btnPrev).toHaveClass(/swiper-button-disabled/);
	await expect(btnNext).not.toHaveClass(/swiper-button-disabled/);

	await expect(btnPrev).not.toHaveClass(/swiper-button-disabled/);
	await expect(btnNext).toHaveClass(/swiper-button-disabled/);
});

test.only("Подсчет количества введенных символов в поле ввода текста оставить отзыв", async({page, navigateAndInitialize}) => {
	await page.getByRole("button", {name: "Важно и полезно"}).click();
	await page.locator('#navbarScroll').getByRole('link', { name: 'Оставить отзыв' }).click();

	const textArea = page.locator("#id_visitor_message");
	const count = page.locator(".visitor-message__char-count");
	const text = "Пример текста для проверки подсчета символов";

	await textArea.fill(text);
	const charCount = text.length;
	const charCountAttr = await page.locator("p[data-char-count]").getAttribute("data-char-count");

	expect(await page.locator("p[data-char-count]").getAttribute("data-char-count")).toBe(`${text.length}/3000`);
});