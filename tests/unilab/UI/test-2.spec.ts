import { test, expect } from '@playwright/test';

test.use({
    viewport: {width: 1920, height:1080},
    locale: "ru-RU",
});

test("проверка городов в шапке", async ({ page }) => {
    // переходим на сайт
    await page.goto("https://dev.unilab.su/");

    const headerSelector = ".header__city-link"; // город в шапке
    const citySelector = "li a[data-city-id]"; // селектор города

    await page.click(headerSelector); // кликаем на город для открытия поп-апа

    const cities = page.locator(citySelector); // находим все найденные теги в переменную
    const countCities = await cities.count(); // считаем их

    // запускаем итерацию пока не кончатся города в списке
    for (let i = 0; i < countCities; i++) {
        await page.click(headerSelector); // кликаем на город в шапке

        const cityNameLocator = page.locator(`:nth-match(${citySelector}, ${i + 1})`);
        const cityName = (await cityNameLocator.textContent())?.trim();

        await cityNameLocator.click();

        const displayedCityName = (await page.textContent(headerSelector))?.trim();

        expect(cityName).toBe(displayedCityName);
    }

    page.close();
});