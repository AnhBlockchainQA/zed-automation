const { LoginPage } = require("../../pages/LoginPage");
const { MarketplacePage } = require("../../pages/MarketplacePage");
const { HomePage } = require("../../pages/HomePage");
const test = require("jest-retries");
const { ACCOUNT_LIST } = require("../../data/env");
const { PageFactory } = require("../../utils/browser/pageFactory");
const { MagicLinkPage } = require("../../pages/MagicLinkPage");
const apiRequest = require("../../utils/api/api");
const { PaymentPage } = require("../../pages/PaymentPage");
const { ActivityPage } = require("../../pages/ActivityPage");
const { DetailPage } = require("../../pages/DetailPage");
const { VIEW_DETAILS_BUTTON } = require("../../locators/Activity");

var pageFactory = new PageFactory();
var messageId;
var magicLink;
var loginPage;
var magicLinkPage;
var pageInstance;
var newPageInstance;
var homePage;
var marketPlacePage;
var paymentPage;
var activityPage;
var detailPage;

const EMAIL = ACCOUNT_LIST.SECOND_ACCOUNT.EMAIL;
const LOGIN = ACCOUNT_LIST.SECOND_ACCOUNT.LOGIN;
const DOMAIN = ACCOUNT_LIST.SECOND_ACCOUNT.DOMAIN;

beforeAll(async () => {
  pageFactory.removeCache();
});

describe("Buy horse with credit card - Logging with Metamask", () => {
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
    await magicLinkPage.waitForLoadState();
  });

  test("Go to Marketplace and select first horse", 1, async () => {
    homePage = new HomePage(pageInstance);
    await homePage.bringToFront();
    await homePage.waitForBalanceInfoToBeShown();
    await homePage.clickOnMarketplaceLink();
    marketPlacePage = new MarketplacePage(pageInstance);
    await marketPlacePage.clickOnAcceptButton();
    await marketPlacePage.waitForLoadState();
    await marketPlacePage.waitUntilHorseListLoaded();
    await marketPlacePage.mouseOverFirstHorse();
    await marketPlacePage.waitForLoadState();
    await marketPlacePage.clickOnBuyHorseButton();
    firstHorseName = await marketPlacePage.getHorseName();
    originalPrice = await marketPlacePage.getHorsePriceInETH();
  });

  test("Process the checkout with ETH", 3, async () => {
    paymentPage = new PaymentPage(pageInstance);
    await paymentPage.waitForLoadState();
    await paymentPage.clickOnBuyWithETH();
    await paymentPage.clickOnConfirmButton();
    await paymentPage.waitForLoadState();    
  });

  //TODO : Missing session after login with magic link
  test("Verify that our order is performed", 3, async () => {
    await paymentPage.waitForLoadState();
    await paymentPage.checkPaySuccessfulLabelPresent();
    await paymentPage.clickDoneButton();
    activityPage = new ActivityPage(pageInstance);
    await activityPage.bringToFront();
    await activityPage.waitForLoadState();
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
    // await detailPage.
  });

  // test("Go back to user stable and check if horse is transferred", async () => {
  //   activityPage = new ActivityPage(newPageInstance);
  //   await activityPage.bringToFront();
  //   await activityPage.reloadPage();
  //   await activityPage.clickOnUserAvatar();
  //   myStablePage = new MyStablePage(newPageInstance);
  //   await myStablePage.waitForLoadState();
  //   await myStablePage.searchForHorse(firstHorseName);
  //   await myStablePage.waitForLoadState();
  //   await myStablePage.verifySearchResultContainHorse(firstHorseName);
  // });
 
});

afterAll(async (done) => {
  try {
    await pageFactory.endTest();
    done();
  } catch (error) {
    console.log(error);
    done();
  } finally {
    done();
  }
});
