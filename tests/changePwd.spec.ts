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

// describe("Чек-лист смена пароля пользователя", () => {
//     for(const {title, newPassword, confirmPassword} of newPasswordCases) {
//         test(`${title} ${newPassword}`, async ({browser}) => {
//             qase.id(4);
//             qase.title("Чек-лист смена пароля пользователя");

//             const context = await browser.newContext();
//             const page = await context.newPage();

//             const url1 = "http://vlgwkcontrol.no-ip.org:38190/login/";
//             const url2 = "http://10.25.1.88:8005/login";

//             let urlToUse:string;

//             try {
//                 const response1 = await axios.get(url1);
//                 if (response1.status >= 200 && response1.status < 400) {
//                     urlToUse = url1;
//                 } else {
//                     throw new Error(`Ошибка: статус-код первого URL: ${response1.status}`);
//                 }
//                 } catch (error) {
//                     console.error(error);
//                     urlToUse = url2;
//                 };

//             await page.goto(urlToUse);

//             await page.locator("#id_username").fill("test3_ttt");
//             await page.locator("#id_password").fill("uni_987572*msa");
//             await page.locator("#login-form-content-main > form > button").click();


//             page.locator("#user-menu").click();

//             page.locator("#user-menu-block > ul > li:nth-child(1) > a").click();

//             let newTab = await context.waitForEvent("page");

//             await newTab.locator("#id_old_password").fill("uni_987572*msa");


//             await newTab.locator("#id_new_password1").fill(newPassword);
//             await newTab.locator("#id_new_password2").fill(confirmPassword);
//             await newTab.locator('#container > form > div.button-place.sticky > button.btn-ok').click();

//             await page.locator("#user-menu-block > ul > li:nth-child(4) > a").click();
//             await page.locator("#winConfirm-ok-btn").click();

//             test.step(`${title}`, async() => {
//                 await page.locator("#id_username").fill("test3_ttt");
//                 await page.locator("#id_password").fill(newPassword)
//                 await page.locator("#login-form-content-main > form > button").click();
//                 await expect(page).toHaveURL(/wo\//);
//             });


//             page.locator("#user-menu").click();

//             page.locator("#user-menu-block > ul > li:nth-child(1) > a").click();

//             newTab = await context.waitForEvent("page");

//             await newTab.locator("#id_old_password").fill(newPassword);
//             await newTab.locator("#id_new_password1").fill("uni_987572*msa");
//             await newTab.locator("#id_new_password2").fill("uni_987572*msa");
//             await newTab.locator('#container > form > div.button-place.sticky > button.btn-ok').click();
//         });
//     };
// });


test("7. Введение некорректного текущего пароля", async ({browser}) => {
    qase.id(4);

    const context = await browser.newContext();
    const page = await context.newPage();

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
                    console.error(error);
                    urlToUse = url2;
                };

    await page.goto(urlToUse);

    await page.locator("#id_username").fill("test3_ttt");
    await page.locator("#id_password").fill("uni_987572*msa");
    await page.locator("#login-form-content-main > form > button").click();

    page.locator("#user-menu").click();

    page.locator("#user-menu-block > ul > li:nth-child(1) > a").click();

    let newTab = await context.waitForEvent("page");

    await newTab.locator("#id_old_password").fill("uni_987572*msa");

    await newTab.locator("#id_old_password").fill("uni_987572");
    await newTab.locator("#id_new_password1").fill("unilabwork");
    await newTab.locator("#id_new_password2").fill("unilabwork");

    await newTab.locator('#container > form > div.button-place.sticky > button.btn-ok').click();

    const errorText = newTab.locator("#container > form > div.fields > div > div > table > tbody > tr:nth-child(1) > td > ul.errorlist > li");

    expect(errorText).toBeVisible();
    expect(errorText).toHaveText("Ваш старый пароль введен неправильно. Пожалуйста, введите его снова.");

    await page.close();
});

test("8. Новый пароль из латиницы короче требуемых символов", async ({browser}) => {
    qase.id(4);

    const context = await browser.newContext();
    const page = await context.newPage();

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
                    console.error(error);
                    urlToUse = url2;
                };

    await page.goto(urlToUse);

    await page.locator("#id_username").fill("test3_ttt");
    await page.locator("#id_password").fill("uni_987572*msa");
    await page.locator("#login-form-content-main > form > button").click();

    page.locator("#user-menu").click();

    page.locator("#user-menu-block > ul > li:nth-child(1) > a").click();

    let newTab = await context.waitForEvent("page");

    await newTab.locator("#id_old_password").fill("uni_987572*msa");

    await newTab.locator("#id_old_password").fill("uni_987572*msa");
    await newTab.locator("#id_new_password1").fill("unilab8");
    await newTab.locator("#id_new_password2").fill("unilab8");

    await newTab.locator('#container > form > div.button-place.sticky > button.btn-ok').click();

    const errorText = newTab.locator("#container > form > div.fields > div > div > table > tbody > tr:nth-child(1) > td > ul.errorlist > li");


    expect(errorText).toBeVisible();
    expect(errorText).toHaveText("Введённый пароль слишком короткий. Он должен содержать как минимум 8 символов.");

    await page.close();
});

