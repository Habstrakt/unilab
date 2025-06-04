import { test, devices, expect, Locator } from '@playwright/test';
import { FooterPage } from '../../../../pages/footer.page.ts';

test.use({
	locale: "ru-RU",
	geolocation: {latitude: 50.272796, longitude: 127.526943},
	permissions: ['geolocation'],
	...devices["Pixel 7"],
	isMobile: true
});

let footerPage: FooterPage;

test.beforeEach(async({page}) => {
	footerPage = new FooterPage(page);
	await page.goto("/", {waitUntil: "domcontentloaded"});
});

test("Проверить работу аккордеона в футтере в мобильной версии", async() => {
	let navItemsTitle: Locator[] = [];
	let navItems: Locator;

	await test.step("Получить заголовки и элементы аккордеона", async() => {
		navItemsTitle = await footerPage.navTitle.all();
		navItems = footerPage.navItem;
	});

	for(const [i, navTitle] of navItemsTitle.entries()) {
		await test.step(`Кликнуть на заголовок и проверить открытие элемента ${i + 1}`, async() => {
			await navTitle.click();
			await expect(navItems.nth(i)).toHaveClass(/open/);
		});
	};
});