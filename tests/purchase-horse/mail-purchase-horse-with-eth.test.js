const { LoginPage } = require("../../pages/LoginPage");
const { PERCENT_DISCOUNT } = require("../../data/env");
const { MarketplacePage } = require("../../pages/MarketplacePage");
const { HomePage } = require("../../pages/HomePage");
const test = require("jest-retries");
const { ACCOUNT_LIST } = require("../../data/env");
const { PageFactory } = require("../../utils/browser/pageFactory");
const { MagicLinkPage } = require("../../pages/MagicLinkPage");
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

const EMAIL = ACCOUNT_LIST.FOURTH_ACCOUNT.EMAIL;
const LOGIN = ACCOUNT_LIST.FOURTH_ACCOUNT.LOGIN;
const DOMAIN = ACCOUNT_LIST.FOURTH_ACCOUNT.DOMAIN;

beforeAll(async () => {
  pageFactory.removeCache();
});

describe("Buy horse with ETH when logging in with magic link", () => {
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
    noOfHorses = await marketPlacePage.getNumberOfHorses();
    await marketPlacePage.mouseOverFirstHorse();
    await marketPlacePage.clickFirstHorsePreview();
    await marketPlacePage.waitForLoadState();
    firstHorseName = await marketPlacePage.getHorseName();
    originalPrice = await marketPlacePage.getHorsePrice();
  });

  

 
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
