import {test, expect} from "@playwright/test";
import { describe } from "node:test";
import { qase } from 'playwright-qase-reporter';
import axios from "axios";

test.use({
    viewport: {width: 1920, height: 1080},
    locale: "ru-RU"
});

const newPasswordCases = [
    {
        title: "Новый пароль из латиницы",
        newPassword: "unilabpass",
        confirmPassword: "unilabpass",
    },
    {
        title: "Новый пароль из кириллицы",
        newPassword: "юнилабпароль",
        confirmPassword: "юнилабпароль",
    },
    {
        title: "Новый пароль из латиницы и цифр",
        newPassword: "unilab115007",
        confirmPassword: "unilab115007",
    },
    {
        title: "Новый пароль из кириллицы и цифр",
        newPassword: "юнилаб115007",
        confirmPassword: "юнилаб115007",
    },
    {
        title: "Новый пароль из латиницы и спецсимволов",
        newPassword: "!unilab@",
        confirmPassword: "!unilab@",
    },
    {
        title: "Новый пароль из кириллицы и спецсимволов",
        newPassword: "*юнилаб@",
        confirmPassword: "*юнилаб@",
    }
];

describe("Чек-лист смена пароля пользователя (positive)", () => {
    for(const {title, newPassword, confirmPassword} of newPasswordCases) {
        test(`${title} ${newPassword}`, async ({browser}) => {
            qase.id(40);

            const context = await browser.newContext({recordVideo: {
                dir: "videos/",
                size: {width: 1280, height: 720},
            }});
            const page = await context.newPage();

            const url1 = "http://vlgwkcontrol.no-ip.org:38190/login/";
            const url2 = "http://10.25.1.88:8005/login";

            let urlToUse:string;

            // try {
            //     const response1 = await axios.get(url1);
            //     if (response1.status >= 200 && response1.status < 400) {
            //         urlToUse = url1;
            //     } else {
            //         throw new Error(`Ошибка: статус-код первого URL: ${response1.status}`);
            //     }
            //     } catch (error) {
            //         console.error(error);
            //         urlToUse = url2;
            //     };

            await page.goto(url2);

            await page.locator("#id_username").fill("test3_ttt");
            await page.locator("#id_password").fill("uni_987572*msa");
            await page.locator("#login-form-content-main > form > button").click();


            await page.locator("#user-menu").click();

            await page.locator("#user-menu-block > ul > li:nth-child(1) > a").click();

            let newTab = await context.waitForEvent("page");

            await newTab.locator("#id_old_password").fill("uni_987572*msa");


            await newTab.locator("#id_new_password1").fill(newPassword);
            await newTab.locator("#id_new_password2").fill(confirmPassword);
            await newTab.locator('#container > form > div.button-place.sticky > button.btn-ok').click();

            await page.locator("#user-menu-block > ul > li:nth-child(4) > a").click();
            await page.locator("#winConfirm-ok-btn").click();

            await page.locator("#id_username").fill("test3_ttt");
            await page.locator("#id_password").fill(newPassword)
            await page.locator("#login-form-content-main > form > button").click();


            test.step(`${title}`, async() => {
                await expect(page).toHaveURL(/(wo\/|\?next=\/logout\/)/);
            });

            await page.locator("#user-menu").click();
            await page.locator("#user-menu").click();

            await page.locator("#user-menu-block > ul > li:nth-child(1) > a").click();

            newTab = await context.waitForEvent("page");

            await newTab.locator("#id_old_password").fill(newPassword);
            await newTab.locator("#id_new_password1").fill("uni_987572*msa");
            await newTab.locator("#id_new_password2").fill("uni_987572*msa");
            await newTab.locator('#container > form > div.button-place.sticky > button.btn-ok').click();
        });
    };
});