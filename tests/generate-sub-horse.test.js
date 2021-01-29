const { MetamaskPage } = require("../pages/MetamaskPage");
const { MetamaskFactory } = require("../utils/browser/metamaskFactory");
const { LoginPage } = require("../pages/LoginPage");
const { MetamaskNotificationPage } = require("../pages/MetamaskNotification");
const { SEED_PHRASE, PASSWORD, CONFIRM_PASSWORD } = require("../data/env");
const zedRunConfig = require("../locators/ZedRun");
const studServiceConfig = require("../locators/StudService");
const { HomePage } = require("../pages/HomePage");
const { StudServicePage } = require("../pages/StudServicePage");
const { ActivityPage } = require("../pages/ActivityPage");
const test = require("jest-retries");
const { MyStablePage } = require("../pages/MyStablePage");
const { PROCEED_BUTTON, STUD_DURATION } = require("../locators/MyStable");


const {default: userEvent} = require('@testing-library/user-event')
const { screen } = require('@testing-library/dom');

var metamaskFactory = new MetamaskFactory();
var metamaskPage;
var metamaskInstance;
var zedRunPage;
var newPageInstance;
var metamaskNotificationInstance;
var metamaskNotificationPage;
var otherMetamaskNotificationInstance;
var otherMetamaskNotificationPage;
var confirmMetamaskNotificationInstance;
var confirmMetamaskNotificationPage;
var anotherMetamaskNotificationInstance;
var anotherMetamaskNotificationPage;
var studServicePage;
var malehorseName;
var femalehorseName;
var index;
var activityPage;
var homePage;
var noOfHorses;
var myStablePage;

beforeAll(async () => {
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
  });

  test("Open ZedRun page and click Connnect Metamask", async () => {
    newPageInstance = await metamaskFactory.newPage();
    zedRunPage = new LoginPage(newPageInstance);
    await zedRunPage.navigate();
    await zedRunPage.clickOnStartButton();

    metamaskNotificationInstance = await metamaskFactory.clickNewPage(
      newPageInstance,
      zedRunConfig.CONNECT_METAMASK
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
      zedRunConfig.AUTHENTICATE_BUTTON
    );
    otherMetamaskNotificationPage = new MetamaskNotificationPage(
      otherMetamaskNotificationInstance
    );

    await otherMetamaskNotificationPage.waitForLoadState();
    await otherMetamaskNotificationPage.clickOnSignButton();
    await otherMetamaskNotificationPage.waitForCloseEvent();
  });

  test("Check that avatar is shown then click on Breeding link", async () => {
    homePage = new HomePage(newPageInstance);
    await homePage.waitForBalanceInfoToBeShown();
    await homePage.clickOnAcceptButton();
    await homePage.clickOnBreedingLink();
  });

  test("If we have no male horse in Stud then go to My Stable", async () => {
    studServicePage = new StudServicePage(newPageInstance);
    await studServicePage.waitForLoadState();
    noOfHorses = await studServicePage.getSizeOfMaleHorses();
    if (noOfHorses > 0) {
      await studServicePage.clickOnUserAvatar();
      await studServicePage.waitForLoadState();
    }
  });

  test("Filter all the male horses", async () => {
    if (noOfHorses > 0) {
      myStablePage = new MyStablePage(newPageInstance);
      await myStablePage.clickOnFilterButton();
      await myStablePage.clickOnGenderLink();
      await myStablePage.selectMaleHorseFilter();
      await myStablePage.clickOnCloseButtonOfFilterForm();
    }
  });

  test("Select one male horse and select Stud Duration", async () => {
    if (noOfHorses > 0) {
    myStablePage = new MyStablePage(newPageInstance);

    await myStablePage.clickOnMaleHorseInStableWithIndex(1);
    await myStablePage.clickOnBreedingLinkOfHorseWithIndex(1);
    await myStablePage.setStudDuration("7 Days");
    }
  });

  test("Select one male horse and select Stud Duration", async () => {
    if (noOfHorses > 0) {
    myStablePage = new MyStablePage(newPageInstance);
    await myStablePage.clickOnNextButton();
    }
  });

  // test("Proccess payment to put horse into Stud", async () => {
  //   anotherMetamaskNotificationInstance = await metamaskFactory.clickNewPage(
  //     newPageInstance,
  //     PROCEED_BUTTON
  //   );
  //   anotherMetamaskNotificationPage = new MetamaskNotificationPage(
  //     anotherMetamaskNotificationInstance
  //   );
  //   await anotherMetamaskNotificationPage.clickOnConfirmButton();
  //   await anotherMetamaskNotificationPage.waitForLoadState();
  //   await anotherMetamaskNotificationPage.waitForCloseEvent();
  // });

  // test("Go back to Stud service page", async () => {
  //   activityPage = new ActivityPage(newPageInstance);
  //   await activityPage.bringToFront();
  //   await activityPage.clickOnBreedingLink();
  //   await activityPage.waitForLoadState();
  // });

  // test("Select mate horse", async () => {
  //   studServicePage = new StudServicePage(newPageInstance);
  //   index = await studServicePage.getRandomIndexOfMaleHorseFromList();
  //   await studServicePage.clickOnSelectedMaleHorseWithIndex(index);
  //   malehorseName = await studServicePage.getHorseName(index);
  //   await studServicePage.clickOnSelectMateButtonOfHorseWithIndex(index);
  //   actualSelectHorse = await studServicePage.getSelectedMateHorseName();
  //   await studServicePage.checkIfCorrectHorseNameSelected(
  //     malehorseName,
  //     actualSelectHorse
  //   );
  // });

  // test("Select female horse", 3, async () => {
  //   await studServicePage.clickOnSelectFemaleButton();
  //   await studServicePage.verifySelectFemalePopUpShown();
  //   await studServicePage.getListOfFemaleHorse();
  //   index = await studServicePage.getRandomIndexOfFemaleHorseFromList();
  //   femalehorseName = await studServicePage.getFemaleHorseName(index);
  //   await studServicePage.clickOnSelectedFemaleHorseWithIndex(index);
  //   await studServicePage.clickOnSelectButtonOfFemaleHorseWithIndex(index);
  //   actualSelectHorse = await studServicePage.getSelectedFemaleHorseName();
  //   await studServicePage.checkIfCorrectHorseNameSelected(
  //     femalehorseName,
  //     actualSelectHorse
  //   );
  // });

  // test("Proceed breeding steps", 3, async () => {
  //   await studServicePage.scrollToBuyCoverButton();
  //   await studServicePage.clickOnBuyCoverButton();
  //   confirmMetamaskNotificationInstance = await metamaskFactory.clickNewPage(
  //     newPageInstance,
  //     studServiceConfig.CONFIRM_BUTTON
  //   );
  //   confirmMetamaskNotificationPage = new MetamaskNotificationPage(
  //     confirmMetamaskNotificationInstance
  //   );
  //   confirmMetamaskNotificationPage.clickOnConfirmButton();
  //   confirmMetamaskNotificationPage.waitForCloseEvent();
  // });

  // test(
  //   "Go to Activity page and check if we breed successfully",
  //   3,
  //   async () => {
  //     await studServicePage.clickOnCheckActivityButton();
  //     activityPage = new ActivityPage(newPageInstance);
  //     await activityPage.checkIfStatementInfoCorrect(
  //       malehorseName,
  //       femalehorseName
  //     );
  //   }
  // );
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
