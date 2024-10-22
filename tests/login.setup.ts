import {test as setup, expect} from "@playwright/test";
import { STORAGE_STATE } from '../playwright.config';
import axios from "axios";



setup("Авторизация в МИС пользователя с существующим логином и паролем @Tttttttt5", async ({page}) => {
    const url1 = "http://vlgwkcontrol.no-ip.org:38190/login/";
    const url2 = "http://10.25.1.88:8005/login";

    let urlToUse:string;

    try {
        const response1 = await axios.get(url1);
        if (response1.status >= 200 && response1.status < 400) {
            urlToUse = url1;
        } else {
            throw new Error(`Ошибка: статус-код первого URL: ${response1.status}`);
        }
        } catch (error) {
            urlToUse = url2;
        };


    await page.goto(urlToUse);

    await page.locator("#id_username").click();
    await page.locator("#id_username").fill(process.env.USER!);

    await page.locator("#id_password").click();
    await page.locator("#id_password").fill(process.env.PASSWORD!);

    await page.locator("#login-form-content-main > form > button").click();

    await expect(page.locator("#breadcrumbs-container")).toContainText("Главная страница");

    await page.context().storageState({ path: STORAGE_STATE});
});