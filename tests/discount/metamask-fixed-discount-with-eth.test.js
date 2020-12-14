const { MetamaskPage } = require("../../pages/MetamaskPage");
const { MetamaskFactory } = require("../../utils/browser/metamaskFactory");
const { LoginPage } = require("../../pages/LoginPage");
const {
  MetamaskNotificationPage,
} = require("../../pages/MetamaskNotification");
const { SEED_PHRASE, PASSWORD, CONFIRM_PASSWORD } = require("../../data/env");
const { FIXED_DISCOUNT } = require("../../data/env");
const zedRunConfig = require("../../locators/ZedRun");
const marketPlaceConfig = require("../../locators/MarketPlace");
const { MarketplacePage } = require("../../pages/MarketplacePage");

let metamaskFactory;
let metamaskPage;
let metamaskInstance;
let zedRunPage;
let newPageInstance;
let metamaskNotificationInstance;
let metamaskNotificationPage;
let otherMetamaskNotificationInstance;
let otherMetamaskNotificationPage;
let anotherMetamaskNotificationInstance;
let anotherMetamaskNotificationPage;
let marketPlacePage;

beforeAll(async () => {
  metamaskFactory = new MetamaskFactory();
  await metamaskFactory.removeCache();
  metamaskInstance = await metamaskFactory.init();
});

describe("Buy horse with credit card", () => {
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
    await zedRunPage.clickOnAcceptButton();
  });

  test("Go to Market page and wait until horse list is loaded", async () => {
    await zedRunPage.clickOnMarketplaceLink();
    marketPlacePage = new MarketplacePage(newPageInstance);
    marketPlacePage.waitUntilHorseListLoaded();
  });

  test("Apply the discount coupon : ZED-15-DOLLARS", async () => {
    await marketPlacePage.clickFirstHorsePreview();
    firstHorseName = await marketPlacePage.getHorseName();
    originalPrice = await marketPlacePage.getHorsePrice();
    discountPrice = originalPrice - FIXED_DISCOUNT.VALUE;
    await marketPlacePage.clickOnDownwardArrow();
    await marketPlacePage.typeCoupon(FIXED_DISCOUNT.CODE);
    await marketPlacePage.clickApplyButton();
    await marketPlacePage.verifyDiscountLabel(FIXED_DISCOUNT.VALUE);
    await marketPlacePage.verifyDiscountPrice(discountPrice);
  });

  test("Go to Marketplace and buy horse with discount - Payment with ETH", async () => {
    await marketPlacePage.clickOnBuyWithETH();
    await marketPlacePage.clickOnConfirmButton();

    anotherMetamaskNotificationInstance = await metamaskFactory.clickNewPage(
      newPageInstance,
      marketPlaceConfig.CONFIRM_BUTTON
    );
    anotherMetamaskNotificationPage = new MetamaskNotificationPage(
      anotherMetamaskNotificationInstance
    );
    await anotherMetamaskNotificationPage.waitForLoadState();
    await anotherMetamaskNotificationPage.clickOnConfirmButton();
    await anotherMetamaskNotificationPage.waitForCloseEvent();
  });
});

afterAll(async () => {
  await metamaskFactory.close();
});
