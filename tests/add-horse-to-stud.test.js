const {MetamaskPage} = require("../pages/MetamaskPage");
const {MetamaskFactory} = require("../utils/browser/metamaskFactory");
const {LoginPage} = require("../pages/LoginPage");
const {MetamaskNotificationPage} = require("../pages/MetamaskNotification");
const {SEED_PHRASE, PASSWORD, CONFIRM_PASSWORD} = require("../data/env");
const {HomePage} = require("../pages/HomePage");
const {MyStablePage} = require("../pages/MyStablePage");
const {ActivityPage} = require("../pages/ActivityPage");
const test = require("jest-retries");
const {PROCEED_BUTTON} = require("../locators/MyStable");
const {CONNECT_METAMASK, AUTHENTICATE_BUTTON} = require("../locators/ZedRun");

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
var index;
var homePage;
var myStablePage;
var activityPage;
var horseName;

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

    test("Click on Filter button in My Stable page", async () => {
        homePage = new HomePage(newPageInstance);
        await homePage.waitForBalanceInfoToBeShown();
        await homePage.clickOnAcceptButton();

    });

    test("Filter with male horse", async () => {
        myStablePage = new MyStablePage(newPageInstance);
        await myStablePage.clickOnFilterButton();
        await myStablePage.clickOnGenderLink();
        await myStablePage.selectMaleHorseFilter();
        await myStablePage.waitForLoadState();
    });

    test("Select horse in My stable", 3, async () => {
        myStablePage = new MyStablePage(newPageInstance);
        await myStablePage.clickOnCloseButtonOfFilterForm();
        index = await myStablePage.getRandomIndexOfMaleHorsesInStable();
        await myStablePage.clickOnMaleHorseInStableWithIndex(index);
        await myStablePage.clickOnBreedingLinkOfHorseWithIndex(index);
        // horseName = await myStablePage.getSelectedMaleHorseWithIndex(index);
    });

    test("Proceed putting horse to stud service", 3, async () => {
        myStablePage = new MyStablePage(newPageInstance);
        await myStablePage.setStudDuration();
        await myStablePage.clickOnNextButton();
        confirmMetamaskNotificationInstance = await metamaskFactory.clickNewPage(
            newPageInstance,
            PROCEED_BUTTON
        );
        confirmMetamaskNotificationPage = new MetamaskNotificationPage(
            confirmMetamaskNotificationInstance
        );
        await confirmMetamaskNotificationPage.waitForLoadState();
        await confirmMetamaskNotificationPage.clickOnConfirmButton();
        await confirmMetamaskNotificationPage.waitForCloseEvent();
    });

    // test('Check activity page', 3, async() => {
    //   activityPage = new ActivityPage(newPageInstance);
    //   await activityPage.bringToFront();
    //   await activityPage.waitForLoadState();
    //   await activityPage.checkIfStatementInfoCorrect(horseName);
    // });

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
