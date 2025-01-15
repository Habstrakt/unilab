import { test, expect } from "@playwright/test";
import { TaxPage } from "../../../../pages/tax.pages";
import {fakerRU as faker} from "@faker-js/faker";

let taxPage: TaxPage;

test.beforeEach(async({page}) => {
	taxPage = new TaxPage(page);
	await page.goto("https://dev.unilab.su/vazhno-i-polezno/nalogovyj-vychet/tax_form/", {waitUntil: "domcontentloaded"});
});

test("", async({page}) => {
	await page.locator("[customvaliditymessage='Введите ваши фамилию, имя, отчество полностью']").fill(faker.person.firstName());
	await page.locator("[customvaliditymessage='Введите вашу дату рождения']").fill("1994-12-04");
	await page.locator("[customvaliditymessage='ИНН должен состоять из 12 цифр']").fill(faker.number.int({min: 100000000000, max: 999999999999}).toString());
	await page.locator("[customvaliditymessage='Введите номер телефона']").fill(faker.phone.number());
	await page.selectOption("[customvaliditymessage='Выберите город, в котором были оказаны услуги']", {value: '42'});
	await page.locator("[customvaliditymessage='Введите серию своего паспорта  из 4 цифр']").fill(faker.number.int({min: 1000, max: 9999}).toString());
	await page.locator("[customvaliditymessage='Введите номер своего паспорта  из 6 цифр']").fill(faker.number.int({min: 100000, max: 999999}).toString());
	await page.locator("[customvaliditymessage='Введите подразделение, в котором был выдан паспорт ']").fill(faker.lorem.lines());
	await page.locator("[customvaliditymessage='Введите корректный код подразделения, в котором был выдан паспорт ']").fill(faker.number.int({min: 100000, max: 999999}).toString());
	await page.locator("[customvaliditymessage='Введите дату выдачи своего паспорта ']").fill("2008-09-21");
	await page.locator("[customvaliditymessage='Выберите себя либо родственника']").check();
	await page.selectOption("[customvaliditymessage='Выберите год начала периода']", {value: "2024"});
	await page.selectOption("[customvaliditymessage='Выберите год конца периода']", {value: "2024"});
	await page.locator("[customvaliditymessage='Введен неверный адрес электронной почты']").fill(faker.internet.email());
	await page.locator("[customvaliditymessage='Вам нужно подтвердить ваше согласие']").check();
	await page.getByRole("button", {name: "Отправить заявление"}).click();
	await expect(page.locator(".tax-form__response-msg h1")).toHaveText("Ваше заявление принято!");
});

test("Добавить родственника", async() => {
	await taxPage.addRelative();
	await expect(taxPage.relativeBlock).toBeVisible();
});

test("Удалить родственника", async() => {
	await taxPage.addRelative();
	await taxPage.deleteRelative();
	await expect(taxPage.relativeBlock).not.toBeVisible();
});

test("отображение полей свидетельства о рождении ребенка", async({page}) => {
	await taxPage.addRelative();
	await page.selectOption(".add-relative__relative-block select", "child");
	await expect(page.locator("[customvaliditymessage='Введите фамилию, имя, отчество вашего ребенка полностью']")).toBeVisible();
	await expect(page.locator("[customvaliditymessage='Введите серию свидетельства о рождении вашего ребенка']")).toBeVisible();
	await expect(page.locator("[customvaliditymessage='Введите номер  свидетельства о рождении вашего ребенка из 6 цифр']")).toBeVisible();
	await expect(page.locator("[customvaliditymessage='Введите подразделение, в котором было выдано свидетельство о рождении вашего ребенка']")).toBeVisible();
	await expect(page.locator("[customvaliditymessage='Введите дату выдачи  свидетельства о рождении вашего ребенка']")).toBeVisible();
});

