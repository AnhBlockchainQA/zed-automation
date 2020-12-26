const {
  chromium
} = require('playwright');

(async () => {
  const pathToExtension = require('path').join(__dirname, './utils/browser/metamask-chrome-8.1.3');
  console.log('pathToExtension', pathToExtension)
  const userDataDir = '/tmp/test-user-data-dir';
  const browserContext = await chromium.launchPersistentContext(userDataDir, {
    headless: false,
    args: [
      `--disable-extensions-except=${pathToExtension}`,
      `--load-extension=${pathToExtension}`
    ],
    timeout: 0
  })

  const [metamaskPage] = await Promise.all([
    browserContext.waitForEvent('page'),
    browserContext.backgroundPages()[0]
  ])

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
  await page.goto('https://goerli-test.zed.run/', { timeout: 0 });

  // await metamaskPage.bringToFront();

  await page.click('div.start-part');

  const res = await page.click('.overline-text.bold', { timeout: 0 });
  console.log('res:', res)

  const [metaMaskSign] = await Promise.all([
    browserContext.waitForEvent('page'),
    page.click('.overline-text.bold', { timeout: 0 }) 
  ])
  await metaMaskSign.waitForLoadState();
  console.log(await metaMaskSign.title());
  await metaMaskSign.click('text="Next"')
  await metaMaskSign.click('text="Connect"')
  await metaMaskSign.waitForEvent("close")

  const [metaMaskSign2] = await Promise.all([
    browserContext.waitForEvent('page'),
    page.click('text="authenticate"', { timeout: 0 }) 
  ])
  await metaMaskSign2.waitForLoadState()
  await metaMaskSign2.click('text="Sign"')
  await metaMaskSign2.waitForEvent("close")

  // buy horst
  // await page.click('text="Marketplace"')
  // await page.click('.horse-sale-card')
  // await page.click('text="Buy with ETH"')
  // await page.waitForTimeout(2000)
  // const [popup] = await Promise.all([
  //   page.waitForEvent('popup'),
  //   page.click('text="Buy with ETH"')
  // ])
  // const check = await page.$('text="confirm"')
  // console.log('check:', check)
  // await page.hover('.confirm-btn')
  // await page.dblclick('.confirm-btn', { button: "left", force: true })

  // Test the background page as you would any other page.
  console.log('success')
  await browserContext.close();

})();