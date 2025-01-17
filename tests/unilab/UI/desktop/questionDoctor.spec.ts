import { test, expect } from '@playwright/test';
import { HeaderPage } from '../../../../pages/header.page';
import { QuestionDoctor } from '../../../../pages/questionDoctor.page';

let headerPage: HeaderPage;
let questionDoctor: QuestionDoctor;

test.beforeEach(async({page}) => {
	headerPage = new HeaderPage(page);
	questionDoctor = new QuestionDoctor(page);
	await page.goto("/", {waitUntil: "domcontentloaded"});
});

test("Подсчет количества введенных символов в поле ввода текста вопросу доктору", async() => {
	const text = "Пример текста для проверки подсчета символов";
	await headerPage.openQuestionDoctor();
	await questionDoctor.textArea.fill(text);
	const charCount = questionDoctor.charCountAttr.getAttribute("data-char-count");
	expect(await charCount).toBe(`${text.length}/3000`);
});

test("отображение подсказки поля ввода номера заказа вопрос доктору", async({page}) => {
	await headerPage.openQuestionDoctor();
	await page.waitForTimeout(1000);
	await questionDoctor.orderInput.fill("1");
	await expect(questionDoctor.orderToolTip).toBeVisible();
});