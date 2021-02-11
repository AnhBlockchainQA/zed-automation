const { MetamaskPage } = require("../../pages/MetamaskPage");
const { MetamaskFactory } = require("../../utils/browser/metamaskFactory");
const { LoginPage } = require("../../pages/LoginPage");
const {
  MetamaskNotificationPage,
} = require("../../pages/MetamaskNotification");
const { SEED_PHRASE, PASSWORD, CONFIRM_PASSWORD } = require("../../data/env");
const { HomePage } = require("../../pages/HomePage");
const { MyStablePage } = require("../../pages/MyStablePage");
const test = require("jest-retries");
const {
  CONNECT_METAMASK,
  AUTHENTICATE_BUTTON,
} = require("../../locators/ZedRun");
const faker = require("faker");
const { THRESHOLD } = require("../../data/api");

var metamaskFactory = new MetamaskFactory();
var metamaskPage;
var metamaskInstance;
var zedRunPage;
var newPageInstance;
var metamaskNotificationInstance;
var metamaskNotificationPage;
var otherMetamaskNotificationInstance;
var otherMetamaskNotificationPage;
var index;
var homePage;
var myStablePage;
const horseName = faker.name.firstName();

beforeAll(async () => {
  await metamaskFactory.removeCache();
  metamaskInstance = await metamaskFactory.init();
});

describe("Generate stud horse", () => {
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

  test("Click on Accept button to close the cookie popup", async () => {
    homePage = new HomePage(newPageInstance);
    await homePage.waitForBalanceInfoToBeShown();
    await homePage.clickOnAcceptButton();
    await homePage.waitForLoadState();
  });

  test("Scroll to horse with index", async () => {
    myStablePage = new MyStablePage(newPageInstance);
    await myStablePage.waitForLoadState();
    index = await myStablePage.getRandomIndexOfNewBornHorse();
    await myStablePage.scrollToNewbornHorseWithIndex(index, THRESHOLD);
  });

  test("Complete the horse nomination process", async () => {
    myStablePage = new MyStablePage(newPageInstance);
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
    myStablePage = new MyStablePage(newPageInstance);
    await myStablePage.waitForLoadState();
    await myStablePage.searchForHorse(horseName);
    await myStablePage.waitForLoadState();
    await myStablePage.verifySearchResultContainHorse(horseName);
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
