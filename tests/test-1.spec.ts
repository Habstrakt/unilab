import {test, expect} from "@playwright/test";
import { qase } from 'playwright-qase-reporter';

import { login, openNewTab } from "./utils";


test("Наличие полей ввода и кнопок для смены пароля", async ({ browser }) => {
    qase.id(3);
    qase.title("MIS-3: Наличие полей ввода и кнопок для смены пароля");

    const context = await browser.newContext();
    const page = await context.newPage();

    await login(page, "test3_ttt", "uni_987572*msa");

    //  Step #4
    const newTab = await openNewTab(context, page, "#user-menu", "#user-menu-block > ul > li:nth-child(1) > a", "Изменение своего пароля");

    const oldPassword = newTab.locator("#id_old_password");
    const newPassword = newTab.locator("#id_new_password1");
    const confirmNewPassword = newTab.locator("#id_new_password2");

    // Step #5
    await expect(oldPassword).toBeVisible();

    // Step #6
    await expect(newPassword).toBeVisible();

    // Step #7
    await expect(confirmNewPassword).toBeVisible();

    // Step #8
    await expect(newTab.locator("#container > form > div.button-place.sticky > div > button.btn-cancel")).toBeVisible();

    // Step #9
    await expect(newTab.locator("#container > form > div.button-place.sticky > button.btn-ok")).toBeVisible();

    await newTab.close();
    await page.close();
});
