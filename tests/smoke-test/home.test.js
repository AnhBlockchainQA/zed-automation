const {MetamaskPage} = require('../../pages/MetamaskPage');
const {MetamaskFactory} = require('../../utils/browser/metamaskFactory');
const {HomePage} = require("../../pages/HomePage");
const {
    CONNECT_METAMASK,
    ETH_BALANCE,
} = require("../../locators/ZedRun");
const {
    MetamaskNotificationPage,
} = require("../../pages/MetamaskNotification");
const {LoginPage} = require("../../pages/LoginPage");
const {PageFactory} = require("../../utils/browser/pageFactory");
const {expect} = require("@playwright/test");
const {Page} = require("@playwright/test");

let metamaskFactory;
let metamask;
let metamaskInstance;
let homePage;
let Home;
let metamaskNotificationInstance;
let metamaskNotificationPage;
let pageFactory = new PageFactory();


describe('TEST DESCRIBE', () =>{



    beforeEach(async () => {
        metamaskFactory = new MetamaskFactory();
        await metamaskFactory.removeCache();
        metamaskInstance = await metamaskFactory.init();
        const windows = metamaskInstance.context().pages();
        console.log("no.of windows: " + windows.length);
        windows.forEach(page => {
            console.log(page.url());
        });
        metamask = new MetamaskPage(metamaskInstance);
        homePage = new HomePage(metamask);
        await homePage.metamaskSingIn(metamask);
        await windows[1].bringToFront();
        await homePage.navigate();
        await homePage.waitForNavigation();
        // Home = await metamaskFactory.newPage();
        // homePage = new HomePage(Home);
        // metamask = new MetamaskPage(metamaskInstance);
        // await homePage.metamaskSingIn(metamask);

    });

    afterEach( async () => {
        await metamaskFactory.close();
    });

    test('[ZED-2] Authorization Redirects from Magic Form to Metamask Sign In ', async () => {
        await homePage.clickOnStartButton();
        await homePage.clickConnectMetamaskButton();
        metamaskNotificationInstance = await metamaskFactory.clickNewPage(
            Home,
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
        // let pageInstance = await pageFactory.newTab(false, 0);
        // home = new HomePage(pageInstance);
        // // homePage = new HomePage(Home);
        // await homePage.waitForBalanceInfoToBeShown();
        // await homePage.waitForLoadState();
        // await homePage.clickOnWalletIcon();
        //
        // let home = await metamaskFactory.clickNewPage(Home, ETH_BALANCE);
        // homePage = new HomePage(home);
        await homePage.bringToFront();
        await homePage.waitForLoadState();
        await homePage.waitForNavigation();
        expect(homePage.url()).toContain('zed');
        // expect()
        // await home.waitForBalanceInfoToBeShown();

        // await homePage.clickOnWalletIcon();
    });
});
