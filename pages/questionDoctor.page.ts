import { type Page, type Locator } from '@playwright/test';
import { HomePage } from './home.page';

export class QuestionDoctor extends HomePage{
	readonly textArea: Locator;
	readonly charCountAttr: Locator;
  readonly orderInput: Locator;
  readonly orderToolTip: Locator;

	constructor(page: Page) {
		super(page);
		this.textArea = page.locator("#id_visitor_message");
		this.charCountAttr = page.locator("[data-char-count]");
    this.orderInput = page.locator("#id_order");
		this.orderToolTip = page.getByText("Номер заказа должен начинаться с цифр: 25, 27, 45");
	}
}