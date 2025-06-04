import { test, expect, Locator, Page } from '@playwright/test';
import { HeaderPage } from '../../../../pages/header.page';

let headerPage: HeaderPage;

test.beforeEach(async({page}: {page: Page}) => {
	headerPage = new HeaderPage(page);
	await page.goto("/", {waitUntil: "domcontentloaded"})
});

test("Проверить изменение шапки сайта при скроле", async({page}: {page: Page}): Promise<void> => {
	await test.step("Проскролить страницу вниз на 500px", async(): Promise<void> => {
		await page.mouse.wheel(0, 500);
	});
	await test.step("Проверить, что body имеет класс 'js-scroll'", async(): Promise<void> => {
		await expect(page.locator("body")).toHaveClass(/js-scroll/);
	});
});

test("Проверить скрытие попапа при клике на оверлей", async(): Promise<void> => {
	await test.step("Открыть попап для слабовидящих", async(): Promise<void> => {
		await headerPage.blindPopUp.click();
	});
	await test.step("Проверить что попап отображается", async(): Promise<void> => {
		await expect(headerPage.blindVersionPanel).toBeVisible();
	});
	await test.step("Кликнуть в любое место", async(): Promise<void> => {
		await headerPage.overlay.click();
	});
	await test.step("Проверить что попап скрыт", async(): Promise<void> => {
		await expect(headerPage.blindVersionPanel).not.toBeVisible();
	});
});

test("Проверить анимацию изменения ширины поля ввода поиска при фокусе в десктопной версии", async({page}: {page: Page}): Promise<void> => {
	await test.step("Проскролить страницу вниз на 500px", async(): Promise<void> => {
		await page.mouse.wheel(0, 500);
	});
	await test.step("Кликнуть на поле ввода поиска", async(): Promise<void> => {
		await headerPage.headerSearch.click();
	});
	await test.step("Проверить что поле ввода имеет максимальную ширину 100%", async(): Promise<void> => {
		await expect(page.locator(".search")).toHaveCSS("max-width", "100%");
	});
});

test("Проверить отображение меню выбора города", async(): Promise<void> => {
	await test.step("Кликнуть на ссылку выбора города", async(): Promise<void> => {
		await headerPage.headerCityLink.click();
	});
	await test.step("Проверить что меню выбора города отображается", async(): Promise<void> => {
		await expect(headerPage.selectCity).toBeVisible();
	});
});

test("Проверить выбор города в шапке сайта", async({page}: {page: Page}): Promise<void> => {
	await test.step("Кликнуть на ссылку выбора города", async(): Promise<void> => {
		await headerPage.headerCityLink.click();
	});
	await test.step("Выбрать город 'Уссурийск'", async(): Promise<void> => {
		await page.locator("[data-slag-city='ussuriisk']").click();
	});
	await test.step("Проверить что выбранный город отображается в шапке сайта", async(): Promise<void> => {
		await expect(page.locator(".header__city-link")).toContainText("Уссурийск");
	});
});

test("Проверить поиск города", async ({page}: {page: Page}): Promise<void> => {
	await test.step("Кликнуть на ссылку выбора города", async(): Promise<void> => {
		await headerPage.headerCityLink.click();
	});
	await test.step("Ввести 'Хаба' в поле поиска города", async(): Promise<void> => {
		await headerPage.searchCityInput.fill("Хаба");
	});
	await test.step("Проверить что город Хабаровск отображается в результатах поиска", async(): Promise<void> => {
		await expect(page.locator("[data-slag-city='khabarovsk']")).toContainText("Хабаровск");
	});
});

test("Проверить отсутствие результата поиска города", async(): Promise<void> => {
	await test.step("Кликнуть на ссылку выбора города", async(): Promise<void> => {
		await headerPage.headerCityLink.click();
	});
	await test.step("Ввести 'Москва' в поле поиска города", async(): Promise<void> => {
		await headerPage.searchCityInput.fill("Москва");
	});
	await test.step("Проверить что поле поиска имеет css класс 'error'", async(): Promise<void> => {
		await expect(headerPage.searchCityInput).toHaveClass("error");
	});
	await test.step("Проверить что отображается сообщение 'Ничего не найдено'", async(): Promise<void> => {
		await expect(headerPage.notFoundCity).toBeVisible();
		await expect(headerPage.notFoundCity).toContainText("Ничего не найдено. Попробуйте изменить запрос.");
	});
});

test("Проверить сброс результатов поиска города при закрытии попапа выбора города", async({page}: {page: Page}): Promise<void> => {
	await test.step("Кликнуть на ссылку выбора города", async(): Promise<void> => {
		await headerPage.headerCityLink.click();
	});
	await test.step("Ввести 'Благовещенск' в поле поиска города", async(): Promise<void> => {
		await headerPage.searchCityInput.fill("Благовещенск");
	});
	await test.step("Закрыть попап выбора города", async(): Promise<void> => {
		await page.locator("#selectCity > div.popup-header > button").click();
	});
	await test.step("Кликнуть снова на ссылку выбора города", async(): Promise<void> => {
		await headerPage.headerCityLink.click();
	});
	await test.step("Проверить что результаты поиска сбросятся и поле поиска не содержит 'Благовещенск'", async(): Promise<void> => {
		await expect(headerPage.searchCityInput).not.toContainText("Благовещенск");
	});
});

test("Проверить отображение всплывающего окна Для слабовидящих для десктопной версии", async(): Promise<void> => {
	await test.step("Кликнуть на ссылку 'Для слабовидящих'", async(): Promise<void> => {
		await headerPage.blindPopUp.click();
	});
	await test.step("Проверить что всплывающее окно 'Для слабовидящих' отображается", async(): Promise<void> => {
		await expect(headerPage.blindVersionPanel).toBeVisible();
	});
});

