const {
  MetamaskPage
} = require('../pages/MetamaskPage');
const {
  MetamaskFactory
} = require('../utils/browser/metamaskFactory');
const {
  LoginPage
} = require('../pages/LoginPage');
const {
  MetamaskNotificationPage
} = require('../pages/MetamaskNotification');
const {
  SEED_PHRASE,
  PASSWORD,
  CONFIRM_PASSWORD
} = require('../data/env');
const zedRunConfig = require('../locators/ZedRun');


let metamaskFactory;
let metamaskPage;
let metamaskInstance;
let zedRunPage;
let newPageInstance;
let metamaskNotificationInstance;
let metamaskNotificationPage;
let otherMetamaskNotificationInstance;
let otherMetamaskNotificationPage;
beforeAll(async () => {
  metamaskFactory = new MetamaskFactory();
  await metamaskFactory.removeCache();
  metamaskInstance = await metamaskFactory.init();
});

afterAll(async () => {
  // await metamaskFactory.close();
});

describe("flow test generate child horse", () => {



  test("Update metamask info", async () => {
    metamaskPage = new MetamaskPage(metamaskInstance);
    await metamaskPage.clickOnGetStartedButton();
    await metamaskPage.clickOnImportWalletButton();
    await metamaskPage.clickOnIAgreeButton();
    await metamaskPage.typeSeedPhase(SEED_PHRASE);
    await metamaskPage.typeNewPassword(PASSWORD);
    await metamaskPage.typeConfirmPassword(CONFIRM_PASSWORD);
    await metamaskPage.checkTermsAndConditionCheckBox();
    await metamaskPage.clickImportButton();
    await metamaskPage.clickOnAllDoneButton();
    await metamaskPage.clickOnCloseButton();
    await metamaskPage.clickOnNetworkDropdown();
    await metamaskPage.clickOnGoerliNetwork();
  })

  test("Open ZedRun page and click Connnect Metamask", async () => {
    newPageInstance = await metamaskFactory.newPage();
    zedRunPage = new LoginPage(newPageInstance);
    await zedRunPage.navigate();
    await zedRunPage.clickOnStartButton();
    // await zedRunPage.clickConnectMetamaskButton();

    metamaskNotificationInstance = await metamaskFactory.clickNewPage(newPageInstance, zedRunConfig.CONNECT_METAMASK);
    metamaskNotificationPage = new MetamaskNotificationPage(metamaskNotificationInstance);

    await metamaskNotificationPage.waitForLoadState();
    await metamaskNotificationPage.clickOnNextButton();
    await metamaskNotificationPage.clickOnConnectButton();
    await metamaskNotificationPage.waitForCloseEvent();

    otherMetamaskNotificationInstance = await metamaskFactory.clickNewPage(newPageInstance, zedRunConfig.AUTHENTICATE_BUTTON);
    otherMetamaskNotificationPage = new MetamaskNotificationPage(otherMetamaskNotificationInstance);

    await otherMetamaskNotificationPage.waitForLoadState();
    await otherMetamaskNotificationPage.clickOnSignButton();
    await otherMetamaskNotificationPage.waitForCloseEvent();
    await newPageInstance.click('text="Accept"')
  });

  test("generate child horse", async () => {
    await newPageInstance.click('.icon-arrow')
    await newPageInstance.click('text="stud service"')
    await newPageInstance.click('.panel')
    await newPageInstance.waitForLoadState()
    await newPageInstance.waitForSelector('text="select mate"', {
      timeout: 0
    })
    await newPageInstance.click('text="select mate"')

    await newPageInstance.waitForLoadState()
    await newPageInstance.waitForSelector('.female-content', {
      timeout: 0
    })
    await newPageInstance.click('.female-content')

    await newPageInstance.waitForLoadState()
    await newPageInstance.waitForSelector('.horse-card', {
      timeout: 0
    })
    await newPageInstance.click('.horse-card')

    await newPageInstance.waitForLoadState()
    await newPageInstance.waitForSelector('text="Select"', {
      timeout: 0
    })
    await newPageInstance.click('text="Select"')

    await newPageInstance.waitForLoadState()
    await newPageInstance.waitForSelector('text="Buy Cover"', {
      timeout: 0
    })
    await newPageInstance.click('text="Buy Cover"')

    await newPageInstance.waitForLoadState()
    const metaMaskSign = await metamaskFactory.clickNewPage(newPageInstance, 'text="Confirm"');
    await metaMaskSign.click('text="Confirm"')
    await metaMaskSign.waitForEvent("close")

    await newPageInstance.waitForSelector('text="Check Activity"', {
      timeout: 0
    })
    await newPageInstance.click('text="Check Activity"')
    await newPageInstance.waitForLoadState()


  });


})