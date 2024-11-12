import { type Page, type Locator } from '@playwright/test';
import { HeaderPage } from './header.page';

export class CollectionPage extends HeaderPage {
    protected page: Page;
    addToCartButtons: Locator;

    constructor(page: Page) {
			super(page);
      this.page = page;
      this.addToCartButtons = page.locator(".service-item__btn");
    }

    async clickRandomAddToCartButton() {
			const btnCount = await this.addToCartButtons.count();
			const randomIndex = Math.floor(Math.random() * btnCount);
			const randomBtn = this.addToCartButtons.nth(randomIndex);
			await randomBtn.click();
  }
}

