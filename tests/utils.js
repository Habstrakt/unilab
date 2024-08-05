import { test, expect } from "@playwright/test";

// функция для авторизации в МИС
const login = async (page, username, password) => {
    await page.goto("http://10.25.1.88:8005/login/");

    await page.locator("#id_username").fill(username);
    await page.locator("#id_password").fill(password)
    await page.locator("#login-form-content-main > form > button").click();

   // await expect(page).toHaveURL("http://10.25.1.88:8005/wo/");
}

// открытия вкладки для смены пароля
const openNewTab = async (context, page, menuSelector, linkSelector, expectedHeaderText) => {

    await test.step("Step 2", async () => {
        await page.locator(menuSelector).click();
    });

    await test.step("Step 3", async () => {
        await page.locator(linkSelector).click();
    });

    // await page.locator(menuSelector).click();
    // await page.locator(linkSelector).click();

    const newTab = await context.waitForEvent("page");

    const headerText = (await newTab.locator(".header").textContent()).trim();

    await test.step("Step 4", async () => {
        expect(headerText).toBe(expectedHeaderText);
    })


    return newTab;
}

export {login, openNewTab};