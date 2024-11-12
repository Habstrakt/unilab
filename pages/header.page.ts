import { type Page, type Locator } from "@playwright/test";

import { BasePage } from "./base.page";

export class HeaderPage extends BasePage {
	readonly themeSwitcher: Locator;
	readonly blindPopUp: Locator;
	readonly blindVersionPanel: Locator;
	readonly headerSearch: Locator;
	readonly headerSearchResult: Locator;
	readonly headerSearchResultItem: Locator;
	readonly selectCity: Locator;
	readonly searchCityInput: Locator;
	readonly headerCityLink: Locator;
	readonly headerCityLinkMobile: Locator;
	readonly burgerMenuBtn: Locator;
	readonly notFoundCity: Locator;

	readonly analysisLink: Locator;
	readonly medicalServicesLink: Locator;

	readonly navBarDropDown: Locator;
	readonly btnFeedBack: Locator;

	readonly btnQuestionDoctor: Locator;
	readonly questionFormLink: Locator;

	readonly addresses: Locator;

	constructor(page: Page) {
		super(page);
		this.themeSwitcher = page.locator(".theme-switcher");
		this.blindPopUp = page.getByRole("button", {name: "Для слабовидящих"});
		this.blindVersionPanel = page.locator("#blindVersionPanel");
		this.headerSearch = page.locator("#searchOnSite");
		this.headerSearchResult = page.locator(".header__search-result");
		this.headerSearchResultItem = page.locator(".search-result__item");
    this.selectCity = page.locator("#selectCity");
		this.searchCityInput = page.locator("#searchCityInput");
		this.headerCityLink = page.locator(".header__city-link");
		this.headerCityLinkMobile = page.locator(".header__navbar .city-link");
		this.burgerMenuBtn = page.locator("#headerBurgerBtn");
		this.notFoundCity = page.locator(".select-city__not-found-popup");

		this.analysisLink = page.locator('#navbarScroll').getByRole('link', { name: 'Анализы' });
		this.medicalServicesLink = page.locator('#navbarScroll').getByRole('link', { name: 'Мед. услуги' });

		this.navBarDropDown = page.getByRole("button", { name: "Важно и полезно" });
		this.btnFeedBack = page.locator('#navbarScroll').getByRole("link", { name: "Оставить отзыв" });

		this.btnQuestionDoctor = page.getByRole("link", { name: "Скажите, доктор" });
		this.questionFormLink = page.locator("[href='/free_consultation/add_question']");

		this.addresses = page.locator("#navbarScroll").getByRole("link", {name: "Адреса"});
	}

	async openFeedBack(){
		await this.navBarDropDown.click();
		await this.btnFeedBack.click();
	};

	async openQuestionDoctor(){
		await this.navBarDropDown.click();
		await this.btnQuestionDoctor.click();
		await this.questionFormLink.click();
	};
}

