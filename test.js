const { firefox } = require('playwright');

(async () => {
  const browser = await firefox.launch({ headless: false, slowMo: 50 });
  const context = await browser.newContext();
    // Create a page.
  const page = await context.newPage();

  // Navigate explicitly, similar to entering a URL in the browser.
  await page.goto('http://example.com');

  console.log('content:', await page.content())
  const check = await page.$('text="Example Domain"');
  console.log('check:', check)
  // Fill an input.
  await page.fill('#search', 'query');

  // Navigate implicitly by clicking a link.
  await page.click('#submit');
  // Expect a new url.
  console.log(page.url());

  // Page can navigate from the script - this will be picked up by Playwright.
  window.location.href = 'https://example.com';


  // const page = await browser.newPage();
  // await page.goto('https://zed-front-pr-333.herokuapp.com/stable/stable-48795285');
  // await page.screenshot({ path: `example.png` });
  await browser.close();
})();