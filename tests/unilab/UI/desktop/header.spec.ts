import { test, expect } from '@playwright/test';
import { HeaderPage } from '../../../../pages/header.page';

test.use({
	locale: "ru-RU",
	geolocation: {latitude: 50.272796, longitude: 127.526943},
	permissions: ['geolocation'],
});

test.beforeEach(async({page}) => {
	await page.goto("/", {waitUntil: "domcontentloaded"})
});

test("Изменение шапки при скролле", async({page}) => {
	await page.mouse.wheel(0, 500);
	await expect(page.locator("body")).toHaveClass(/js-scroll/);
});

test("Скрытие попапа при клике на оверлей", async({page}) => {
	const headerPage = new HeaderPage(page);
	await headerPage.blindPopUp.click();
	await headerPage.blindVersionPanel.click();
	await expect(headerPage.blindVersionPanel).toHaveClass(/show/);
	await headerPage.overlay.click();
	await expect(headerPage.blindVersionPanel).not.toHaveClass(/show/)
});

test("Анимация изменения ширины поля ввода поиска при фокусе в десктопной версии", async({page}) => {
	const headerPage = new HeaderPage(page);
	await page.mouse.wheel(0, 500);
	await headerPage.headerSearch.click();
	await expect(page.locator(".search")).toHaveCSS("max-width", "100%");
});

test("Отображение меню выбора города", async({page}) => {
	const headerPage = new HeaderPage(page);
	await headerPage.headerCityLink.click();
	await expect(headerPage.selectCity).toHaveClass(/show/);
});

test("Выбор города", async({page}) => {
	const headerPage = new HeaderPage(page);
	await headerPage.headerCityLink.click();
	await page.locator("[data-slag-city='ussuriisk']").click();
	await expect(page.locator(".header__city-link")).toContainText("Уссурийск");
});

test("Поиск города", async ({page}) => {
	const headerPage = new HeaderPage(page);
	await headerPage.headerCityLink.click();
	await headerPage.searchCityInput.fill("Хаба");
	await expect(page.locator("[data-slag-city='khabarovsk']")).toContainText("Хабаровск");
});

test("Отсутствие результата поиска города", async({page}) => {
	const headerPage = new HeaderPage(page);
	await headerPage.headerCityLink.click();
	await headerPage.searchCityInput.fill("Москва");
	await expect(headerPage.searchCityInput).toHaveClass("error");
	await expect(headerPage.notFoundCity).toContainText("Ничего не найдено. Попробуйте изменить запрос.");
});

test("Сброс результатов поиска города при закрытии попапа выбора города", async({page}) => {
	const headerPage = new HeaderPage(page);
	await headerPage.headerCityLink.click();
	await headerPage.searchCityInput.fill("Благовещенск");
	await page.locator("#selectCity > div.popup-header > button").click();
	await headerPage.headerCityLink.click();
	await expect(headerPage.searchCityInput).not.toContainText("Благовещенск");
});

test("Отображение меню Для слабовидящих для десктопной версии", async({page}) => {
	const headerPage = new HeaderPage(page);
	await headerPage.blindPopUp.click();
	await expect(headerPage.blindVersionPanel).toBeVisible();
});

test("смена размера шрифта для слабовидящих", async({page}) => {
	const headerPage = new HeaderPage(page);
	await headerPage.blindPopUp.click();
	await page.locator("[for='150']").click();
	await expect(page.locator("html")).toHaveAttribute("style", /font-size: 125%;/)
	await page.locator("[for='200']").click();
	await expect(page.locator("html")).toHaveAttribute("style", /font-size: 150%;/)
	await page.locator("[for='100']").click();
	await expect(page.locator("html")).toHaveAttribute("style", /font-size: 100%;/)
});

test("смена цветовой схемы для слабовидящих", async({page}) => {
	const headerPage = new HeaderPage(page);
	await headerPage.blindPopUp.click();
	await page.locator("[for='dark']").click();
	await expect(page.locator("body")).toHaveClass(/theme-dark/);
	await page.locator("[for='invert']").click();
	await expect(page.locator("html")).toHaveClass(/theme-invert/);
	await page.locator("[for='light']").click();
});

test.only("Отображение попапа результатов поиска при количестве введенных символов больше двух", async({page}) => {
	const headerPage = new HeaderPage(page);
	await headerPage.headerSearch.fill("ана");
	await expect(headerPage.headerSearchResult).toHaveClass(/header__search-result_show/);
	await expect(headerPage.headerSearchResultItem.first()).toBeEnabled();
});

test("негативное Отображение попапа результатов поиска", async({page}) => {
	const headerPage = new HeaderPage(page);
	await headerPage.headerSearch.fill("fyf");
	await expect(headerPage.headerSearchResult).toHaveClass(/header__search-result_show/);
	await expect(page.locator(".search-result__no-result")).toBeVisible()
});

test("сокрытие попапа при количестве введенных символов меньше трех", async({page}) => {
	const headerPage = new HeaderPage(page);
	await headerPage.headerSearch.fill("ана");
	await expect(headerPage.headerSearchResult).toHaveClass(/header__search-result_show/);
	await headerPage.headerSearch.fill("ан");
	await expect(headerPage.headerSearchResult).not.toHaveClass(/header__search-result_show/);
});

test("Сокрытие попапа результата поиска при клике во вне попапа", async({page}) => {
	const headerPage = new HeaderPage(page);
	await headerPage.headerSearch.fill("ана");
	await expect(headerPage.headerSearchResult).toHaveClass(/header__search-result_show/);
	await page.mouse.click(100, 0);
	await expect(headerPage.headerSearchResult).not.toHaveClass(/header__search-result_show/);
});

test("Переход на страницу результата поиска при нажатии клавиши Enter", async({page}) => {
	const headerPage = new HeaderPage(page);
	await headerPage.headerSearch.fill("анализ");
	await page.keyboard.press("Enter");
	await expect(page).toHaveURL(/search\/\?q=/);
});