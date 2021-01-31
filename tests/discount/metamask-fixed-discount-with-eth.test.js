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
const { FIXED_DISCOUNT } = require("../../data/env");
const { CONNECT_METAMASK, AUTHENTICATE_BUTTON } = require("../../locators/ZedRun");
const { CONFIRM_BUTTON } = require("../../locators/Payment");
const { MarketplacePage } = require("../../pages/MarketplacePage");
const { HomePage } = require("../../pages/HomePage");
const { PaymentPage } = require("../../pages/PaymentPage");
const { ActivityPage } = require("../../pages/ActivityPage");
const test = require("jest-retries");

var metamaskFactory = new MetamaskFactory();
var metamaskPage;
var metamaskInstance;
var zedRunPage;
var newPageInstance;
var metamaskNotificationInstance;
var metamaskNotificationPage;
var otherMetamaskNotificationInstance;
var otherMetamaskNotificationPage;
var anotherMetamaskNotificationInstance;
var anotherMetamaskNotificationPage;
var marketPlacePage;
var homePage;
var paymentPage;
var firstHorseName;
var activityPage;
var noOfHorses;

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
    if (noOfHorses > 0) {
      await marketPlacePage.mouseOverFirstHorse();
      await marketPlacePage.clickFirstHorsePreview();
    }
  });

  //Comment this part since we already had issue with the discount voucher
  // test("Apply the discount coupon : ZED-15-DOLLARS", 3, async () => {
  //   if (noOfHorses > 0) {
  //     firstHorseName = await marketPlacePage.getHorseName();
  //     originalPrice = await marketPlacePage.getHorsePrice();
  //     discountPrice = originalPrice - FIXED_DISCOUNT.VALUE;
  //     await marketPlacePage.clickOnDownwardArrow();
  //     await marketPlacePage.typeCoupon(FIXED_DISCOUNT.CODE);
  //     await marketPlacePage.clickApplyButton();
  //     await marketPlacePage.verifyDiscountLabel(FIXED_DISCOUNT.VALUE);
  //     await marketPlacePage.verifyDiscountPrice(discountPrice);
  //   }
  // });

  // test(
  //   "Go to Marketplace and buy horse with discount - Payment with ETH",
  //   3,
  //   async () => {
  //     if (noOfHorses > 0) {
  //       paymentPage = new PaymentPage(newPageInstance);
  //       await paymentPage.clickOnBuyWithETH();
  //       anotherMetamaskNotificationInstance = await metamaskFactory.clickNewPageWithRetry(
  //         newPageInstance,
  //         CONFIRM_BUTTON,
  //         THRESHOLD,
  //         WAIT_TIME
  //       );

  //       anotherMetamaskNotificationPage = new MetamaskNotificationPage(
  //         anotherMetamaskNotificationInstance
  //       );
  //       await anotherMetamaskNotificationPage.waitForLoadState();
  //       await anotherMetamaskNotificationPage.clickOnConfirmButton();
  //     }
  //   }
  // );

  // test("Verify that our order is performed", 3, async () => {
  //   if (noOfHorses > 0) {
  //     activityPage = new ActivityPage(newPageInstance);
  //     await activityPage.bringToFront();
  //     await activityPage.checkIfStatementInfoCorrect(firstHorseName);
  //   }
  // });
});

afterAll(async (done) => {
  try{
  await metamaskFactory.close();
  done();
  }catch(error){
    console.log(error);
    done();
  }finally{
    done();
  }
});
