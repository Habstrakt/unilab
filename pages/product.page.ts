import { type Page, type Locator } from '@playwright/test';
import { BasePage } from './base.page';

export class ProductPage extends BasePage {
  protected: Page
  readonly medicalServicesMenuLink: Locator;
	readonly medicalServices: Locator;
	//readonly addToCartBtn: Locator;

	constructor(page: Page) {
		super(page);
		this.medicalServicesMenuLink = page.locator('#navbarScroll').getByRole('link', { name: 'Мед. услуги' });
		this.medicalServices = page.locator(".service-item__title a");
		//this.addToCartBtn = page.locator(".btn-to-cart");
	}

	async clickRandomMedicalServices() {
		const medicalServiceCount = await this.medicalServices.count();
		const randomIndex = Math.floor(Math.random() * medicalServiceCount);
		const randomServices = this.medicalServices.nth(randomIndex);
		await randomServices.click();
	}
}