import { type Page, type Locator, expect } from '@playwright/test';
import { HeaderPage } from './header.page';

export class CollectionPage extends HeaderPage {
	protected page: Page;
	readonly serviceTypeItem: Locator;
	readonly serviceTitleSection: Locator;

	constructor(page: Page) {
		super(page);
		this.page = page;
		this.serviceTypeItem = page.locator(".types-services__tab-item");
		this.serviceTitleSection = page.locator(".service-title-section");
	};

	async clickToTab() {
		const count = this.serviceTypeItem.count();
		for(let i = 1; i < await count; i++) {
			await expect(this.serviceTypeItem.nth(i - 1)).toHaveClass(/active/);
			await this.serviceTypeItem.nth(i).click();
			if(i < await count - 1) {
				await expect(this.serviceTypeItem.nth(i - 1)).not.toHaveClass(/active/);
			};
		};
	};
};
