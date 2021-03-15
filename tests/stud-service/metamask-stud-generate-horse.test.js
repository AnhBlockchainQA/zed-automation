const {MetamaskPage} = require("../../pages/MetamaskPage");
const {MetamaskFactory} = require("../../utils/browser/metamaskFactory");
const {LoginPage} = require("../../pages/LoginPage");
const {MetamaskNotificationPage} = require("../../pages/MetamaskNotification");
const {SEED_PHRASE, PASSWORD, CONFIRM_PASSWORD} = require("../../data/env");
const {CONNECT_METAMASK, AUTHENTICATE_BUTTON} = require("../../locators/ZedRun");
const {CONFIRM_BUTTON} = require("../../locators/StudService");
const {HomePage} = require("../../pages/HomePage");
const {StudServicePage} = require("../../pages/StudServicePage");
const {ActivityPage} = require("../../pages/ActivityPage");
const {MyStablePage} = require('../../pages/MyStablePage');
const test = require("jest-retries");

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
var studServicePage;
var malehorseName;
var femalehorseName;
var index;
var activityPage;
var homePage;
var actualSelectHorse;
var stablePage;

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

    test("Check that avatar is shown then click on Breeding link", async () => {
        homePage = new HomePage(newPageInstance);
        await homePage.waitForBalanceInfoToBeShown();
        await homePage.clickOnAcceptButton();
        await homePage.clickOnBreedingLink();
        await homePage.waitForLoadState();
    });

    test("Select mate horse", async () => {
        studServicePage = new StudServicePage(newPageInstance);
        index = await studServicePage.getRandomIndexOfMaleHorseFromList();
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
        studServicePage = new StudServicePage(newPageInstance);
        await studServicePage.clickOnSelectFemaleButton();
        await studServicePage.verifySelectFemalePopUpShown();
        await studServicePage.getListOfFemaleHorse();
        index = await studServicePage.getRandomIndexOfFemaleHorseFromList();
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
        studServicePage = new StudServicePage(newPageInstance);
        await studServicePage.scrollToBuyCoverButton();
        await studServicePage.clickOnBuyCoverButton();
        confirmMetamaskNotificationInstance = await metamaskFactory.clickNewPage(
            newPageInstance,
            CONFIRM_BUTTON
        );
        confirmMetamaskNotificationPage = new MetamaskNotificationPage(
            confirmMetamaskNotificationInstance
        );
        await confirmMetamaskNotificationPage.clickOnConfirmButton();
        await confirmMetamaskNotificationPage.waitForCloseEvent();
    });

    test(
        "Go to Activity page and check if we breed successfully",
        3,
        async () => {
            studServicePage = new StudServicePage(newPageInstance);
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
            stablePage = new MyStablePage(newPageInstance);
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
