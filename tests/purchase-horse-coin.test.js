const { MetamaskPage } = require('../pages/MetamaskPage');
const { MetamaskFactory } = require('../utils/browser/metamaskFactory');
const { LoginPage } = require('../pages/LoginPage');
const { MetamaskNotificationPage } = require('../pages/MetamaskNotification');
const { SEED_PHRASE, PASSWORD, CONFIRM_PASSWORD, CARD_NUMBER, CARD_EXPIRATION_DATE, CARD_CVC } = require('../data/env');
const zedRunConfig = require('../locators/ZedRun');
const marketPlaceConfig = require('../locators/MarketPlace');
const { MarketplacePage } = require('../pages/MarketPlacePage');



let metamaskFactory;
let metamaskPage;
let metamaskInstance;
let zedRunPage;
let newPageInstance;
let metamaskNotificationInstance;
let metamaskNotificationPage;
let otherMetamaskNotificationInstance;
let otherMetamaskNotificationPage;
let marketPlacePage;
let confirmMetamaskNotificationInstance;
let confirmMetamaskNotificationPage;

beforeAll(async () => {
  metamaskFactory = new MetamaskFactory();
  await metamaskFactory.removeCache();
  metamaskInstance = await metamaskFactory.init();
});


describe("flow test", () => {  

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

 })

  test ("Go to Marketplace and buy horse by ETH", async () => {
    await zedRunPage.clickOnMarketplaceLink();
    marketPlacePage = new MarketplacePage(newPageInstance);
    await marketPlacePage.clickFirstHorsePreview();
    await marketPlacePage.clickOnBuyWithETH();
    await marketPlacePage.clickOnConfirmButton();

    // confirmMetamaskNotificationInstance = await metamaskFactory.clickNewPage(newPageInstance, marketPlaceConfig.CONFIRM_BUTTON);
    // confirmMetamaskNotificationPage = new MetamaskNotificationPage(confirmMetamaskNotificationInstance);
    
    // await confirmMetamaskNotificationPage.waitForLoadState();
    // await confirmMetamaskNotificationPage.clickOnConfirmButton();
    // await otherMetamaskNotificationPage.waitForCloseEvent();
  })
})

afterAll(async () => {
  await metamaskFactory.close();
});