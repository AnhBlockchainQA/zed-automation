const { MetamaskPage } = require("../../pages/MetamaskPage");
const { MetamaskFactory } = require("../../utils/browser/metamaskFactory");
const { LoginPage } = require("../../pages/LoginPage");
const {
  MetamaskNotificationPage,
} = require("../../pages/MetamaskNotification");
const { SEED_PHRASE, PASSWORD, CONFIRM_PASSWORD, THRESHOLD, WAIT_TIME } = require("../../data/env");
const { PERCENT_DISCOUNT } = require("../../data/env");
const zedRunConfig = require("../../locators/ZedRun");
const { MarketplacePage } = require("../../pages/MarketplacePage");
const  { HomePage } = require("../../pages/HomePage");
const paymentConfig = require("../../locators/Payment");
const { PaymentPage } = require("../../pages/PaymentPage");

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

beforeAll(async () => {
  metamaskFactory = new MetamaskFactory();
  await metamaskFactory.removeCache();
  metamaskInstance = await metamaskFactory.init();
});

describe("Use fixed discount voucher to buy horse with ETH while logging in with Metamask", () => {
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

  test("Check that avatar is shown then click on Marketplace link", async () => {
    homePage = new HomePage(newPageInstance);
    await homePage.checkIfAvatarPresent();
    await homePage.clickOnAcceptButton();
    await homePage.waitUntilBalanceShown();
    await homePage.clickOnMarketplaceLink();
  });

  test("Apply the discount coupon : ZED-10-PERCENT", async () => {
    marketPlacePage = new MarketplacePage(newPageInstance);
    await marketPlacePage.waitUntilHorseListLoaded();
    await marketPlacePage.clickFirstHorsePreview();
    firstHorseName = await marketPlacePage.getHorseName();
    originalPrice = await marketPlacePage.getHorsePrice();
    discountPrice = originalPrice * (1 - PERCENT_DISCOUNT.NET_VALUE);
    await marketPlacePage.clickOnDownwardArrow();
    await marketPlacePage.typeCoupon(PERCENT_DISCOUNT.CODE);
    await marketPlacePage.clickApplyButton();
    await marketPlacePage.verifyDiscountLabel(PERCENT_DISCOUNT.VALUE);
    await marketPlacePage.verifyDiscountPrice(discountPrice);
  });

  test("Process the checkout with ETH", async () => {
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
    // await anotherMetamaskNotificationPage.clickOnConfirmButton();
    // await anotherMetamaskNotificationPage.waitForCloseEvent();
  });
});

afterAll(async (done) => {
  await metamaskFactory.endTest();
  done();
});
