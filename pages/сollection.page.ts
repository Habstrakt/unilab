import { type Page, type Locator, expect } from '@playwright/test';
import { HeaderPage } from './header.page';

export class CollectionPage extends HeaderPage {
	protected page: Page;
	readonly serviceTypeItem: Locator;
	readonly serviceTitleSection: Locator;
	readonly addToCartBtn: Locator;
	readonly cartItemTitle: Locator;

	constructor(page: Page) {
		super(page);
		this.page = page;
		this.serviceTypeItem = page.locator(".types-services__tab-item");
		this.serviceTitleSection = page.locator(".service-title-section");
		this.addToCartBtn = page.locator(".service-item__btn");
		this.cartItemTitle = page.locator(".cart-item__title");
	};

	async clickToTab(): Promise<void> {
		const count = this.serviceTypeItem.count();
		for(let i = 1; i < await count; i++) {
			await expect(this.serviceTypeItem.nth(i - 1)).toHaveClass(/active/);
			await this.serviceTypeItem.nth(i).click();
			if(i < await count - 1) {
				await expect(this.serviceTypeItem.nth(i - 1)).not.toHaveClass(/active/);
			};
		};
	};

	async addToRandomService(): Promise<void> {
		const medicalServiceCount = this.addToCartBtn.count();
		const randomIndex = Math.floor(Math.random() * await medicalServiceCount);
		const randomServices = this.addToCartBtn.nth(randomIndex);
		await randomServices.click();
	};

	async randomFilter(): Promise<Locator> {
		const itemFilterCount = await this.page.locator(".accordion-item").count();
    const randomIndex = Math.floor(Math.random() * itemFilterCount);

    const randomFilterItem = this.page.locator(`[data-bs-target="#Category-${randomIndex}"]`);
    await randomFilterItem.click();

    const itemCount = await this.page.locator(`#Category-${randomIndex} .filter__item`).count();
    const randomIndexItem = Math.floor(Math.random() * itemCount);

    const randomItem = this.page.locator(`#Category-${randomIndex} .filter__item`).nth(randomIndexItem);

    await randomItem.click();
    return randomFilterItem;
	};
};
