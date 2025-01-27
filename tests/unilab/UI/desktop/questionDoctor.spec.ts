import { test, expect } from '@playwright/test';
import { HeaderPage } from '../../../../pages/header.page';
import { QuestionDoctor } from '../../../../pages/questionDoctor.page';
import {fakerRU as faker} from "@faker-js/faker";

let headerPage: HeaderPage;
let questionDoctor: QuestionDoctor;

test.beforeEach(async({page}) => {
	headerPage = new HeaderPage(page);
	questionDoctor = new QuestionDoctor(page);
	await page.goto("/", {waitUntil: "domcontentloaded"});
});

test("Подсчет количества введенных символов в поле ввода текста вопросу доктору", async() => {
	const text = faker.lorem.text();
	await test.step("Открыть страницу 'Скажите, доктор'", async() => {
		await headerPage.openQuestionDoctor();
	});
	await test.step("Ввести текст в поле ввода вопроса", async() => {
		await questionDoctor.textArea.fill(text);
	});
	await test.step("Получить количество введенных символов", async() => {
		const charCount = questionDoctor.charCountAttr.getAttribute("data-char-count");
		expect(await charCount).toBe(`${text.length}/3000`);
	});
});

test("Проверить что ввод ограничен 3000 символами в поле ввода текста вопросу доктору", async() => {
	await test.step("Открыть страницу 'Скажите, доктор'", async() => {
		await headerPage.openQuestionDoctor();
	});
	await test.step("Проверить что поле ввода ограничено 3000 символами", async() => {
		await expect(questionDoctor.textArea).toHaveAttribute("maxlength", "3000");
	});
});

test("отображение подсказки поля ввода номера заказа вопрос доктору", async({page}) => {
	await test.step("Открыть страницу 'Скажите, доктор'", async() => {
		await headerPage.openQuestionDoctor();
	});
	await test.step("Дождаться загрузки js-скрипта", async() => {
		await page.waitForTimeout(2000);
	});
	await test.step("Ввести число '1' в поле ввода номера заказа", async() => {
		await questionDoctor.orderInput.fill("1");
	});
	await test.step("Проверить что подсказка отображается", async() => {
		await expect(questionDoctor.orderToolTip).toBeVisible();
	});
});
