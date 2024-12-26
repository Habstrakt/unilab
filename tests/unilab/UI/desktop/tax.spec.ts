import { test, expect } from "@playwright/test";
import { TaxPage } from "../../../../pages/tax.pages";

test.beforeEach(async({page}) => {
	await page.goto("https://dev.unilab.su/vazhno-i-polezno/nalogovyj-vychet/tax_form/", {waitUntil: "domcontentloaded"});
});

test("Предупреждение что поле с ФИО не заполнено", async({page}) => {
  const taxPage = new TaxPage(page);
  await expect(taxPage.fioInput).toHaveAttribute("required");
  await expect(taxPage.fioInput).toHaveAttribute("customvaliditymessage", "Введите ваши фамилию, имя, отчество полностью");
});

test("Предупреждение что поле с днем рождения не заполнено", async({page}) => {
  const taxPage = new TaxPage(page);
  await expect(taxPage.birthdayInput).toHaveAttribute("required");
  await expect(taxPage.birthdayInput).toHaveAttribute("customvaliditymessage", "Введите вашу дату рождения");
});

test("Предупреждение что поле с ИНН должен состоять из 12 цифр", async({page}) => {
  const taxPage = new TaxPage(page);
  await expect(taxPage.innInput).toHaveAttribute("required");
  await expect(taxPage.innInput).toHaveAttribute("customvaliditymessage", "ИНН должен состоять из 12 цифр");
});

test.only("Проверка валидности ИНН", async({page}) => {
  const taxPage = new TaxPage(page);
  await taxPage.innInput.fill("1234567890121");
  const isValid = (await taxPage.innInput.evaluate(input => input.checkValidity()));
  console.log(isValid)
  expect(isValid).toBe(true);
});

test("Предупреждение что поле с телефоном должно быть заполнено", async({page}) => {
  const taxPage = new TaxPage(page);
  await expect(taxPage.phoneInput).toHaveAttribute("required");
  await expect(taxPage.phoneInput).toHaveAttribute("customvaliditymessage", "Введите номер телефона");
});

test("Предупреждение что не выбран город в котором были оказаны услуги", async({page}) => {
  const taxPage = new TaxPage(page);
  await expect(taxPage.citySelect).toHaveAttribute("required");
  await expect(taxPage.citySelect).toHaveAttribute("customvaliditymessage", "Выберите город, в котором были оказаны услуги");
});

test("Предупреждение ввести серию паспорта", async({page}) => {
  const taxPage = new TaxPage(page);
  await expect(taxPage.seriaPassportInput).toHaveAttribute("required");
  await expect(taxPage.seriaPassportInput).toHaveAttribute("customvaliditymessage", "Введите серию своего паспорта  из 4 цифр")
});

test("Предупреждение ввести номер паспорта", async({page}) => {
  const taxPage = new TaxPage(page);
  await expect(taxPage.numberPassportInput).toHaveAttribute("required");
  await expect(taxPage.numberPassportInput).toHaveAttribute("customvaliditymessage", "Введите номер своего паспорта  из 6 цифр");
});

test("Предупреждение ввести подразделение в котором был выдан паспорт", async({page}) => {
  const taxPage = new TaxPage(page);
  await expect(taxPage.subdivisionInput).toHaveAttribute("required");
  await expect(taxPage.subdivisionInput).toHaveAttribute("customvaliditymessage", "Введите подразделение, в котором был выдан паспорт ");
});

test("Предупреждение ввести код подразделение", async({page}) => {
  const taxPage = new TaxPage(page);
  await expect(taxPage.subdivisionCodeInput).toHaveAttribute("required");
  await expect(taxPage.subdivisionCodeInput).toHaveAttribute("customvaliditymessage", "Введите корректный код подразделения, в котором был выдан паспорт ");
});

test("Предупреждение о даты выдачи паспорта", async({page}) => {
  const taxPage = new TaxPage(page);
  await expect(taxPage.issuePassportInput).toHaveAttribute("required");
  await expect(taxPage.issuePassportInput).toHaveAttribute("customvaliditymessage", "Введите дату выдачи своего паспорта ");
});

test("Предупреждение чекбокса 'За себя либо за родственика'", async({page}) => {
  const taxPage = new TaxPage(page);
  await expect(taxPage.forMyselfCheckbox).toHaveAttribute("required");
  await expect(taxPage.forMyselfCheckbox).toHaveAttribute("customvaliditymessage", "Выберите себя либо родственника")
});

test("Предупреждение о начале периода", async({page}) => {
  const taxPage = new TaxPage(page);
  await expect(taxPage.beginPeriod).toHaveAttribute("required");
  await expect(taxPage.beginPeriod).toHaveAttribute("customvaliditymessage", "Выберите год начала периода");
});

test("Предупреждение о конце периода", async({page}) => {
  const taxPage = new TaxPage(page);
  await expect(taxPage.endPeriod).toHaveAttribute("required");
  await expect(taxPage.endPeriod).toHaveAttribute("customvaliditymessage", "Выберите год конца периода");
});

test("Предупреждение о неверной электронной почты", async({page}) => {
  const taxPage = new TaxPage(page);
  await expect(taxPage.emailInput).toHaveAttribute("required");
  await expect(taxPage.emailInput).toHaveAttribute("customvaliditymessage", "Введен неверный адрес электронной почты");
});

test("Предупреждение об обработки персональных данных", async({page}) => {
  const taxPage = new TaxPage(page);
  await expect(taxPage.personalDataCheckbox).toHaveAttribute("required");
  await expect(taxPage.personalDataCheckbox).toHaveAttribute("customvaliditymessage", "Вам нужно подтвердить ваше согласие");
});

test("Предупреждение о выборе города филиала", async({page}) => {
  const taxPage = new TaxPage(page);
  await taxPage.clickFilialTab();
  await expect(taxPage.filialCity).toHaveAttribute("required");
  await expect(taxPage.filialCity).toHaveAttribute("customvaliditymessage", "Выберите город");
});

test("Предупреждение о выборе филиала", async({page}) => {
  const taxPage = new TaxPage(page);
  await taxPage.clickFilialTab();
  await expect(taxPage.medicalOffice).toHaveAttribute("required");
  await expect(taxPage.medicalOffice).toHaveAttribute("customvaliditymessage", "Выберите удобный для вас филиал");
});