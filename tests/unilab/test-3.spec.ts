import {test, expect} from "@playwright/test";

test.use({
    viewport: {width: 1920, height:1080},
    locale: "ru-RU",
});


test("проверка меню в шапке и вкладок внутри вкладки", async ({page}) => {
	const url = "http://test01.unilab.su:8000/"

    await page.goto(url);

    const menuItems = page.locator("#navbarScroll .navbar__item .navbar__link");
	const menuCount = await menuItems.count();

	await page.click('.btn-yes-js');

	for (let i = 0; i < menuCount; i++) {

		const menuItemText = (await menuItems.nth(i).textContent())?.trim();
		await menuItems.nth(i).click();

		if(menuItemText == "Анализы" || menuItemText == "Мед. услуги") {
			const tabs = page.locator(".types-services__tab-item .nav-link");
			const tabCount = await tabs.count();

			for (let f = 0; f < tabCount; f++) {
				const tabItemText = (await tabs.nth(f).textContent())?.trim();
				await tabs.nth(f).click();
			}
		}

		if(menuItemText == "Важно и полезно") {
			await menuItems.nth(i).click();

			const subMenuItems = page.locator("a.navbar__submenu-item.dropdown-item");
			const subMenuCount = await subMenuItems.count();

			for (let j = 0; j < subMenuCount; j++) {
				await menuItems.nth(i).click();
				await subMenuItems.nth(j).click();
			}
		}
	}
});