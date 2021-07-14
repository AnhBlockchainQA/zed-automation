const { LoginPage } = require("../../pages/LoginPage");
const { HomePage } = require("../../pages/HomePage");
const { StudServicePage } = require("../../pages/StudServicePage");
const { ActivityPage } = require("../../pages/ActivityPage");
const {MyStablePage} = require('../../pages/MyStablePage');
const { MagicLinkPage } = require("../../pages/MagicLinkPage");
const { ACCOUNT_LIST } = require("../../data/env");
const apiRequest = require("../../utils/api/api");
const test = require("jest-retries");
const { PageFactory } = require("../../utils/browser/pageFactory");

var pageFactory = new PageFactory();
var pageInstance;
var newPageInstance;
var loginPage;
var magicLinkPage;
var homePage;
var studServicePage;
var messageId;
var magicLink;
var activityPage;
var index;
var malehorseName;
var actualSelectHorse;
var femalehorseName;
var stablePage;

const EMAIL = ACCOUNT_LIST.SIXTH_ACCOUNT.EMAIL;
const LOGIN = ACCOUNT_LIST.SIXTH_ACCOUNT.LOGIN;
const DOMAIN = ACCOUNT_LIST.SIXTH_ACCOUNT.DOMAIN;

beforeAll(async () => {
  pageFactory.removeCache();
});

describe("Generate stud horse when logging in with magic link", () => {
  test(
    "Open ZedRun page and input valid email to generate magic link",
    3,
    async () => {
      pageInstance = await pageFactory.newTab(false, 0);
      loginPage = new LoginPage(pageInstance);
      await loginPage.navigate();
      await loginPage.clickOnStartButton();
      await loginPage.clickOnEmailOption();
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

  test("Check that avatar is shown then click on Breeding link", async () => {
    homePage = new HomePage(pageInstance);
    await homePage.bringToFront();
    await homePage.waitForBalanceInfoToBeShown();
    await homePage.clickOnAcceptButton();
    await homePage.clickOnBreedingLink();
    await homePage.waitForLoadState();
  });

  test("Select mate horse", async () => {
    studServicePage = new StudServicePage(pageInstance);
    index = await studServicePage.getRandomIndexOfMaleHorseFromList();
    console.log(" >>>>>>>>> Index : ", index);
    await studServicePage.clickOnSelectedMaleHorseWithIndex(index);
    malehorseName = await studServicePage.getHorseName(index);
    await studServicePage.clickOnSelectMateButtonOfHorseWithIndex(index);
    actualSelectHorse = await studServicePage.getSelectedMateHorseName();
    await studServicePage.checkIfCorrectHorseNameSelected(
      malehorseName,
      actualSelectHorse
    );
  });

  test("Select female horse", 3, async () => {
    studServicePage = new StudServicePage(pageInstance);
    await studServicePage.clickOnSelectFemaleButton();
    await studServicePage.verifySelectFemalePopUpShown();
    await studServicePage.getListOfFemaleHorse();
    index = await studServicePage.getRandomIndexOfFemaleHorseFromList();
    console.log(" >>>>>> Index : ", index);
    femalehorseName = await studServicePage.getFemaleHorseName(index);
    await studServicePage.clickOnSelectedFemaleHorseWithIndex(index);
    await studServicePage.clickOnSelectButtonOfFemaleHorseWithIndex(index);
    actualSelectHorse = await studServicePage.getSelectedFemaleHorseName();
    await studServicePage.checkIfCorrectHorseNameSelected(
      femalehorseName,
      actualSelectHorse
    );
  });

  test("Proceed breeding steps", 3, async () => {
    studServicePage = new StudServicePage(pageInstance);
    await studServicePage.scrollToBuyCoverButton();
    await studServicePage.clickOnBuyCoverButton();
    await studServicePage.clickOnConfirmButton();
    await studServicePage.waitForLoadState();
  });

  test(
    "Go to Activity page and check if we breed successfully",
    3,
    async () => {
      studServicePage = new StudServicePage(pageInstance);
      await studServicePage.waitForLoadState();
      await studServicePage.clickOnCheckActivityButton();
      activityPage = new ActivityPage(newPageInstance);
      await activityPage.checkIfStatementInfoCorrect(
        malehorseName,
        femalehorseName
      );
    }
  );

    test(
        "Go to Stable page and verify there is a new horse",
        3,
        async () => {
            await homePage.navigateToMyStablePage();
            stablePage = new MyStablePage(pageInstance);
            await stablePage.validateNewBornHorseDisplaysOnStablePage();
        }
    );
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
