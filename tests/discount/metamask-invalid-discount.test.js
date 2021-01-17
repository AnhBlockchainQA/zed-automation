const { MetamaskPage } = require("../../pages/MetamaskPage");
const { MetamaskFactory } = require("../../utils/browser/metamaskFactory");
const { LoginPage } = require("../../pages/LoginPage");
const {
  MetamaskNotificationPage,
} = require("../../pages/MetamaskNotification");
const { SEED_PHRASE, PASSWORD, CONFIRM_PASSWORD } = require("../../data/env");
const { INVALID_CODE } = require("../../data/env");
const zedRunConfig = require("../../locators/ZedRun");
const { MarketplacePage } = require("../../pages/MarketplacePage");
const  { HomePage } = require("../../pages/HomePage");

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
let homePage;

beforeAll(async () => {
  metamaskFactory = new MetamaskFactory();
  await metamaskFactory.removeCache();
  metamaskInstance = await metamaskFactory.init();
});

describe("Use expired discount voucher when logging in with Metamask", () => {
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
  });

  test("Open ZedRun page and click Connnect Metamask", async () => {
    newPageInstance = await metamaskFactory.newPage();
    zedRunPage = new LoginPage(newPageInstance);
    await zedRunPage.navigate();
    await zedRunPage.clickOnStartButton();

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

  test("Check that avatar is shown then click on Marketplace to select first horse", async () => {
    homePage = new HomePage(newPageInstance);
    await homePage.checkIfAvatarPresent();
    await homePage.waitForBalanceInfoToBeShown();
    await homePage.clickOnAcceptButton();
    await homePage.clickOnMarketplaceLink();
    marketPlacePage = new MarketplacePage(newPageInstance);
    await marketPlacePage.waitUntilHorseListLoaded();
    await marketPlacePage.mouseOverFirstHorse();
    await marketPlacePage.clickFirstHorsePreview();
  });

  test("Apply the discount coupon : INVALID_COUPON", async () => {
    await marketPlacePage.clickOnDownwardArrow();
    await marketPlacePage.typeCoupon(INVALID_CODE.CODE);
    await marketPlacePage.clickApplyButton();
    await marketPlacePage.verifyErrorMessage(INVALID_CODE.ERROR);
  });
});

afterAll(async () => {
  await metamaskFactory.close();
});
