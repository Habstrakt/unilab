import { test, expect } from "@playwright/test";
import { TaxPage } from "../../../../pages/tax.pages";
import {fakerRU as faker} from "@faker-js/faker";

let taxPage: TaxPage;

const testData = () => ({
	fullName: faker.person.fullName(),
	birthDate: "1994-12-04",
	inn: faker.number.int({min: 100000000000, max: 999999999999}).toString(),
	phone: faker.phone.number(),
	cityValue: "42",
	passportSeries: faker.number.int({min: 1000, max: 9999}).toString(),
	passportNumber: faker.number.int({min: 100000, max: 999999}).toString(),
	issuedBy: faker.lorem.lines(),
	departmentCode: faker.number.int({min: 100000, max: 999999}).toString(),
	issueDate: "2008-09-21",
	startYear: "2024",
	endYear: "2024",
	email: faker.internet.email(),
});

test.beforeEach(async({page}) => {
	taxPage = new TaxPage(page);
	await page.goto("https://dev.unilab.su/vazhno-i-polezno/nalogovyj-vychet/tax_form/", {waitUntil: "domcontentloaded"});
});

test("Отправить заявление на получение справки", async() => {
	await taxPage.fillForm(testData());
	await taxPage.submitForm();
	await expect(taxPage.successMessage).toBeVisible()
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
	await taxPage.typeOfRelationshipSelect.selectOption("child");
	await expect(page.locator("[customvaliditymessage='Введите фамилию, имя, отчество вашего ребенка полностью']")).toBeVisible();
	await expect(page.locator("[customvaliditymessage='Введите серию свидетельства о рождении вашего ребенка']")).toBeVisible();
	await expect(page.locator("[customvaliditymessage='Введите номер  свидетельства о рождении вашего ребенка из 6 цифр']")).toBeVisible();
	await expect(page.locator("[customvaliditymessage='Введите подразделение, в котором было выдано свидетельство о рождении вашего ребенка']")).toBeVisible();
	await expect(page.locator("[customvaliditymessage='Введите дату выдачи  свидетельства о рождении вашего ребенка']")).toBeVisible();
});

test("отображение полей супруг(а)", async({page}) => {
	await taxPage.addRelative();
	await taxPage.typeOfRelationshipSelect.selectOption("spouse");
	await expect(page.locator("[customvaliditymessage='Введите фамилию, имя, отчество вашего супруга(и) полностью']")).toBeVisible();
	await expect(page.locator("[customvaliditymessage='Введите серию  паспорта вашего супруга(и) из 4 цифр']")).toBeVisible();
	await expect(page.locator("[customvaliditymessage='Введите номер  паспорта вашего супруга(и) из 6 цифр']")).toBeVisible();
	await expect(page.locator("[customvaliditymessage='Введите подразделение, в котором был выдан паспорт вашего супруга(и)']")).toBeVisible();
	await expect(page.locator("[customvaliditymessage='Введите корректный код подразделения, в котором был выдан паспорт вашего супруга(и)']")).toBeVisible();
	await expect(page.locator("[customvaliditymessage='Введите дату выдачи  паспорта вашего супруга(и)']")).toBeVisible();
});

test("отображение полей родителя", async({page}) => {
	await taxPage.addRelative();
	await taxPage.typeOfRelationshipSelect.selectOption("parent");
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