const { MetamaskPage } = require('../../pages/MetamaskPage');
const { MetamaskFactory } = require('../../utils/browser/metamaskFactory');
const { LoginPage } = require('../../pages/LoginPage');
const { MetamaskNotificationPage } = require('../../pages/MetamaskNotification');
const { SEED_PHRASE, PASSWORD, CONFIRM_PASSWORD, CARD_NUMBER, CARD_EXPIRATION_DATE, CARD_CVC } = require('../../data/env');
const zedRunConfig = require('../../locators/ZedRun');
const { MarketplacePage } = require('../../pages/MarketplacePage');
const { PaymentPage } = require('../../pages/PaymentPage');
const { HomePage } = require('../../pages/HomePage');


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

  test ("Go to Marketplace and select first horse", async () => {
    homePage = new HomePage(newPageInstance);
    await homePage.checkIfAvatarPresent();
    await homePage.clickOnAcceptButton();
    await homePage.waitUntilBalanceShown();
    await homePage.clickOnMarketplaceLink();
    marketPlacePage = new MarketplacePage(newPageInstance);
    await marketPlacePage.waitUntilHorseListLoaded();
    await marketPlacePage.clickFirstHorsePreview();
  });
  
  test("Process payment by cash", async() => {
    paymentPage = new PaymentPage(newPageInstance);
    await paymentPage.clickOnBuyWithCreditCardButton();
    await paymentPage.waitUntilPaymentFormPresent();
    await paymentPage.clickOnUseDifferentCardIfNeed();
    await paymentPage.typeCreditCardNumber(CARD_NUMBER);
    await paymentPage.typeCreditCardExpirationDate(CARD_EXPIRATION_DATE);
    await paymentPage.typeCreditCardCVC(CARD_CVC);
    await paymentPage.clickPayButton();
    await paymentPage.checkPaySuccessfulLabelPresent();
    await paymentPage.clickDoneButton();
  });
})

afterAll(async () => {
  await metamaskFactory.close();
});