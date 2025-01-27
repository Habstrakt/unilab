import { test, expect } from '@playwright/test';
import { HeaderPage } from '../../../../pages/header.page';
import { FeedbackPage } from "../../../../pages/feedback.page";
import {fakerRU as faker} from "@faker-js/faker";

let headerPage: HeaderPage;
let feedBackPage: FeedbackPage;

test.beforeEach(async({page}) => {
	headerPage = new HeaderPage(page);
	feedBackPage = new FeedbackPage(page);
	await page.goto("/", {waitUntil: "domcontentloaded"});
});

test("Подсчет количества введенных символов в поле ввода текста оставить отзыв", async() => {
	const text = faker.lorem.text()
	await test.step("Перейти на страницу 'Оставить отзыв'", async() => {
		await headerPage.openFeedBack();
	});
	await test.step("Ввести текст в поле ввода", async() => {
		await feedBackPage.textArea.fill(text);
	});
	await test.step("Количество введенных символов изменилось", async() => {
		await expect(feedBackPage.charCountAttr).toHaveAttribute("data-char-count", `${text.length}/3000`);
	});
});

test("отображение подсказки поля ввода номера заказа оставить отзыв", async({page}) => {
	await test.step("Перейти на страницу 'Оставить отзыв'", async() => {
		await headerPage.openFeedBack();
	});
	await test.step("Дождаться загрузки js-скрипта", async() => {
		await page.waitForTimeout(1000);
	});
	await test.step("Ввести первую цифру заказа", async() => {
		await feedBackPage.orderInput.fill("1");
	});
	await test.step("Проверить отображение подсказки", async() => {
		await expect(feedBackPage.orderToolTip).toBeVisible();
	});
});

test("Маска ввода номера телефона на странице 'оставить отзыв'", async({page}) => {
	await test.step("Перейти на страницу 'Оставить отзыв'", async() => {
		await headerPage.openFeedBack();
	});
	await test.step("Дождаться загрузки js-скрипта", async() => {
		await page.waitForTimeout(1000);
	});
	await test.step("Ввести цифру '9' в поле номера телефона", async() => {
		await feedBackPage.visitorPhoneInput.fill("9");
	});
	await test.step("Проверить что номер телефона начинается с '79'", async() => {
		expect(await feedBackPage.visitorPhoneInput.getAttribute("data-value")).toContain("79");
	});
});

test("Удалить номер телефона на странице 'оставить отзыв'", async({page}) => {
	const phoneNumber = faker.phone.number().replace(/\D/g, '').slice(0, 10);
	await test.step("Перейти на страницу 'Оставить отзыв'", async() => {
		await headerPage.openFeedBack();
	});
	await test.step("Ввести в поле номер телефона 10 значный номер телефона" , async() => {
		await feedBackPage.visitorPhoneInput.fill(phoneNumber);
	});
	await test.step("Переместить курсор в конец поля ввода", async() => {
		await feedBackPage.visitorPhoneInput.click();
		await page.keyboard.press("End");
	});
	await test.step("Дождаться загрузки js-скрипта", async() => {
		await page.waitForLoadState("load", { timeout: 5000 });
	});
	await test.step("Удалить номер телефона посимвольно", async() => {
		const inputValue = await feedBackPage.visitorPhoneInput.inputValue();
		for(let i = 0; i <= inputValue.length; i++) {
			await page.keyboard.press("Backspace");
			const currentValue = await feedBackPage.visitorPhoneInput.getAttribute("data-value")
			if(currentValue == "7") break;
		};
	});
	await test.step("Проверить что номер телефона содержит только цифру '7'", async() => {
		expect(await feedBackPage.visitorPhoneInput.getAttribute("data-value")).toContain("7");
	});
});