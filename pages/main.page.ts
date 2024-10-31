import {type Page, type Locator} from "@playwright/test";
import { BasePage } from "./BasePage";

export class MainPage extends BasePage {
  readonly bodyElement: Locator;
  readonly promoSlider: Locator;
	readonly btnYes:Locator;
	readonly overlay: Locator;
	readonly upBtn: Locator;
	readonly navBarDropDown: Locator;
	readonly navbarScroll: Locator;


  constructor(page: Page) {
		super(page);
    this.bodyElement = page.locator("body");
    this.promoSlider = page.locator(".promo-swiper-section");
		this.btnYes = page.locator(".btn-yes-js");
		this.overlay = page.locator("#overlay");
		this.upBtn = page.locator(".up-button");
		this.navBarDropDown = page.getByRole("button", { name: "Важно и полезно" });
		this.navbarScroll = page.locator("#navbarScroll");
	};
};