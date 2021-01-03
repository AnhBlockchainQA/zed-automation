// const { MetamaskPage } = require("../../pages/MetamaskPage");
// const { MetamaskFactory } = require("../../utils/browser/metamaskFactory");
// const { LoginPage } = require("../../pages/LoginPage");
// const {
//   MetamaskNotificationPage,
// } = require("../../pages/MetamaskNotification");
// const { SEED_PHRASE, PASSWORD, CONFIRM_PASSWORD, CARD_NUMBER, CARD_EXPIRATION_DATE, CARD_CVC } = require("../../data/env");
// const { PERCENT_DISCOUNT } = require("../../data/env");
// const zedRunConfig = require("../../locators/ZedRun");
// const { MarketplacePage } = require("../../pages/MarketplacePage");
// const { PaymentPage } = require("../../pages/PaymentPage");
// const { HomePage } = require("../../pages/HomePage");
//
// let metamaskFactory;
// let metamaskPage;
// let metamaskInstance;
// let zedRunPage;
// let newPageInstance;
// let metamaskNotificationInstance;
// let metamaskNotificationPage;
// let otherMetamaskNotificationInstance;
// let otherMetamaskNotificationPage;
// let marketPlacePage;
// let homePage;
// let paymentPage;
//
//
// beforeAll(async () => {
//   metamaskFactory = new MetamaskFactory();
//   await metamaskFactory.removeCache();
//   metamaskInstance = await metamaskFactory.init();
// });
//
// describe("Use percent discount voucher to buy horse with card while logging in with Metamask", () => {
//   test("Update metamask info", async () => {
//     metamaskPage = new MetamaskPage(metamaskInstance);
//     await metamaskPage.clickOnGetStartedButton();
//     await metamaskPage.clickOnImportWalletButton();
//     await metamaskPage.clickOnIAgreeButton();
//     await metamaskPage.typeSeedPhase(SEED_PHRASE);
//     await metamaskPage.typeNewPassword(PASSWORD);
//     await metamaskPage.typeConfirmPassword(CONFIRM_PASSWORD);
//     await metamaskPage.checkTermsAndConditionCheckBox();
//     await metamaskPage.clickImportButton();
//     await metamaskPage.clickOnAllDoneButton();
//     await metamaskPage.clickOnCloseButton();
//     await metamaskPage.clickOnNetworkDropdown();
//     await metamaskPage.clickOnGoerliNetwork();
//   });
//
//   test("Open ZedRun page and click Connnect Metamask", async () => {
//     newPageInstance = await metamaskFactory.newPage();
//     zedRunPage = new LoginPage(newPageInstance);
//     await zedRunPage.navigate();
//     await zedRunPage.clickOnStartButton();
//
//     metamaskNotificationInstance = await metamaskFactory.clickNewPage(newPageInstance, zedRunConfig.CONNECT_METAMASK);
//     metamaskNotificationPage = new MetamaskNotificationPage(metamaskNotificationInstance);
//
//     await metamaskNotificationPage.waitForLoadState();
//     await metamaskNotificationPage.clickOnNextButton();
//     await metamaskNotificationPage.clickOnConnectButton();
//     await metamaskNotificationPage.waitForCloseEvent();
//
//     otherMetamaskNotificationInstance = await metamaskFactory.clickNewPage(newPageInstance, zedRunConfig.AUTHENTICATE_BUTTON);
//     otherMetamaskNotificationPage = new MetamaskNotificationPage(otherMetamaskNotificationInstance);
//
//     await otherMetamaskNotificationPage.waitForLoadState();
//     await otherMetamaskNotificationPage.clickOnSignButton();
//     await otherMetamaskNotificationPage.waitForCloseEvent();
//
//   });
//
//   test("Check that avatar is shown then click on Wallet", async () => {
//     homePage = new HomePage(newPageInstance);
//     await homePage.checkIfAvatarPresent();
//     await homePage.clickOnAcceptButton();
//     await homePage.waitUntilBalanceShown();
//     await homePage.clickOnMarketplaceLink();
//   });
//
//   test("Apply the discount coupon : ZED-10-PERCENT", async () => {
//     marketPlacePage = new MarketplacePage(newPageInstance);
//     await marketPlacePage.waitUntilHorseListLoaded();
//     await marketPlacePage.clickFirstHorsePreview();
//     firstHorseName = await marketPlacePage.getHorseName();
//     originalPrice = await marketPlacePage.getHorsePrice();
//     discountPrice = originalPrice * (1 - PERCENT_DISCOUNT.NET_VALUE);
//     await marketPlacePage.clickOnDownwardArrow();
//     await marketPlacePage.typeCoupon(PERCENT_DISCOUNT.CODE);
//     await marketPlacePage.clickApplyButton();
//     await marketPlacePage.verifyDiscountLabel(PERCENT_DISCOUNT.VALUE);
//     await marketPlacePage.verifyDiscountPrice(discountPrice);
//   });
//
//   test("Process the checkout with banking account and check value", async () => {
//     paymentPage = new PaymentPage(newPageInstance);
//     await paymentPage.clickOnBuyWithCreditCardButton();
//     await paymentPage.waitUntilPaymentFormPresent();
//     await paymentPage.clickOnUseDifferentCardIfNeed();
//     await paymentPage.typeCreditCardNumber(CARD_NUMBER);
//     await paymentPage.typeCreditCardExpirationDate(CARD_EXPIRATION_DATE);
//     await paymentPage.typeCreditCardCVC(CARD_CVC);
//     await paymentPage.clickPayButton();
//     await paymentPage.checkPaySuccessfulLabelPresent();
//     await paymentPage.clickDoneButton();
//   });
// });
//
// afterAll(async () => {
//   await metamaskFactory.close();
// });
