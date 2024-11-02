import {type Page, type Locator} from "@playwright/test";
import { BasePage } from "./BasePage";

export class MainPage extends BasePage {
  readonly bodyElement: Locator;
  readonly promoSlider: Locator;
	readonly btnYes:Locator;
	readonly upBtn: Locator;
	readonly navBarDropDown: Locator;
	readonly btnFeedBack: Locator;
	readonly btnQuestionDoctor: Locator;
	readonly questionFormLink: Locator;
	readonly navbarScroll: Locator;
	readonly imgSlider: Locator;
	readonly btnPrev: Locator;
	readonly btnNext: Locator;
	readonly textArea: Locator;
	readonly charCount: Locator;
	readonly charCountAttr: Locator;
	readonly orderInput: Locator;
	readonly orderToolTip: Locator;

	readonly analysLink: Locator;


  constructor(page: Page) {
	super(page);
  this.bodyElement = page.locator("body");
  this.promoSlider = page.locator(".promo-swiper-section");
	this.btnPrev = page.locator(".promo-swiper-button-prev");
	this.btnNext = page.locator(".promo-swiper-button-next");
	this.btnYes = page.locator(".btn-yes-js");
	this.upBtn = page.locator(".up-button");
	this.navBarDropDown = page.getByRole("button", { name: "Важно и полезно" });
	this.btnFeedBack = page.locator('#navbarScroll').getByRole("link", { name: "Оставить отзыв" });
	this.btnQuestionDoctor = page.getByRole("link", { name: "Скажите, доктор" });
	this.questionFormLink = page.locator("[href='/free_consultation/add_question']");
	this.navbarScroll = page.locator("#navbarScroll");
	this.imgSlider = page.locator(".brd-rd16");
	this.textArea = page.locator("#id_visitor_message");
	this.charCount = page.locator(".visitor-message__char-count");
	this.charCountAttr = page.locator("[data-char-count]");
	this.orderInput = page.locator("#id_order");
	
	this.orderToolTip = page.getByText('Номер заказа должен начинаться с цифр: 25, 27, 45');



	this.analysLink = page.locator('#navbarScroll').getByRole('link', { name: 'Анализы' });
	};

	openFeedBack(){
		this.navBarDropDown.click();
		this.btnFeedBack.click();
	};
	openQuestionDoctor(){
		this.navBarDropDown.click();
		this.btnQuestionDoctor.click();
		this.questionFormLink.click();
	};
};