const { MetamaskPage } = require('../pages/MetamaskPage');
const { MetamaskFactory } = require('../utils/browser/metamaskFactory');
const { LoginPage } = require('../pages/LoginPage');
const { MetamaskNotificationPage } = require('../pages/MetamaskNotification');
const { SEED_PHRASE, PASSWORD, CONFIRM_PASSWORD } = require('../data/env');
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

describe("flow test", () => {

  
  beforeAll(async () => {
    metamaskFactory = new MetamaskFactory();
    await metamaskFactory.removeCache();
    metamaskInstance = await metamaskFactory.init();
  });

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
 });

    test("generate child horse", async () => {
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
 });

afterAll(async () => {
  await MetamaskFactory.close();
});
})