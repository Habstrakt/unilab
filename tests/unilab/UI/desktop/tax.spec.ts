import { test, expect } from "@playwright/test";
import { TaxPage } from "../../../../pages/tax.pages";

test.beforeEach(async({page}) => {
	await page.goto("https://dev.unilab.su/vazhno-i-polezno/nalogovyj-vychet/tax_form/", {waitUntil: "domcontentloaded"});
});

test("Проверка атрибута required для всех полей ввода input", async({page}) => {
  const taxPage = new TaxPage(page);
  await taxPage.addRelativeBtn.click();

  for(let i = 0; i < await taxPage.inputElements.count(); i++) {
    const input = taxPage.inputElements.nth(i);
    await expect(input).toHaveAttribute("required");
  };
});

test("Проверка атрибута cubstomvaliditymessage для всех полей ввода input", async({page}) => {
  const taxPage = new TaxPage(page);
  await taxPage.addRelativeBtn.click();

  for(let i = 0; i < await taxPage.inputElements.count(); i++) {
    const input = taxPage.inputElements.nth(i);
    expect(await input.getAttribute("customvaliditymessage")).not.toBe("");
  }
});

test("Проверка атрибута required для всех полей ввода textarea", async({page}) => {
  const taxPage = new TaxPage(page);
  await taxPage.addRelativeBtn.click();

  for(let i = 0; i < await taxPage.textareaElements.count(); i++) {
    const textarea = taxPage.textareaElements.nth(i);
    await expect(textarea).toHaveAttribute("required");
  };
});

test("Проверка атрибута customvaliditymessage для всех полей ввода textarea", async({page}) => {
  const taxPage = new TaxPage(page);
  await taxPage.addRelativeBtn.click();

  for(let i = 0; i < await taxPage.textareaElements.count(); i++) {
    const textarea = taxPage.textareaElements.nth(i);
    expect(await textarea.getAttribute("customvaliditymessage")).not.toBe("");
  };
});

test("Проверка атрибута required для select", async({page}) => {
  const taxPage = new TaxPage(page);
  await taxPage.addRelativeBtn.click();

  for(let i = 0; i < await taxPage.selectElements.count(); i++) {
		const select = taxPage.selectElements.nth(i);
		await expect(select).toHaveAttribute("required");
  };
});

test("Проверка атрибута customvaliditymessage для select", async({page}) => {
  const taxPage = new TaxPage(page);
  await taxPage.addRelativeBtn.click();

  for(let i = 0; i < await taxPage.selectElements.count(); i++) {
		const select = taxPage.selectElements.nth(i);
		expect(await select.getAttribute("customvaliditymessage")).not.toBe("");
  };
});

test("Проверка атрибута required у checkbox", async({page}) => {
	const taxPage = new TaxPage(page);
	await taxPage.addRelativeBtn.click();

	for(let i = 0; i < await taxPage.checkboxElements.count(); i++) {
		const checkbox = taxPage.checkboxElements.nth(i);
		await expect(checkbox).toHaveAttribute("required");
	};
});

test("Проверка атрибута customvaliditymessage у checkbox", async({page}) => {
	const taxPage = new TaxPage(page);
	await taxPage.addRelativeBtn.click();

	for(let i = 0; i < await taxPage.checkboxElements.count(); i++) {
		const checkbox = taxPage.checkboxElements.nth(i);
		expect(await checkbox.getAttribute("customvaliditymessage")).not.toBe("");
	};
});

