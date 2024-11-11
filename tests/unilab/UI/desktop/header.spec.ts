import { expect } from '@playwright/test';
import { test } from "../../../../fixtures/Fixture"

test.use({
	locale: "ru-RU",
	geolocation: {latitude: 50.272796, longitude: 127.526943},
	permissions: ['geolocation'],
});

// test.beforeEach( async({headerInitialize}) => {
// });

test("Изменение шапки при скролле", async({page, headerInitialize}) => {
	await page.mouse.wheel(0, 500);
	await expect(page.locator("body")).toHaveClass(/js-scroll/);
});

test("Скрытие попапа при клике на оверлей", async({headerInitialize}) => {
	const header = headerInitialize;
	await header.blindPopUp.click();
	await header.blindVersionPanel.click();
	await expect(header.blindVersionPanel).toHaveClass(/show/);
	await header.overlay.click();
	await expect(header.blindVersionPanel).not.toHaveClass(/show/)
});

test("Анимация изменения ширины поля ввода поиска при фокусе в десктопной версии", async({page, headerInitialize}) => {
	const header = headerInitialize;
	await page.mouse.wheel(0, 500);
	await header.headerSearch.click();
	await expect(page.locator(".search")).toHaveCSS("max-width", "100%");
});

test("Отображение меню выбора города", async({headerInitialize}) => {
	const header = headerInitialize;
	await header.headerCityLink.click();
	await expect(header.selectCity).toHaveClass(/show/);
});

test("Выбор города", async({page, headerInitialize}) => {
	const header = headerInitialize;
	await header.headerCityLink.click();
	await page.locator("[data-slag-city='ussuriisk']").click();
	await expect(page.locator(".header__city-link")).toContainText("Уссурийск");
});

test("Поиск города", async ({page, headerInitialize}) => {
	const header = headerInitialize;
	await header.headerCityLink.click();
	await header.searchCityInput.fill("Хаба");
	await expect(page.locator("[data-slag-city='khabarovsk']")).toContainText("Хабаровск");
});

test("Отсутствие результата поиска города", async({headerInitialize}) => {
	const header = headerInitialize;
	await header.headerCityLink.click();
	await header.searchCityInput.fill("Москва");
	await expect(header.searchCityInput).toHaveClass("error");
	await expect(header.notFoundCity).toContainText("Ничего не найдено. Попробуйте изменить запрос.");
});

test("Сброс результатов поиска города при закрытии попапа выбора города", async({page, headerInitialize}) => {
	const header = headerInitialize;
	await header.headerCityLink.click();
	await header.searchCityInput.fill("Благовещенск");
	await page.locator("#selectCity > div.popup-header > button").click();
	await header.headerCityLink.click();
	await expect(header.searchCityInput).not.toContainText("Благовещенск");
});

test("Отображение меню Для слабовидящих для десктопной версии", async({headerInitialize}) => {
	const header = headerInitialize;
	await header.blindPopUp.click();
	await expect(header.blindVersionPanel).toBeVisible();
});

test("смена размера шрифта для слабовидящих", async({page, headerInitialize}) => {
	const header = headerInitialize;
	await header.blindPopUp.click();
	await page.locator("[for='150']").click();
	await expect(page.locator("html")).toHaveAttribute("style", /font-size: 125%;/)
	await page.locator("[for='200']").click();
	await expect(page.locator("html")).toHaveAttribute("style", /font-size: 150%;/)
	await page.locator("[for='100']").click();
	await expect(page.locator("html")).toHaveAttribute("style", /font-size: 100%;/)
});

test("смена цветовой схемы для слабовидящих", async({page, headerInitialize}) => {
	const header = headerInitialize;
	await header.blindPopUp.click();
	await page.locator("[for='dark']").click();
	await expect(page.locator("body")).toHaveClass(/theme-dark/);
	await page.locator("[for='invert']").click();
	await expect(page.locator("html")).toHaveClass(/theme-invert/);
	await page.locator("[for='light']").click();
});

test("Отображение попапа результатов поиска при количестве введенных символов больше двух", async({headerInitialize}) => {
	const header = headerInitialize;
	await header.headerSearch.fill("ана");
	await expect(header.headerSearchResult).toHaveClass(/header__search-result_show/);
	await expect(header.headerSearchResultItem.first()).toBeEnabled();
});

test("негативное Отображение попапа результатов поиска", async({page, headerInitialize}) => {
	const header = headerInitialize;
	await header.headerSearch.fill("fyf");
	await expect(header.headerSearchResult).toHaveClass(/header__search-result_show/);
	await expect(page.locator(".search-result__no-result")).toBeVisible()
});

test("сокрытие попапа при количестве введенных символов меньше трех", async({page, headerInitialize}) => {
	const header = headerInitialize;
	await header.headerSearch.fill("ана");
	await expect(header.headerSearchResult).toHaveClass(/header__search-result_show/);
	await header.headerSearch.fill("ан");
	await expect(header.headerSearchResult).not.toHaveClass(/header__search-result_show/);
});

test("Сокрытие попапа результата поиска при клике во вне попапа", async({page, headerInitialize}) => {
	const header = headerInitialize;
	await header.headerSearch.fill("ана");
	await expect(header.headerSearchResult).toHaveClass(/header__search-result_show/);
	await page.mouse.click(100, 0);
	await expect(header.headerSearchResult).not.toHaveClass(/header__search-result_show/);
});

test("Переход на страницу результата поиска при нажатии клавиши Enter", async({page, headerInitialize}) => {
	const header = headerInitialize;
	await header.headerSearch.fill("анализ");
	await page.keyboard.press("Enter");
	await expect(page).toHaveURL(/search\/\?q=/);
});