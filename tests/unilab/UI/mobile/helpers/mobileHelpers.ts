import { HeaderPage } from '../../../../../pages/header.page';
import { Page, test, expect } from '@playwright/test';
import { BasePage } from '../../../../../pages/base.page';

export class MobileHelpers {
    static async openBurgerMenu(headerPage: HeaderPage) {
        await headerPage.burgerMenuBtn.tap();
    }

    static async closePopups(headerPage: HeaderPage) {
        await headerPage.closePopUps();
    }

    static async selectCity(headerPage: HeaderPage, page: Page, citySlug: string) {
        await this.openBurgerMenu(headerPage);
        await headerPage.headerCityLinkMobile.tap();
        await page.locator(`[data-slag-city='${citySlug}']`).tap();
        await this.openBurgerMenu(headerPage);
    }

    static async navigateToSection(
        basePage: BasePage,
        headerPage: HeaderPage,
        sectionLocator: any
    ) {
        await test.step("Подтвердить город и открыть раздел", async() => {
            await expect(basePage.btnYes).toBeVisible();
            await basePage.btnYes.tap();

            await expect(headerPage.burgerMenuBtn).toBeVisible();
            await headerPage.burgerMenuBtn.tap();

            await expect(sectionLocator).toBeVisible();
            await sectionLocator.tap();
        });
    }
}
