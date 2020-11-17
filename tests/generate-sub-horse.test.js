const Metamask = require('../pages/Metamask')
const METAMASKCONFIG = require('../locators/Metamask')

let metamaskPage
beforeAll(async () => {
  await Metamask.removeCache()
  metamaskPage = await Metamask.init()
})

afterAll(async () => {
  // await Metamask.close()
})

describe("flow test", () => {
  it("register with metamask", async () => {
    await metamaskPage.click(METAMASKCONFIG.CLICK_FIRST_TIME_FLOW__BUTTON);
    await metamaskPage.click(METAMASKCONFIG.CLICK_FIRST_TIME_FLOW__BUTTON);
    await metamaskPage.click(METAMASKCONFIG.CLICK_PAGE_CONTAINER_FOOTER);
    await metamaskPage.fill(METAMASKCONFIG.FILL_TEXT_AREA_FILL_PASSPHASE, METAMASKCONFIG.SEED_PHASE)
    await metamaskPage.fill(METAMASKCONFIG.FILL_PASSWORD_INPUT, METAMASKCONFIG.PASSWORD)
    await metamaskPage.fill(METAMASKCONFIG.FILL_PASSWORD_CONFIRM_INPUT, METAMASKCONFIG.PASSWORD_CONFIRM)
    await metamaskPage.check(METAMASKCONFIG.CHECKBOX_AGREE, true)
    await metamaskPage.click(METAMASKCONFIG.CLICK_FIRST_TIME_FLOW__BUTTON)
    await metamaskPage.click(METAMASKCONFIG.CLICK_ALL_DONE)
    await metamaskPage.click(METAMASKCONFIG.CLICK_CLOSE)
    await metamaskPage.click(METAMASKCONFIG.CLICK_NETWORK_NAME)
    await metamaskPage.click(METAMASKCONFIG.CLICK_CHOOSE_NETWORK)
  })

  let zedPage
  it("open zed", async () => {
    zedPage = await Metamask.newPage()
    await zedPage.goto('https://zed-front-pr-333.herokuapp.com', { timeout: 0 });
  })


  it("authenticate with metamask", async () => {
    await zedPage.click('div.start-part');
    await zedPage.click('.overline-text.bold', { timeout: 0 });

    const metaMaskSign = await Metamask.clickNewPage(zedPage, ".overline-text.bold")
    await metaMaskSign.waitForLoadState();
    console.log(await metaMaskSign.title());
    await metaMaskSign.click('text="Next"')
    await metaMaskSign.click('text="Connect"')
    await metaMaskSign.waitForEvent("close")

    const metaMaskSign2 = await Metamask.clickNewPage(zedPage, 'text="authenticate"')
    await metaMaskSign2.waitForLoadState()
    await metaMaskSign2.click('text="Sign"')
    await metaMaskSign2.waitForEvent("close")
  })

  it ("generate child horse", async () => {
    // await zedPage.click('.icon-arrow')
    // await zedPage.click('text="stud service"')
    // await zedPage.click('.panel')
    // await zedPage.click('text="select mate"')
    // await zedPage.waitForLoadState()
    // await zedPage.click('text="select female"')
    // await zedPage.waitForLoadState()
    // await zedPage.click('.horse-card')
    // await zedPage.click('text="Select"')
    // await zedPage.waitForLoadState()
    // await zedPage.click('text="Buy Cover"')
    // await zedPage.waitForLoadState()
    // // await zedPage.click('text="Confirm"')
    // const metaMaskSign = await Metamask.clickNewPage(zedPage, 'text="Confirm"')
    // await metaMaskSign.click('text="Confirm"')
    // await metaMaskSign.waitForEvent("close")
    // await zedPage.waitForLoadState()
  })
})