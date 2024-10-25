import { expect } from '@playwright/test';
import { test } from "../../../../fixtures/Fixture"

test.use({
	locale: "ru-RU",
	geolocation: {latitude: 50.272796, longitude: 127.526943},
	permissions: ['geolocation'],
});

test("Изменение шапки при скролле", async({page, navigateAndInitialize}) => {
	await page.mouse.wheel(0, 500);
	await expect(page.locator("body")).toHaveClass(/js-scroll/);
});

test("Скрытие попапа при клике на оверлей", async({page, navigateAndInitialize}) => {
	const header = navigateAndInitialize;

	await header.blindPopUp.click();
	await header.blindVersionPanel.click();
	await expect(page.locator("#blindVersionPanel")).toHaveClass(/show/);
	await header.overlay.click();
	await expect(page.locator("#blindVersionPanel")).not.toHaveClass(/show/)
});


test("Анимация изменения ширины поля ввода поиска при фокусе в десктопной версии", async({page, navigateAndInitialize}) => {
	const header = navigateAndInitialize;

	await page.mouse.wheel(0, 500);

	await header.headerSearchInput.click()
	await expect(page.locator(".search")).toHaveCSS("max-width", "100%");
});

test("Отображение меню выбора города", async({page, navigateAndInitialize}) => {
	const header = navigateAndInitialize;

	await header.headerCityLink.click();
	await expect(page.locator(".select-city")).toHaveClass(/show/);
});

test("Выбор города", async({page, navigateAndInitialize}) => {
	const header = navigateAndInitialize;

	await header.headerCityLink.click();
	await page.locator("[data-slag-city='ussuriisk']").click();
	await expect(page.locator(".header__city-link")).toContainText("Уссурийск");
});

test("Поиск города", async ({page, navigateAndInitialize}) => {
	const header = navigateAndInitialize;

	await header.headerCityLink.click();
	await header.searchCityInput.fill("Хаба");
	await expect(page.locator("[data-slag-city='khabarovsk']")).toContainText("Хабаровск");
});

test("Отсутствие результата поиска города", async({page, navigateAndInitialize}) => {
	const header = navigateAndInitialize;

	await header.headerCityLink.click();
	await header.searchCityInput.fill("Москва");

	await expect(page.locator("#searchCityInput")).toHaveClass("error");
	await expect(page.locator("#selectCity > div.popup-header > div.select-city__not-found-popup.toast > div")).toContainText("Ничего не найдено. Попробуйте изменить запрос.");
});

test("Сброс результатов поиска города при закрытии попапа выбора города", async({page, navigateAndInitialize}) => {
	const header = navigateAndInitialize;

	await header.headerCityLink.click();
	await header.searchCityInput.fill("Благовещенск");
	await page.locator("#selectCity > div.popup-header > button").click();
	await header.headerCityLink.click();

	await expect(header.searchCityInput).not.toContainText("Благовещенск");
});

test("Отображение меню Для слабовидящих для десктопной версии", async({navigateAndInitialize}) => {
	const header = navigateAndInitialize;

	await header.blindPopUp.click();

	await expect(header.blindVersionPanel).toBeVisible();
});

test("Отображение попапа результатов поиска при количестве введенных символов больше двух", async({page, navigateAndInitialize}) => {
	const header = navigateAndInitialize;
	await page.locator("#searchOnSite").fill("ана");

	await expect(page.locator(".header__search-result")).toHaveClass(/header__search-result_show/);
	await expect(header.headerSearchResultItem.first()).toBeEnabled();
});

test("негативное Отображение попапа результатов поиска", async({page, navigateAndInitialize}) => {
	const header = navigateAndInitialize;

	await page.locator("#searchOnSite").fill("fyf");
	await expect(page.locator(".header__search-result")).toHaveClass(/header__search-result_show/);
	await expect(page.locator(".search-result__no-result")).toBeVisible()
});

test("сокрытие попапа при количестве введенных символов меньше трех", async({page, navigateAndInitialize}) => {
	const header = navigateAndInitialize;

	await page.locator("#searchOnSite").fill("ана");
	await expect(page.locator(".header__search-result")).toHaveClass(/header__search-result_show/);
	await page.locator("#searchOnSite").fill("ан");
	await expect(page.locator(".header__search-result")).not.toHaveClass(/header__search-result_show/);
});

test("Сокрытие попапа результата поиска при клике во вне попапа", async({page, navigateAndInitialize}) => {
	const header = navigateAndInitialize;

	await page.locator("#searchOnSite").fill("ана");
	await expect(page.locator(".header__search-result")).toHaveClass(/header__search-result_show/);
	await page.mouse.click(100, 0);
	await expect(page.locator(".header__search-result")).not.toHaveClass(/header__search-result_show/);
});

test("Переход на страницу результата поиска при нажатии клавиши Enter", async({page, navigateAndInitialize}) => {
	const header = navigateAndInitialize;

	await page.locator("#searchOnSite").fill("анализ");
	await page.keyboard.press("Enter");

	await expect(page).toHaveURL(/search\/\?q=/);
});