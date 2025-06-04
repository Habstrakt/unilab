import { test, devices, expect } from '@playwright/test';
import { HeaderPage } from '../../../../pages/header.page';

let headerPage: HeaderPage;

test.use({
	locale: "ru-RU",
	geolocation: {latitude: 50.272796, longitude: 127.526943},
	permissions: ["geolocation"],
	...devices["Pixel 7"],
	isMobile: true
});

test.beforeEach(async({page}) => {
	headerPage = new HeaderPage(page);
	await page.goto("/", {waitUntil: "domcontentloaded"});
});

test("Проверить открытие бургер-меню в мобильной версии", async () => {
	await test.step("Тапнуть на бургер-меню", async() => {
		await headerPage.burgerMenuBtn.tap();
	});
	await test.step("Проверить что бургер-меню открыто", async() => {
		await expect(headerPage.burgerMenuBtn).toHaveClass(/burger_open/);
	});
});

test("Проверить закрытие бургер-меню в мобильной версии", async() => {
	await test.step("Тапнуть на бургер-меню", async() => {
		await headerPage.burgerMenuBtn.tap();
	});
	await test.step("Проверить что бургер-меню открыто",  async() => {
		await expect(headerPage.burgerMenuBtn).toHaveClass(/burger_open/);
	});
	await test.step("Тапнуть на бургер-меню еще раз" , async() => {
		await headerPage.burgerMenuBtn.tap();
	});
	await test.step("Проверить что бургер-меню закрыто", async() => {
		await expect(headerPage.burgerMenuBtn).not.toHaveClass(/burger_open/);
	});
});

test("Проверить работу переключателя темной/светлой версии в бургер-меню в мобильной версии", async({page}) => {
	await test.step("Тапнуть на бургер-меню", async() => {
		await headerPage.burgerMenuBtn.tap();
	});
	await test.step("Тапнуть на ползунок изменения цветовой темы" , async() => {
		await headerPage.themeSwitcher.tap();
	})
	await test.step("Проверить что тема изменена на темную", async() => {
		await expect(page.locator("body")).toHaveClass(/theme-dark/);
	});
	await test.step("Тапнуть на ползунок цветовой схемы еще раз", async() => {
		await headerPage.themeSwitcher.tap();
	});
	await test.step("Проверить что тема изменена на светлую", async() => {
		await expect(page.locator("body")).not.toHaveClass(/theme-dark/);
	});
});

test("Проверить отсутствие скролла страници при открытом бургер-меню в мобильной версии", async({page}) => {
	await test.step("Тапнуть на бургер-меню", async() => {
		await headerPage.burgerMenuBtn.tap();
	});
	await test.step("Проверить что скролл страницы отсутствует", async() => {
		await expect(page.locator("#navbarScroll")).not.toHaveClass(/navbar_scrollable/);
	});
});

test("Проверить анимацию изменения ширины поля ввода поиска при фокусе в мобильной версии", async({page}) => {
	await test.step("Закрыть всплывающее окно", async() => {
		await headerPage.closePopUps();
	});
	await test.step("Проверить что поле поиска имеет максимальную ширину", async() => {
		await expect(page.locator(".search")).toHaveCSS("max-width", "100%");
	});
	await test.step("Проскролить страницу вниз на 500px", async() => {
		await page.mouse.wheel(0, 500);
	});
	await test.step("Дождаться прогрузки js-скрипта", async() => {
		await page.waitForTimeout(1000);
	});
	await test.step("Проверить что поле поиска изменило ширину", async() => {
		await expect(page.locator(".search")).not.toHaveCSS("max-width", "100%");
	});
});

test("Проверить отображение меню выбора города в мобильной версии", async() => {
	await test.step("Закрыть всплывающее окно", async() => {
		await headerPage.closePopUps();
	});
	await test.step("Тапнуть на бургер-меню", async() => {
		await headerPage.burgerMenuBtn.tap();
	});
	await test.step("Тапнуть на ссылку выбора города", async() => {
		await headerPage.headerCityLinkMobile.tap();
	});
	await test.step("Проверить что меню выбора города отобржается", async() => {
		await expect(headerPage.selectCity).toBeVisible();
	});
});

