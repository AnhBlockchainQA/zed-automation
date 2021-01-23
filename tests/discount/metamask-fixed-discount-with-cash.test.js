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
  CARD_NUMBER,
  CARD_CVC,
  CARD_EXPIRATION_DATE,
} = require("../../data/env");
const { FIXED_DISCOUNT } = require("../../data/env");
const zedRunConfig = require("../../locators/ZedRun");
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
var marketPlacePage;
var homePage;
var paymentPage;
var firstHorseName;
var activityPage;

beforeAll(async () => {
  await metamaskFactory.removeCache();
  metamaskInstance = await metamaskFactory.init();
});

describe("Use fixed discount voucher to buy horse with card while logging in with Metamask", () => {
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

  test(
    "Check that avatar is shown then click on Marketplace to select first horse",
    3,
    async () => {
      homePage = new HomePage(newPageInstance);
      await homePage.clickOnMarketplaceLink();
      await homePage.waitForBalanceInfoToBeShown();
      marketPlacePage = new MarketplacePage(newPageInstance);
      await marketPlacePage.waitUntilHorseListLoaded();
      await marketPlacePage.mouseOverFirstHorse();
      await marketPlacePage.clickFirstHorsePreview();
    }
  );

  test("Apply the discount coupon : ZED-15-DOLLARS", 3, async () => {
    firstHorseName = await marketPlacePage.getHorseName();
    originalPrice = await marketPlacePage.getHorsePrice();
    discountPrice = originalPrice - FIXED_DISCOUNT.VALUE;
    await marketPlacePage.clickOnDownwardArrow();
    await marketPlacePage.typeCoupon(FIXED_DISCOUNT.CODE);
    await marketPlacePage.clickApplyButton();
    await marketPlacePage.verifyDiscountLabel(FIXED_DISCOUNT.VALUE);
    await marketPlacePage.verifyDiscountPrice(discountPrice);
  });

  test("Process payment by cash", 3, async () => {
    paymentPage = new PaymentPage(newPageInstance);
    await paymentPage.clickOnBuyWithCreditCardButton();
    await paymentPage.waitUntilPaymentFormPresent();
    await paymentPage.clickOnUseDifferentCardIfNeed();
    await paymentPage.waitUntilPaymentFormPresent();
    await paymentPage.typeCreditCardNumber(CARD_NUMBER);
    await paymentPage.typeCreditCardExpirationDate(CARD_EXPIRATION_DATE);
    await paymentPage.typeCreditCardCVC(CARD_CVC);
    await paymentPage.clickPayButton();
    await paymentPage.checkPaySuccessfulLabelPresent();
    await paymentPage.clickDoneButton();
  });

  test("Verify that our order is performed", 3, async () => {
    activityPage = new ActivityPage(newPageInstance);
    await activityPage.checkIfStatementInfoCorrect(firstHorseName);
  });
});

afterAll(async () => {
  await metamaskFactory.close();
});
