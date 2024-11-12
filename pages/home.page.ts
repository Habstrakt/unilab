import {type Page, type Locator} from "@playwright/test";
import { BasePage } from "./base.page";

export class HomePage extends BasePage {
  readonly bodyElement: Locator;
  readonly promoSlider: Locator;
	readonly btnYes:Locator;
	readonly upBtn: Locator;
	readonly navbarScroll: Locator;
	readonly imgSlider: Locator;
	readonly btnPrev: Locator;
	readonly btnNext: Locator;
	readonly bullets: Locator;

  constructor(page: Page) {
		super(page);
		this.bodyElement = page.locator("body");
		this.promoSlider = page.locator(".promo-swiper-section");
		this.btnPrev = page.locator(".promo-swiper-button-prev");
		this.btnNext = page.locator(".promo-swiper-button-next");
		this.btnYes = page.locator(".btn-yes-js");
		this.upBtn = page.locator(".up-button");
		this.navbarScroll = page.locator("#navbarScroll");
		this.imgSlider = page.locator(".brd-rd16");
		this.bullets = page.locator(".promo-swiper .swiper-pagination-bullet");
	};
};