test("9. Новый пароль из кириллицы короче требуемых символов", async ({browser}) => {
    qase.id(4);

    const context = await browser.newContext();
    const page = await context.newPage();

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
            console.error(error);
            urlToUse = url2;
        };

    await page.goto(urlToUse);

    await page.locator("#id_username").fill("test3_ttt");
    await page.locator("#id_password").fill("uni_987572*msa");
    await page.locator("#login-form-content-main > form > button").click();

    page.locator("#user-menu").click();

    page.locator("#user-menu-block > ul > li:nth-child(1) > a").click();

    const newTab = await context.waitForEvent("page");

    await newTab.locator("#id_old_password").fill("uni_987572*msa");
    await newTab.locator("#id_new_password1").fill("юнилаб8");
    await newTab.locator("#id_new_password2").fill("юнилаб8");

    await newTab.locator('#container > form > div.button-place.sticky > button.btn-ok').click();

    const errorText = newTab.locator("#container > form > div.fields > div > div > table > tbody > tr:nth-child(3) > td > ul > li");

    expect(errorText).toBeVisible();
    expect(errorText).toHaveText("Введённый пароль слишком короткий. Он должен содержать как минимум 8 символов.");

    await page.close();
})

test("10. Новый пароль состоит только из цифр", async({browser}) => {
    qase.id(4);

    const context = await browser.newContext();
    const page = await context.newPage();

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
            console.error(error);
            urlToUse = url2;
        };

    await page.goto(urlToUse);

    await page.locator("#id_username").fill("test3_ttt");
    await page.locator("#id_password").fill("uni_987572*msa");
    await page.locator("#login-form-content-main > form > button").click();

    page.locator("#user-menu").click();

    page.locator("#user-menu-block > ul > li:nth-child(1) > a").click();

    let newTab = await context.waitForEvent("page");

    await newTab.locator("#id_old_password").fill("uni_987572*msa");
    await newTab.locator("#id_new_password1").fill("115007115");
    await newTab.locator("#id_new_password2").fill("115007115");

    await newTab.locator('#container > form > div.button-place.sticky > button.btn-ok').click();

    const errorText = newTab.locator("#container > form > div.fields > div > div > table > tbody > tr:nth-child(3) > td > ul.errorlist > li");

    expect(errorText).toBeVisible();
    expect(errorText).toHaveText("Введённый пароль состоит только из цифр.");

    await page.close();
})

// test("11. Новый пароль состоит только из спец. символов", async({browser}) => {
//     const context = await browser.newContext();
//     const page = await context.newPage();

//     await login(page, "test3_ttt", "uni_987572*msa");

//     let newTab = await openNewTab(context, page, "#user-menu", "#user-menu-block > ul > li:nth-child(1) > a", "Изменение своего пароля");

//     await newTab.locator("#id_old_password").click();
//     await newTab.locator("#id_old_password").fill("uni_987572*msa");

//     await newTab.locator("#id_new_password1").click();
//     await newTab.locator("#id_new_password1").fill("!@#$%^&*");

//     await newTab.locator("#id_new_password2").click();
//     await newTab.locator("#id_new_password2").fill("!@#$%^&*");

//     await newTab.locator('#container > form > div.button-place.sticky > button.btn-ok').click();

//     await page.locator("#user-menu-block > ul > li:nth-child(4) > a").click();
//     await page.locator("#winConfirm-ok-btn").click();

//     await login(page, "test3_ttt", "!@#$%^&*");

//     newTab = await openNewTab(context, page, "#user-menu", "#user-menu-block > ul > li:nth-child(1) > a", "Изменение своего пароля");

//     await newTab.locator("#id_old_password").click();
//     await newTab.locator("#id_old_password").fill("!@#$%^&*");

//     await newTab.locator("#id_new_password1").click();
//     await newTab.locator("#id_new_password1").fill("uni_987572*msa");

//     await newTab.locator("#id_new_password2").click();
//     await newTab.locator("#id_new_password2").fill("uni_987572*msa");

//     await newTab.locator('#container > form > div.button-place.sticky > button.btn-ok').click();

