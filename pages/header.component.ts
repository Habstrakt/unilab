import { type Page, type Locator } from "@playwright/test";

import { BasePage } from "./BasePage";

export class Header extends BasePage {
	readonly themeSwitcher: Locator;
	readonly blindPopUp: Locator;
	readonly blindVersionPanel: Locator;
	readonly headerSearch: Locator;
	readonly headerSearchResult: Locator;
	readonly headerSearchResultItem: Locator;
	readonly selectCity: Locator;
	readonly searchCityInput: Locator;
	readonly headerCityLink: Locator;
	readonly burgerMenuBtn: Locator;
	readonly notFoundCity: Locator;

	constructor(page: Page) {
		super(page);
		this.themeSwitcher = page.locator(".theme-switcher");
		this.blindPopUp = page.getByRole("button", {name: "Для слабовидящих"});
		this.blindVersionPanel = page.locator("#blindVersionPanel");
		this.headerSearch = page.locator("#searchOnSite");
		this.headerSearchResult = page.locator(".header__search-result");
		this.headerSearchResultItem = page.locator(".search-result__item");
    this.selectCity = page.locator(".select-city");
		this.searchCityInput = page.locator("#searchCityInput");
		this.headerCityLink = page.locator("body > header > div.header__inner > button.header__city-link.city-link.icon-before.btn-reset.grin-hover");
		this.burgerMenuBtn = page.locator("#headerBurgerBtn");
		this.notFoundCity = page.locator(".select-city__not-found-popup");
  }
}

