const { chromium } = require("playwright");
const superagent = require("superagent");
require("superagent-retry-delay")(superagent);
const request = require("supertest");

(async () => {
  let email;
  var messageId;
  let domain;
  let magicLink;
  const pattern = /<a style="color: #27B18A; text-decoration: none; line-height: inherit;" target="_blank" href="(.*)">/;
  const server = "https://www.1secmail.com/api/v1";

  const browser = await chromium.launch({
    headless: false,
    slowMo: 20,
    timeout: 60000,
  });
  const context = await browser.newContext();
  const zedPage = await context.newPage();
  const page = await context.newPage();

  //Random the email
  const randomEmail = await request(server).get("/").query({
    action: "genRandomMailbox",
    count: 10,
  });

  let testEmail = randomEmail.body[
    Math.floor(Math.random() * randomEmail.body.length)
  ].toString();
  username = testEmail.split("@")[0];
  domain = testEmail.split("@")[1];

  await zedPage.bringToFront();
  await zedPage.goto("https://zed-front-pr-333.herokuapp.com/", { timeout: 0 });
  await zedPage.click("div.start-part");
  await zedPage.fill(
    'div.m-input-content > input[placeholder="Email"]',
    testEmail
  );
  await zedPage.click('button[type="Submit"]');
  await zedPage.waitForTimeout(7000);

  const checkInbox = await request(server)
    .get("/")
    .query({
      action: "getMessages",
      login: username,
      domain: domain,
    })
    .retry(5, 3000, [404, 500]);

  console.log(checkInbox.body);
  if (checkInbox.body !== []) {
    messageId = Number(checkInbox.body[0].id);
    console.log(messageId);
  }

  const getMagicLink = await request(server)
    .get("/")
    .query({
      action: "readMessage",
      login: username,
      domain: domain,
      id: messageId,
    })
    .retry(5, 3000, [400, 404, 500]);

  let emailBody = getMagicLink.body.body;
  magicLink = emailBody.match(pattern)[1];
  console.log("\n", magicLink);

  await page.bringToFront();
  await page.goto(magicLink);
  await page.waitForTimeout(10000);
  // await page.click('//div[contains(@class,"auth-anomaly-detected__actionRack")]/span[@role="button" and descendant::text()="Yes, this is me"]');
  await page.waitForSelector('//h1/p[contains(text(),"logged into ZED Run!")]', {
    timeout: 5000,
  });
  
  await zedPage.bringToFront();
  await page.waitForTimeout(10000);
  try {
    await zedPage.waitForSelector(
      '//h1[text()="Welcome To Zed!"]',
      { timeout: 5000 }
    );
  } catch (error) {
    console.log("User did not login yet!");
  }
})();
