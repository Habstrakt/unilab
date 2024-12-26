import { type Page, type Locator, expect } from '@playwright/test';
import { HeaderPage } from './header.page';

export class TaxPage extends HeaderPage {
  readonly submitFormBtn: Locator;
  readonly fioInput: Locator;
  readonly birthdayInput: Locator;
  readonly innInput: Locator;
  readonly phoneInput: Locator;
  readonly citySelect: Locator;
  readonly seriaPassportInput: Locator;
  readonly numberPassportInput: Locator;
  readonly subdivisionInput: Locator;
  readonly subdivisionCodeInput: Locator;
  readonly issuePassportInput: Locator;
  readonly forMyselfCheckbox: Locator;
  readonly beginPeriod: Locator;
  readonly endPeriod: Locator;
  readonly emailInput: Locator;
  readonly personalDataCheckbox: Locator;
  readonly filialBtn: Locator;
  readonly filialCity: Locator;
  readonly medicalOffice: Locator;

  constructor(page: Page,) {
    super(page);
    this.page = page;
    this.submitFormBtn = page.getByRole("button", {name: "Отправить заявление"});
    this.fioInput = page.locator("[placeholder='ФИО']");
    this.birthdayInput = page.locator("[placeholder='Дата рождения']");
    this.innInput = page.locator("[placeholder='ИНН']");
    this.phoneInput = page.locator("[placeholder='Телефон']");
    this.citySelect = page.locator(".tax-form__city-select select");
    this.seriaPassportInput = page.locator("[placeholder='Серия']");
    this.numberPassportInput = page.locator("[placeholder='Номер']");
    this.subdivisionInput = page.locator("[placeholder='Кем выдан']");
    this.subdivisionCodeInput = page.locator("[placeholder='Код подразделения']");
    this.issuePassportInput = page.locator("[placeholder='Дата выдачи']");
    this.forMyselfCheckbox = page.locator(".tax-form__self input");
    this.beginPeriod = page.locator(".tax-form__period select").nth(0);
    this.endPeriod = page.locator(".tax-form__period select").nth(1);
    this.emailInput = page.locator("[placeholder='Email']");
    this.personalDataCheckbox = page.locator(".uni-checkbox input").nth(1);
    this.filialBtn = page.locator(".uni-chip").getByText("филиал");
    this.filialCity = page.locator(".tax-form__select-obtaining-method select").nth(0);
    this.medicalOffice = page.locator(".tax-form__select-obtaining-method select").nth(1);
  }

  async clickFilialTab() {
    this.filialBtn.click();
  }
}