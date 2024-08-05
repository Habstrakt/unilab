import {test, expect} from "@playwright/test";
import { describe } from "node:test";
import { qase } from 'playwright-qase-reporter';
import axios from "axios";

describe("Убедиться, что на странице смены пароля присутствуют необходимые поля ввода и кнопки для смены пароля.", () => {
    test("Наличие полей ввода и кнопок для смены пароля", async ({browser}) => {
        qase.id(3);
        qase.title("Наличие полей ввода и кнопок для смены пароля");

        const context = await browser.newContext();
        const page = await context.newPage();

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
                console.error(error);
                urlToUse = url2;
            };



        await page.goto(urlToUse);

        await page.locator("#id_username").fill("test3_ttt");
        await page.locator("#id_password").fill("uni_987572*msa");
        await page.locator("#login-form-content-main > form > button").click();

        await test.step("Step 1", async() => {
            await expect(page.locator("#breadcrumbs-container")).toContainText("Главная страница");
        });

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

        const newTab = await context.waitForEvent("page");

        await test.step("Step 4", async() => {
            await expect(newTab.locator(".header")).toContainText("Изменение своего пароля");
        });

        await test.step("Step 5", async() => {
            await expect(newTab.locator("#id_old_password")).toBeVisible();
        });

        await test.step("Step 6", async() => {
            await expect(newTab.locator("#id_new_password1")).toBeVisible();
        });

        await test.step("Step 7", async() => {
            await expect(newTab.locator("#id_new_password2")).toBeVisible();
        });

        await test.step("Step 8 ", async() => {
            await expect(newTab.locator("#container > form > div.button-place.sticky > div > button.btn-cancel")).toBeVisible();
        });

        await test.step("Step 9", async() => {
            await expect(newTab.locator("#container > form > div.button-place.sticky > button.btn-ok")).toBeVisible();
        });
    });
});