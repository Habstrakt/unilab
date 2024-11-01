import { expect } from '@playwright/test';
import { test } from "../../../../fixtures/Fixture"

test("Работа аккордеона в футтере в мобильной версии", async({page}) => {
	const navItemsTitle = await page.locator(".footer__nav-title").all();
	const navItems = page.locator(".footer__nav-item");

	for(const [i, navTitle] of navItemsTitle.entries()) {
		await navTitle.click()
		await expect(navItems.nth(i)).toHaveClass(/open/);
	};
});