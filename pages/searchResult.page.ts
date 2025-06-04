import { type Page, type Locator } from "@playwright/test";
import { BasePage } from "./base.page";

export class SearchResultPage extends BasePage {
  readonly analysisBtn: Locator;
  readonly showMoreBtn: Locator;
  readonly serviceItems: Locator;
  constructor(page: Page) {
    super(page);
    this.analysisBtn = page.locator("[data-path='analyzes']");
    this.showMoreBtn = page.getByText('Показать ещё');
    this.serviceItems = page.locator(".service-item");
  };
};