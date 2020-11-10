(async () => {
    const { chromium } = require('playwright');
    const browser = await chromium.launch();
    const context = await browser.newContext();
    const page = await context.newPage(); 

    await page.click("//button[text()='start']")
    await page.fill("//input[@placeholder='Email']", 'test@yopmail.com')
    await page.click("//button[text()='Continue']")

    const request = require('supertest');

})();