import {type Page, type Locator} from "@playwright/test";
import { expect } from "@playwright/test";
import { BasePage } from "./base.page";

export class HomePage extends BasePage {
  readonly bodyElement: Locator;
  readonly promoSlider: Locator;

	readonly upBtn: Locator;
	readonly navbarScroll: Locator;
	readonly imgSlider: Locator;
	readonly btnPrev: Locator;
	readonly btnNext: Locator;
	readonly bullets: Locator;

	readonly complexTab: Locator;
	readonly homeTab: Locator;
	readonly analyzeSliderItems: Locator;
	readonly complexSliderItems: Locator;

  constructor(page: Page) {
		super(page);
		this.bodyElement = page.locator("body");
		this.promoSlider = page.locator(".promo-swiper-section");
		this.btnPrev = page.locator(".promo-swiper-button-prev");
		this.btnNext = page.locator(".promo-swiper-button-next");
		this.upBtn = page.locator(".up-button");
		this.navbarScroll = page.locator("#navbarScroll");
		this.imgSlider = page.locator(".brd-rd16");
		this.bullets = page.locator(".promo-swiper .swiper-pagination-bullet");

		this.complexTab = page.locator("#complexes-tab");
		this.homeTab = page.locator("#nav-home-tab");
		this.analyzeSliderItems = page.locator("#A .top-services__slide-title");
		this.complexSliderItems = page.locator("#C .top-services__slide-title");
	};

	async visibleSliderItem(locator: Locator): Promise<void> {
		const count = await locator.count();
		for(let i = 0; i < count; i++) {
			await expect(locator.nth(i)).toBeVisible();
		}
	}
};