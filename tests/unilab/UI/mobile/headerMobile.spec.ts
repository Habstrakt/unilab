import { devices, expect } from '@playwright/test';
import { test } from "../../../../fixtures/Fixture"
import {allure} from "allure-playwright";


test.use({
	locale: "ru-RU",
	geolocation: {latitude: 50.272796, longitude: 127.526943},
	permissions: ['geolocation'],
	...devices["Pixel 7"],
	isMobile: true
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

test("Отображение меню выбора города в мобильной версии", async({headerInitialize}) => {
	const header = headerInitialize;
	await header.closePopUps();
	await header.burgerMenuBtn.tap();
	await header.headerCityLinkMobile.tap();
	await expect(header.selectCity).toBeVisible();
});

test("Выбор города в мобильной версии", async({page, headerInitialize}) => {
	const header = headerInitialize;
	await header.closePopUps();
	await header.burgerMenuBtn.tap();
	await header.headerCityLinkMobile.tap();
	await page.locator("[data-slag-city='ussuriisk']").tap();
	await header.burgerMenuBtn.tap();
	await expect(header.headerCityLinkMobile).toContainText("Уссурийск");
});

test("Поиск города в мобильной версии", async({page, headerInitialize}) => {
	const header = headerInitialize;
	await header.closePopUps();
	await header.burgerMenuBtn.tap();
	await header.headerCityLinkMobile.tap();
	await header.searchCityInput.fill("Хаба");
	await expect(page.locator("[data-slag-city='khabarovsk']")).toContainText("Хабаровск");
});

test("Отсутствие результата поиска города", async({headerInitialize}) => {
	const header = headerInitialize;
	await header.closePopUps();
	await header.burgerMenuBtn.tap();
	await header.headerCityLinkMobile.tap();
	await header.searchCityInput.fill("Москва");
	await expect(header.searchCityInput).toHaveClass("error");
	await expect(header.notFoundCity).toContainText("Ничего не найдено. Попробуйте изменить запрос.");
});

test.only("Отображение попапа результатов поиска при количестве введенных символов больше двух", async({headerInitialize}) => {
	const header = headerInitialize;
	await header.closePopUps();
	await header.headerSearch.fill("ана");
	await expect(header.headerSearchResult).toHaveClass(/header__search-result_show/);
	await expect(header.headerSearchResultItem.first()).toBeEnabled();
});

test.only("негативное Отображение попапа результатов поиска", async({page, headerInitialize}) => {
	const header = headerInitialize;
	await header.closePopUps();
	await header.headerSearch.fill("fyf");
	await expect(header.headerSearchResult).toHaveClass(/header__search-result_show/);
	await expect(page.locator(".search-result__no-result")).toBeVisible()
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

