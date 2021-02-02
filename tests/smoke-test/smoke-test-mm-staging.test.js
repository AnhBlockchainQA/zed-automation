const {MetamaskPage} = require('../../pages/MetamaskPage');
const {MetamaskFactory} = require('../../utils/browser/metamaskFactory');
const {LoginPage} = require('../../pages/LoginPage');
const {MetamaskNotificationPage} = require('../../pages/MetamaskNotification');
const {SEED_PHRASE, PASSWORD, CONFIRM_PASSWORD} = require('../../data/env');
const {WalletPage} = require('../../pages/WalletPage');
const {AMOUNT} = require("../../data/env");
const {HomePage} = require("../../pages/HomePage");
const zedRunConfig = require('../../locators/ZedRun');
const walletConfig = require("../../locators/Wallet");
const {MarketplacePage} = require("../../pages/MarketplacePage");
const {StudServicePage} = require('../../pages/StudServicePage');
const {EventsPage} = require('../../pages/EventsPage');
const {ResultsPage} = require('../../pages/ResultsPage');
const {WinningsPage} = require('../../pages/WinningsPage');
const {MyStablePage} = require('../../pages/MyStablePage');

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

beforeAll(async () => {
    metamaskFactory = new MetamaskFactory();
    await metamaskFactory.removeCache();
    metamaskInstance = await metamaskFactory.init();
});

describe("Validate the some pages on app work well", () => {

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

    test("Wait for the web is loading successfully", async () => {
        homePage = new HomePage(newPageInstance);
        // await homePage.checkIfAvatarPresent();
        await homePage.waitUntilBalanceShown();
        await homePage.clickOnAcceptButton();

    });

    let marketPlacePage;
    let studServicePage;
    let eventsPage;
    let resultsPage;
    let winningsPage;
    let myStablePage;
    test("Validate Marketplace Page has a racehorse", async () => {
        await homePage.clickOnMarketplaceLink();
        marketPlacePage = new MarketplacePage(newPageInstance);
        await marketPlacePage.selectMarketplaceTab();
        await marketPlacePage.validateRaceHorseExisting();
    });

    test("Validate Stud Service Page has a racehorse In Stud", async () => {
        await homePage.clickOnBreedingLink();
        studServicePage = new StudServicePage(newPageInstance);
        await studServicePage.selectStudServiceTab();
        await studServicePage.validateDefaultValueOnStubServicePage();

    });

    test("Validate has a race open on Events page", async () => {
        await homePage.clickOnRacingLink();
        eventsPage = new EventsPage(newPageInstance);
        await eventsPage.selectEventsTab();
        await eventsPage.validateRacesOpenAndListEvents();

    });

    test("Validate has a result on Result Page", async () => {
        await homePage.clickOnRacingLink();
        resultsPage = new ResultsPage(newPageInstance);
        await resultsPage.selectResultsTab();
        await resultsPage.validateEventsResultDisplay();

    });

    test("Validate has a Winning on Winning Page", async () => {
        await homePage.clickOnRacingLink();
        winningsPage = new WinningsPage(newPageInstance);
        await winningsPage.selectWinningsTab();
        await winningsPage.validateListOfWinningsDisplay();
    });

    test("Validate has a racehorse existing on Stable Page", async () => {
        await homePage.navigateToMyStablePage();
        myStablePage = new MyStablePage(newPageInstance);
        await myStablePage.validateRaceHorseDisplayCorrectly();
    });

});

afterAll(async (done) => {
    await metamaskFactory.close();
    done();
});