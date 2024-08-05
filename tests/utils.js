import { expect } from "@playwright/test";

// функция для авторизации в МИС
const login = async (page, username, password) => {
    await page.goto("http://vlgwkcontrol.no-ip.org:38190/login");

    await page.locator("#id_username").fill(username);
    await page.locator("#id_password").fill(password)
    await page.locator("#login-form-content-main > form > button").click();

    //await expect(page).toHaveURL("http://vlgwkcontrol.no-ip.org:38190/wo");
}

// открытия вкладки для смены пароля
const openNewTab = async (context, page, menuSelector, linkSelector, expectedHeaderText) => {
    await page.locator(menuSelector).click();
    await page.locator(linkSelector).click();

    const newTab = await context.waitForEvent("page");

    const headerText = (await newTab.locator(".header").textContent()).trim();

    expect(headerText).toBe(expectedHeaderText);

    return newTab;
}

export {login, openNewTab};