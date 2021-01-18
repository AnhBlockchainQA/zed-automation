const {
  MetamaskPage
} = require('../../pages/MetamaskPage');
const {
  MetamaskFactory
} = require('../../utils/browser/metamaskFactory');
const {
  LoginPage
} = require('../../pages/LoginPage');
const {
  MetamaskNotificationPage
} = require('../../pages/MetamaskNotification');
const {
  SEED_PHRASE,
  PASSWORD,
  CONFIRM_PASSWORD
} = require('../../data/env');
const zedRunConfig = require('../../locators/ZedRun');
const { HomePage } = require('../../pages/HomePage');


let metamaskFactory;
let metamaskPage;
let metamaskInstance;
let zedRunPage;
let newPageInstance;
let metamaskNotificationInstance;
let metamaskNotificationPage;
let otherMetamaskNotificationInstance;
let otherMetamaskNotificationPage;
let homePage;

beforeAll(async () => {
  metamaskFactory = new MetamaskFactory();
  await metamaskFactory.removeCache();
  metamaskInstance = await metamaskFactory.init();
  console.log('init done')
});


describe("Login to ZedRun with Metamask", () => {

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
    done()
  })

  test("Open ZedRun page and click Connnect Metamask", async (done) => {
    newPageInstance = await metamaskFactory.newPage();
    console.log('>newPageInstance>>>')
    zedRunPage = new LoginPage(newPageInstance);
    await zedRunPage.navigate();
    await zedRunPage.clickOnStartButton();
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
<<<<<<< HEAD
  });

  test("Check that avatar is shown", async () => {
    homePage = new HomePage(newPageInstance);
    await homePage.checkIfAvatarPresent();
    await homePage.waitUntilBalanceShown();
=======
    await zedRunPage.clickOnAcceptButton();
    await zedRunPage.checkIfAvatarIconPresent();

>>>>>>> develop
  });

  
});

afterAll(async (done) => {
  console.log('finish all')
  done()
});