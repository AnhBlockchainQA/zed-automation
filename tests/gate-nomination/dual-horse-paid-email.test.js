const {PageFactory} = require("../../utils/browser/pageFactory");
const {LoginPage} = require("../../pages/LoginPage");
const {MagicLinkPage} = require("../../pages/MagicLinkPage");
const {HomePage} = require("../../pages/HomePage");
const {RacingPage} = require("../../pages/RacingPage");
const apiRequest = require("../../utils/api/api");
const {ACCOUNT_LIST } = require("../../data/env");
const test = require("jest-retries");


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

describe("Pick horses and add into the entry with fee racing when logged by Magic Link", () => {
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

    test("Select a racehorses to add into the paid entry racing", async () => {
        await homePage.clickOnRacingLink();
        await homePage.selectEventsTab();
        racingPage = new RacingPage(pageInstance);
        await racingPage.selectFirstEntryHasFeeEvent();
        const numberGateOpening = await racingPage.getGateOpening();
        const getEventName = await racingPage.returnEventName();
        console.log('List of Gates are opening ', numberGateOpening);
        const totalGate = numberGateOpening.length;
        console.log('The number of gate ', totalGate);
        // for (let i = 0; i < numberGateOpening.length; i++) {
        for (let i = totalGate - 1; i >= 0; i--) {
            await racingPage.clickGateNumberAndSelectHorse(numberGateOpening[i]);
            await racingPage.waitForLoadState();
            await racingPage.clickConfirmButton();
            await racingPage.waitForLoadState();
        }

        await racingPage.waitForLoadState();
        await racingPage.validateRacingEventAfterInNextToRun(getEventName);
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

