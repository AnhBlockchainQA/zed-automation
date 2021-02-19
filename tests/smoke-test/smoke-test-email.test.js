const { PageFactory } = require("../../utils/browser/pageFactory");
const { LoginPage } = require("../../pages/LoginPage");
const { MagicLinkPage } = require("../../pages/MagicLinkPage");
const { HomePage } = require("../../pages/HomePage");
const { RacingPage } = require("../../pages/RacingPage");
const apiRequest = require("../../utils/api/api");
const { ACCOUNT_LIST, AMOUNT } = require("../../data/env");
const test = require("jest-retries");
const {MarketplacePage} = require("../../pages/MarketplacePage");
const {StudServicePage} = require('../../pages/StudServicePage');
const {EventsPage} = require('../../pages/EventsPage');
const {ResultsPage} = require('../../pages/ResultsPage');
const {WinningsPage} = require('../../pages/WinningsPage');
const {MyStablePage} = require('../../pages/MyStablePage');

var pageFactory = new PageFactory();
var messageId;
var magicLink;
var loginPage;
var magicLinkPage;
var racingPage;
var pageInstance;
var newPageInstance;
var homePage;
const EMAIL = ACCOUNT_LIST.FIRST_ACCOUNT.EMAIL;
const LOGIN = ACCOUNT_LIST.FIRST_ACCOUNT.LOGIN;
const DOMAIN = ACCOUNT_LIST.FIRST_ACCOUNT.DOMAIN;

beforeAll(async () => {
    pageFactory.removeCache();
});

describe("Do the smoke test to validate the Zed Run works well when logged by Email", () => {
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
        magicLink = await apiRequest.getMagicLink(
            LOGIN,
            DOMAIN,
            messageId
        );
    });

    test("Open new browser with magic link", 3, async () => {
        newPageInstance = await pageFactory.newTab(false, 0);
        magicLinkPage = new MagicLinkPage(newPageInstance);
        await magicLinkPage.bringToFront();
        await magicLinkPage.navigate(magicLink);
        await magicLinkPage.waitForNavigation();
        await magicLinkPage.waitForLoadState();
    });

    test(
        "Check that the ZED app is loading successfully",
        3,
        async () => {
            homePage = new HomePage(pageInstance);
            await homePage.bringToFront();
            await homePage.waitUntilBalanceShown();
            await homePage.waitForLoadState();
            await homePage.clickOnAcceptButton();
        }
    );


    let marketPlacePage;
    let studServicePage;
    let eventsPage;
    let resultsPage;
    let winningsPage;
    let myStablePage;
    test("Validate the component displays on Home Page", async () => {
        await homePage.navigateToHomePage();
        await homePage.waitForLoadState();
        await homePage.validateStreamingWidgetSection();
        await homePage.validateDiscordWidgetSection();
        await homePage.validateRaceSection();
        await homePage.validateHorseOnSaleSection();
        await homePage.validateInStudSection();
        await homePage.validateZEDSection();
    });

    test("Validate Marketplace Page has a racehorse", async () => {
        await homePage.clickOnMarketplaceLink();
        marketPlacePage = new MarketplacePage(pageInstance);
        await marketPlacePage.selectMarketplaceTab();
        await marketPlacePage.validateRaceHorseExisting();
    });

    test("Validate Stud Service Page has a racehorse In Stud", async () => {
        await homePage.clickOnBreedingLink();
        studServicePage = new StudServicePage(pageInstance);
        await studServicePage.selectStudServiceTab();
        await studServicePage.validateDefaultValueOnStubServicePage();

    });

    test("Validate has a race open on Events page", async () => {
        await homePage.clickOnRacingLink();
        await homePage.selectEventsTab();
        eventsPage = new EventsPage(pageInstance);
        await eventsPage.validateRacesOpenAndListEvents();

    });

    test("Validate has a result on Result Page", async () => {
        await homePage.clickOnRacingLink();
        resultsPage = new ResultsPage(pageInstance);
        await resultsPage.selectResultsTab();
        await resultsPage.validateEventsResultDisplay();

    });

    test("Validate has a Winning on Winning Page", async () => {
        await homePage.clickOnRacingLink();
        winningsPage = new WinningsPage(pageInstance);
        await winningsPage.selectWinningsTab();
        await winningsPage.validateListOfWinningsDisplay();
    });

    test("Validate has a racehorse existing on Stable Page", async () => {
        await homePage.navigateToMyStablePage();
        myStablePage = new MyStablePage(pageInstance);
        await myStablePage.validateRaceHorseDisplayCorrectly();
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