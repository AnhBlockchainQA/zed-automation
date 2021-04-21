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
  HORSE_LIST_SIZE,
  SECOND_WALLET_ADDRESS
} = require("../../data/env");
const {
  CONNECT_METAMASK,
  AUTHENTICATE_BUTTON,
} = require("../../locators/ZedRun");
const { HomePage } = require("../../pages/HomePage");
const test = require("jest-retries");
const { TransferHorsePage } = require("../../pages/TransferHorsePage");
const { CONFIRM_BUTTON } = require("../../locators/TransferHorse"); 
const { MyStablePage } = require("../../pages/MyStablePage");

var metamaskFactory = new MetamaskFactory();
var metamaskPage;
var metamaskInstance;
var zedRunPage;
var newPageInstance;
var metamaskNotificationInstance;
var metamaskNotificationPage;
var otherMetamaskNotificationInstance;
var otherMetamaskNotificationPage;
var homePage;
var transferHorsePage;
var anotherMetamaskNotificationInstance;
var anotherMetamaskNotificationPage;
var horseName;
var myStablePage;

beforeAll(async () => {
  await metamaskFactory.removeCache();
  metamaskInstance = await metamaskFactory.init();
});

describe("Transfer horse to other wallet address - Logging with Metamask", () => {
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

  test("Wait until homepage is loading", async () => {
    homePage = new HomePage(newPageInstance);
    await homePage.waitForBalanceInfoToBeShown();
    await homePage.clickOnAcceptButton();
    await homePage.waitForLoadState();
  });

  test("Go to My Settings page then click on Select Racehorse", async () => {
    homePage = new HomePage(newPageInstance);
    await homePage.clickOnUserMenuArrow();
    await homePage.waitForLoadState();
    await homePage.clickOnMySettingsLink();
    await homePage.waitForLoadState();
    await homePage.clickOnSelectRaceHorseButton();
    await homePage.waitForLoadState();
  });

  test("Select horse then click on Transfer button", async () => {
    transferHorsePage = new TransferHorsePage(newPageInstance);
    await transferHorsePage.checkIfTransferHorseListShown(HORSE_LIST_SIZE);
    horseName = await transferHorsePage.getNameOfFirstHorse();
    await transferHorsePage.hoverOnFirstHorseToBeTransfered();
    await transferHorsePage.clickOnSelectButtonOfFirstHorse();
    await transferHorsePage.typeAddress(SECOND_WALLET_ADDRESS);
    await transferHorsePage.clickOnTransferButton();
  });

  test("Confirm the transfer", async () => {
    anotherMetamaskNotificationInstance = await metamaskFactory.clickNewPage(
      newPageInstance,
      CONFIRM_BUTTON
    );
    anotherMetamaskNotificationPage = new MetamaskNotificationPage(
      anotherMetamaskNotificationInstance
    );
    await anotherMetamaskNotificationPage.waitForLoadState();
    // Update: Click on Sign button instead of Confirm button
    await anotherMetamaskNotificationPage.clickOnSignButton();
    await anotherMetamaskNotificationPage.waitForCloseEvent();
    await anotherMetamaskNotificationPage.waitForLoadState();
  });

  test("Check that we can not search this horse anymore", async() => {
    homePage = new HomePage(newPageInstance);
    await homePage.clickOnUserAvatar();
    myStablePage = new MyStablePage(newPageInstance);
    await myStablePage.waitForLoadState();
    await myStablePage.searchForHorse(horseName);
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
