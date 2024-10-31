import { expect } from '@playwright/test';
import { test } from "../../../../fixtures/Fixture"

test.use({
	locale: "ru-RU",
	geolocation: {latitude: 50.272796, longitude: 127.526943},
	permissions: ['geolocation'],
});

test("Открытие бургер-меню в мобильной версии", async ({page, headerInitialize}) => {
	const header = headerInitialize;

	await header.burgerMenuBtn.tap();
	await expect(page.locator("#headerBurgerBtn")).toHaveClass(/burger_open/);
});

test("Закрытие бургер-меню в мобильной версии", async({page, headerInitialize}) => {
	const header = headerInitialize;

	await header.burgerMenuBtn.tap();
	await expect(page.locator("#headerBurgerBtn")).toHaveClass(/burger_open/);
	await header.burgerMenuBtn.tap();
	await expect(page.locator("#headerBurgerBtn")).not.toHaveClass(/burger_open/);
});

test("Работа переключателя темной/светлой версии в бургер-меню в мобильной версии", async({page, headerInitialize}) => {
	const header = headerInitialize;

	await header.burgerMenuBtn.tap();
	await header.themeSwitcher.tap();
	await expect(page.locator("body")).toHaveClass(/theme-dark/);
	await header.themeSwitcher.tap();
	await expect(page.locator("body")).not.toHaveClass(/theme-dark/);
});

test("Отсутствие скролла страници при открытом бургер-меню в мобильной версии", async({page, headerInitialize}) => {
	const header = headerInitialize

	await header.burgerMenuBtn.tap();
	await expect(page.locator("#navbarScroll")).not.toHaveClass(/navbar_scrollable/);
});

test("Анимация изменения ширины поля ввода поиска при фокусе в мобильной версии", async({page, headerInitialize}) => {
	const popUpCity = headerInitialize;

	await popUpCity.closePopUps();
	await expect(page.locator(".search")).toHaveCSS("max-width", "100%");
	await page.mouse.wheel(0, 500);
	await expect(page.locator(".search")).not.toHaveCSS("max-width", "100%");
});


// 
// test.only("Переход на страницу результата поиска в мобильной версии свайпом вниз", async({page, navigateAndInitialize}) => {
// 	const popUpCity = navigateAndInitialize;
// 	await popUpCity.closePopUps();

// 	await page.locator("#searchOnSite").fill("анализ")

// 	const plug = await page.locator(".search-result__plug-icon").boundingBox();

// 	const startX = plug.x + plug.width / 2;
//   const startY = plug.y + plug.height / 2;
//   const endY = startY + 500;

// 	await page.mouse.move(startX, startY);
// 	await page.mouse.down();
// 	await page.mouse.move(startX, endY);
// 	await page.mouse.up();
// });

