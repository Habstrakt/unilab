import { type Page, type Locator } from "@playwright/test";

export class FooterPage {
  protected page: Page;
  readonly subscribePopUp: Locator;
  readonly subscribeBtn: Locator;
  readonly subscribeInput: Locator;
  readonly subscribeAcceptBtn: Locator;
  readonly subscribeCancelBtn: Locator;

  readonly navTitle: Locator;
  readonly navItem: Locator;

  constructor(page: Page) {
    this.subscribePopUp = page.locator(".subscribe-popup");
    this.subscribeBtn = page.getByRole("button", {name : "Подписаться на новости и акции"})
    this.subscribeInput = page.locator("#subscribeInput");
    this.subscribeAcceptBtn = page.locator("#acceptButton");
    this.subscribeCancelBtn = page.locator("#cancelButton");

    this.navTitle = page.locator(".footer__nav-title");
    this.navItem = page.locator(".footer__nav-item");
  }
}