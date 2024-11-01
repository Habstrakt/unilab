import { type Page, type Locator } from "@playwright/test";

export class BasePage {
  protected page: Page;
  readonly btnNo: Locator;
  readonly closePopUpBtn: Locator;
  readonly btnCookieAccept: Locator;
  readonly overlay: Locator;

  constructor(page: Page) {
    this.page = page;
    this.btnNo = page.locator(".btn-no-js");
    this.closePopUpBtn = page.getByRole('button', { name: 'Закрыть' });
    this.btnCookieAccept = page.locator("#btnCookieAccept");
    this.overlay = page.locator("#overlay");
  }

  async goToUrl() {
		await this.page.goto("https://dev.unilab.su/", {waitUntil: "domcontentloaded"});
  }

  async closePopUps() {
		await this.btnNo.click();
		await this.closePopUpBtn.click();
		await this.btnCookieAccept.click();
	};
};