import { test, expect } from '@playwright/test';
import { HeaderPage } from '../../../../pages/header.page';
import { FeedbackPage } from "../../../../pages/feedback.page";

test.beforeEach(async({page}) => {
	await page.goto("/", {waitUntil: "domcontentloaded"});
});

test("Подсчет количества введенных символов в поле ввода текста оставить отзыв", async({page}) => {
	const headerPage = new HeaderPage(page);
	const feedBackPage = new FeedbackPage(page);

	const text = "Пример текста для проверки подсчета символов";
	await headerPage.openFeedBack();
	await feedBackPage.textArea.fill(text);
	const charCount = feedBackPage.charCountAttr.getAttribute("data-char-count");
	expect(await charCount).toBe(`${text.length}/3000`);
});

test("отображение подсказки поля ввода номера заказа оставить отзыв", async({page}) => {
	const headerPage = new HeaderPage(page);
	const feedBackPage = new FeedbackPage(page);
	await headerPage.openFeedBack();
	await page.waitForTimeout(1000);
	await feedBackPage.orderInput.fill("1");
	await expect(feedBackPage.orderToolTip).toBeVisible();
});

test("Маска ввода номера телефона на странице 'оставить отзыв'", async({page}) => {
	const headerPage = new HeaderPage(page);
	await headerPage.openFeedBack();

	const visitorPhone = page.locator("#id_visitor_phone");
	await page.waitForTimeout(1000);
	await visitorPhone.fill("9");
	expect(await visitorPhone.getAttribute("data-value")).toContain("79");
});

test("Удалить номер телефона на странице 'оставить отзыв'", async({page}) => {
	const headerPage = new HeaderPage(page);
	await headerPage.openFeedBack();
	const visitorPhone = page.locator("#id_visitor_phone");
	await visitorPhone.fill("9146575925");
	await visitorPhone.click();

	for(let i = 0; i <= (await visitorPhone.inputValue()).length; i++) {
		await page.keyboard.press("Backspace");
		if(await visitorPhone.getAttribute("data-value") == "7") break;
	};
	expect(await visitorPhone.getAttribute("data-value")).toContain("7");
});

// test("выделить номер телефона", async({page}) => {
// 	const headerElement = new Header(page);
// 	//const feedBackElement = new Feedback(page);
// 	await headerElement.openFeedBack();
// 	const visitorPhone = page.locator("#id_visitor_phone");
// 	await expect (visitorPhone).toBeVisible();
// 	await visitorPhone.fill("9146575925");
// 	await page.keyboard.press("Control+A");
// 	await page.keyboard.press("Backspace");
// 	await page.locator("#id_visitor_message").fill("check!");
// });