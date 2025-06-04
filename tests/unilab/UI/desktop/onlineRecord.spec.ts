import { test, expect } from '@playwright/test';
import { HeaderPage } from '../../../../pages/header.page';
import { FingerprintGenerator } from 'fingerprint-generator';
import { FingerprintInjector } from 'fingerprint-injector';
import 'dotenv/config'

const COOKIE_VALUE = process.env.VALUE

interface Cookie {
  name: string;
  value: string;
  domain: string;
  path: string;
  httpOnly: boolean;
  secure: boolean;
  sameSite: 'Strict' | 'Lax' | 'None';
}

test.skip("success online record", async({browser}) => {
  const fingerprintGenerator = new FingerprintGenerator();
  const fingerprintInjector = new FingerprintInjector();

  const fingerprint = await fingerprintGenerator.getFingerprint({
    devices: ['desktop'],
    browsers: ['chrome'],
    locales: ['ru-RU']
  });

  let context = await browser.newContext({
    userAgent: fingerprint.fingerprint.navigator.userAgent,
    locale: 'ru-RU',
    timezoneId: 'Europe/Moscow',
    permissions: ['geolocation'],
    geolocation: { latitude: 55.751244, longitude: 37.618423 },
    httpCredentials: { username: 'test', password: 'test' },
  });

  await context.addCookies([{
    name: 'sessionid',
    value: COOKIE_VALUE,
    domain: 'dev.unilab.su',
    path: '/',
    httpOnly: true,
    secure: true,
    sameSite: 'Lax'
  } as Cookie]);




  await fingerprintInjector.attachFingerprintToPlaywright(context, fingerprint);

  const page = await context.newPage();
  const headerPage = new HeaderPage(page);
  await page.goto("https://dev.unilab.su/");
  await headerPage.onlineRecordLink.click()


  const onlineRecordBtn = page.getByRole("button", {name: "Записаться"});

  const btnCount = await onlineRecordBtn.count();
  const randomIndex = Math.floor(Math.random() * btnCount);
  const randomBtn = onlineRecordBtn.nth(randomIndex);
  await randomBtn.click();

  const filterItem = page.locator(".doctor-services-tab .uni-selectable-list__item");
  const randomFilterIndex = Math.floor(Math.random() * await filterItem.count());
  await filterItem.nth(randomFilterIndex).click()
  await page.getByRole("button", {name: "success"}).click();

  await page.locator("[placeholder='Ваше имя']").fill("");
  await page.locator("[placeholder='Телефон']").fill("");
  await page.locator("[placeholder='Дата рождения']").fill("");

  await page.locator("#modals-dispatcher").getByRole("button", { name: "Записаться" }).click();
  await page.getByText('Вы успешно записаны').waitFor();
  await expect(page.getByText("Вы успешно записаны")).toBeVisible();
});
