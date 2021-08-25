const { PageFactory } = require("../../utils/browser/pageFactory");
const { LoginPage } = require("../../pages/LoginPage");
const { MagicLinkPage } = require("../../pages/MagicLinkPage");
const { HomePage } = require("../../pages/HomePage");
const { RacingPage } = require("../../pages/RacingPage");
const apiRequest = require("../../utils/api/api");
const { ACCOUNT_LIST, ZEDRUN_SPECIFIC_FREE_RACE_URL } = require("../../data/env");
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

describe("Free racing with Magic Link", () => {
    test("Open the existing racing", 1, async () => {
        pageInstance = await pageFactory.newTab(false, 0);
        loginPage = new LoginPage(pageInstance);
        await loginPage.navigate_existing_racing_url(ZEDRUN_SPECIFIC_FREE_RACE_URL);
        racingPage = new RacingPage(pageInstance);
        await racingPage.clickOnAcceptButton();
        let listGateOpen = await racingPage.getGateOpening();
        let randomGate = listGateOpen[Math.floor(Math.random() * listGateOpen.length)];
        await racingPage.clickOnGateOpen(randomGate);
    });
    test(
        "Open ZedRun page and input valid email to generate magic link",
        3,
        async () => {
            loginPage = new LoginPage(pageInstance);
            await loginPage.clickOnEmailOption();
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
        await magicLinkPage.waitForLoadState();
    });

    test("Select a racehorses and add into the free racing", async () => {
    racingPage = new RacingPage(pageInstance);
    await racingPage.bringToFront();
    await racingPage.selectEntryFreeEvent();
    const eventName = await racingPage.addRaceHorseIntoRace();
    await racingPage.validateRacingEventAfterInNextToRun(eventName);
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
