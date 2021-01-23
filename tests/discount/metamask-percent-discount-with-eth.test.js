const { MetamaskPage } = require("../../pages/MetamaskPage");
const { MetamaskFactory } = require("../../utils/browser/metamaskFactory");
const { LoginPage } = require("../../pages/LoginPage");
const {
  MetamaskNotificationPage,
} = require("../../pages/MetamaskNotification");
const {
  SEED_PHRASE,
  PASSWORD,
  CONFIRM_PASSWORD,
  THRESHOLD,
  WAIT_TIME,
} = require("../../data/env");
const { PERCENT_DISCOUNT } = require("../../data/env");
const zedRunConfig = require("../../locators/ZedRun");
const { MarketplacePage } = require("../../pages/MarketplacePage");
const { HomePage } = require("../../pages/HomePage");
const paymentConfig = require("../../locators/Payment");
const { PaymentPage } = require("../../pages/PaymentPage");
const { ActivityPage } = require("../../pages/ActivityPage");
const test = require("jest-retries");

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
let anotherMetamaskNotificationInstance;
let anotherMetamaskNotificationPage;
let paymentPage;
let firstHorseName;
let activityPage;

beforeAll(async () => {
  metamaskFactory = new MetamaskFactory();
  await metamaskFactory.removeCache();
  metamaskInstance = await metamaskFactory.init();
});

describe("Use fixed discount voucher to buy horse with ETH while logging in with Metamask", () => {
  test("Update metamask info", 3, async () => {
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

  test("Open ZedRun page and click Connnect Metamask", 3, async () => {
    newPageInstance = await metamaskFactory.newPage();
    zedRunPage = new LoginPage(newPageInstance);
    await zedRunPage.navigate();
    await zedRunPage.clickOnStartButton();

    metamaskNotificationInstance = await metamaskFactory.clickNewPage(
      newPageInstance,
      zedRunConfig.CONNECT_METAMASK
    );
    metamaskNotificationPage = new MetamaskNotificationPage(
      metamaskNotificationInstance
    );

    await metamaskNotificationPage.waitForLoadState();
    await metamaskNotificationPage.clickOnNextButton();
    await metamaskNotificationPage.clickOnConnectButton();
    await metamaskNotificationPage.waitForCloseEvent();

    otherMetamaskNotificationInstance = await metamaskFactory.clickNewPage(
      newPageInstance,
      zedRunConfig.AUTHENTICATE_BUTTON
    );
    otherMetamaskNotificationPage = new MetamaskNotificationPage(
      otherMetamaskNotificationInstance
    );

    await otherMetamaskNotificationPage.waitForLoadState();
    await otherMetamaskNotificationPage.clickOnSignButton();
    await otherMetamaskNotificationPage.waitForCloseEvent();
  });

  test("Go to Marketplace and select first horse", 3, async () => {
    homePage = new HomePage(newPageInstance);
    await homePage.clickOnMarketplaceLink();
    await homePage.waitForBalanceInfoToBeShown();
    marketPlacePage = new MarketplacePage(newPageInstance);
    await marketPlacePage.waitUntilHorseListLoaded();
    await marketPlacePage.mouseOverFirstHorse();
    await marketPlacePage.clickFirstHorsePreview();
  });

  test("Apply the discount coupon : ZED-10-PERCENT", 3, async () => {
    firstHorseName = await marketPlacePage.getHorseName();
    originalPrice = await marketPlacePage.getHorsePrice();
    discountPrice = originalPrice * (1 - PERCENT_DISCOUNT.NET_VALUE);
    await marketPlacePage.clickOnDownwardArrow();
    await marketPlacePage.typeCoupon(PERCENT_DISCOUNT.CODE);
    await marketPlacePage.clickApplyButton();
    await marketPlacePage.verifyDiscountLabel(PERCENT_DISCOUNT.VALUE);
    await marketPlacePage.verifyDiscountPrice(discountPrice);
  });

  test("Process the checkout with ETH", 3, async () => {
    paymentPage = new PaymentPage(newPageInstance);
    await paymentPage.clickOnBuyWithETH();
    anotherMetamaskNotificationInstance = await metamaskFactory.clickNewPageWithRetry(
      newPageInstance,
      paymentConfig.CONFIRM_BUTTON,
      THRESHOLD,
      WAIT_TIME
    );
    anotherMetamaskNotificationPage = new MetamaskNotificationPage(
      anotherMetamaskNotificationInstance
    );
    await anotherMetamaskNotificationPage.waitForLoadState();
    await anotherMetamaskNotificationPage.clickOnConfirmButton();
  });

  test("Verify that our order is performed", 3, async () => {
    activityPage = new ActivityPage(newPageInstance);
    await activityPage.bringToFront();
    await activityPage.checkIfStatementInfoCorrect(firstHorseName);
  });
});

afterAll(async () => {
  await metamaskFactory.close();
});
