import {type Page, type Locator} from "@playwright/test";

export class Header {
  readonly page: Page;
  readonly bodyElement: Locator;
  readonly promoSlider: Locator;
	readonly btnNo: Locator;
	readonly btnYes:Locator;
	readonly closePopUpBtn: Locator;
	readonly btnCookieAccept: Locator;
	readonly themeSwitcher: Locator;
	readonly blindPopUp: Locator;
	readonly blindVersionPanel: Locator;
	readonly overlay: Locator;
	readonly headerSearchInput: Locator;
	readonly selectCity: Locator;
	readonly searchCityInput: Locator;
	readonly headerCityLink: Locator; 

	readonly burgerMenuBtn: Locator;
	readonly navBarDropDown: Locator;
	readonly navbarScroll: Locator;


  constructor(page: Page) {
    this.page = page;
    this.bodyElement = page.locator("body");
    this.promoSlider = page.locator(".promo-swiper-section");
		this.btnNo = page.locator(".btn-no-js");
		this.btnYes = page.locator(".btn-yes-js");
		this.closePopUpBtn = page.getByRole('button', { name: 'Закрыть' });
		this.btnCookieAccept = page.locator("#btnCookieAccept");
		this.themeSwitcher = page.locator(".theme-switcher");
		this.blindPopUp = page.getByRole("button", {name: "Для слабовидящих"})
		this.blindVersionPanel = page.locator("#blindVersionPanel")
		this.overlay = page.locator("#overlay");
		this.headerSearchInput = page.locator(".header__search");
		this.selectCity = page.locator(".select-city");
		this.searchCityInput = page.locator("#searchCityInput");
		this.headerCityLink = page.locator("body > header > div.header__inner > button.header__city-link.city-link.icon-before.btn-reset.grin-hover")

		this.burgerMenuBtn = page.locator("#headerBurgerBtn");
		this.navBarDropDown = page.getByRole("button", { name: "Важно и полезно" });
		this.navbarScroll = page.locator("#navbarScroll");
  };

	async goToUrl() {
		await this.page.goto("https://dev.unilab.su/", {waitUntil: "domcontentloaded"});
	};

	async closePopUps() {
		await this.btnNo.click();
		await this.closePopUpBtn.click();
		//await this.btnCookieAccept.click();
	};
};