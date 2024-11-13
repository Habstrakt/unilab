import { test, expect } from '@playwright/test';
import { BasePage } from '../../../../pages/base.page';
import { HomePage } from '../../../../pages/home.page';


test.beforeEach(async({page}) => {
	await page.goto("/", {waitUntil: "domcontentloaded"});
});

test("Отображение попапа согласия на использование кук при не установленных куках", async({page, context}) => {
	const basePage = new BasePage(page);
	expect(basePage.btnCookieAccept).toBeVisible()
	await basePage.btnCookieAccept.click()
	const cookie = await context.cookies();
	expect(cookie.find((c) => c.name == "cookie_accepted")?.value).toBe("True");
});

test("Кнопка “вернуться наверх страницы” появляющаяся при скролле на десктопной версии", async({page}) => {
	const homePage = new HomePage(page);
	await page.mouse.wheel(0, 800);
	expect(homePage.upBtn).toBeVisible();
});

test("загрузка изображение слайдов", async({page}) => {
	const homePage = new HomePage(page);
	const imgs = homePage.imgSlider.all();
	for(const [i, slider] of (await imgs).entries()) {
		expect(await slider.getAttribute("src")).toContain("/media/images");
	};
});

test("кнопки переключение слайдов на главной странице", async({page}) => {
	const homePage = new HomePage(page);
	await expect(homePage.btnPrev).toHaveClass(/swiper-button-disabled/);
	await homePage.btnNext.click();
	await homePage.btnNext.click();
	await expect(homePage.btnNext).toHaveClass(/swiper-button-disabled/);
});

test("Проверка точек слайдов на главной странице", async({page}) => {
	const homePage = new HomePage(page);
	const bulletCount = await homePage.bullets.count();
	const bullets = homePage.bullets;
	for(let i = 0; i < bulletCount; i++) {
		const bullet = bullets.nth(i);
		await bullet.click();
		await expect(bullet).toHaveClass(/swiper-pagination-bullet-active/);
	};
});

test.only("Переключение табов на главной странице сайта", async({page}) => {
	const homePage = new HomePage(page);
	const homeTab = page.locator("#nav-home-tab");
	const complexTab = page.locator("#complexes-tab");

	await expect(homeTab).toHaveClass(/active/);
	console.log(await page.locator(".top-services__slide-title").allTextContents());

	await complexTab.click();
	console.log(await page.locator(".top-services__slide-title").allTextContents());
});