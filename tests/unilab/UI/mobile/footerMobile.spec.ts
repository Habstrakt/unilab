import { devices, expect } from '@playwright/test';
import { test } from "../../../../fixtures/Fixture"

test.use({
	locale: "ru-RU",
	geolocation: {latitude: 50.272796, longitude: 127.526943},
	permissions: ['geolocation'],
	...devices["Pixel 7"],
	isMobile: true
});

test("Работа аккордеона в футтере в мобильной версии", async({page}) => {
	const navItemsTitle = await page.locator(".footer__nav-title").all();
	const navItems = page.locator(".footer__nav-item");

	for(const [i, navTitle] of navItemsTitle.entries()) {
		await navTitle.click()
		await expect(navItems.nth(i)).toHaveClass(/open/);
	};
});