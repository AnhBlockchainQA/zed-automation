const { MetamaskPage } = require("../../pages/MetamaskPage");
const { MetamaskFactory } = require("../../utils/browser/metamaskFactory");
const { LoginPage } = require("../../pages/LoginPage");
const {
  MetamaskNotificationPage,
} = require("../../pages/MetamaskNotification");
const { SEED_PHRASE, PASSWORD, CONFIRM_PASSWORD } = require("../../data/env");
const { PERCENT_DISCOUNT } = require("../../data/env");
const {
  CONNECT_METAMASK,
  AUTHENTICATE_BUTTON,
} = require("../../locators/ZedRun");
const { MarketplacePage } = require("../../pages/MarketplacePage");
const { HomePage } = require("../../pages/HomePage");
const { CONFIRM_BUTTON } = require("../../locators/Payment");
const { PaymentPage } = require("../../pages/PaymentPage");
const { ActivityPage } = require("../../pages/ActivityPage");
const test = require("jest-retries");
const { DetailPage } = require("../../pages/DetailPage");
const { VIEW_DETAILS_BUTTON } = require("../../locators/Activity");

var metamaskFactory = new MetamaskFactory();
var metamaskPage;
var metamaskInstance;
var zedRunPage;
var newPageInstance;
var metamaskNotificationInstance;
var metamaskNotificationPage;
var otherMetamaskNotificationInstance;
var otherMetamaskNotificationPage;
var marketPlacePage;
var homePage;
var anotherMetamaskNotificationInstance;
var anotherMetamaskNotificationPage;
var paymentPage;
var firstHorseName;
var activityPage;
var detailPage;
var discountPrice;

beforeAll(async () => {
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
      CONNECT_METAMASK
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
      AUTHENTICATE_BUTTON
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
    await homePage.waitForBalanceInfoToBeShown();
    await homePage.clickOnMarketplaceLink();
    marketPlacePage = new MarketplacePage(newPageInstance);
    await marketPlacePage.waitForLoadState();
    await marketPlacePage.clickOnAcceptButton();
    noOfHorses = await marketPlacePage.getNumberOfHorses();
    await marketPlacePage.mouseOverFirstHorse();
    await marketPlacePage.clickFirstHorsePreview();
  });

  test("Apply the discount coupon : ANH_TEST", 3, async () => {
    marketPlacePage = new MarketplacePage(newPageInstance);
    await marketPlacePage.waitForLoadState();
    firstHorseName = await marketPlacePage.getHorseName();
    let originalPrice = await marketPlacePage.getHorsePriceInETH();
    discountPrice = originalPrice * (1 - PERCENT_DISCOUNT.NET_VALUE);
    await marketPlacePage.clickOnDownwardArrow();
    await marketPlacePage.waitForLoadState();
    await marketPlacePage.typeCoupon(PERCENT_DISCOUNT.CODE);
    await marketPlacePage.clickApplyButton();
    await marketPlacePage.waitForLoadState();
    await marketPlacePage.verifyDiscountLabel(PERCENT_DISCOUNT.VALUE);
    await marketPlacePage.verifyDiscountPriceInETH(discountPrice);
  });

  test("Process the checkout with ETH", 3, async () => {
    paymentPage = new PaymentPage(newPageInstance);
    await paymentPage.clickOnBuyWithETH();
    await paymentPage.waitForLoadState();
    anotherMetamaskNotificationInstance = await metamaskFactory.clickNewPageWithJs(
      newPageInstance,
      CONFIRM_BUTTON,
      // THRESHOLD,
      // WAIT_TIME
    );
    anotherMetamaskNotificationPage = new MetamaskNotificationPage(
      anotherMetamaskNotificationInstance
    );
    await anotherMetamaskNotificationPage.waitForLoadState();
    await anotherMetamaskNotificationPage.clickOnConfirmButton();
    await anotherMetamaskNotificationPage.waitForCloseEvent();
  });

  test("Verify that our order is performed", 3, async () => {
    await paymentPage.bringToFront();
    await paymentPage.checkPaySuccessfulLabelPresent();
    await paymentPage.clickDoneButton();
    activityPage = new ActivityPage(newPageInstance);
    await activityPage.bringToFront();
    await activityPage.checkIfStatementInfoCorrect(firstHorseName);
  });

  test("Check the detail payment", 3, async () => {
    await activityPage.mouseOverFirstStatementInfo();
    otherPageInstance = await metamaskFactory.clickNewPage(
      newPageInstance,
      VIEW_DETAILS_BUTTON
    );
    detailPage = new DetailPage(otherPageInstance);
    await detailPage.bringToFront();
    await detailPage.waitForLoadState();
    await detailPage.verifyChargeAmountInETH(discountPrice.toString());
  });
});

afterAll(async (done) => {
  try {
    await metamaskFactory.close();
    done();
  } catch (error) {
    console.log(error);
    done();
  } finally {
    done();
  }
});
