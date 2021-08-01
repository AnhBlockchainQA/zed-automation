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
  PAID_RACE_LINK,
} = require("../../data/env");
const { RacingPage } = require("../../pages/RacingPage");
const test = require("jest-retries");
const {
  CONNECT_METAMASK,
} = require("../../locators/ZedRun");
const { ADD_RACE_CONFIRM_BUTTON } = require("../../locators/Payment");

let metamaskFactory;
let metamaskPage;
let metamaskInstance;
let zedRunPage;
let newPageInstance;
let pageInstance;
let metamaskNotificationInstance;
let metamaskNotificationPage;
let otherMetamaskNotificationInstance;
let otherMetamaskNotificationPage;
let homePage;
let racingPage;
var confirmMetamaskNotificationPage;
var confirmMetamaskNotificationInstance;
var zedRunApi = require("../../utils/api/zedApi");
var className;
var numberGateOpening;
var getEventName;

beforeAll(async () => {
  metamaskFactory = new MetamaskFactory();
  await metamaskFactory.removeCache();
  metamaskInstance = await metamaskFactory.init();
});

describe("Paid racing with fee racing when logged by Meta Mask", () => {
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

  test("Open ZedRun page and click Connect Metamask", async () => {
    newPageInstance = await metamaskFactory.newPage();
    zedRunPage = new LoginPage(newPageInstance);
    await zedRunPage.navigate_existing_racing_url(PAID_RACE_LINK);
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
    await metamaskNotificationPage.clickOnSignButton();
    await metamaskNotificationPage.waitForCloseEvent();
  });

  test("Select a racehorses and add into the free racing", async () => {
    racingPage = new RacingPage(newPageInstance);
    numberGateOpening = await racingPage.getGateOpening();
    await racingPage.bringToFront();
    await racingPage.waitForLoadState();
    for (let i = 0; i < numberGateOpening.length; i++) {
      await racingPage.waitForLoadState();
      await racingPage.clickGateNumberAndSelectHorse(numberGateOpening[i]);
      await racingPage.waitForLoadState();
      confirmMetamaskNotificationInstance = await metamaskFactory.clickNewPage(
        newPageInstance,
        ADD_RACE_CONFIRM_BUTTON
      );
      confirmMetamaskNotificationPage = new MetamaskNotificationPage(
        confirmMetamaskNotificationInstance
      );
      await confirmMetamaskNotificationPage.waitForLoadState();
      await confirmMetamaskNotificationPage.clickOnSignButton();
      await confirmMetamaskNotificationPage.waitForCloseEvent();
      await racingPage.waitForLoadState();
    }
    await racingPage.waitForLoadState();
    // await racingPage.validateRacingEventAfterInNextToRun(getEventName);
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
