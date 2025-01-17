import { type Page, type Locator, expect } from '@playwright/test';
import { BasePage } from './base.page';

export class ProductPage extends BasePage {
  protected: Page
	readonly medicalServices: Locator;
	readonly tabItem: Locator;
	readonly accordionItem: Locator;

	constructor(page: Page) {
		super(page);
		this.medicalServices = page.locator(".service-item__title a");
		this.tabItem = page.locator(".service-analysis__tab-list .nav-item");
		this.accordionItem = page.locator(".accordion-item");
	}

	async clickRandomMedicalServices(): Promise<void> {
		const medicalServiceCount = this.medicalServices.count();
		const randomIndex = Math.floor(Math.random() * await medicalServiceCount);
		const randomServices = this.medicalServices.nth(randomIndex);
		await randomServices.click();
	}

	async clickTabItem(): Promise<void> {
		const tabItem = this.tabItem;
		for(let i = 0; i < await tabItem.count(); i++) {
			await tabItem.nth(i).click();
			await expect(tabItem.nth(i)).toHaveClass(/active/);
		};
	};

	async clickTabItemMobile() {
		const tabItem = this.accordionItem;
		for(let i = 0; i < await tabItem.count(); i++) {
			await tabItem.nth(i).tap();
			await expect(this.page.locator(".accordion-collapse").nth(i)).toHaveClass(/show/);
			await this.page.locator(".accordion-button").nth(i).tap();
			await expect(this.page.locator(".accordion-collapse").nth(i)).not.toHaveClass(/show/);
		};
	};
}