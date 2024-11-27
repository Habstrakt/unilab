import { type Page, type Locator } from "@playwright/test";
import { HomePage } from "./home.page";

export class CartPage extends HomePage {
  declare protected page: Page;

  constructor(page: Page) {
    super(page);
  }


}

