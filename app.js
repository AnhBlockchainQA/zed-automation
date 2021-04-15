const { chromium } = require("playwright");
const superagent = require("superagent");
require("superagent-retry-delay")(superagent);
const request = require("supertest");
var messsageId;
var magicLink;

(async () => {
  const browser = await chromium.launch({ headless: false, timeout: 300000 });
  const context = await browser.newContext({ viewport: null });
  const page = await context.newPage();
  await page.goto("https://goerli-test.zed.run/");
  const startButton = await page.waitForSelector(
    ".header-desktop .header-content .right-part button"
  );
  await startButton.click();
  const email = await page.waitForSelector("input[placeholder='Email']");
  await email.type("zedrun@1secmail.net", { slowMo: 100 });
  const continueButton = await page.waitForSelector(
    "button[class*='continue-btn']"
  );
  await continueButton.click();

  //call API to get magicLink
  let checkInbox = await request("https://www.1secmail.com/api/v1/")
    .get("/")
    .query({
      action: "getMessages",
      login: "zedrun",
      domain: "1secmail.net",
    })
    .retry(5, 3000, [400, 404, 501]);

  if (checkInbox.body !== []) {
    console.log(" >>> Body : ", checkInbox.body[0]);
    console.log(" >>> Id : ", checkInbox.body[0].id);
    messsageId = Number(checkInbox.body[0].id);
  } else {
    throw new Error("Something went wrong!");
  }

  let zedMessage = await request("https://www.1secmail.com/api/v1/")
    .get("/")
    .query({
      action: "readMessage",
      login: "zedrun",
      domain: "1secmail.net",
      id: messsageId,
    });
  let emailBody = zedMessage.body.body;
  magicLink = emailBody.match(/<a style=".*" target="_blank" href="(.*?)">/)[1];

  const newPage = await context.newPage();
  newPage.bringToFront()
  newPage.goto(magicLink);
  await newPage.waitForLoadState('networkidle', {timeout: 10000});

  await page.bringToFront();
  await page.waitForLoadState();
  const walletButton = await page.waitForSelector('.header-desktop .header-content .right-part .balance-part img.icon');
  await walletButton.click();
})();
