import Authorization from '../../pages/Authorization.page';
import Metamask from '../../pages/Metamask.module';
import * as data from '../../fixtures/qa.json';
import { BrowserContext } from 'playwright';
import Racing from '../../pages/Racing.module';
import { expect } from '@playwright/test';

describe('Stable', () => {
  let auth: Authorization;
  let racing: Racing;
  let pages: any;
  let browserContext: BrowserContext;
  let metamask: Metamask;

  beforeAll(async () => {
    metamask = new Metamask();
    browserContext = await metamask.init();
    pages = await metamask.authenticate(browserContext);
    auth = new Authorization(pages);
    racing = new Racing(pages);
  });

  beforeEach(async () => {
    await pages[0].goto(data.baseUrl);
    await pages[0].waitForLoadState();
  });

  afterAll(async () => {
    await pages[0].close();
    await browserContext.close();
    await metamask.close(pages, browserContext);
  });

  it('ZED-73 - Racing Service is showing information for Next To Run', async () => {
    await pages[0].waitForSelector(".header-content .left-part div[data-tour='header-racing'] button");
    await pages[0].click(".header-content .left-part div[data-tour='header-racing'] button");
    await pages[0].click("text=Next to Run");
    expect(pages[0]).toHaveURL("\/upcoming");
  });

});
