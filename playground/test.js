(async () => {
    const { chromium } = require('playwright');
    const userDataDir = process.cwd()
    const pathToExtension = require('path').join(process.cwd(), '/extension_8_1_3_0');
    const seedPhrase = "lunar clown mule engine cruel brother traffic connect kind air list galaxy";
    const newPassword = "Khongpassw0rd123";

    const browserContext = await chromium.launchPersistentContext(userDataDir,{
      headless: false,
      args: [
        `--disable-extensions-except=${pathToExtension}`,
        `--load-extension=${pathToExtension}`
      ]
    });

    // const page = browserContext.waitForEvent('backgroundpage');
    // (await page).$$('div.welcome-page > button').click();
    // (await page).goto('chrome-extension://nkbihfbeogaeaoehlefnkodbefgpgknn/home.html#initialize/welcome')
    // const backgroundPage = browserContext.backgroundPages()[1];

    const page = browserContext.waitForEvent('page');
    (await page).click('//button[contains(@class,"first-time-flow__button")]');
    (await page).click('//button[contains(@class,"first-time-flow__button") and text()="Import wallet"]');
    (await page).click('//button[text()="I Agree"]');
    (await page).fill("//label[text()='Seed phrase']/following-sibling::div[contains(@class,'seedphrase')]//input", seedPhrase);
    // (await page).fill("//label[contains(text(),'New password')]/following-sibling::div/input", newPassword);
    // (await page).fill("//label[contains(text(),'Confirm password')]/following-sibling::div/input", newPassword);
    // (await page).click("//div[contains(@class,'terms')]");
    // (await page).click("//button[text()='Import']");



    // await page.click("//button[text()='start']")
    // await page.fill("//input[@placeholder='Email']", 'test@yopmail.com')
    // await page.click("//button[text()='Continue']")

  })();