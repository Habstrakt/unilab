import { type Page, type Locator, expect } from '@playwright/test';

export class TaxPage {
  protected page: Page;
  readonly submitFormBtn: Locator;
  readonly addRelativeBtn: Locator;
  readonly relativeBlock: Locator;
  readonly deleteRelativeBlock: Locator;
  readonly typeOfRelationshipSelect: Locator;
  readonly filialBtn: Locator;
  readonly inputElements: Locator;
  readonly textareaElements: Locator;
  readonly selectElements: Locator;
  readonly checkboxElements: Locator;

  readonly fullNameInput: Locator;
  readonly birthDateInput: Locator;
  readonly innInput: Locator;
  readonly phoneInput: Locator;
  readonly citySelect: Locator;
  readonly passportSeriesInput: Locator;
  readonly passportNumberInput: Locator;
  readonly issuedByInput: Locator;
  readonly departmentCodeInput: Locator;
  readonly issueDateInput: Locator;
  readonly relationshipCheckbox: Locator;
  readonly startYearSelect: Locator;
  readonly endYearSelect: Locator;
  readonly emailInput: Locator;
  readonly consentCheckbox: Locator;
  readonly submitButton: Locator;
  readonly successMessage: Locator;

  constructor(page: Page,) {
    this.page = page;
    this.submitFormBtn = page.getByRole("button", {name: "Отправить заявление"});

    this.addRelativeBtn = page.getByRole("button", {name: "Добавить родственника"});
    this.relativeBlock = page.locator(".add-relative__relative-block");
    this.deleteRelativeBlock = page.getByRole("button", {name: "Удалить"});

    this.typeOfRelationshipSelect = page.locator(".add-relative__relative-block select");

    this.inputElements = page.locator(".uni-input__input");
    this.textareaElements = page.locator(".uni-textarea__textarea");
    this.selectElements = page.locator("select");
    this.checkboxElements = page.locator(".uni-checkbox__input");

    this.fullNameInput = page.locator("[placeholder='ФИО']");
    this. birthDateInput = page.locator("[placeholder='Дата рождения']");
    this.innInput = page.locator("[placeholder='ИНН']");
    this.phoneInput = page.locator("[placeholder='Телефон']");
    this.citySelect = page.locator("[customvaliditymessage='Выберите город, в котором были оказаны услуги']");
    this.passportSeriesInput = page.locator("[placeholder='Серия']");
    this.passportNumberInput = page.locator("[placeholder='Номер']");
    this.issuedByInput = page.locator("[placeholder='Кем выдан']");
    this.departmentCodeInput = page.locator("[placeholder='Код подразделения']");
    this.issueDateInput = page.locator("[placeholder='Дата выдачи']");
    this.relationshipCheckbox = page.locator("[customvaliditymessage='Выберите себя либо родственника']");
    this.startYearSelect = page.locator("[customvaliditymessage='Выберите год начала периода']");
    this.endYearSelect = page.locator("[customvaliditymessage='Выберите год конца периода']");
    this.emailInput = page.locator("[placeholder='Email']");
    this.consentCheckbox = page.locator("[customvaliditymessage='Вам нужно подтвердить ваше согласие']");
    this.submitButton = page.getByRole("button", {name: "Отправить заявление"});
    this.successMessage = page.getByRole("heading", { name: "Ваше заявление принято!" });
  }

  async fillForm(data: {
    fullName: string;
    birthDate: string;
    inn: string;
    phone: string;
    cityValue: string;
    passportSeries: string;
    passportNumber: string;
    issuedBy: string;
    departmentCode: string;
    issueDate: string;
    startYear: string;
    endYear: string;
    email: string;
  }): Promise<void>{
    await this.fullNameInput.fill(data.fullName);
    await this.birthDateInput.fill(data.birthDate);
    await this.innInput.fill(data.inn);
    await this.phoneInput.fill(data.phone);
    await this.citySelect.selectOption({ value: data.cityValue });
    await this.passportSeriesInput.fill(data.passportSeries);
    await this.passportNumberInput.fill(data.passportNumber);
    await this.issuedByInput.fill(data.issuedBy);
    await this.departmentCodeInput.fill(data.departmentCode);
    await this.issueDateInput.fill(data.issueDate);
    await this.relationshipCheckbox.check();
    await this.startYearSelect.selectOption({ value: data.startYear });
    await this.endYearSelect.selectOption({ value: data.endYear });
    await this.emailInput.fill(data.email);
    await this.consentCheckbox.check();
  };

  async submitForm(): Promise<void> {
    await this.submitButton.click();
  }

  async clickFilialTab(): Promise<void> {
    await this.filialBtn.click();
  };

  async addRelative(): Promise<void> {
    await this.addRelativeBtn.click();
  };

  async deleteRelative(): Promise<void> {
    await this.deleteRelativeBlock.click();
  };

  async checkCustomValidityMsg(htmlElements: Locator): Promise<boolean> {
    const count = await htmlElements.count();
    for(let i = 0; i < count; i++) {
      const element = htmlElements.nth(i);
      const validityMsg = await element.getAttribute("customvaliditymessage");

      if(!validityMsg || validityMsg === "") {
        return false;
      }
    }
    return true;
  };

  async checkRequiredAttribute(htmlElements: Locator): Promise<boolean> {
    const count = await htmlElements.count()
    for(let i = 0; i < count; i++) {
      const element = htmlElements.nth(i);
      const requiredAttribute = await element.getAttribute("required");

      if(requiredAttribute === null) {
        return false;
      }
    };
    return true;
  };
}