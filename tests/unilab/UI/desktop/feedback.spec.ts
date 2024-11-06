import { expect } from '@playwright/test';
import { test } from "../../../../fixtures/Fixture";
import { Header } from '../../../../pages/header.component';
import { Feedback } from '../../../../pages/Feedback.page';

test.beforeEach(async({mainPageInitialize}) => {
});

test("Подсчет количества введенных символов в поле ввода текста оставить отзыв", async({page}) => {
	const headerElement = new Header(page);
	const feedBackElement = new Feedback(page);

	const text = "Пример текста для проверки подсчета символов";
	await headerElement.openFeedBack();
	await feedBackElement.textArea.fill(text);
	expect(await feedBackElement.charCountAttr.getAttribute("data-char-count")).toBe(`${text.length}/3000`);
});

test("Подсчет количества введенных символов в поле ввода текста вопросу доктору", async({page}) => {
	const headerElement = new Header(page);
	const feedBackElement = new Feedback(page);

	const text = "Пример текста для проверки подсчета символов";
	await headerElement.openQuestionDoctor();
	await feedBackElement.textArea.fill(text);
	expect(await feedBackElement.charCountAttr.getAttribute("data-char-count")).toBe(`${text.length}/3000`);
});

test("отображение подсказки поля ввода номера заказа вопрос доктору", async({page}) => {
	const headerElement = new Header(page);
	const feedBackElement = new Feedback(page);

	await headerElement.openQuestionDoctor();
	await page.waitForTimeout(1000);
	await feedBackElement.orderInput.fill("1");
	await expect(feedBackElement.orderToolTip).toBeVisible();
});

test("отображение подсказки поля ввода номера заказа оставить отзыв", async({page}) => {
	const headerElement = new Header(page);
	const feedBackElement = new Feedback(page);

	await headerElement.openFeedBack();
	await page.waitForTimeout(1000);
	await feedBackElement.orderInput.fill("1");
	await expect(feedBackElement.orderToolTip).toBeVisible();
});