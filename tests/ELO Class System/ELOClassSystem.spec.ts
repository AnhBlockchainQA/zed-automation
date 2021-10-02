import Authorization from '../../pages/Authorization.page';
import * as data from '../../fixtures/qa.json';
import Metamask from '../../pages/Metamask.module';
import { BrowserContext } from 'playwright';

describe('ELO System', () => {
  let auth: Authorization;
  let pages: any;
  let browserContext: BrowserContext;
  let metamask: Metamask;

  beforeAll(async () => {
    metamask = new Metamask();
    browserContext = await metamask.init();
    pages = await metamask.authenticate(browserContext);
    auth = new Authorization(pages);
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

  it('ZED-XX - Not Implemented Yet', async () => {
    expect(await pages[0].isVisible(auth.objects.B_ETH_BALANCE)).toBe(true);
    expect(await pages[0].isVisible(auth.objects.B_WETH_BALANCE)).toBe(true);
    expect(await pages[0].isVisible(auth.objects.IMG_WALLET_ICON)).toBe(true);
  });

});