test("Проверить смену размера шрифта для слабовидящих", async({page}: {page: Page}): Promise<void> => {
	await test.step("Кликнуть на ссылку 'Для слабовидящих'", async(): Promise<void> => {
		await headerPage.blindPopUp.click();
	});

	await test.step("Выбрать размер шрифта 125%", async(): Promise<void> => {
		await page.locator("[for='150']").click();
	});
	await test.step("Проверить что размер шрифта изменен на 125%", async(): Promise<void> => {
		await expect(page.locator("html")).toHaveAttribute("style", /font-size: 125%;/)
	});

	await test.step("Выбрать размер шрифта 150%", async(): Promise<void> => {
		await page.locator("[for='200']").click();
	});
	await test.step("Проверить что размер шрифта изменен на 150%", async(): Promise<void> => {
		await expect(page.locator("html")).toHaveAttribute("style", /font-size: 150%;/)
	});

	await test.step("Выбрать размер шрифта 100%", async(): Promise<void> => {
		await page.locator("[for='100']").click();
	});
	await test.step("Проверить что размер шрифта изменен на 100%", async(): Promise<void> => {
		await expect(page.locator("html")).toHaveAttribute("style", /font-size: 100%;/)
	});
});

test("Проверить смену цветовой схемы для слабовидящих", async({page}: {page: Page}): Promise<void> => {
	await test.step("Кликнуть на ссылку 'Для слабовидящих'", async() => {
		await headerPage.blindPopUp.click();
	});

	await test.step("Выбрать темную тему", async(): Promise<void> => {
		await page.locator("[for='dark']").click();
	});
	await test.step("Проверить что применена темная тема", async(): Promise<void> => {
		await expect(page.locator("body")).toHaveClass(/theme-dark/);
	});

	await test.step("Выбрать инвертированную цветовую схему", async(): Promise<void> => {
		await page.locator("[for='invert']").click();
	});
	await test.step("Проверить что применена инвертированная тема", async(): Promise<void> => {
		await expect(page.locator("html")).toHaveClass(/theme-invert/);
	});

	await test.step("Выбрать светлую тему", async(): Promise<void> => {
		await page.locator("[for='light']").click();
	});
	await test.step("Проверить что применена светлая тема", async(): Promise<void> => {
		await expect(page.locator("body")).toHaveCSS("background-color", "rgb(255, 255, 255)");
	});
});

test("Проверить отображение попапа результатов поиска при количестве введенных символов больше двух", async(): Promise<void> => {
	await test.step("Ввести 'ана' в поле поиска", async(): Promise<void> => {
		await headerPage.headerSearch.fill("ана");
	});
	await test.step("Проверить что попап с результатами поиска отображается", async(): Promise<void> => {
		await expect(headerPage.headerSearchResult).toBeVisible();
	});
	await test.step("Проверить что первый элемент в результатах поиска доступен", async(): Promise<void> => {
		await expect(headerPage.headerSearchResultItem.first()).toBeEnabled();
	});
});

test("Проверить негативное отображение попапа результатов поиска", async(): Promise<void> => {
	await test.step("Ввести 'fyf' в поле поиска", async() => {
		await headerPage.headerSearch.fill("fyf");
	});
	await test.step("Проверить что попап с результатами поиска отображается", async(): Promise<void> => {
		await expect(headerPage.headerSearchResult).toBeVisible();
	});
	await test.step("Проверить что отображается сообщение об отсутствии результатов", async(): Promise<void> => {
		await expect(headerPage.noResultSearch).toBeVisible()
	});
});

test("Проверить скрытие попапа при количестве введенных символов меньше трех", async(): Promise<void> => {
	await test.step("Ввести 'ана' в поле поиска", async() => {
		await headerPage.headerSearch.fill("ана");
	});
	await test.step("Проверить что попап с результатами поиска отображается", async(): Promise<void> => {
		await expect(headerPage.headerSearchResult).toBeVisible();
	});
	await test.step("Удалить один символ из поля поиска", async(): Promise<void> => {
		await headerPage.headerSearch.fill("ан");
	});
	await test.step("Проверить что попап с результатами поиска скрыт", async(): Promise<void> => {
		await expect(headerPage.headerSearchResult).not.toBeVisible();
	});
});

test("Проверить скрытие попапа результата поиска при клике во вне попапа", async({page}: {page: Page}) => {
	await test.step("Ввести 'ана' в поле поиска", async() => {
		await headerPage.headerSearch.fill("ана");
	});
	await test.step("Проверить что попап с результатами поиска отображается", async(): Promise<void> => {
		await expect(headerPage.headerSearchResult).toBeVisible();
	});
	await test.step("Кликнуть вне попапа", async(): Promise<void> => {
		await page.mouse.click(0, 100);
	});
	await test.step("проверить что попап с результатами поиска скрыт", async(): Promise<void> => {
		await expect(headerPage.searchResult).toBeVisible();
	});
});

test("Проверить переход на страницу результата поиска при нажатии клавиши Enter", async({page}: {page: Page}): Promise<void> => {
	await test.step("Ввести 'анализ' в поле поиска", async(): Promise<void> => {
		await headerPage.headerSearch.fill("анализ");
	});
	await test.step("Нажать клавишу 'Enter'", async(): Promise<void> => {
		await page.keyboard.press("Enter");
	});
	await test.step("Проверить что произошел переход на страницу результата поиска", async(): Promise<void> => {
		await expect(page).toHaveURL(/search\/\?q=/);
	});
});