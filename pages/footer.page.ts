import { type Page, type Locator } from "@playwright/test";

export class FooterPage {
  protected page: Page;
  readonly subscribeBtn: Locator;
  readonly subscribeInput: Locator;
  readonly subscribeAcceptBtn: Locator;
  readonly subscribeCancelBtn: Locator;

  constructor(page: Page) {
    this.subscribeBtn = page.getByRole("button", {name : "Подписаться на новости и акции"})
    this.subscribeInput = page.locator("#subscribeInput");
    this.subscribeAcceptBtn = page.locator("#acceptButton");
    this.subscribeCancelBtn = page.locator("#cancelButton");
  }
}