//     await page.close();
// });

// test("12. Новый пароль совпадает с текущим паролем", async({ browser }) => {
//     const context = await browser.newContext();
//     const page = await context.newPage();

//     await login(page, "test3_ttt", "uni_987572*msa");

//     const newTab = await openNewTab(context, page, "#user-menu", "#user-menu-block > ul > li:nth-child(1) > a", "Изменение своего пароля");

//     await newTab.locator("#id_old_password").click();
//     await newTab.locator("#id_old_password").fill("uni_987572*msa");

//     await newTab.locator("#id_new_password1").click();
//     await newTab.locator("#id_new_password1").fill("uni_987572*msa");

//     await newTab.locator("#id_new_password2").click();
//     await newTab.locator("#id_new_password2").fill("uni_987572*msa");

//     await newTab.locator('#container > form > div.button-place.sticky > button.btn-ok').click();

//     await page.locator("#user-menu-block > ul > li:nth-child(4) > a").click();
//     await page.locator("#winConfirm-ok-btn").click();

//     await login(page, "test3_ttt", "uni_987572*msa");

//     await page.close();
// });

// test("13. Новый пароль на латинице не совпадает с паролем для подтверждения", async({browser}) => {
//     const context = await browser.newContext();
//     const page = await context.newPage();

//     await login(page, "test3_ttt", "uni_987572*msa");

//     const newTab = await openNewTab(context, page, "#user-menu", "#user-menu-block > ul > li:nth-child(1) > a", "Изменение своего пароля");

//     await newTab.locator("#id_old_password").click();
//     await newTab.locator("#id_old_password").fill("uni_987572*msa");

//     await newTab.locator("#id_new_password1").click();
//     await newTab.locator("#id_new_password1").fill("unilab115007");

//     await newTab.locator("#id_new_password2").click();
//     await newTab.locator("#id_new_password2").fill("unilab007115");

//     await newTab.locator('#container > form > div.button-place.sticky > button.btn-ok').click();

//     const errorText = await newTab.locator("#container > form > div.fields > div > div > table > tbody > tr:nth-child(3) > td > ul.errorlist > li");

//     expect(errorText).toBeVisible();
//     expect(await errorText.textContent()).toEqual("Введенные пароли не совпадают.");

//     await newTab.close();
//     await page.close();
// });

// test("14. Новый пароль на кириллицы не совпадает с паролем для подтверждения", async({browser}) => {
//     const context = await browser.newContext();
//     const page = await context.newPage();

//     await login(page, "test3_ttt", "uni_987572*msa");

//     const newTab = await openNewTab(context, page, "#user-menu", "#user-menu-block > ul > li:nth-child(1) > a", "Изменение своего пароля");

//     await newTab.locator("#id_old_password").click();
//     await newTab.locator("#id_old_password").fill("uni_987572*msa");

//     await newTab.locator("#id_new_password1").click();
//     await newTab.locator("#id_new_password1").fill("юнилаб115007");

//     await newTab.locator("#id_new_password2").click();
//     await newTab.locator("#id_new_password2").fill("юнилаб007115");

//     await newTab.locator('#container > form > div.button-place.sticky > button.btn-ok').click();

//     const errorText = await newTab.locator("#container > form > div.fields > div > div > table > tbody > tr:nth-child(3) > td > ul.errorlist > li");

//     expect(errorText).toBeVisible();
//     expect(await errorText.textContent()).toEqual("Введенные пароли не совпадают.");

//     await newTab.close();
//     await page.close();
// });

// test("15. Новый пароль на латинице, подтвержденный пароль на кирилице", async({browser}) => {
//     const context = await browser.newContext();
//     const page = await context.newPage();

//     await login(page, "test3_ttt", "uni_987572*msa");

//     const newTab = await openNewTab(context, page, "#user-menu", "#user-menu-block > ul > li:nth-child(1) > a", "Изменение своего пароля");

//     await newTab.locator("#id_old_password").click();
//     await newTab.locator("#id_old_password").fill("uni_987572*msa");

//     await newTab.locator("#id_new_password1").click();
//     await newTab.locator("#id_new_password1").fill("unilab115007");

//     await newTab.locator("#id_new_password2").click();
//     await newTab.locator("#id_new_password2").fill("гтшдфи115007");

//     await newTab.locator('#container > form > div.button-place.sticky > button.btn-ok').click();

//     const errorText = await newTab.locator("#container > form > div.fields > div > div > table > tbody > tr:nth-child(3) > td > ul.errorlist > li");

//     expect(errorText).toBeVisible();
//     expect(await errorText.textContent()).toEqual("Введенные пароли не совпадают.");

