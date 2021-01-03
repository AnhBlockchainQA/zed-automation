const { PageFactory } = require("../../utils/browser/pageFactory");
const { LoginPage } = require("../../pages/LoginPage");
const { MagicLinkPage } = require("../../pages/MagicLinkPage");
const { WalletPage } = require('../../pages/WalletPage');
const { HomePage } = require('../../pages/HomePage');
const apiRequest = require("../../utils/api/api");
const { OTHER_TEST_EMAIL, OTHER_TEST_LOGIN, OTHER_TEST_DOMAIN, AMOUNT } = require("../../data/env");

let pageFactory;
let messageId;
let magicLink;
let loginPage;
let magicLinkPage;
let walletPage;
let pageInstance;
let newPageInstance;
let homePage;
const pattern = /<a style="color: #27B18A; text-decoration: none;" target="_blank" href="(.*)">/;

beforeAll(async () => {
  jest.setTimeout(5000)
  pageFactory = new PageFactory();
});

describe("Deposite to ZED balance by logging in with magic link", () => {

  test("Open ZedRun page and input valid email to generate magic link", async () => {
    pageInstance = await pageFactory.newTab(false, 0);
    loginPage = new LoginPage(pageInstance);
    await loginPage.navigate();
    await loginPage.clickOnStartButton();
    await loginPage.typeEmail(OTHER_TEST_EMAIL);
    await loginPage.clickOnContinueButton();
    await loginPage.waitForTimeout();
  });

  test("Check mail inbox to get magic link", async () => {
    messageId = await apiRequest.getZedRunMessageId(OTHER_TEST_LOGIN, OTHER_TEST_DOMAIN);
    magicLink = await apiRequest.getMagicLink(
      OTHER_TEST_LOGIN,
      OTHER_TEST_DOMAIN,
      messageId,
      pattern
    );
  });

  test("Open new browser with magic link", async () => {
    newPageInstance = await pageFactory.newTab(false, 0);
    magicLinkPage = new MagicLinkPage(newPageInstance);
    await magicLinkPage.bringToFront();
    await magicLinkPage.navigate(magicLink);
    await magicLinkPage.waitForLoginFormHidden();
  });

  test("Check that avatar is shown then click on Wallet", async () => {
    homePage = new HomePage(newPageInstance);
    await homePage.checkIfAvatarPresent();
    await homePage.waitUntilBalanceShown();
    await homePage.clickOnAcceptButton();
    await homePage.clickOnWalletIcon();
  });

  test ("Click on Deposit button and check if ETH balance is updated", async () => {
    walletPage = new WalletPage(newPageInstance);
    let ethBalance = await walletPage.getETHBalance();
    await walletPage.clickOnDepositButton();
    let newETHBalance = ethBalance - AMOUNT;
    console.log(">>> Old ETH Balance: ", ethBalance);
    console.log(">>> Expected ETH Balance: ", newETHBalance);
    await walletPage.typeDepositeAmount(AMOUNT);
    await walletPage.clickOnDepositeToZedWallet();
    await walletPage.clickOnConfirmDepositeButton();
    await walletPage.checkIfETHBalanceUpdated(ethBalance, newETHBalance);
  },15000);
});

afterAll(async (done) => {
 await pageFactory.endTest();
 done();
});


