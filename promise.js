const {
  chromium
} = require('playwright');

(async () => {
  const pathToExtension = require('path').join(__dirname, 'metamask-chrome-8.1.3');
  const userDataDir = '/tmp/test-user-data-dir';
  const browserContext = chromium.launchPersistentContext(userDataDir, {
    headless: false,
    args: [
      `--disable-extensions-except=${pathToExtension}`,
      `--load-extension=${pathToExtension}`
    ]
  })
  const backgroundPage = await browserContext.backgroundPages()[0];
  console.log('backgroundPage:', backgroundPage)
  const page = await browserContext.newPage()
  await page.waitForTimeout(6000)
  const allPages = await browserContext.pages();
  // console.log('allPages:', allPages)
  for (let i = 0; i < allPages.length; i++) {
    // console.log('i:', i)
    const content = await allPages[i].content()
    // console.log("content:'", content)
  }
  const metamaskPage = allPages[2]
  await metamaskPage.type("#password", "nidalee1")
  await metamaskPage.click('.MuiButton-label');
  await metamaskPage
  await page.waitForTimeout(2000)
  console.log('length:', allPages.length)
  
  // await metamaskPage.click('.first-time-flow__button');
  // await metamaskPage.click('.first-time-flow__button');
  // await metamaskPage.click('.page-container__footer');
  // await metamaskPage.fill('[placeholder="Paste seed phrase from clipboard"]',
  //   "promote involve unaware today camera major net tail area rule manual humor")
  // await metamaskPage.fill("#password", "nidalee1")
  // await metamaskPage.fill("#confirm-password", "nidalee1")
  // await metamaskPage.check('.first-time-flow__terms', true)
  // await metamaskPage.click('.first-time-flow__button')


  await page.goto('https://zed-front-pr-333.herokuapp.com/stable/stable-48795285');

  // Navigate implicitly by clicking a link.
  await page.click('div.start-part');
  await page.click('.overline-text.bold');
  // await page.keyboard.press("Control+W")
  // console.log('page:', await page.content())
  // await page.keyboard.press("Control+Tab")
  // await page.keyboard.press("Control+Tab")
  // console.log('page:', await page.content())
  // await page.goForward()
  // console.log('page:', await page.content())

  // console.log('browserContext:', browserContext)
  // await page.click('.first-time-flow__button');



  // Test the background page as you would any other page.
  // await browserContext.close();
  // const userContext = await browserContext.newContext();
  // console.log('userContext:', userContext)

  // await backgroundPage.fill('#search', 'query');
})();