const { LoginPage } = require("../../pages/LoginPage");
const { MyStablePage } = require("../../pages/MyStablePage");
const { HomePage } = require("../../pages/HomePage");
const test = require("jest-retries");
const { ACCOUNT_LIST } = require("../../data/env");
const { PageFactory } = require("../../utils/browser/pageFactory");
const { MagicLinkPage } = require("../../pages/MagicLinkPage");
const apiRequest = require("../../utils/api/api");
const { THRESHOLD } = require("../../data/env");
const faker = require("faker");

var pageFactory = new PageFactory();
var messageId;
var magicLink;
var loginPage;
var magicLinkPage;
var pageInstance;
var newPageInstance;
var homePage;
var myStablePage;

const EMAIL = ACCOUNT_LIST.SIXTH_ACCOUNT.EMAIL;
const LOGIN = ACCOUNT_LIST.SIXTH_ACCOUNT.LOGIN;
const DOMAIN = ACCOUNT_LIST.SIXTH_ACCOUNT.DOMAIN;
const horseName = faker.name.firstName();

beforeAll(async () => {
  await pageFactory.removeCache();
});

describe("Give a name to newborn horse when logging in with magic link", () => {
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

  test("Wait until wallet icon is shown", 3, async () => {
    homePage = new HomePage(pageInstance);
    await homePage.bringToFront();
    await homePage.waitForBalanceInfoToBeShown();
    await homePage.waitForLoadState();
    await homePage.clickOnAcceptButton();
    await homePage.waitForLoadState();
  });

  test("Scroll to horse with index", async () => {
    myStablePage = new MyStablePage(pageInstance);
    await myStablePage.waitForLoadState();
    index = await myStablePage.getRandomIndexOfNewBornHorse();
    await myStablePage.scrollToNewbornHorseWithIndex(index, THRESHOLD);
  });

  test("Complete the horse nomination process", async () => {
    myStablePage = new MyStablePage(pageInstance);
    await myStablePage.waitForLoadState();
    await myStablePage.clickOnNewbornHorseWithIndex(index);
    await myStablePage.clickOnOkayButton();
    await myStablePage.enterNewbornHorseName(horseName);
    await myStablePage.checkOnCheckbox();
    await myStablePage.clickOnConfirmButton();
    await myStablePage.waitUntilLoadingIconHidden();
    await myStablePage.waitForLoadState();
  });

  test("Verify if the newborn horse name is updated", async () => {
    await myStablePage.waitForLoadState();
    await myStablePage.searchForHorse(horseName);
    await myStablePage.waitForLoadState();
    await myStablePage.verifySearchResultContainHorse(horseName);
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
