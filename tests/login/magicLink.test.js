const { PageFactory } = require("../../utils/browser/pageFactory");
const { LoginPage } = require("../../pages/LoginPage");
const { MagicLinkPage } = require("../../pages/MagicLinkPage");
const apiRequest = require("../../utils/api/api");
const test = require("jest-retries");

var pageFactory = new PageFactory();
var login;
var domain;
var messageId;
var magicLink;
var email;
var loginPage;
var magicLinkPage;
var newPageInstance;
var page;
const pattern = /<a style="color: #27B18A; text-decoration: none;" target="_blank" href="(.*)">/;

beforeAll(async () => {
  pageFactory.removeCache();
});

describe("Login to ZedRun with magic link", () => {
  test(
    "Open ZedRun page and input valid email to generate magic link",
    3,
    async () => {
      email = await apiRequest.generateRandomEmail();
      login = email.split("@")[0];
      domain = email.split("@")[1];

      page = await pageFactory.newTab(false, 0);
      loginPage = new LoginPage(page);
      await loginPage.navigate();
      await loginPage.clickOnStartButton();
      await loginPage.typeEmail(email);
      await loginPage.clickOnContinueButton();
      await loginPage.waitForTimeout();
    }
  );

  test("Check mail inbox to get magic link", 3, async () => {
    messageId = await apiRequest.getZedRunMessageId(login, domain);
    magicLink = await apiRequest.getMagicLink(
      login,
      domain,
      messageId,
      pattern
    );
    console.log(">>> URL ", magicLink);
  });

  test("Open new browser with magic link", 3, async () => {
    newPageInstance = await pageFactory.newTab(false, 0);
    magicLinkPage = new MagicLinkPage(newPageInstance);
    await magicLinkPage.bringToFront();
    await magicLinkPage.navigate(magicLink);
    await magicLinkPage.waitForLoginFormHidden();
    await magicLinkPage.waitForTimeout();
  });

  test(
    "Switch back to ZedRun page and verify login successful",
    3,
    async () => {
      await loginPage.bringToFront();
      await loginPage.checkIfWelcomeLabelPresent();
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
