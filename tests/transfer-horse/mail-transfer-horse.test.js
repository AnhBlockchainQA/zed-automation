const { LoginPage } = require("../../pages/LoginPage");
const { PageFactory } = require("../../utils/browser/pageFactory");
const { MagicLinkPage } = require("../../pages/MagicLinkPage");
const {
 ACCOUNT_LIST,
  HORSE_LIST_SIZE,
  FIRST_WALLET_ADDRESS
} = require("../../data/env");
const apiRequest = require("../../utils/api/api");
const { HomePage } = require("../../pages/HomePage");
const test = require("jest-retries");
const { TransferHorsePage } = require("../../pages/TransferHorsePage");
const { MyStablePage } = require("../../pages/MyStablePage");


var pageFactory = new PageFactory();
var messageId;
var magicLink;
var loginPage;
var magicLinkPage;
var pageInstance;
var newPageInstance;
var homePage;
var myStablePage;
var transferHorsePage;
var horseName;

const EMAIL = ACCOUNT_LIST.FIFTH_ACCOUNT.EMAIL;
const LOGIN = ACCOUNT_LIST.FIFTH_ACCOUNT.LOGIN;
const DOMAIN = ACCOUNT_LIST.FIFTH_ACCOUNT.DOMAIN;

beforeAll(async () => {
  pageFactory.removeCache();
});

describe("Transfer horse to other wallet address - Logging with magic link", () => {
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

  test("Go to My Settings page then click on Select Racehorse", async () => {
    homePage = new HomePage(pageInstance);
    await homePage.bringToFront();
    await homePage.waitForLoadState();
    await homePage.clickOnUserMenuArrow();
    await homePage.waitForLoadState();
    await homePage.clickOnMySettingsLink();
    await homePage.waitForLoadState();
    await homePage.clickOnSelectRaceHorseButton();
    await homePage.waitForLoadState();
  });

  test("Select horse then click on Transfer button", async () => {
    transferHorsePage = new TransferHorsePage(pageInstance);
    await transferHorsePage.checkIfTransferHorseListShown(HORSE_LIST_SIZE);
    horseName = await transferHorsePage.getNameOfFirstHorse();
    await transferHorsePage.hoverOnFirstHorseToBeTransfered();
    await transferHorsePage.clickOnSelectButtonOfFirstHorse();
    await transferHorsePage.typeAddress(FIRST_WALLET_ADDRESS);
    await transferHorsePage.clickOnTransferButton();
    await transferHorsePage.waitForLoadState();
    await transferHorsePage.clickOnConfirmButton();
    await transferHorsePage.waitForLoadState();
  });

  test("Check that we can not search this horse anymore", async() => {
    homePage = new HomePage(pageInstance);
    await homePage.clickOnUserAvatar();
    await homePage.waitForLoadState();
    myStablePage = new MyStablePage(newPageInstance);
    await myStablePage.searchForHorse(horseName);
    await myStablePage.waitForLoadState();
    await myStablePage.verifySearchResultDidNotContainHorse(horseName);
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
  