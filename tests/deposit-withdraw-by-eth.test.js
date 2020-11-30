const {
  MetamaskPage
} = require('../pages/MetamaskPage');
const {
  MetamaskFactory
} = require('../utils/browser/metamaskFactory');
const {
  LoginPage
} = require('../pages/LoginPage');
const {
  MetamaskNotificationPage
} = require('../pages/MetamaskNotification');
const {
  SEED_PHRASE,
  PASSWORD,
  CONFIRM_PASSWORD
} = require('../data/env');
const zedRunConfig = require('../locators/ZedRun');

const Wallet = require('../locators/Wallet')
const MetamaskConfig = require('../locators/Metamask')
const {
  WalletPage
} = require('../pages/WalletPage');
const {
  TEST_EMAIL,
  TEST_LOGIN,
  TEST_DOMAIN,
  DEPOSITE_AMOUNT,
  AMOUNT
} = require("../data/env");


let metamaskFactory;
let metamaskPage;
let metamaskInstance;
let zedRunPage;
let newPageInstance;
let metamaskNotificationInstance;
let metamaskNotificationPage;
let otherMetamaskNotificationInstance;
let otherMetamaskNotificationPage;
beforeAll(async () => {
  metamaskFactory = new MetamaskFactory();
  await metamaskFactory.removeCache();
  metamaskInstance = await metamaskFactory.init();
});

afterAll(async () => {
  await metamaskFactory.close();
});

describe("flow test generate child horse", () => {



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
    // await zedRunPage.clickConnectMetamaskButton();

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
    await newPageInstance.click('text="Accept"')
  });

  let walletPage
  test("Deposit", async () => {
    walletPage = new WalletPage(newPageInstance);
    await newPageInstance.click(Wallet.WALLET_ICON)
    await newPageInstance.click(Wallet.DEPOSITE_BUTTON)
    let ethBalance = await walletPage.getETHBalance();
    const selector = Wallet.ETH_BALANCE;
    const res = await newPageInstance.evaluate((locator) => {
      return document.querySelector(locator).innerText
    }, selector);
    console.log('res:', res)
    let newETHBalance = ethBalance - AMOUNT;
    console.log('ethBalance:', ethBalance)
    await newPageInstance.fill(Wallet.DEPOSITE_AMOUNT_INPUT, AMOUNT.toString())
    await newPageInstance.waitForLoadState()
    await newPageInstance.waitForSelector(Wallet.DEPOSITE_TO_ZED_BUTTON, {
      timeout: 0
    })
    const metaMaskSign = await metamaskFactory.clickNewPage(newPageInstance, Wallet.DEPOSITE_TO_ZED_BUTTON)
    await metaMaskSign.click(MetamaskConfig.CLICK_CONFIRM_BUTTON)
    await metaMaskSign.waitForEvent("close")
    await walletPage.checkIfETHBalanceUpdated(ethBalance, newETHBalance);
  });

  test("Withdraw", async () => {
    // await newPageInstance.click(Wallet.WALLET_ICON)
    console.log('KKKKKKKKKKKKKKKKKKKKKKKKKK')
    let zedBalance = await walletPage.getZedBalance();
    let newZedBalance = zedBalance - AMOUNT;
    await newPageInstance.fill(Wallet.WITHDRAW_AMOUNT_INPUT, AMOUNT.toString())
    await newPageInstance.waitForLoadState()
    await newPageInstance.waitForSelector(Wallet.WITHDRAW_FROM_ZED_BUTTON, {
      timeout: 0
    })
    const metaMaskSign = await metamaskFactory.clickNewPage(newPageInstance, Wallet.WITHDRAW_FROM_ZED_BUTTON)
    await metaMaskSign.click(MetamaskConfig.CLICK_CONFIRM_BUTTON)
    await metaMaskSign.waitForEvent("close")
    // await walletPage.checkIfETHBalanceUpdated(zedBalance, newZedBalance);
  });
});