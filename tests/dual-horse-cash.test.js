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

describe("Dual horse cash", () => {

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

  test("dual horse", async () => {
    await loginPage.click('text="racing"')
    await loginPage.click('.free-race-badge')

    const group = await loginPage.$(`//div[@class='other-content']/div[@class='gate-group']`)
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
      await loginPage.click(`//div[contains(@class,'pick-gate')]//div[@class='gate-group']/div[@class='gate-btn' and descendant::text()=${listNumber[i]}]`)
      await loginPage.waitForLoadState();
      await loginPage.hover(`.horse-infos`)
      await loginPage.click('text="Free Entry"')
      await loginPage.waitForLoadState();
    }    
    await loginPage.waitForLoadState();
    // await loginPage.click(`//div[@class='race-list']/div[@class='next-run-list']/a[@class='race-tile ']/div/div/text()`)
    await loginPage.waitForSelector(`//div[@class='race-list']/div[@class='next-run-list']/a[@class='race-tile ']`)
    const eventDual = await loginPage.$(`//div[@class='race-list']/div[@class='next-run-list']/a[@class='race-tile ']`)
    console.log('eventDual', await eventDual.innerText())
    let listText = await eventDual.innerText()
    listText = listText.split('\n')
    await loginPage.click(`//div[@class='race-list']/div[@class='next-run-list']/a[@class='race-tile ']`)
    // console.log('innerText:',await eventDual.innerText())
    // const eventText = await eventDual.innerText()
    await loginPage.waitForSelector(`//div[@class='in-race-info']/div/div/h1`)
    const newDiv = await loginPage.$(`//div[@class='in-race-info']/div/div/h1`)
    console.log('new text:', await newDiv.innerText())
    const listNewText = await newDiv.innerText()
    console.log('listText[0]:', listText[0])
    console.log('compare', listNewText.indexOf(listText[0]))
    const check = listNewText.indexOf(listText[0])
    if (check !== 0) {
      throw new Error('check not is true')
    }
  })
});


afterAll(async (done) => {
 await pageFactory.endTest();
 done()
});


