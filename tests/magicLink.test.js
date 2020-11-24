const { PageFactory } = require("../utils/browser/pageFactory");
const { LoginPage } = require("../pages/LoginPage");
const { MagicLinkPage } = require("../pages/MagicLinkPage");
const apiRequest = require("../utils/api/api");

let pageFactory;
let login;
let domain;
let messageId;
let magicLink;
let email;
let loginPage;
let magicLinkPage;
const pattern = /<a style="color: #27B18A; text-decoration: none;" target="_blank" href="(.*)">/;

beforeAll(async () => {
  pageFactory = new PageFactory();
});

describe("E2E test as an end-user, perform the test on below", () => {

  test("Open ZedRun page and input valid email to generate magic link", async () => {
    email = await apiRequest.generateRandomEmail();
    login = email.split("@")[0];
    domain = email.split("@")[1];

    let page = await pageFactory.newTab(false, 0);
    loginPage = new LoginPage(page);
    await loginPage.navigate();
    await loginPage.clickOnStartButton();
    await loginPage.typeEmail(email);
    await loginPage.clickOnContinueButton();
    await loginPage.waitForTimeout();
  });

  test("Check mail inbox to get magic link", async () => {
    messageId = await apiRequest.getZedRunMessageId(login, domain);
    magicLink = await apiRequest.getMagicLink(
      login,
      domain,
      messageId,
      pattern
    );
  });

  test("Open new browser with magic link", async () => {
    let newPage = await pageFactory.newTab(false, 0);
    magicLinkPage = new MagicLinkPage(newPage);
    await magicLinkPage.bringToFront();
    await magicLinkPage.navigate(magicLink);
    await magicLinkPage.waitForTimeout();
    await magicLinkPage.clickToTrustMe();
    await magicLinkPage.waitForLoggedInMessage();
    await magicLinkPage.waitForTimeout();
  });

  test("Switch back to ZedRun page and verify login successful", async () => {
    await loginPage.bringToFront();
    await loginPage.waitForTimeout();
    await loginPage.checkIfWelcomeLabelPresent();
  });

});

afterAll(async () => {
  pageFactory.endTest();
});
