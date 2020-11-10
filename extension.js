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
  let count = 0
  browserContext.on("page", async (page) => {
    count++
    // if (count == 1 || count == 3) return
    await page.waitForTimeout(2000)
    const content = await page.content()
    console.log('page:', content)
    const check = await page.$('text="Next"')
    if (check) {
      console.log('check:', 1111)
      await page.click('text="Next"')
      await page.click('text="Connect"')
    }

    const check2 = await page.$('text="Sign"')
    if (check2) {
      await page.click('text="Sign"')
    }
    // console.log('check:', await page.$$(".btn-primary"))
    // console.log(">>", await page.content())
    // if (content == content1) {
    //   console.log('1111111111')
    //   await page.click(".btn-primary")
    //   await page.waitForTimeout(2000)
    //   console.log(">>>>", await page.content())
    //   await page.click(".page-container__footer-button")
    // }

    // if (await page.$$(".request-signature__footer__sign-button")) {
    //   console.log('>>> enter')
    //   await page.click(".request-signature__footer__sign-button")
    // }
  })

  const backgroundPage = await browserContext.backgroundPages()[0];
  console.log('backgroundPage:', backgroundPage)
  const page1 = await browserContext.newPage()
  await page1.waitForTimeout(6000)
  const allPages = await browserContext.pages();
  // console.log('allPages:', allPages)
  for (let i = 0; i < allPages.length; i++) {
    // console.log('i:', i)
    const content = await allPages[i].content()
    // console.log("content:'", content)
  }
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

  // metamaskPage = allPages[1]
  // console.log('???:', await metamaskPage.bringToFront())
 
 
  // const [newPage] = await Promise.all([
  //   metamaskPage.waitForEvent('page'),
  //   metamaskPage.click('.first-time-flow__button') // Opens a new tab
  // ])
  // console.log('newPage:', newPage)
  
  // await metamaskPage.close()
  const page = await browserContext.newPage()
  await page.goto('https://zed-front-pr-333.herokuapp.com/stable/stable-48795285');

  // Navigate implicitly by clicking a link.
  await page.click('div.start-part');
  await page.click('.overline-text.bold');
  // console.log('>>>:', await page.content())

  // const newas = await page.click('[type="submit"]');
  // await page.fill("#password", "nidalee1")
  await page.waitForTimeout(70000)
  await page.click('text="authenticate"')
  // console.log('content:', await page.$('text="MetaMask"'))
  // console.log('allpage:', allPages.length)
  // for (let i=0; i<allPages.length;i++) {
  //   const check = await allPages[i].$('text="MetaMask"')
  //   console.log('check:', check)
  // }
  // await page.type("#password", "nidalee1")
  // await page.waitForLoadState()
  //   const [response] = await Promise.all([
  //     page.click('[type="submit"]'), // Clicking the link will indirectly cause a navigation
  //     page.waitForLoadState("load"), // The promise resolves after navigation has finished
  //  ]);

  // console.log('response:', response)
  // console.log('page:', await page.content())
  // console.log(">>>L", allPages.length)
  const popup = allPages[2]
  // console.log('1:', await allPages[0].content())
  // console.log('2:', await allPages[1].content())
  // console.log('3:', await allPages[2].content())


  // await page.click('.permissions-connect-choose-account__bottom-buttons');

  // await page.keyboard.press("Control+W")
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