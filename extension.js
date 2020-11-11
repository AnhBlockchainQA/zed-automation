const {
  chromium
} = require('playwright');

(async () => {
  const pathToExtension = require('path').join(__dirname, 'metamask-chrome-8.1.3');
  const userDataDir = '/tmp/test-user-data-dir';
  const browserContext = await chromium.launchPersistentContext(userDataDir, {
    headless: false,
    args: [
      `--disable-extensions-except=${pathToExtension}`,
      `--load-extension=${pathToExtension}`
    ]
  })
  browserContext.on("page", async (page) => {
    await page.waitForLoadState("domcontentloaded")
    await page.waitForTimeout(3000)
    // const content = await page.content()
    // console.log('page:', content)
    const check = await page.$('text="Next"')
    if (check) {
      console.log('check:', 1111)
      await page.click('text="Next"')
      await page.click('text="Connect"')
    }

    const check2 = await page.$('text="Sign"')
    if (check2) {
      console.log('check 2222')
      await page.click('text="Sign"')
    }
  })

  const backgroundPage = await browserContext.backgroundPages()[0];
  console.log('backgroundPage:', backgroundPage)
  const page1 = await browserContext.newPage()
  await page1.waitForTimeout(6000)
  const allPages = await browserContext.pages();
  // console.log('allPages:', allPages)

  const metamaskPage = allPages[2]
  // await metamaskPage.type("#password", "nidalee1")
  // await metamaskPage.click('.MuiButton-label');0
  // await metamaskPage.close()
  // await page.waitForTimeout(2000)
  // console.log('length:', allPages.length)

  await metamaskPage.click('.first-time-flow__button');
  await metamaskPage.click('.first-time-flow__button');
  await metamaskPage.click('.page-container__footer');
  await metamaskPage.fill('[placeholder="Paste seed phrase from clipboard"]',
    "promote involve unaware today camera major net tail area rule manual humor")
  await metamaskPage.fill("#password", "nidalee1")
  await metamaskPage.fill("#confirm-password", "nidalee1")
  await metamaskPage.check('.first-time-flow__terms', true)
  await metamaskPage.click('.first-time-flow__button')
  await metamaskPage.click('text="All Done"')
  await metamaskPage.click('[title="Close"]')
  await metamaskPage.click('.network-name')
  await metamaskPage.click('text="Goerli Test Network"')
 
  const page = await browserContext.newPage()
  await page.goto('https://zed-front-pr-333.herokuapp.com/stable/stable-48795285', { timeout: 0 });

  // Navigate implicitly by clicking a link.
  await page.click('div.start-part');
  const res = await page.click('.overline-text.bold', { timeout: 0 });
  console.log('res:', res)
  // console.log('>>>:', await page.content())

  // const newas = await page.click('[type="submit"]');
  // await page.fill("#password", "nidalee1")
  await page.waitForTimeout(10000)
  await page.click('text="authenticate"')


  // Test the background page as you would any other page.
  // await browserContext.close();

})();