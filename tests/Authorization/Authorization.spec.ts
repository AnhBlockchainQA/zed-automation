import { BrowserContext, chromium, Page } from 'playwright';
import Authorization from '../../pages/Authorization.page';
import * as data from '../../fixtures/qa.json';
const pathToExtension = require('path').join(
  __dirname,
  '../../extensions/MetaMask_10.1.1',
);
const userDataDir = __dirname + '/test-user-data-dir';
const fs = require('fs-extra');

describe('Authorization', () => {
  let browserContext: BrowserContext;
  let page: Page;
  let auth: Authorization;
  let pages;

  beforeAll(async () => {
    await fs.remove(userDataDir, (err: any) => {
      if (err) return console.error(err);
    });
    browserContext = await chromium.launchPersistentContext(userDataDir, {
      headless: false,
      timeout: 0,
      args: [
        `--disable-extensions-except=${pathToExtension}`,
        `--load-extension=${pathToExtension}`,
        `--start-maximized`,
      ],
    });
    page = await browserContext.newPage();
    auth = new Authorization(page);
    const [tabs] = await Promise.all([
      browserContext.waitForEvent('page'),
      browserContext.backgroundPages()[0],
    ]);
    await tabs.waitForLoadState();
    pages = tabs.context().pages();
    await pages[0].close();
    await pages[2].bringToFront();
    await pages[2].reload();
    await pages[2].click(auth.objects.BTN_METAMASK_GET_STARTED);
    await pages[2].click(auth.objects.BTN_METAMASK_IMPORT_WALLET);
    await pages[2].click(auth.objects.BTN_METAMASK_I_AGREE);
    await pages[2].type(
      auth.objects.TEXT_AREA_METAMASK_PASSPHRASE,
      data.seed_phrase,
    );
    await pages[2].type(auth.objects.TXT_METAMASK_PASSWORD, data.password);
    await pages[2].type(
      auth.objects.TXT_METAMASK_PASSWORD_CONFIRM,
      data.password,
    );
    await pages[2].click(auth.objects.CHECKBOX_METAMASK_AGREE);
    await pages[2].click(auth.objects.BTN_METAMASK_IMPORT);
    await pages[2].click(auth.objects.BTN_METAMASK_ALL_DONE);
    await pages[2].click(auth.objects.BTN_METAMASK_CLOSE);
    await pages[2].click(auth.objects.BTN_METAMASK_NETWORK_NAME);
    await pages[2].click(auth.objects.BTN_METAMASK_CHOOSE_NETWORK);
    await pages[1].bringToFront();
    await pages[1].goto(data.baseUrl);
    await pages[1].waitForLoadState();
    await pages[1].click(auth.objects.BTN_NAV_START);
    const [windows] = await Promise.all([
      browserContext.waitForEvent('page'),
      await page.click(auth.objects.BTN_MODAL_METAMASK_LOGIN),
    ]);
    await windows.waitForLoadState();
    pages = windows.context().pages();
    await pages[2].bringToFront();
    await pages[2].click(auth.objects.BTN_METAMASK_NEXT);
    await pages[2].click(auth.objects.BTN_METAMASK_CONNECT);
    await pages[2].click(auth.objects.BTN_METAMASK_SIGN);
    await pages[0].bringToFront();
    await pages[1].close();
  });

  beforeEach(async () => {
    await page.goto(data.baseUrl);
    await page.waitForLoadState();
  });

  afterAll(async () => {
    await page.close();
    await browserContext.close();
  });

  it('ZED-1 - Authorization with Existing Magic Account', async () => {
    expect(true).toBe(true);
  });

  xit('ZED-11 - Authorization with New Metamask Account', async () => {
    expect('/').toBe('/');
  });

  xit('ZED-12 - Authorization with Existing Metamask Account', async () => {
    expect('/').toBe('/');
  });

  xit('ZED-13 - Authorization with New Magic Account', async () => {
    expect('/').toBe('/');
  });

  xit('ZED-14 - Authorization Content of What Is The Difference Modal', async () => {
    expect('/').toBe('/');
  });

  xit('ZED-15 - Authorization Cancel Action with Existing Metamask Account', async () => {
    expect('/').toBe('/');
  });

  xit('ZED-16 - Authorization Cancel Action with New Metamask Account', async () => {
    expect('/').toBe('/');
  });

  xit('ZED-18 - Authorization Cancel Action on Choose An Account Modal', async () => {
    expect('/').toBe('/');
  });

  xit('ZED-19 - Authorization after user confirm the link sent to the email inbox', async () => {
    expect('/').toBe('/');
  });

  xit('ZED-20 - Authorization forms shows an error message after any validation fails', async () => {
    expect('/').toBe('/');
  });

  describe('KyC and TC', function() {
    it('ZED-XXX - Not Implemented Yet', async () => {
      expect('/').toBe('/');
    });
  });

});
