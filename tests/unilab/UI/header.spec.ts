import { test, expect } from '@playwright/test';
import { Header } from '../../../pages/main.page';

test.use({
	locale: "ru-RU",
	geolocation: {latitude: 50.272796, longitude: 127.526943},
	permissions: ['geolocation'],
});
test("Изменение шапки при скролле", async({page}) => {
	const header = new Header(page);

	await header.goToUrl();
	await header.closePopUps();
	await page.mouse.wheel(0, 500);
	await expect(page.locator("body")).toHaveClass(/js-scroll/);
});

test("Открытие бургер-меню в мобильной версии", async ({page}) => {
	const header = new Header(page);

	await header.goToUrl();
	await header.closePopUps();

	await header.burgerMenuBtn.tap();
	await header.navBarDropDown.tap();

	await expect(page.getByRole('link', { name: 'Важно и полезно' })).toHaveClass(/show/);
});

test("Закрытие бургер-меню в мобильной версии", async({page}) => {
	const header = new Header(page);

	await header.goToUrl();
	await header.closePopUps();

	await header.burgerMenuBtn.tap();
	await header.navBarDropDown.tap();

	await expect(page.getByRole('button', { name: 'Важно и полезно' })).toHaveClass(/show/);

	await header.navBarDropDown.tap();
	await expect(page.getByRole('button', { name: 'Важно и полезно' })).not.toHaveClass(/show/);
});

test("Работа переключателя темной/светлой версии в бургер-меню в мобильной версии", async({page}) => {
	const header = new Header(page);

	await header.goToUrl();
	await header.closePopUps();

	await header.burgerMenuBtn.tap();

	await header.themeSwitcher.tap();
	await expect(page.locator("body")).toHaveClass(/theme-dark/);

	await header.themeSwitcher.tap();
	await expect(page.locator("body")).not.toHaveClass(/theme-dark/);
});

test("Скрытие попапа при клике на оверлей", async({page}) => {
	const header = new Header(page);

	await header.goToUrl();
	await header.closePopUps();
	await header.blindVersionPanel.click();

	await header.blindPopUp.click();
	await expect(page.locator("#blindVersionPanel")).toHaveClass(/show/);
	await header.overlay.click();
	await expect(page.locator("#blindVersionPanel")).not.toHaveClass(/show/)
});

test("Отсутствие скролла страници при открытом бургер-меню в мобильной версии", async({page}) => {
	const header = new Header(page);

	await header.goToUrl();
	await header.closePopUps();

	await header.burgerMenuBtn.tap();
	await expect(page.locator("#navbarScroll")).not.toHaveClass(/navbar_scrollable/);
});

test("Анимация изменения ширины поля ввода поиска при фокусе в десктопной версии", async({page}) => {
	const header = new Header(page);

	await header.goToUrl();
	await header.closePopUps();

	await page.mouse.wheel(0, 500);

	await header.headerSearchInput.click()
	await expect(page.locator(".header__search")).toHaveCSS("max-width", "100%");
});

test("Отображение меню выбора города", async({page}) => {
	const header = new Header(page);

	await header.goToUrl();
	await header.headerCityLink.click();
	await expect(page.locator(".select-city")).toHaveClass(/show/);
});

test("Выбор города", async({page}) => {
	const header = new Header(page);

	await header.goToUrl();
	await header.headerCityLink.click();

	await page.locator("[data-slag-city='ussuriisk']").click();

	await expect(page.locator(".header__city-link")).toContainText("Уссурийск");
});

test("Поиск города", async ({page}) => {
	const header = new Header(page);

	await header.goToUrl();
	await header.headerCityLink.click();
	await header.searchCityInput.fill("Хаба");
	await expect(page.locator("[data-slag-city='khabarovsk']")).toContainText("Хабаровск");
});

test("Отсутствие результата поиска", async({page}) => {
	const header = new Header(page);

	await header.goToUrl();
	await header.headerCityLink.click();
	await header.searchCityInput.fill("Москва");

	await expect(page.locator("#searchCityInput")).toHaveClass("error");
	await expect(page.locator("#selectCity > div.popup-header > div.select-city__not-found-popup.toast > div")).toContainText("Ничего не найдено. Попробуйте изменить запрос.");
});

test("Сброс результатов поиска города при закрытии попапа выбора города", async({page}) => {
	const header = new Header(page);


});


