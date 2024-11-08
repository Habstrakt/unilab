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

test("кнопки переключение слайдов на главной странице", async({page, mainPageInitialize}) => {
	const buttons = mainPageInitialize;
	await expect(buttons.btnPrev).toHaveClass(/swiper-button-disabled/);
	await buttons.btnNext.click();
	await buttons.btnNext.click();
	await expect(buttons.btnNext).toHaveClass(/swiper-button-disabled/);
});

test.only("Проверка точек слайдов на главной странице", async({page}) => {
	const bullets = page.locator(".promo-swiper .swiper-pagination-bullet");
	for(let i = 0; i < await bullets.count(); i++) {
		const bullet = bullets.nth(i);
		await bullet.click();
		await expect(bullet).toHaveClass(/swiper-pagination-bullet-active/);
	};
});