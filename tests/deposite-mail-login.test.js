const { PageFactory } = require("../utils/browser/pageFactory");
const { LoginPage } = require("../pages/LoginPage");
const { MagicLinkPage } = require("../pages/MagicLinkPage");
const { WalletPage } = require('../pages/WalletPage');
const apiRequest = require("../utils/api/api");
const { TEST_EMAIL, TEST_LOGIN, TEST_DOMAIN, AMOUNT } = require("../data/env");

let pageFactory;
let messageId;
let magicLink;
let loginPage;
let magicLinkPage;
let walletPage;
let pageInstance;
const pattern = /<a style="color: #27B18A; text-decoration: none;" target="_blank" href="(.*)">/;

beforeAll(async () => {
  pageFactory = new PageFactory();
});

describe("Login to ZedRUn with magic link", () => {

  test("Open ZedRun page and input valid email to generate magic link", async () => {
    pageInstance = await pageFactory.newTab(false, 0);
    loginPage = new LoginPage(pageInstance);
    await loginPage.navigate();
    await loginPage.clickOnStartButton();
    await loginPage.typeEmail(TEST_EMAIL);
    await loginPage.clickOnContinueButton();
    await loginPage.waitForTimeout();
  });

  test("Check mail inbox to get magic link", async () => {
    messageId = await apiRequest.getZedRunMessageId(TEST_LOGIN, TEST_DOMAIN);
    magicLink = await apiRequest.getMagicLink(
      TEST_LOGIN,
      TEST_DOMAIN,
      messageId,
      pattern
    );
  });

  test("Open new browser with magic link", async () => {
    let newPageInstance = await pageFactory.newTab(false, 0);
    magicLinkPage = new MagicLinkPage(newPageInstance);
    await magicLinkPage.bringToFront();
    await magicLinkPage.navigate(magicLink);
    await magicLinkPage.clickToTrustMe();
    await magicLinkPage.waitForLoggedInMessage();
    await magicLinkPage.waitForTimeout();
  });

  test("Switch back to ZedRun page and verify login successful", async () => {
    await loginPage.bringToFront();
    await loginPage.waitForLoginFormHidden();
    await loginPage.clickOnAcceptButton();
  });

  test ("Click on Deposit button and check if ETH balance is updated", async () => {
    await loginPage.clickOnWalletIcon();
    walletPage = new WalletPage(pageInstance);
    await walletPage.clickOnDepositButton();
    let ethBalance = await walletPage.getETHBalance();
    let newETHBalance = ethBalance - AMOUNT;
    console.log(">>> Old ETH Balance: ", ethBalance);
    console.log(">>> Expected ETH Balance: ", newETHBalance);
    await walletPage.typeDepositeAmount(AMOUNT);
    await walletPage.clickOnDepositeToZedWallet();
    await walletPage.checkIfETHBalanceUpdated(ethBalance, newETHBalance);
  });
});


afterAll(async () => {
  pageFactory.endTest();
});


