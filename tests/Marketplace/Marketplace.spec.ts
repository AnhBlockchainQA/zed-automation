import Authorization from '../../pages/Authorization.page';
import * as data from '../../fixtures/qa.json';
import Metamask from '../../pages/Metamask.module';
import Marketplace from '../../pages/Marketplace.page';
import { BrowserContext } from 'playwright';

describe('Marketplace', () => {
  let auth: Authorization;
  let pages: any;
  let browserContext: BrowserContext;
  let metamask: Metamask;
  let marketplace: Marketplace;

  beforeAll(async () => {
    metamask = new Metamask();
    browserContext = await metamask.init();
    pages = await metamask.authenticate(browserContext);
    auth = new Authorization(pages);
    marketplace = new Marketplace(pages);
  });

  beforeEach(async () => {
    await pages[0].goto(data.baseUrl);
    await pages[0].waitForLoadState();
    await pages[0].waitForTimeout(3000);
    await pages[0].click(marketplace.objects.btnMarketPlace);
  });

  afterAll(async () => {
    await pages[0].close();
    await browserContext.close();
    await metamask.close(pages, browserContext);
  });

  it('ZED-8 - Marketplace is showing the Horse List at Sale', async () => {
    await pages[0].waitForSelector(marketplace.objects.firsthorseCard)
    await pages[0].waitForTimeout(3000);
    expect(await pages[0].isVisible(marketplace.objects.marketPlaceFilter)).toBe(true);
    expect(await pages[0].isVisible(marketplace.objects.marketPlaceContent)).toBe(true);
    expect(await pages[0].isVisible(marketplace.objects.horseDetailsCard)).toBe(true);
    await pages[0].click(marketplace.objects.firsthorseCard);
    await pages[0].waitForSelector(marketplace.objects.buyButton)
    expect(await pages[0].isVisible(marketplace.objects.buyButton)).toBe(true);
    expect(await pages[0].isVisible(marketplace.objects.priceBadge)).toBe(true);
    expect(await pages[0].innerText(marketplace.objects.buyButton)).toContain(data.buy_btn_text);
  });

});
