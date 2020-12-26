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

const Wallet = require('../locators/Wallet')
const MetamaskConfig = require('../locators/Metamask')
const {
  WalletPage
} = require('../pages/WalletPage');
const {
  TEST_EMAIL,
  TEST_LOGIN,
  TEST_DOMAIN,
  DEPOSITE_AMOUNT,
  AMOUNT
} = require("../data/env");


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
  console.log('init done')
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
    console.log('metamask done')
  })

  test("Open ZedRun page and click Connnect Metamask", async () => {
    try {
      
      newPageInstance = await metamaskFactory.newPage();
      console.log('>newPageInstance>>>')
      zedRunPage = new LoginPage(newPageInstance);
      await zedRunPage.navigate();
      await zedRunPage.clickOnStartButton();
      console.log('authen with metamask')
      // await newPageInstance.screenshot({ path: `example.png` });
      // await zedRunPage.clickConnectMetamaskButton();
      
      metamaskNotificationInstance = await metamaskFactory.clickNewPage(newPageInstance, zedRunConfig.CONNECT_METAMASK);
      metamaskNotificationPage = new MetamaskNotificationPage(metamaskNotificationInstance);
      console.log('confirm 1')
      await metamaskNotificationPage.waitForLoadState();
      await metamaskNotificationPage.clickOnNextButton();
      await metamaskNotificationPage.clickOnConnectButton();
      await metamaskNotificationPage.waitForCloseEvent();
      
      otherMetamaskNotificationInstance = await metamaskFactory.clickNewPage(newPageInstance, zedRunConfig.AUTHENTICATE_BUTTON);
      otherMetamaskNotificationPage = new MetamaskNotificationPage(otherMetamaskNotificationInstance);
      console.log('confirm 2')
      await otherMetamaskNotificationPage.waitForLoadState();
      await otherMetamaskNotificationPage.clickOnSignButton();
      await otherMetamaskNotificationPage.waitForCloseEvent();
      await newPageInstance.click('text="Accept"')
      console.log('done')
      await newPageInstance.reload()
      await metamaskFactory.close();
    } catch (error) {
      console.log('err:', error)
    }
  });

  
});

afterAll(async () => {
  
});