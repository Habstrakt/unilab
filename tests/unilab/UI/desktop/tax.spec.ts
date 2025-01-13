import { test, expect } from "@playwright/test";
import { TaxPage } from "../../../../pages/tax.pages";

let taxPage: TaxPage;

test.beforeEach(async({page}) => {
	taxPage = new TaxPage(page);
	await page.goto("https://dev.unilab.su/vazhno-i-polezno/nalogovyj-vychet/tax_form/", {waitUntil: "domcontentloaded"});
});

test("Проверка атрибута required для всех полей ввода input", async() => {
	await taxPage.checkRequiredAttribute(taxPage.inputElements);
});

test("Проверка атрибута customvaliditymessage для всех полей ввода input", async() => {
	await taxPage.checkCustomValidityMsg(taxPage.inputElements);
});

test("Проверка атрибута required для всех полей ввода textarea", async() => {
	await taxPage.checkRequiredAttribute(taxPage.textareaElements)
});

test("Проверка атрибута customvaliditymessage для всех полей ввода textarea", async() => {
	await taxPage.checkCustomValidityMsg(taxPage.textareaElements);
});

test("Проверка атрибута required для select", async() => {
	await taxPage.checkRequiredAttribute(taxPage.selectElements);
});

test("Проверка атрибута customvaliditymessage для select", async() => {
	await taxPage.checkCustomValidityMsg(taxPage.selectElements);
});

test("Проверка атрибута required у checkbox", async() => {
	await taxPage.checkRequiredAttribute(taxPage.checkboxElements)
});

test("Проверка атрибута customvaliditymessage у checkbox", async() => {
	await taxPage.checkCustomValidityMsg(taxPage.checkboxElements)
});