import { test, expect } from '@playwright/test';
import { HeaderPage } from '../../../../pages/header.page';

test.fixme("success online record", async({page}) => {
  const headerPage = new HeaderPage(page);
  await page.goto("http://test01.unilab.su:8000/");
  await headerPage.onlineRecordLink.click()

  const onlineRecordBtn = page.getByRole("button", {name: "Записаться"});


  const btnCount = await onlineRecordBtn.count();
  const randomIndex = Math.floor(Math.random() * btnCount);
  const randomBtn = onlineRecordBtn.nth(randomIndex);
  await randomBtn.click();

  const filterItem = page.locator("#slots_services-filter .filter__item");
  const randomFilterIndex = Math.floor(Math.random() * await filterItem.count());
  await filterItem.nth(randomFilterIndex).click()
  await page.locator("[data-date='success']").click();

  await page.locator("[name='fio']").fill("Павел");
  await page.locator("[name='phone']").fill("9146575925");
  await page.locator("[placeholder='Дата рождения']").fill("1990-09-21");
  await page.locator('#recaptcha-anchor').click();
  await page.locator("#fmOnlineRecord").getByRole("button", {name: "Записаться"}).click();
  
  await page.waitForTimeout(2000);
});


