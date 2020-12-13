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
  // await metamaskFactory.close();
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

  test("dual horse", async () => {
    await newPageInstance.click('text="racing"')
    await newPageInstance.click('.free-race-badge')

    const group = await newPageInstance.$(`//div[@class='other-content']/div[@class='gate-group']`)
    console.log('innerText:',await group.innerText())
    const texts = await group.innerText()
    let listNumber = texts.split(`\n`)
    listNumber = listNumber.map(number => {
      const check = Number.isInteger(parseInt(number))
      if (check) {
        return number
      }
    }).filter(e => !!e)
    console.log('listNumber:', listNumber)
    console.log('texts:', texts.split(`\n`))
    console.log('texts 0:', texts[0])
    console.log('texts 1:', texts[1])
    // console.log('getAttribute:', await group.getAttribute())
    for (let i = 0; i< listNumber.length; i++) {
      await newPageInstance.click(`//div[contains(@class,'pick-gate')]//div[@class='gate-group']/div[@class='gate-btn' and descendant::text()=${listNumber[i]}]`)
      await newPageInstance.waitForLoadState();
      await newPageInstance.hover(`.horse-infos`)
      await newPageInstance.click('text="Free Entry"')
      await newPageInstance.waitForLoadState();
    }

    // await newPageInstance.click(`//div[contains(@class,'pick-gate')]//div[@class='gate-group']/div[@class='gate-btn' and descendant::text()='1']`)
    // await newPageInstance.waitForLoadState();
    // await newPageInstance.hover(`.horse-infos`)
    // await newPageInstance.click('text="Free Entry"')
    // await newPageInstance.waitForLoadState();

    // await newPageInstance.click(`//div[contains(@class,'pick-gate')]//div[@class='gate-group']/div[@class='gate-btn' and descendant::text()='2']`)
    // await newPageInstance.waitForLoadState();
    // await newPageInstance.hover(`.horse-infos`)
    // await newPageInstance.click('text="Free Entry"')
    // await newPageInstance.waitForLoadState();
    
    // await newPageInstance.click(`//div[contains(@class,'pick-gate')]//div[@class='gate-group']/div[@class='gate-btn' and descendant::text()='3']`)
    // await newPageInstance.waitForLoadState();
    // await newPageInstance.hover(`.horse-infos`)
    // await newPageInstance.click('text="Free Entry"')
    // await newPageInstance.waitForLoadState();
    
    // await newPageInstance.click(`//div[contains(@class,'pick-gate')]//div[@class='gate-group']/div[@class='gate-btn' and descendant::text()='4']`)
    // await newPageInstance.waitForLoadState();
    // await newPageInstance.hover(`.horse-infos`)
    // await newPageInstance.click('text="Free Entry"')
    // await newPageInstance.waitForLoadState();
    
    // await newPageInstance.click(`//div[contains(@class,'pick-gate')]//div[@class='gate-group']/div[@class='gate-btn' and descendant::text()='5']`)
    // await newPageInstance.waitForLoadState();
    // await newPageInstance.hover(`.horse-infos`)
    // await newPageInstance.click('text="Free Entry"')
    // await newPageInstance.waitForLoadState();
    
    // await newPageInstance.click(`//div[contains(@class,'pick-gate')]//div[@class='gate-group']/div[@class='gate-btn' and descendant::text()='6']`)
    // await newPageInstance.waitForLoadState();
    // await newPageInstance.hover(`.horse-infos`)
    // await newPageInstance.click('text="Free Entry"')
    // await newPageInstance.waitForLoadState();
    
    // await newPageInstance.click(`//div[contains(@class,'pick-gate')]//div[@class='gate-group']/div[@class='gate-btn' and descendant::text()='7']`)
    // await newPageInstance.waitForLoadState();
    // await newPageInstance.hover(`.horse-infos`)
    // await newPageInstance.click('text="Free Entry"')
    // await newPageInstance.waitForLoadState();
    
    // await newPageInstance.click(`//div[contains(@class,'pick-gate')]//div[@class='gate-group']/div[@class='gate-btn' and descendant::text()='8']`)
    // await newPageInstance.waitForLoadState();
    // await newPageInstance.hover(`.horse-infos`)
    // await newPageInstance.click('text="Free Entry"')
    // await newPageInstance.waitForLoadState();
    
    // await newPageInstance.click(`//div[contains(@class,'pick-gate')]//div[@class='gate-group']/div[@class='gate-btn' and descendant::text()='9']`)
    // await newPageInstance.waitForLoadState();
    // await newPageInstance.hover(`.horse-infos`)
    // await newPageInstance.click('text="Free Entry"')
    // await newPageInstance.waitForLoadState();
    
    // await newPageInstance.click(`//div[contains(@class,'pick-gate')]//div[@class='gate-group']/div[@class='gate-btn' and descendant::text()='10']`)
    // await newPageInstance.waitForLoadState();
    // await newPageInstance.hover(`.horse-infos`)
    // await newPageInstance.click('text="Free Entry"')
    // await newPageInstance.waitForLoadState();
    
    // await newPageInstance.click(`//div[contains(@class,'pick-gate')]//div[@class='gate-group']/div[@class='gate-btn' and descendant::text()='11']`)
    // await newPageInstance.waitForLoadState();
    // await newPageInstance.hover(`.horse-infos`)
    // await newPageInstance.click('text="Free Entry"')
    // await newPageInstance.waitForLoadState();
    
    // await newPageInstance.click(`//div[contains(@class,'pick-gate')]//div[@class='gate-group']/div[@class='gate-btn' and descendant::text()='12']`)
    // await newPageInstance.waitForLoadState();
    // await newPageInstance.hover(`.horse-infos`)
    // await newPageInstance.click('text="Free Entry"')
    // await newPageInstance.waitForLoadState();

    // await newPageInstance.click(`//div[@class='race-name primary-text bold']/span/text()`)
  })
});