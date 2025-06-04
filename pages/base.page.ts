import { type Page, type Locator } from "@playwright/test";

export class BasePage {
  readonly page: Page;
  readonly btnNo: Locator;
  readonly btnYes:Locator;
  readonly closePopUpBtn: Locator;
  readonly btnCookieAccept: Locator;
  readonly overlay: Locator;

  readonly addToCartBtn: Locator;
  readonly addToCartButtons: Locator;

  readonly serviceName: Locator;

  readonly addToCartPopUp: Locator;

  constructor(page: Page) {
    this.page = page;
    this.btnNo = page.locator(".btn-no-js");
    this.btnYes = page.locator(".btn-yes-js");
    this.closePopUpBtn = page.getByRole('button', { name: 'Закрыть' });
    this.btnCookieAccept = page.locator("#btnCookieAccept");
    this.overlay = page.locator("#overlay");
    this.addToCartBtn = page.locator(".btn-to-cart");
    this.addToCartButtons = page.locator(".service-item__btn");
    this.serviceName = page.locator(".header__cart-link");
    this.addToCartPopUp = page.locator(".service-item__toast");
  }

  async closePopUps(): Promise<void> {
		await this.btnNo.click();
		await this.closePopUpBtn.click();
		await this.btnCookieAccept.click();
	};

  async clickRandomAddToCartButton(): Promise<string> {
    const btnCount = await this.addToCartButtons.count();
    const randomIndex: number = Math.floor(Math.random() * btnCount);
    const randomBtn = this.addToCartButtons.nth(randomIndex);
    const serviceName = await this.page.locator(".service-item__title-text").nth(randomIndex).textContent();

    await randomBtn.click();

    if (!serviceName) {
      throw new Error(`Не удалось получить название услуги по индексу ${randomIndex}`);
    }

    return serviceName;
  };
};