test("отображение полей супруг(а)", async({page}) => {
	await taxPage.addRelative();
	await page.selectOption(".add-relative__relative-block select", "spouse");
	await expect(page.locator("[customvaliditymessage='Введите фамилию, имя, отчество вашего супруга(и) полностью']")).toBeVisible();
	await expect(page.locator("[customvaliditymessage='Введите серию  паспорта вашего супруга(и) из 4 цифр']")).toBeVisible();
	await expect(page.locator("[customvaliditymessage='Введите номер  паспорта вашего супруга(и) из 6 цифр']")).toBeVisible();
	await expect(page.locator("[customvaliditymessage='Введите подразделение, в котором был выдан паспорт вашего супруга(и)']")).toBeVisible();
	await expect(page.locator("[customvaliditymessage='Введите корректный код подразделения, в котором был выдан паспорт вашего супруга(и)']")).toBeVisible();
	await expect(page.locator("[customvaliditymessage='Введите дату выдачи  паспорта вашего супруга(и)']")).toBeVisible();
});

test("отображение полей родителя", async({page}) => {
	await taxPage.addRelative();
	await page.selectOption(".add-relative__relative-block select", "parent");
	await expect(page.locator("[customvaliditymessage='Введите фамилию, имя, отчество вашего родителя полностью']")).toBeVisible();
	await expect(page.locator("[customvaliditymessage='Введите серию  паспорта вашего родителя из 4 цифр']")).toBeVisible();
	await expect(page.locator("[customvaliditymessage='Введите номер  паспорта вашего родителя из 6 цифр']")).toBeVisible();
	await expect(page.locator("[customvaliditymessage='Введите подразделение, в котором был выдан паспорт вашего родителя']")).toBeVisible();
	await expect(page.locator("[customvaliditymessage='Введите корректный код подразделения, в котором был выдан паспорт вашего родителя']")).toBeVisible();
	await expect(page.locator("[customvaliditymessage='Введите дату выдачи  паспорта вашего родителя']")).toBeVisible();
});

test("Проверка атрибута required для всех полей ввода input", async() => {
	await taxPage.addRelative();
	const isValid = await taxPage.checkRequiredAttribute(taxPage.inputElements);
	expect(isValid).toBe(true);
});

test("Проверка атрибута customvaliditymessage для всех полей ввода input", async() => {
	await taxPage.addRelative();
	const isValid = await taxPage.checkCustomValidityMsg(taxPage.inputElements);
	expect(isValid).toBe(true);
});

test("Проверка атрибута required для всех полей ввода textarea", async() => {
	await taxPage.addRelative();
	const isValid = await taxPage.checkRequiredAttribute(taxPage.inputElements);
	expect(isValid).toBe(true);
});

test("Проверка атрибута customvaliditymessage для всех полей ввода textarea", async() => {
	await taxPage.addRelative();
	const isValid = await taxPage.checkCustomValidityMsg(taxPage.inputElements);
	expect(isValid).toBe(true);
});

test("Проверка атрибута required для select", async() => {
	await taxPage.addRelative();
	const isValid = await taxPage.checkRequiredAttribute(taxPage.inputElements);
	expect(isValid).toBe(true);
});

test("Проверка атрибута customvaliditymessage для select", async() => {
	await taxPage.addRelative();
	const isValid = await taxPage.checkCustomValidityMsg(taxPage.inputElements);
	expect(isValid).toBe(true);
});

test("Проверка атрибута required у checkbox", async() => {
	await taxPage.addRelative();
	const isValid = await taxPage.checkRequiredAttribute(taxPage.inputElements);
	expect(isValid).toBe(true);
});

test("Проверка атрибута customvaliditymessage у checkbox", async() => {
	await taxPage.addRelative();
	const isValid = await taxPage.checkCustomValidityMsg(taxPage.inputElements);
	expect(isValid).toBe(true);
});

// tax-form__response-msg
// Справка будет направлена на указанный Вами адрес в течение 10-14 рабочих дней.
// Если Вы не получили справку в течение указанного периода, напишите нам, пожалуйста, запрос по электронной почте: otziv@unilab.su