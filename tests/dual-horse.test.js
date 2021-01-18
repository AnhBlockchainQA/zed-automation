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
  CONFIRM_PASSWORD,
} = require('../data/env');
const zedRunConfig = require('../locators/ZedRun');
const { HomePage } = require('../pages/HomePage');
const { RacingPage } = require('../pages/RacingPage');

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
let racingPage;
let index;
let registeredHorseNo;
let totalNo;
let eventName;

beforeAll(async () => {
  metamaskFactory = new MetamaskFactory();
  await metamaskFactory.removeCache();
  metamaskInstance = await metamaskFactory.init();
});

describe("Pick horses to gate and process Next to Run event", () => {

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
  });

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

  test("Check that avatar is shown then click on Marketplace to select first horse", async () => {
    homePage = new HomePage(newPageInstance);
    await homePage.checkIfAvatarPresent();
    await homePage.waitForBalanceInfoToBeShown();
    await homePage.clickOnAcceptButton();
    await homePage.clickOnRacingLink();
  });

  test("Select event and check if size is correct", async () => {
    racingPage = new RacingPage(newPageInstance);
    index = await racingPage.getRandomIndexOfRacingEvent();
    await racingPage.scrollToEventByIndexIfNeeded(index);
    registeredHorseNo = await racingPage.getNumberOfRegisteredHorse(index);
    totalNo = await racingPage.getTotalNumberOfHorses(index);
    eventName = await racingPage.getRacingEventNameByIndex(index);
    console.log(">>>>> Event name " + eventName + " : Registered [" + registeredHorseNo + "], Total [" + totalNo + "]")
    await racingPage.clickOnRacingEventWithIndex(index);
    await racingPage.scrollToOpenGatesBox();
    let size = await racingPage.getSizeOfOpenGatesList(index);
    await racingPage.validateOpenGatesListSizeCorrect(totalNo - registeredHorseNo, size);
  });

  test("Select horses from user stable to the open gate", async() => {
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
    for (let i = 0; i< listNumber.length; i++) {
      await newPageInstance.click(`//div[contains(@class,'pick-gate')]//div[@class='gate-group']/div[@class='gate-btn' and descendant::text()=${listNumber[i]}]`)
      await newPageInstance.waitForLoadState();
      await newPageInstance.hover(`.horse-infos`)
      await newPageInstance.click('text="Free Entry"')
      await newPageInstance.waitForLoadState();
    }    
    await newPageInstance.waitForLoadState();
    // await newPageInstance.click(`//div[@class='race-list']/div[@class='next-run-list']/a[@class='race-tile ']/div/div/text()`)
    await newPageInstance.waitForSelector(`//div[@class='race-list']/div[@class='next-run-list']/a[@class='race-tile ']`)
    const eventDual = await newPageInstance.$(`//div[@class='race-list']/div[@class='next-run-list']/a[@class='race-tile ']`)
    console.log('eventDual', await eventDual.innerText())
    let listText = await eventDual.innerText()
    listText = listText.split('\n')
    await newPageInstance.click(`//div[@class='race-list']/div[@class='next-run-list']/a[@class='race-tile ']`)
    // console.log('innerText:',await eventDual.innerText())
    // const eventText = await eventDual.innerText()
    await newPageInstance.waitForSelector(`//div[@class='in-race-info']/div/div/h1`)
    const newDiv = await newPageInstance.$(`//div[@class='in-race-info']/div/div/h1`)
    console.log('new text:', await newDiv.innerText())
    const listNewText = await newDiv.innerText()
    console.log('listText[0]:', listText[0])
    console.log('compare', listNewText.indexOf(listText[0]))
    const check = listNewText.indexOf(listText[0])
    if (check !== 0) {
      throw new Error('check not is true')
    }
  });
});


afterAll(async () => {
  await metamaskFactory.close();
});