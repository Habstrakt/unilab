import {test, expect} from "@playwright/test";
import { qase } from 'playwright-qase-reporter';

import { login, openNewTab } from "./utils";


test("Наличие полей ввода и кнопок для смены пароля", async ({ browser }) => {
    qase.id(3);
    qase.title("MIS-3: Наличие полей ввода и кнопок для смены пароля");

    const context = await browser.newContext();
    const page = await context.newPage();

    await test.step("Step 1", async () => {
        await login(page, "test3_ttt", "uni_987572*msa");
    });

    //  Step #4
    const newTab = await openNewTab(context, page, "#user-menu", "#user-menu-block > ul > li:nth-child(1) > a", "Изменение своего пароля");



    const oldPassword = newTab.locator("#id_old_password");
    const newPassword = newTab.locator("#id_new_password1");
    const confirmNewPassword = newTab.locator("#id_new_password2");

    await test.step("Step 5", async() => {
        await expect(oldPassword).toBeVisible();
    })

    await test.step("Step 6", async() => {
        await expect(newPassword).toBeVisible();
    })

    await test.step("Step 7", async() => {
        await expect(confirmNewPassword).toBeVisible();
    })

    await test.step("Step 8", async() => {
        await expect(newTab.locator("#container > form > div.button-place.sticky > div > button.btn-cancel")).toBeVisible();
    })

    await test.step("Step 8", async() => {
        await expect(newTab.locator("#container > form > div.button-place.sticky > button.btn-ok")).toBeVisible();
    })
});