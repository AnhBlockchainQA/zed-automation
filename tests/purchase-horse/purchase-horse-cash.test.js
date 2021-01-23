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
  CARD_EXPIRATION_DATE,
  CARD_CVC,
} = require("../../data/env");
const { MarketplacePage } = require("../../pages/MarketplacePage");
const { PaymentPage } = require("../../pages/PaymentPage");
const { HomePage } = require("../../pages/HomePage");
const { ActivityPage } = require("../../pages/ActivityPage");
const zedRunConfig = require("../../locators/ZedRun");
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
let paymentPage;
let homePage;
let activityPage;
let horseName;
let canPurchaseHorses;

beforeAll(async () => {
  metamaskFactory = new MetamaskFactory();
  await metamaskFactory.removeCache();
  metamaskInstance = await metamaskFactory.init();
});

describe("Buy horse with credit card", () => {
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
    await homePage.clickOnAcceptButton();
    await homePage.clickOnMarketplaceLink();
    await homePage.waitForBalanceInfoToBeShown();
    marketPlacePage = new MarketplacePage(newPageInstance);
    await marketPlacePage.waitUntilHorseListLoaded();
    await marketPlacePage.mouseOverFirstHorse();
    await marketPlacePage.clickFirstHorsePreview();
    horseName = await marketPlacePage.getHorseName();
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
    await activityPage.checkIfStatementInfoCorrect(horseName);
  });
});

afterAll(async () => {
  await metamaskFactory.close();
});
