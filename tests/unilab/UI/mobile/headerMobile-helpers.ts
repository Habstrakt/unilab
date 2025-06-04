import { HeaderPage } from '../../../../pages/header.page';
import { test, expect } from '@playwright/test';

export async function openBurgerMenu(headerPage: HeaderPage) {
    await test.step("Открыть бургер-меню", async() => {
        await expect(headerPage.burgerMenuBtn).toBeVisible();
        await headerPage.burgerMenuBtn.tap();
        await expect(headerPage.burgerMenuBtn).toHaveClass(/burger_open/);
    });
}

export async function closeBurgerMenu(headerPage: HeaderPage) {
    await test.step("Закрыть бургер-меню", async() => {
        await headerPage.burgerMenuBtn.tap();
        await expect(headerPage.burgerMenuBtn).not.toHaveClass(/burger_open/);
    });
}

export async function openCityPopupMobile(headerPage: HeaderPage) {
    await test.step("Открыть попап выбора города", async() => {
        await openBurgerMenu(headerPage);
        await expect(headerPage.headerCityLinkMobile).toBeVisible();
        await headerPage.headerCityLinkMobile.tap();
        await expect(headerPage.selectCity).toBeVisible();
    });
}
