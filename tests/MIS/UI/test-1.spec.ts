import { test, expect, type Page, chromium } from '@playwright/test';
import axios from "axios";

test.use({
    viewport: { width: 1920, height: 1080 },
    trace: 'on-first-retry',
    ignoreHTTPSErrors: true,
    locale: "ru-RU",
})

test("Проверка наличия полей ввода и кнопок для смены пароля @Tttttttt3", async ({}) => {

    const url1 = "http://vlgwkcontrol.no-ip.org:38190/login/";
    const url2 = "http://10.25.1.88:8005/login";

    let urlToUse:string;

    try {
        const response1 = await axios.get(url1);
        if (response1.status >= 200 && response1.status < 400) {
            urlToUse = url1;
        } else {
            throw new Error(`Ошибка: статус-код первого URL: ${response1.status}`);
        }
        } catch (error) {
            urlToUse = url2;
        };

    const browser = await chromium.launch({executablePath: "C:\\Users\\gribanov.pa\\AppData\\Local\\Yandex\\YandexBrowser\\Application\\browser.exe"});
    const page = await browser.newPage();

    await page.goto(urlToUse);

    await page.locator("#id_username").click();
    await page.locator("#id_username").pressSequentially("test3_ttt", {delay: 500});

    await page.locator("#id_password").click();
    await page.locator("#id_password").pressSequentially("uni_987572*msa", {delay: 500});

    await page.locator("#login-form-content-main > form > button").click();

    await test.step("Step 1", async() => {
        await expect(page.locator("#breadcrumbs-container")).toContainText("Главная страница");
    });




    await page.goto(urlToUse);



    await test.step("Step 2", async() => {
        const menuSelector = page.locator("#user-menu");

        await expect(menuSelector).toBeVisible();
        await menuSelector.click();
    });

    await test.step("Step 3", async() => {
        const linkSelector = page.locator("#user-menu-block > ul > li:nth-child(1) > a");

        await expect(linkSelector).toBeVisible();
        await linkSelector.click();
    });

    const tab1 = await page.waitForEvent("popup");



    await test.step("Step 4", async() => {
        await expect(tab1).toHaveURL(/wo\/profile\/view\//);
        await expect(tab1.locator(".header")).toContainText("Изменение своего пароля");
    });

    await test.step("Step 5", async() => {
        await expect(tab1.locator("#id_old_password")).toBeVisible();
    });

    await test.step("Step 6", async() => {
        await expect(tab1.locator("#id_new_password1")).toBeVisible();
    });

    await test.step("Step 7", async() => {
        await expect(tab1.locator("#id_new_password2")).toBeVisible();
    });

    await test.step("Step 8 ", async() => {
        await expect(tab1.locator("#container > form > div.button-place.sticky > div > button.btn-cancel")).toBeVisible();
    });

    await test.step("Step 9", async() => {
        await expect(tab1.locator("#container > form > div.button-place.sticky > button.btn-ok")).toBeVisible();
    });
});