//     await newTab.close();
//     await page.close();
// });

// test("16. Новый пароль на кириллицы, подтвержденный пароль на латинице", async({browser}) => {
//     const context = await browser.newContext();
//     const page = await context.newPage();

//     await login(page, "test3_ttt", "uni_987572*msa");

//     const newTab = await openNewTab(context, page, "#user-menu", "#user-menu-block > ul > li:nth-child(1) > a", "Изменение своего пароля");

//     await newTab.locator("#id_old_password").click();
//     await newTab.locator("#id_old_password").fill("uni_987572*msa");

//     await newTab.locator("#id_new_password1").click();
//     await newTab.locator("#id_new_password1").fill("юнилаб115007");

//     await newTab.locator("#id_new_password2").click();
//     await newTab.locator("#id_new_password2").fill(".ybkf,115007");

//     await newTab.locator('#container > form > div.button-place.sticky > button.btn-ok').click();

//     const errorText = await newTab.locator("#container > form > div.fields > div > div > table > tbody > tr:nth-child(3) > td > ul.errorlist > li");

//     expect(errorText).toBeVisible();
//     expect(await errorText.textContent()).toEqual("Введенные пароли не совпадают.");

//     await newTab.close();
//     await page.close();
// });

// test("17. Поля 'Новый пароль' и 'Подтверждение нового пароля' пустые", async({browser}) => {
//     const context = await browser.newContext();
//     const page = await context.newPage();

//     await login(page, "test3_ttt", "uni_987572*msa");

//     const newTab = await openNewTab(context, page, "#user-menu", "#user-menu-block > ul > li:nth-child(1) > a", "Изменение своего пароля");

//     await newTab.locator("#id_old_password").click();
//     await newTab.locator("#id_old_password").fill("uni_987572*msa");

//     await newTab.locator("#id_new_password1").click();
//     await newTab.locator("#id_new_password1").fill("");

//     await newTab.locator("#id_new_password2").click();
//     await newTab.locator("#id_new_password2").fill("");

//     await newTab.locator('#container > form > div.button-place.sticky > button.btn-ok').click();

//     const newPasswordInput1 = newTab.locator('#id_new_password1');
//     const validationMessage = await newPasswordInput1.evaluate(node => node.validationMessage);

//     expect(validationMessage).toBe('Заполните это поле.');

//     await newTab.close();
//     await page.close();
// });

// test("18. Поле 'Старый пароль' пустое", async({browser}) => {
//     const context = await browser.newContext();
//     const page = await context.newPage();

//     await login(page, "test3_ttt", "uni_987572*msa");

//     const newTab = await openNewTab(context, page, "#user-menu", "#user-menu-block > ul > li:nth-child(1) > a", "Изменение своего пароля");

//     await newTab.locator("#id_old_password").click();
//     await newTab.locator("#id_old_password").fill("");

//     await newTab.locator("#id_new_password1").click();
//     await newTab.locator("#id_new_password1").fill("unilab115007");

//     await newTab.locator("#id_new_password2").click();
//     await newTab.locator("#id_new_password2").fill("unilab115007");

//     await newTab.locator('#container > form > div.button-place.sticky > button.btn-ok').click();

//     const oldPasswordInput = newTab.locator('#id_old_password');
//     const validationMessage = await oldPasswordInput.evaluate(node => node.validationMessage);

//     expect(validationMessage).toBe('Заполните это поле.');

//     await newTab.close();
//     await page.close();
// });

// test("19. Часто используемый пароль", async({ browser}) => {
//     const context = await browser.newContext();
//     const page = await context.newPage();

//     await login(page, "test3_ttt", "uni_987572*msa");

//     const newTab = await openNewTab(context, page, "#user-menu", "#user-menu-block > ul > li:nth-child(1) > a", "Изменение своего пароля");

//     await newTab.locator("#id_old_password").click();
//     await newTab.locator("#id_old_password").fill("uni_987572*msa");

//     await newTab.locator("#id_new_password1").click();
//     await newTab.locator("#id_new_password1").fill("password");

//     await newTab.locator("#id_new_password2").click();
//     await newTab.locator("#id_new_password2").fill("password");

//     await newTab.locator('#container > form > div.button-place.sticky > button.btn-ok').click();

//     const errorText = await newTab.locator("#container > form > div.fields > div > div > table > tbody > tr:nth-child(3) > td > ul.errorlist > li");

//     expect(errorText).toBeVisible();
//     expect(await errorText.textContent()).toEqual("Введённый пароль слишком широко распространён.");

//     await newTab.close();
//     await page.close();
// });

