import { expect } from '@playwright/test';
import { test } from "../../../../fixtures/Fixture";

test.beforeEach(async({mainPageInitialize}) => {
});

test("Отображение попапа согласия на использование кук при не установленных куках", async({context, mainPageInitialize}) => {
	const popUpCookie = mainPageInitialize;
	expect(popUpCookie.btnCookieAccept).toBeVisible()
	await popUpCookie.btnCookieAccept.click()
	const cookie = await context.cookies();
	expect(cookie.find((c) => c.name == "cookie_accepted")?.value).toBe("True");
});

test("Кнопка “вернуться наверх страницы” появляющаяся при скролле на десктопной версии", async({page, mainPageInitialize}) => {
	const button = mainPageInitialize;
	await page.mouse.wheel(0, 800);
	expect(button.upBtn).toBeVisible();
});

test("загрузка изображение слайдов", async({mainPageInitialize}) => {
	const img = mainPageInitialize;
	const imgs = img.imgSlider.all();
	for(const [i, slider] of (await imgs).entries()) {
		expect(await slider.getAttribute("src")).toContain("/media/images");
	};
});

test.only("кнопки переключение слайдов на главной странице", async({mainPageInitialize}) => {
	const buttons = mainPageInitialize;
	await expect(buttons.btnPrev).toHaveClass(/swiper-button-disabled/);
	await expect(buttons.btnNext).not.toHaveClass(/swiper-button-disabled/);
	await expect(buttons.btnPrev).not.toHaveClass(/swiper-button-disabled/);
	await expect(buttons.btnNext).toHaveClass(/swiper-button-disabled/);
});

test("Подсчет количества введенных символов в поле ввода текста оставить отзыв", async({page, mainPageInitialize}) => {
	await page.getByRole("button", {name: "Важно и полезно"}).click();
	await page.locator('#navbarScroll').getByRole("link", { name: "Оставить отзыв" }).click();

	const textArea = page.locator("#id_visitor_message");
	const count = page.locator(".visitor-message__char-count");
	const text = "Пример текста для проверки подсчета символов";

	await textArea.fill(text);
	const charCount = text.length;
	const charCountAttr = await page.locator("p[data-char-count]").getAttribute("data-char-count");

	expect(await page.locator("p[data-char-count]").getAttribute("data-char-count")).toBe(`${text.length}/3000`);
});

test("Подсчет количества введенных символов в поле ввода текста вопросу доктору", async({page, mainPageInitialize}) => {
	await page.getByRole("button", {name: "Важно и полезно"}).click();
	await page.locator('#navbarScroll').getByRole("link", { name: "Скажите, доктор" }).click();
	await page.getByRole('link', { name: 'форму' }).click();

	const textArea = page.locator("#id_visitor_message");
	const text = "Пример текста для проверки подсчета символов";

	await textArea.fill(text);

	expect(await page.locator(".visitor-message__char-count").getAttribute("data-char-count")).toBe(`${text.length}/3000`);
});

test("отображение подсказки поля ввода номера заказа вопрос доктору", async({page, mainPageInitialize}) => {
	await page.getByRole("button", {name: "Важно и полезно"}).click();
	await page.locator('#navbarScroll').getByRole("link", { name: "Скажите, доктор" }).click();
	await page.getByRole('link', { name: 'форму' }).click();

	await page.locator("#id_order").fill("1");
	await expect(page.locator(".custom-tooltip_open")).toBeVisible();
});

test("отображение подсказки поля ввода номера заказа оставить отзыв", async({page, mainPageInitialize}) => {
	await page.getByRole("button", {name: "Важно и полезно"}).click();
	await page.locator('#navbarScroll').getByRole("link", { name: "Оставить отзыв" }).click();

	await page.locator("#id_order").fill("1");
	await expect(page.locator(".custom-tooltip_open")).toBeVisible();
});

test("Работа кнопки 'в корзину' на странице 'анализы' в списке", async({page, mainPageInitialize}) => {
	await page.locator('#navbarScroll').getByRole('link', { name: 'Анализы' }).click();

	await page.locator(".service-item__btn").nth(0).click();
	await expect(page.locator(".service-item__toast")).toBeVisible();
	await expect(page.getByRole('button', { name: 'В корзине Перейти в корзину' })).toBeVisible();
});

test("Работа кнопки 'в корзину' на странице 'мед услуги' в списке", async({page, mainPageInitialize}) => {
	await page.locator('#navbarScroll').getByRole('link', { name: 'Мед. услуги' }).click();

	await page.locator(".service-item__btn").nth(0).click();
	await expect(page.locator(".service-item__toast")).toBeVisible();
	await expect(page.getByRole('button', { name: 'В корзине Перейти в корзину' })).toBeVisible();
});

test("Работа кнопки 'в корзину' внутри карточки услуги", async({page, mainPageInitialize}) => {
	await page.locator('#navbarScroll').getByRole('link', { name: 'Мед. услуги' }).click();
	await page.locator(".service-item__title a").nth(0).click();
	await page.locator(".btn-to-cart").click();

	await expect(page.locator(".service-item__toast")).toBeVisible();
});

// test("Работа кнопки 'в корзину' на ", async({page, navigateAndInitialize}) => {
// 	await page.locator("#searchOnSite").fill("")
// });