test("Проверить выбор города в мобильной версии", async({page}) => {
	await test.step("Закрыть всплывающее окно", async() => {
		await headerPage.closePopUps();
	});
	await test.step("Тапнуть на бургер-меню", async() => {
		await headerPage.burgerMenuBtn.tap();
	});
	await test.step("Тапнуть на ссылку выбора города", async() => {
		await headerPage.headerCityLinkMobile.tap();
	});
	await test.step("Выбрать город 'Уссурийск'", async() => {
		await page.locator("[data-slag-city='ussuriisk']").tap();
	});
	await test.step("Тапнуть на бургер-меню", async() => {
		await headerPage.burgerMenuBtn.tap();
	});
	await test.step("Проверить что в бургер меню отображается город 'Уссурийск'", async() => {
		await expect(headerPage.headerCityLinkMobile).toContainText("Уссурийск");
	});
});

test("Проверить поиск города в мобильной версии", async({page}) => {
	await test.step("Закрыть всплывающее окно", async() => {
		await headerPage.closePopUps();
	});
	await test.step("Тапнуть на бургер-меню", async() => {
		await headerPage.burgerMenuBtn.tap();
	});
	await test.step("Тапнуть на ссылку выбора города", async() => {
		await headerPage.headerCityLinkMobile.tap();
	});
	await test.step("Ввести текст 'Хаба' в поле поиска города", async() => {
		await headerPage.searchCityInput.fill("Хаба");
	});
	await test.step("Проверить что город 'Хабаровск' отображается в результатах поиска", async() => {
		await expect(page.locator("[data-slag-city='khabarovsk']")).toContainText("Хабаровск");
	});
});

test("Проверить отсутствие результата поиска города", async() => {
	await test.step("Закрыть всплывающее окно", async() => {
		await headerPage.closePopUps();
	});
	await test.step("Тапнуть на бургер-меню", async() => {
		await headerPage.burgerMenuBtn.tap();
	});
	await test.step("Тапнуть на ссылку выбора города", async() => {
		await headerPage.headerCityLinkMobile.tap();
	});
	await test.step("ВВести текст 'Москва' в поле поиска города", async() => {
		await headerPage.searchCityInput.fill("Москва");
	});
	await test.step("Проверить что поле поиска имеет класс 'error'", async() => {
		await expect(headerPage.searchCityInput).toHaveClass("error");
	});
	await test.step("Проверить что отображается сообщение 'Ничего не найдено. Попробуйте изменить запрос.'", async() => {
		await expect(headerPage.notFoundCity).toContainText("Ничего не найдено. Попробуйте изменить запрос.");
	});
});

test("Проверить отображение попапа результатов поиска при количестве введенных символов больше двух", async() => {
	await test.step("Закрыть всплывающее окно", async() => {
		await headerPage.closePopUps();
	});
	await test.step("Ввести текст 'ана' в поле поиска", async() => {
		await headerPage.headerSearch.fill("ана");
	});
	await test.step("Проверить что попап результатов поиска отображается", async() => {
		await expect(headerPage.headerSearchResult).toHaveClass(/header__search-result_show/);
	});
	await test.step("Проверить что в попапе результатов поиска отображается хотя бы один элемент", async() => {
		await expect(headerPage.headerSearchResultItem.first()).toBeEnabled();
	});
});

test("Проверить отображение попапа об отсутствии результатов поиска", async({page}) => {
	await test.step("Закрыть всплывающее окно", async() => {
		await headerPage.closePopUps();
	});
	await test.step("Ввести текст 'fyf' в поле поиска", async() => {
		await headerPage.headerSearch.fill("fyf");
	});
	await test.step("Проверить что попап результатов поиска отображается", async() => {
		await expect(headerPage.headerSearchResult).toHaveClass(/header__search-result_show/);
	});
	await test.step("Проверить что отображается сообщение об отсутствии результатов поиска", async() => {
		await expect(page.locator(".search-result__no-result")).toBeVisible()
	});
});

