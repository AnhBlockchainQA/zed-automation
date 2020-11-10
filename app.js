const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: false, slowMo: 50 });
  const context = await browser.newContext();
    // Create a page.
  const page = await context.newPage();

  // Navigate explicitly, similar to entering a URL in the browser.
  await page.goto('https://zed-front-pr-333.herokuapp.com/stable/stable-48795285');

  // Navigate implicitly by clicking a link.
  await page.click('div.start-part');
  await page.click('.overline-text.bold');
  // Expect a new url.
  console.log(page.url());



  // const page = await browser.newPage();
  // await page.goto('https://zed-front-pr-333.herokuapp.com/stable/stable-48795285');
  // await page.screenshot({ path: `example.png` });
  // await browser.close();
})();