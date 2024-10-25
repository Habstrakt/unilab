import { expect } from '@playwright/test';
import { test } from "../../../../fixtures/Fixture"

test.only("Работа аккордеона в футтере в мобильной версии", async({page, navigateAndInitialize}) => {
	const navItems = await page.locator(".footer__nav-item").all();

	const textContents = await Promise.all(
		navItems.map(async (item) => await item.textContent())
	);
	console.log(textContents);
});