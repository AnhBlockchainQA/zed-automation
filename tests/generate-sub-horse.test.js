const {
  MetamaskPage
} = require('../pages/MetamaskPage');
const {
  MetamaskFactory
} = require('../utils/browser/metamaskFactory');
const {
  LoginPage
} = require('../pages/LoginPage');
const {
  MetamaskNotificationPage
} = require('../pages/MetamaskNotification');
const {
  SEED_PHRASE,
  PASSWORD,
  CONFIRM_PASSWORD
} = require('../data/env');
const zedRunConfig = require('../locators/ZedRun');
const studServiceConfig = require('../locators/StudService');
const { HomePage } = require('../pages/HomePage'); 
const { StudServicePage } = require('../pages/StudServicePage');
const { ActivityPage } = require('../pages/ActivityPage');

let metamaskFactory;
let metamaskPage;
let metamaskInstance;
let zedRunPage;
let newPageInstance;
let metamaskNotificationInstance;
let metamaskNotificationPage;
let otherMetamaskNotificationInstance;
let otherMetamaskNotificationPage;
let confirmMetamaskNotificationInstance;
let confirmMetamaskNotificationPage;
let studServicePage;
let malehorseName;
let femalehorseName;
let index;
let activityPage;

beforeAll(async () => {
  metamaskFactory = new MetamaskFactory();
  await metamaskFactory.removeCache();
  metamaskInstance = await metamaskFactory.init();
});

describe("Generate stud horse", () => {

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
  })

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
  });

  test("Check that avatar is shown then click on Wallet", async () => {
    homePage = new HomePage(newPageInstance);
    await homePage.checkIfAvatarPresent();
    await homePage.clickOnAcceptButton();
  });

  test("Select mate horse", async () => {
    await homePage.clickOnArrowIcon();
    await homePage.clickOnStudServiceLink();
    studServicePage = new StudServicePage(newPageInstance);
    index = await studServicePage.getRandomIndexOfMaleHorseFromList();
    await studServicePage.clickOnSelectedMaleHorseWithIndex(index);
    malehorseName = await studServicePage.getHorseName(index);
    await studServicePage.clickOnSelectMateButtonOfHorseWithIndex(index);
    actualSelectHorse = await studServicePage.getSelectedMateHorseName();
    await studServicePage.checkIfCorrectHorseNameSelected(malehorseName, actualSelectHorse);
  });

  test("Select female horse", async() => {
    await studServicePage.clickOnSelectFemaleButton();
    await studServicePage.verifySelectFemalePopUpShown();
    await studServicePage.getListOfFemaleHorse();
    index = await studServicePage.getRandomIndexOfFemaleHorseFromList();
    femalehorseName = await studServicePage.getFemaleHorseName(index);
    await studServicePage.clickOnSelectedFemaleHorseWithIndex(index);
    await studServicePage.clickOnSelectButtonOfFemaleHorseWithIndex(index);
    actualSelectHorse = await studServicePage.getSelectedFemaleHorseName();
    await studServicePage.checkIfCorrectHorseNameSelected(femalehorseName, actualSelectHorse);
  });

  test("Proceed breeding steps", async() => {
    await studServicePage.scrollToBuyCoverButton();
    await studServicePage.clickOnBuyCoverButton();
    confirmMetamaskNotificationInstance = await metamaskFactory.clickNewPage(newPageInstance, studServiceConfig.CONFIRM_BUTTON);
    confirmMetamaskNotificationPage = new MetamaskNotificationPage(confirmMetamaskNotificationInstance);
    confirmMetamaskNotificationPage.clickOnConfirmButton();
    confirmMetamaskNotificationPage.waitForCloseEvent();
  });

  test("Go to Activity page and check if we breed successfully", async() => {
    await studServicePage.clickOnCheckActivityButton();
    activityPage = new ActivityPage(newPageInstance);
    await activityPage.checkIfBreedingInfoCorrect(malehorseName, femalehorseName);
  });

});

afterAll(async () => {
  await metamaskFactory.close();
});