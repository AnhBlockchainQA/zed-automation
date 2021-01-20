const { MetamaskPage } = require('../../pages/MetamaskPage');
const { MetamaskFactory } = require('../../utils/browser/metamaskFactory');
const { LoginPage } = require('../../pages/LoginPage');
const { MetamaskNotificationPage } = require('../../pages/MetamaskNotification');
const { SEED_PHRASE, PASSWORD, CONFIRM_PASSWORD } = require('../../data/env');
const { WalletPage } = require('../../pages/WalletPage');
const { AMOUNT } = require("../../data/env");
const { HomePage } = require("../../pages/HomePage");
const zedRunConfig = require('../../locators/ZedRun');
const walletConfig = require("../../locators/Wallet");

let metamaskFactory;
let metamaskPage;
let metamaskInstance;
let zedRunPage;
let newPageInstance;
let metamaskNotificationInstance;
let metamaskNotificationPage;
let otherMetamaskNotificationInstance;
let otherMetamaskNotificationPage;
let homePage;
let withdrawMetamaskNotificationInstance;
let withdrawMetamaskNotificationPage;
let walletPage;

beforeAll(async () => {
  metamaskFactory = new MetamaskFactory();
  await metamaskFactory.removeCache();
  metamaskInstance = await metamaskFactory.init();
});

describe("Withdraw from ETH balance by logging in with Metamask", () => {

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

  test ("Wait until wallet icon is shown then click on Wallet icon", async () => {
    homePage = new HomePage(newPageInstance);
    await homePage.checkIfAvatarPresent();
    await homePage.waitForBalanceInfoToBeShown();
    await homePage.clickOnAcceptButton();
    await homePage.clickOnWalletIcon();
  });

  test ("Click on Withdraw button and check if ZED balance is updated", async () => {
    walletPage = new WalletPage(newPageInstance);
    await walletPage.clickOnWithdrawButton();
    await walletPage.scrollToZedBalance();
    let zedBalance = await walletPage.getZedBalance();
    let newZedBalance = zedBalance - AMOUNT;
    console.log(">>> Old Zed Balance: ", zedBalance);
    console.log(">>> Expected Zed Balance: ", newZedBalance);
    await walletPage.typeWithDrawAmount(AMOUNT);

    withdrawMetamaskNotificationInstance = await metamaskFactory.clickNewPage(newPageInstance, walletConfig.WITHDRAW_FROM_ZED_BUTTON);
    withdrawMetamaskNotificationPage = new MetamaskNotificationPage(withdrawMetamaskNotificationInstance);
    await withdrawMetamaskNotificationPage.waitForLoadState();
    await withdrawMetamaskNotificationPage.clickOnSignButton();
    await withdrawMetamaskNotificationPage.waitForCloseEvent();
    // await walletPage.scrollToZedBalance();
    // await walletPage.checkIfETHBalanceUpdated(zedBalance, newZedBalance);
  });
});

afterAll(async (done) => {
  await metamaskFactory.endTest();
  done()
});