import { test, expect } from '@playwright/test';
import { BasePage } from '../../../../pages/base.page';
import { HomePage } from '../../../../pages/home.page';

let basePage: BasePage;
let homePage: HomePage;

test.beforeEach(async({page}) => {
	basePage = new BasePage(page);
	homePage = new HomePage(page);
	await page.goto("/", {waitUntil: "domcontentloaded"});
});

test("Отображение попапа согласия на использование кук при не установленных куках", async({context}) => {
	expect(basePage.btnCookieAccept).toBeVisible()
	await basePage.btnCookieAccept.click()
	const cookie = await context.cookies();
	expect(cookie.find((c) => c.name == "cookie_accepted")?.value).toBe("True");
});

test.fixme("Кнопка “вернуться наверх страницы” появляющаяся при скролле на десктопной версии", async({page}) => {
	await page.mouse.wheel(0, 800);
	expect(homePage.upBtn).toBeVisible();
});

test("загрузка изображение слайдов", async() => {
	const imgs = homePage.imgSlider.all();
	for(const [i, slider] of (await imgs).entries()) {
		expect(await slider.getAttribute("src")).toContain("/media/images");
	};
});

test("кнопки переключение слайдов на главной странице", async() => {
	await expect(homePage.btnPrev).toHaveClass(/swiper-button-disabled/);
	await homePage.btnNext.click();
	await homePage.btnNext.click();
	await homePage.btnNext.click();
	await expect(homePage.btnNext).toHaveClass(/swiper-button-disabled/);
});

test("Проверка точек слайдов на главной странице", async() => {
	const bulletCount = await homePage.bullets.count();
	const bullets = homePage.bullets;
	for(let i = 0; i < bulletCount; i++) {
		const bullet = bullets.nth(i);
		await bullet.click();
		await expect(bullet).toHaveClass(/swiper-pagination-bullet-active/);
	};
});

test("Переключение табов на главной странице сайта", async({page}) => {
	await page.mouse.wheel(0, 500);
	await expect(homePage.homeTab).toHaveClass(/active/);
	await homePage.visibleSliderItem(homePage.analyzeSliderItems);
	await homePage.complexTab.click();
	await expect(homePage.complexTab).toHaveClass(/active/);
	await expect(homePage.homeTab).not.toHaveClass(/active/);
	await homePage.visibleSliderItem(homePage.complexSliderItems);
});