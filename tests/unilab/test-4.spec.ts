import {test, expect} from "@playwright/test";

test.use({
    viewport: {width: 1920, height:1080},
    locale: "ru-RU",
});

test("проверка слайдера", async ({page}) => {

    const url = "https://unilab.su"

    await page.goto(url);

    await page.click(".btn-yes-js");

    const sliders = page.locator(".promo-swiper .swiper-slide");
    const slidersCount = await sliders.count();



    for (let i = 0; i < slidersCount; i++) {
        await sliders.nth(i).click();
        page.goBack({waitUntil: "domcontentloaded"});
    }

});