// test("20. Новый пароль содержит имя пользователя", async({browser}) => {
//     const context = await browser.newContext();
//     const page = await context.newPage();

//     await login(page, "test3_ttt", "uni_987572*msa");

//     const newTab = await openNewTab(context, page, "#user-menu", "#user-menu-block > ul > li:nth-child(1) > a", "Изменение своего пароля");

//     await newTab.locator("#id_old_password").click();
//     await newTab.locator("#id_old_password").fill("uni_987572*msa");

//     await newTab.locator("#id_new_password1").click();
//     await newTab.locator("#id_new_password1").fill("test3_ttt");

//     await newTab.locator("#id_new_password2").click();
//     await newTab.locator("#id_new_password2").fill("test3_ttt");

//     await newTab.locator('#container > form > div.button-place.sticky > button.btn-ok').click();

//     const errorText = await newTab.locator("#container > form > div.fields > div > div > table > tbody > tr:nth-child(3) > td > ul.errorlist > li");

//     expect(errorText).toBeVisible();
//     expect(await errorText.textContent()).toEqual("Введённый пароль слишком похож на имя пользователя.");

//     await newTab.close();
//     await page.close();
// });

// test("21. C цифрами и спецсимволами (8 символов)", async({browser}) => {
//     const context = await browser.newContext();
//     const page = await context.newPage();

//     await login(page, "test3_ttt", "uni_987572*msa");

//     let newTab = await openNewTab(context, page, "#user-menu", "#user-menu-block > ul > li:nth-child(1) > a", "Изменение своего пароля");

//     await newTab.locator("#id_old_password").click();
//     await newTab.locator("#id_old_password").fill("uni_987572*msa");

//     await newTab.locator("#id_new_password1").click();
//     await newTab.locator("#id_new_password1").fill("123$%^&*");

//     await newTab.locator("#id_new_password2").click();
//     await newTab.locator("#id_new_password2").fill("123$%^&*");

//     await newTab.locator('#container > form > div.button-place.sticky > button.btn-ok').click();

//     await page.locator("#user-menu-block > ul > li:nth-child(4) > a").click();
//     await page.locator("#winConfirm-ok-btn").click();

//     await login(page, "test3_ttt", "123$%^&*");

//     newTab = await openNewTab(context, page, "#user-menu", "#user-menu-block > ul > li:nth-child(1) > a", "Изменение своего пароля");

//     await newTab.locator("#id_old_password").click();
//     await newTab.locator("#id_old_password").fill("123$%^&*");

//     await newTab.locator("#id_new_password1").click();
//     await newTab.locator("#id_new_password1").fill("uni_987572*msa");

//     await newTab.locator("#id_new_password2").click();
//     await newTab.locator("#id_new_password2").fill("uni_987572*msa");

//     await newTab.locator('#container > form > div.button-place.sticky > button.btn-ok').click();

//     await newTab.close();
//     await page.close();
// });

// test("22. Пароль состоящий с пробелов (8 символов)", async({browser}) => {
//     const context = await browser.newContext();
//     const page = await context.newPage();

//     await login(page, "test3_ttt", "uni_987572*msa");

//     let newTab = await openNewTab(context, page, "#user-menu", "#user-menu-block > ul > li:nth-child(1) > a", "Изменение своего пароля");

//     await newTab.locator("#id_old_password").click();
//     await newTab.locator("#id_old_password").fill("uni_987572*msa");

//     await newTab.locator("#id_new_password1").click();
//     await newTab.locator("#id_new_password1").fill("        "); // 8 пробелов

//     await newTab.locator("#id_new_password2").click();
//     await newTab.locator("#id_new_password2").fill("        "); // 8 пробелов

//     await newTab.locator('#container > form > div.button-place.sticky > button.btn-ok').click();

//     await page.locator("#user-menu-block > ul > li:nth-child(4) > a").click();
//     await page.locator("#winConfirm-ok-btn").click();

//     await login(page, "test3_ttt", "        "); // 8 пробелов

//     newTab = await openNewTab(context, page, "#user-menu", "#user-menu-block > ul > li:nth-child(1) > a", "Изменение своего пароля");

//     await newTab.locator("#id_old_password").click();
//     await newTab.locator("#id_old_password").fill("        "); // 8 пробелов

//     await newTab.locator("#id_new_password1").click();
//     await newTab.locator("#id_new_password1").fill("uni_987572*msa");

//     await newTab.locator("#id_new_password2").click();
//     await newTab.locator("#id_new_password2").fill("uni_987572*msa");

//     await newTab.locator('#container > form > div.button-place.sticky > button.btn-ok').click();

//     await newTab.close();
//     await page.close();
// });