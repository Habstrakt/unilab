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

test.fixme("Кнопка “вернуться наверх страницы” появляющаяся при скролле на десктопной версии", async({page}) => {
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

test("Переключение табов на главной странице сайта", async({page}) => {
	const homePage = new HomePage(page);
	await page.mouse.wheel(0, 500);

	await expect(homePage.homeTab).toHaveClass(/active/);
	await homePage.visibleSliderItem(homePage.analyzeSliderItems);
	await homePage.complexTab.click();
	await expect(homePage.complexTab).toHaveClass(/active/);
	await expect(homePage.homeTab).not.toHaveClass(/active/);
	await homePage.visibleSliderItem(homePage.complexSliderItems);
});

test("Отображение всплывающего окна подписаться на новости и акции", async({page}) => {
	const basePage = new BasePage(page);
	await basePage.subscribeBtn.click();
	await expect(page.locator("#footerSubscribe")).toBeVisible();
	await expect(page.locator("#subscribeInput")).toBeVisible();
	await expect(page.locator("#acceptButton")).toBeVisible();
	await expect(page.locator("#cancelButton")).toBeVisible();
});