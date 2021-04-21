const { PageFactory } = require("../../utils/browser/pageFactory");
const { LoginPage } = require("../../pages/LoginPage");
const { MagicLinkPage } = require("../../pages/MagicLinkPage");
const { WalletPage } = require("../../pages/WalletPage");
const { HomePage } = require("../../pages/HomePage");
const apiRequest = require("../../utils/api/api");
const { ACCOUNT_LIST, AMOUNT } = require("../../data/env");
const test = require("jest-retries");

var pageFactory = new PageFactory();
var messageId;
var magicLink;
var loginPage;
var magicLinkPage;
var walletPage;
var pageInstance;
var newPageInstance;
var homePage;
const EMAIL = ACCOUNT_LIST.SECOND_ACCOUNT.EMAIL;
const LOGIN = ACCOUNT_LIST.SECOND_ACCOUNT.LOGIN;
const DOMAIN = ACCOUNT_LIST.SECOND_ACCOUNT.DOMAIN;

beforeAll(async () => {
   pageFactory.removeCache();
});

describe("Withdraw from ZED balance by logging in with magic link", () => {
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
      messageId,
    );
  });

  test("Open new browser with magic link", 3, async () => {
    newPageInstance = await pageFactory.newTab(false, 0);
    magicLinkPage = new MagicLinkPage(newPageInstance);
    await magicLinkPage.bringToFront();
    await magicLinkPage.navigate(magicLink);
    await magicLinkPage.waitForLoadState();
  });

  test(
    "Wait until wallet icon is shown then click on Wallet icon",
    3,
    async () => {
      homePage = new HomePage(pageInstance);
      await homePage.bringToFront();
      await homePage.waitForBalanceInfoToBeShown();
      await homePage.waitForLoadState();
      await homePage.clickOnWalletIcon();
    }
  );

  test(
    "Click on Withdraw button and check if ZED balance is updated",
    3,
    async () => {
      walletPage = new WalletPage(pageInstance);
      await walletPage.clickOnWithdrawButton();
      await walletPage.scrollToZedBalance();
      let zedBalance = await walletPage.getZedBalance();
      let newZedBalance = zedBalance - AMOUNT;
      console.log(">>> Old Zed Balance: ", zedBalance);
      console.log(">>> Expected Zed Balance: ", newZedBalance);
      await walletPage.typeWithDrawAmount(AMOUNT);
      await walletPage.clickOnWithdrawFromZedWallet();
      await walletPage.clickOnConfirmWithDrawButton();
      await walletPage.checkIfZedBalanceUpdated(zedBalance, newZedBalance);
    }
  );
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
