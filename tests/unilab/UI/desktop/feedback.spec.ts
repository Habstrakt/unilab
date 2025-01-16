import { test, expect } from '@playwright/test';
import { HeaderPage } from '../../../../pages/header.page';
import { FeedbackPage } from "../../../../pages/feedback.page";

let headerPage: HeaderPage;
let feedBackPage: FeedbackPage;

test.beforeEach(async({page}) => {
	headerPage = new HeaderPage(page);
	feedBackPage = new FeedbackPage(page);
	await page.goto("https://dev.unilab.su/", {waitUntil: "domcontentloaded"});
});

test("Подсчет количества введенных символов в поле ввода текста оставить отзыв", async() => {
	const text = "Пример текста для проверки подсчета символов";
	await headerPage.openFeedBack();
	await feedBackPage.textArea.fill(text);
	const charCount = feedBackPage.charCountAttr.getAttribute("data-char-count");
	expect(await charCount).toBe(`${text.length}/3000`);
});

test("отображение подсказки поля ввода номера заказа оставить отзыв", async({page}) => {
	await headerPage.openFeedBack();
	await page.waitForLoadState("load", { timeout: 5000 });
	await feedBackPage.orderInput.fill("1");
	await expect(feedBackPage.orderToolTip).toBeVisible();
});

test("Маска ввода номера телефона на странице 'оставить отзыв'", async({page}) => {
	await headerPage.openFeedBack();
	await page.waitForLoadState("load", { timeout: 5000 });
	await feedBackPage.visitorPhoneInput.fill("9");
	expect(await feedBackPage.visitorPhoneInput.getAttribute("data-value")).toContain("79");
});

test("Удалить номер телефона на странице 'оставить отзыв'", async({page}) => {
	await headerPage.openFeedBack();
	await feedBackPage.visitorPhoneInput.fill("9146575925");
	await feedBackPage.visitorPhoneInput.click();
	await page.keyboard.press("End");
	await page.waitForLoadState("load", { timeout: 5000 });
	for(let i = 0; i <= (await feedBackPage.visitorPhoneInput.inputValue()).length; i++) {
		await page.keyboard.press("Backspace");
		if(await feedBackPage.visitorPhoneInput.getAttribute("data-value") == "7") break;
	};
	expect(await feedBackPage.visitorPhoneInput.getAttribute("data-value")).toContain("7");
});