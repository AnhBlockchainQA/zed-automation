const { LoginPage } = require("../../pages/LoginPage");
const { MarketplacePage } = require("../../pages/MarketplacePage");
const { HomePage } = require("../../pages/HomePage");
const test = require("jest-retries");
const { ACCOUNT_LIST } = require("../../data/env");
const { PageFactory } = require("../../utils/browser/pageFactory");
const { MagicLinkPage } = require("../../pages/MagicLinkPage");
const { ActivityPage } = require("../../pages/ActivityPage");
const { DetailPage } = require("../../pages/DetailPage"); 
const { MyStablePage } = require("../../pages/MyStablePage"); 
const { PaymentPage } = require("../../pages/PaymentPage");
const { VIEW_DETAILS_BUTTON } = require("../../locators/Activity");
const {
  CARD_NUMBER,
  CARD_EXPIRATION_DATE,
  CARD_CVC,
} = require("../../data/env");
const apiRequest = require("../../utils/api/api");

var pageFactory = new PageFactory();
var messageId;
var magicLink;
var loginPage;
var magicLinkPage;
var pageInstance;
var newPageInstance;
var homePage;
var marketPlacePage;
var discountPrice;
var myStablePage;
var activityPage;
var detailPage;
var paymentPage;
var firstHorseName;
var originalPrice;

const EMAIL = ACCOUNT_LIST.FIFTH_ACCOUNT.EMAIL;
const LOGIN = ACCOUNT_LIST.FIFTH_ACCOUNT.LOGIN;
const DOMAIN = ACCOUNT_LIST.FIFTH_ACCOUNT.DOMAIN;

beforeAll(async () => {
  pageFactory.removeCache();
});

describe("Buy horse with credit card when logging in with magic link", () => {
  test(
    "Open ZedRun page and input valid email to generate magic link",
    3,
    async () => {
      pageInstance = await pageFactory.newTab(false, 0);
      loginPage = new LoginPage(pageInstance);
      await loginPage.navigate();
      await loginPage.clickOnStartButton();
      await loginPage.typeEmail(EMAIL);
      await loginPage.clickOnContinueButton();
      await loginPage.waitForTimeout();
    }
  );

  test("Check mail inbox to get magic link", 3, async () => {
    messageId = await apiRequest.getZedRunMessageId(LOGIN, DOMAIN);
    magicLink = await apiRequest.getMagicLink(LOGIN, DOMAIN, messageId);
  });

  test("Open new browser with magic link", 3, async () => {
    newPageInstance = await pageFactory.newTab(false, 0);
    magicLinkPage = new MagicLinkPage(newPageInstance);
    await magicLinkPage.bringToFront();
    await magicLinkPage.navigate(magicLink);
    await magicLinkPage.waitForNavigation();
    await magicLinkPage.waitForLoadState();
  });

  test("Go to Marketplace and select first horse", 3, async () => {
    homePage = new HomePage(pageInstance);
    await homePage.bringToFront();
    await homePage.waitForBalanceInfoToBeShown();
    await homePage.clickOnMarketplaceLink();
    marketPlacePage = new MarketplacePage(pageInstance);
    await marketPlacePage.waitForLoadState();
    await marketPlacePage.clickOnAcceptButton();
    await marketPlacePage.mouseOverFirstHorse();
    await marketPlacePage.clickFirstHorsePreview();
    await marketPlacePage.waitForLoadState();
    firstHorseName = await marketPlacePage.getHorseName();
    originalPrice = await marketPlacePage.getHorsePrice();
  });

  test("Process the checkout with banking account and check value", 1, async () => {
    paymentPage = new PaymentPage(pageInstance);
    await paymentPage.clickOnBuyWithCreditCardButton();
    await paymentPage.waitUntilPaymentFormPresent();
    await paymentPage.clickOnUseDifferentCardIfNeed();
    await paymentPage.typeCreditCardNumber(CARD_NUMBER);
    await paymentPage.typeCreditCardExpirationDate(CARD_EXPIRATION_DATE);
    await paymentPage.typeCreditCardCVC(CARD_CVC);
    await paymentPage.clickPayButton();
    await paymentPage.checkPaySuccessfulLabelPresent();
    await paymentPage.clickDoneButton();
  }
);

  test("Verify that our order is processing", 3, async () => {
    activityPage = new ActivityPage(pageInstance);
    await activityPage.bringToFront();
    await activityPage.checkIfStatementInfoCorrect(firstHorseName);
  });

  test("Check the detail payment", 3, async () => {
    activityPage = new ActivityPage(pageInstance);
    await activityPage.mouseOverFirstStatementInfo();
    otherPageInstance = await pageFactory.clickNewPage(
      newPageInstance,
      VIEW_DETAILS_BUTTON
    );
    detailPage = new DetailPage(otherPageInstance);
    await detailPage.bringToFront();
    await detailPage.waitForLoadState();
    await detailPage.verifyTransactionInfo(firstHorseName);
    await detailPage.verifyChargeAmount(originalPrice);
    });

  test("Go back to user stable and check if horse is transferred", async() => {
    activityPage = new ActivityPage(pageInstance);
    await activityPage.bringToFront();
    await activityPage.clickOnUserAvatar();
    myStablePage = new MyStablePage(pageInstance);
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
