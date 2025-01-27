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
	await test.step("Проверить что попап согласия на использование кук отображается", async() => {
		expect(basePage.btnCookieAccept).toBeVisible();
	});
	await test.step("Нажать на кнопку 'Понятно' в попапе согласия на использование кук", async() => {
		await basePage.btnCookieAccept.click()
	});
	await test.step("Проверить, что попап согласия на использование кук скрыт", async () => {
    await expect(basePage.btnCookieAccept).not.toBeVisible();
	});
	await test.step("Получить куки из контекста браузера", async() => {
		const cookie = await context.cookies();
		expect(cookie.find((c) => c.name == "cookie_accepted")?.value).toBe("True");
	});
});

test.fixme("Кнопка “вернуться наверх страницы” появляющаяся при скролле на десктопной версии", async({page}) => {
	await test.step("Проскролить страницу вниз на 800px", async() => {
		await page.mouse.wheel(0, 800);
	});
	await test.step("Проверить что кнопка 'вернуться наверх страницы' отображается", async() => {
		expect(homePage.upBtn).toBeVisible();
	});
});

test("загрузка изображение слайдов", async() => {
	const imgs = await homePage.imgSlider.all();
	await test.step("Проверить что слайды загружены", async() => {
		expect(imgs.length).toBeGreaterThan(0);
	});
	await test.step("Проверить что каждое изображение загружено корректно", async() => {
		for(const [i, slider] of (imgs).entries()) {
			await test.step(`Проверить изображение ${i + 1} слайдера`, async() => {
				const src = await slider.getAttribute("src");
				expect(src).toContain("/media/images");
			});
		};
	});
});

test("кнопки переключение слайдов на главной странице", async() => {
	await test.step("Проверить что кнопка 'Назад' изначально неактивна", async() => {
		await expect(homePage.btnPrev).toHaveClass(/swiper-button-disabled/);
	});
	await test.step("Нажать на кнопку 'Вперед' три раза", async() => {
		await homePage.btnNext.click();
		await homePage.btnNext.click();
		await homePage.btnNext.click();
	});
	test.step("Проверить что кнопка 'Вперед' не активна", async() => {
		await expect(homePage.btnNext).toHaveClass(/swiper-button-disabled/);
	});
});

test("Проверка точек слайдов на главной странице", async() => {
	const bulletCount = await homePage.bullets.count();
	await test.step("Получилось количество точек слайдов", async() => {
		expect(bulletCount).toBeGreaterThan(0);
	});
	await test.step("Переключить каждую точку слайдов и проверить её активность", async() => {
		const bullets = homePage.bullets;
		for(let i = 0; i < bulletCount; i++) {
			await test.step(`Переключить точку слайда №${i + 1} и проверить её активность`, async() => {
				const bullet = bullets.nth(i);
				await bullet.click();
				await expect(bullet).toHaveClass(/swiper-pagination-bullet-active/);
			});
		};
	});
});

test("Переключение табов на главной странице сайта", async({page}) => {
	await test.step("Проскролить страницу вниз на 500px", async() => {
		await page.mouse.wheel(0, 500);
	});
	await test.step("Проверить что таб 'Анализы' активен по умолчанию", async() => {
		await expect(homePage.homeTab).toHaveClass(/active/);
	});
	await test.step("Проверить видимость элементов слайдера на табе 'Анализы'", async() => {
		await homePage.visibleSliderItem(homePage.analyzeSliderItems);
	});
	await test.step("Переключить на таб 'Комплексы'", async() => {
		await homePage.complexTab.click();
	});
	await test.step("Проверить что там 'Комплексы', активен", async() => {
		await expect(homePage.complexTab).toHaveClass(/active/);
	});
	await test.step("Проверить что там 'Анализы' не активен", async() => {
		await expect(homePage.homeTab).not.toHaveClass(/active/);
	});
	await test.step("Проверить видимость элементов слайдера на табе 'Комплексы'", async() => {
	await homePage.visibleSliderItem(homePage.complexSliderItems);
	});
});