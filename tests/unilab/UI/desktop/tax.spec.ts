import { test, expect, Locator } from "@playwright/test";
import { TaxPage } from "../../../../pages/tax.pages";
import {fakerRU as faker} from "@faker-js/faker";

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

let taxPage: TaxPage;

test.beforeEach(async({page}) => {
	taxPage = new TaxPage(page);
	await test.step("Перейти на страницу 'Налоговый вычет'", async() => {
		await page.goto("https://dev.unilab.su/vazhno-i-polezno/nalogovyj-vychet/tax_form/", {waitUntil: "domcontentloaded"});
	});
});

test.skip("Отправить заявление на получение справки", async() => {
	await test.step("Заполнить форму данными", async() => {
		await taxPage.fillForm(testData());
	});
	await test.step("Нажать на кнопку 'Отправить'", async() => {
		await taxPage.submitForm();
	});
	await test.step("Проверить успешное отправление", async() => {
		await expect(taxPage.successMessage).toBeVisible();
	});
});

test("Добавить родственника", async() => {
	await test.step("Кликнуть на кнопку 'Добавить родственника'", async() => {
		await taxPage.addRelative();
	});
	await test.step("Проверить отображение блока родственника", async() => {
		await expect(taxPage.relativeBlock).toBeVisible();
	});
});

test("Удалить родственника", async() => {
	await test.step("Кликнуть на кнопку 'Добавить родственника'", async() => {
		await taxPage.addRelative();
	});
	await test.step("Нажать на кнопку 'Удалить'", async() => {
		await taxPage.deleteRelative();
	});
	await test.step("Проверить отсутствие блока родственника", async() => {
		await expect(taxPage.relativeBlock).not.toBeVisible();
	});
});

const testRelativeFields = (relationshipType: string, fields: string[]) => {
	test(`Отображение полей для ${relationshipType}`, async({page}) =>{
		await test.step("Кликнуть на кнопку 'Добавить родственника'", async() => {
			await taxPage.addRelative();
		});

		await test.step(`Выбрать тип родства ${relationshipType}`, async() => {
			await taxPage.typeOfRelationshipSelect.selectOption(relationshipType);
		});

		for(const field of fields) {
			await test.step(`Проверить поле ${field}`, async() => {
				await expect(page.locator(`[customvaliditymessage='${field}']`)).toBeVisible();
			});
		};
	});
};

testRelativeFields("child", [
  "Введите фамилию, имя, отчество вашего ребенка полностью",
	"Введите дату рождения вашего ребенка",
  "Введите серию свидетельства о рождении вашего ребенка",
  "Введите номер  свидетельства о рождении вашего ребенка из 6 цифр",
  "Введите подразделение, в котором было выдано свидетельство о рождении вашего ребенка",
  "Введите дату выдачи  свидетельства о рождении вашего ребенка"
]);

testRelativeFields("spouse", [
  "Введите фамилию, имя, отчество вашего супруга(и) полностью",
  "Введите серию  паспорта вашего супруга(и) из 4 цифр",
  "Введите номер  паспорта вашего супруга(и) из 6 цифр",
  "Введите подразделение, в котором был выдан паспорт вашего супруга(и)",
  "Введите корректный код подразделения, в котором был выдан паспорт вашего супруга(и)",
  "Введите дату выдачи  паспорта вашего супруга(и)"
]);

testRelativeFields("parent", [
  "Введите фамилию, имя, отчество вашего родителя полностью",
  "Введите серию  паспорта вашего родителя из 4 цифр",
  "Введите номер  паспорта вашего родителя из 6 цифр",
  "Введите подразделение, в котором был выдан паспорт вашего родителя",
  "Введите корректный код подразделения, в котором был выдан паспорт вашего родителя",
  "Введите дату выдачи  паспорта вашего родителя"
]);

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