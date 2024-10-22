import {test, expect} from "@playwright/test";

test.use({
    viewport: {width: 1920, height: 1080},
    locale: "ru-RU"
});

test("", async ({page}) => {
    const url = "http://10.25.1.88:8005";

    await page.goto(url);

    await page.locator("#id_username").fill("gribanov_pa2");
    await page.locator("#id_password").fill("Habstrakt148246148");
    await page.locator("#login-form-content-main > form > button").click();

    await page.locator("#menu-body > ul > li:nth-child(4)").click();
    await page.locator("#menu-body > ul > li:nth-child(19)").click();
    await page.locator("#menu-body > ul > li:nth-child(63)").click();

    await page.getByRole('link', { name: 'Действующие вещества лекарственных препаратов' }).click();

    // кнопка создать пакетом
    await page.locator("#main-page-content > div.data-block > div > div.button-place > button").click({ timeout: 10000 });

    // элементы пагинации

    await page.waitForTimeout(4000);
    const paginator = await page.locator("#ts-data > div.paginator > span.ts-page").all();

    await page.waitForTimeout(4000);

    for(const element of paginator) {
        // чек-бокс для выбора всех элементов
        await page.waitForTimeout(4000);
        await page.locator("#ts-data > div.modal-table > table > tbody > tr:nth-child(1) > th:nth-child(1) > input").click();

    // кнопка Выбрать
        await page.locator("#winModal-content > div > form > div.button-place.sticky > button").click();

    // нажимаем "Нет" чтобы не закрывать поп-ап для добавление элементов
        await page.locator("#winConfirm-cancel-btn").click();

        await element.click();
    }
});