import { test, expect, Page } from '@playwright/test';
import { HeaderPage } from '../../../../pages/header.page';
import { BasePage } from '../../../../pages/base.page';
import { AddressPage } from '../../../../pages/addresses.page';

let headerPage: HeaderPage;
let basePage: BasePage;
let addressPage: AddressPage;

test.beforeEach(async({page}: {page: Page}) => {
	headerPage = new HeaderPage(page);
	basePage = new BasePage(page);
	addressPage = new AddressPage(page);
	await page.goto("/", {waitUntil: "domcontentloaded"});
});

test("Проверить поле ввода даты формы на странице отзыва о филиале", async() => {
	await test.step("Согласится с выбором города", async() => {
		await basePage.btnYes.click();
	});
	await test.step("Кликнуть на страницу адресов в шапке сайта", async() => {
		await headerPage.addresses.click();
	});
	await test.step("Выбрать случайный адрес и нажать на кнопку 'Отзыв'", async() => {
		await addressPage.clickRandomAddresses();
	});
	await test.step("Заполнить поле дата посещения текущей датой", async() => {
		await addressPage.todayDate();
	});
	await test.step("Проверить, что поле даты посещение не пустое", async() => {
		await expect(addressPage.visitorDate).not.toBeEmpty();
	});
});


test("Проверить работу фильтра 'Приём врачей' на странице адресов", async({page}: {page: Page}) => {
	await test.step("Согласится с выбором города", async() => {
		await basePage.btnYes.click();
	});
	await test.step("Перейти на страницу адресов в шапке сайта", async() => {
		await headerPage.addresses.click();
	});
	await test.step("Дождаться загрузки списка медицинских кабинетов", async() => {
		await page.waitForSelector(".addresses__item");
	});
	let initialAddressesCount: number;
	await test.step("Запомнить количество адресов до применения фильтра", async() => {
		initialAddressesCount = await addressPage.getAddressesCount();
	});
	await test.step("Применить фильтр 'Приём врачей'", async() => {
		await addressPage.applyFilter();
	});
	await test.step("Дождаться обновления списка адресов после применения фильтра", async() => {
		await page.waitForTimeout(5000);
	});
	await test.step("Проверить, что количество адресов уменьшилось", async() => {
		const filteredAddressesCount = await addressPage.getAddressesCount();
		expect(filteredAddressesCount).toBeLessThan(initialAddressesCount);
	});
});
