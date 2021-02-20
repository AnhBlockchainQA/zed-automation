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
const { CONNECT_METAMASK, AUTHENTICATE_BUTTON } = require("../../locators/ZedRun");
const { CONFIRM_BUTTON } = require("../../locators/Payment");
const { MarketplacePage } = require("../../pages/MarketplacePage");
const { PaymentPage } = require("../../pages/PaymentPage");
const { HomePage } = require("../../pages/HomePage");
const { ActivityPage } = require("../../pages/ActivityPage");
const { DetailPage } = require("../../pages/DetailPage");
const { MyStablePage } = require("../../pages/MyStablePage");
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
var confirmMetamaskNotificationInstance;
var confirmMetamaskNotificationPage;
var paymentPage;
var homePage;
var activityPage;
var noOfHorses;
var detailPage;
var myStablePage;
var firstHorseName;
var originalPrice;

beforeAll(async () => {
  await metamaskFactory.removeCache();
  metamaskInstance = await metamaskFactory.init();
});

describe("Purchase horse with ETH", () => {
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
    await homePage.bringToFront();
    await homePage.waitForBalanceInfoToBeShown();
    await homePage.clickOnMarketplaceLink();
    marketPlacePage = new MarketplacePage(newPageInstance);
    await marketPlacePage.waitForLoadState();
    await marketPlacePage.clickOnAcceptButton();
    noOfHorses = await marketPlacePage.getNumberOfHorses();
    await marketPlacePage.mouseOverFirstHorse();
    await marketPlacePage.clickFirstHorsePreview();
    await marketPlacePage.waitForLoadState();
    firstHorseName = await marketPlacePage.getHorseName();
    originalPrice = await marketPlacePage.getHorsePriceInETH();
  });

  test("Process the checkout with ETH", 3, async () => {
    paymentPage = new PaymentPage(newPageInstance);
    await paymentPage.waitForLoadState();
    await paymentPage.clickOnBuyWithETH();
    await paymentPage.waitForLoadState();
    await paymentPage.clickOnConfirmButton();
  });

  test("Verify that our order is performed", 3, async () => {
    await paymentPage.waitForLoadState();
    await paymentPage.checkPaySuccessfulLabelPresent();
    await paymentPage.clickDoneButton();
    activityPage = new ActivityPage(newPageInstance);
    await activityPage.bringToFront();
    await activityPage.checkIfStatementInfoCorrect(firstHorseName);
  });

  test("Check the detail payment", 3, async () => {
    await activityPage.mouseOverFirstStatementInfo();
    otherPageInstance = await pageFactory.clickNewPage(
      newPageInstance,
      VIEW_DETAILS_BUTTON
    );
    detailPage = new DetailPage(otherPageInstance);
    await detailPage.bringToFront();
    await detailPage.waitForLoadState();
    await detailPage.verifyChargeAmountInETH(originalPrice);
    await detailPage.verifyTransactionStatus();
  });

  test("Go back to user stable and check if horse is transferred", 3, async () => {
    activityPage = new ActivityPage(newPageInstance);
    await activityPage.bringToFront();
    await activityPage.clickOnUserAvatar();
    myStablePage = new MyStablePage(newPageInstance);
    await myStablePage.searchForHorse(firstHorseName);
    await myStablePage.verifySearchResultContainHorse(firstHorseName);
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
