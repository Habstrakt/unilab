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