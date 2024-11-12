import { type Page, type Locator } from "@playwright/test";

export class BasePage {
  protected page: Page;
  readonly btnNo: Locator;
  readonly btnYes:Locator;
  readonly closePopUpBtn: Locator;
  readonly btnCookieAccept: Locator;
  readonly overlay: Locator;

  readonly addToCartBtns: Locator;

  constructor(page: Page) {
    this.page = page;
    this.btnNo = page.locator(".btn-no-js");
    this.btnYes = page.locator(".btn-yes-js");
    this.closePopUpBtn = page.getByRole('button', { name: 'Закрыть' });
    this.btnCookieAccept = page.locator("#btnCookieAccept");
    this.overlay = page.locator("#overlay");
  }

  async closePopUps() {
		await this.btnNo.click();
		await this.closePopUpBtn.click();
		await this.btnCookieAccept.click();
	};
};