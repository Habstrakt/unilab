import {type Page, type Locator} from "@playwright/test";
import { HeaderPage } from "./header.page";

export class AddressPage extends HeaderPage {
	protected page: Page;
	readonly addressesBtnReview: Locator;
	readonly visitorDate: Locator;
	readonly addressesList: Locator;
	readonly filterCheckbox: Locator;

	constructor(page: Page) {
		super(page);
		this.page = page;
		this.addressesBtnReview = page.locator(".addresses__btn-review");
		this.visitorDate = page.locator("#id_visitor_date");
		this.addressesList = page.locator(".addresses__item");
		this.filterCheckbox = page.locator("#id_properties_1");
	}

	async clickRandomAddresses(): Promise<void>{
		const addressesCount = await this.addressesBtnReview.count();
		const randomIndex = Math.floor(Math.random() * addressesCount);
		const randomBtn = this.addressesBtnReview.nth(randomIndex);
		await randomBtn.click();
	};

	async todayDate(): Promise<void> {
		const today = new Date();
		const formattedDate = today.toISOString().split("T")[0];
		await this.visitorDate.fill(formattedDate);
	};

	async getAddressesCount(): Promise<number> {
		return this.addressesList.count();
	}

	async applyFilter(): Promise<void> {
		await this.filterCheckbox.click();
	}
}