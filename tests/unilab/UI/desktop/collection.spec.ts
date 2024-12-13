import { test, expect } from "@playwright/test";
import { BasePage } from "../../../../pages/base.page";
import { HeaderPage } from "../../../../pages/header.page";
import { CollectionPage } from '../../../../pages/сollection.page';


test.beforeEach(async({page}) => {
	await page.goto("/", {waitUntil: "domcontentloaded"});
});

test("Работа кнопки 'в корзину' на странице 'анализы' в списке", async({page}) => {
	const basePage = new BasePage(page);
  const headerPage = new HeaderPage(page);
	await headerPage.analysisLink.click();
	const serviceName = await basePage.clickRandomAddToCartButton();
	await expect(page.locator(".service-item__toast")).toBeVisible();
	await basePage.serviceName.click();
	await expect(page.locator(".cart-item__title")).toContainText(serviceName!);
});

test("Работа кнопки 'в корзину' на странице 'мед услуги' в списке", async({page}) => {
	const basePage = new BasePage(page);
	const headerPage = new HeaderPage(page);
	await headerPage.medicalServicesLink.click();
	const serviceName = await basePage.clickRandomAddToCartButton();
	await expect(page.locator(".service-item__toast")).toBeVisible();
	await basePage.serviceName.click();
	await expect(page.locator(".cart-item__title")).toContainText(serviceName!);
});

test("Переключение табов на странице услуг", async({page}) => {
	const headerPage = new HeaderPage(page);
	const collectionPage = new CollectionPage(page);
	await headerPage.analysisLink.click();
	await collectionPage.clickToTab();
});

test.only("Фильтр услуг", async({page}) => {
	const headerPage = new HeaderPage(page);
	const collectionPage = new CollectionPage(page);

	await headerPage.onlineRecordLink.click();
	await page.locator("[data-bs-target='#services']").click();
	const selectedFilterItem = await collectionPage.randomFilter();

	const specializations = await page.locator(".doctor__specialization").allTextContents();

	for(let i = 0; i < specializations.length; i++) {
		console.log(await selectedFilterItem.textContent());
		console.log(await page.locator(".doctor__specialization").nth(i).textContent());
		expect(new RegExp(await selectedFilterItem.textContent())).toMatch(new RegExp(await page.locator(".doctor__specialization").nth(i).textContent()));
	}
});

// test.only("Фильтр услуг", async({page}) => {
	// const headerPage = new HeaderPage(page);
	// const collectionPage = new CollectionPage(page);
	// await headerPage.onlineRecordLink.click();
	// await page.locator("[data-bs-target='#services']").click();
	// const selectedFilterItem = await collectionPage.randomFilter();
	
	// await collectionPage.randomService()
	//await page.locator(".accordion-body .filter__item").nth(0).click();
	//const doctorSpecializationText = await page.locator(".doctor__specialization").textContent();
	//const doctorSpecializationText = page.locator(".doctor__specialization").all();
	//await expect(selectedFilterItem).toContainText(doctorSpecializationText);
	// for (const element of await doctorSpecializationText) {
	// 	const doctorSpecializationText = await element.textContent();
	// 	expect(doctorSpecializationText).toContain(selectedFilterItem);
	// }
	// await page.waitForTimeout(1000);
// });
//doctor__specialization



