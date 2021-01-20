const { PageFactory } = require("../../utils/browser/pageFactory");
const { LoginPage } = require("../../pages/LoginPage");
const { MagicLinkPage } = require("../../pages/MagicLinkPage");
const { WalletPage } = require('../../pages/WalletPage');
const { HomePage } = require('../../pages/HomePage');
const apiRequest = require("../../utils/api/api");
const { TEST_EMAIL, TEST_LOGIN, TEST_DOMAIN, AMOUNT } = require("../../data/env");

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
  pageFactory = new PageFactory();
});

describe("Withdraw from ZED balance by logging in with magic link", () => {

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
    newPageInstance = await pageFactory.newTab(false, 0);
    magicLinkPage = new MagicLinkPage(newPageInstance);
    await magicLinkPage.bringToFront();
    await magicLinkPage.navigate(magicLink);
    await magicLinkPage.waitForLoginFormHidden();
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
    await walletPage.clickOnWithdrawFromZedWallet();
    await walletPage.checkIfZedBalanceUpdated(zedBalance, newZedBalance);  
  });
});

afterAll(async () => {
  await pageFactory.endTest();
});


