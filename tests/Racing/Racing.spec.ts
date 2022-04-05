import Authorization from '../../pages/Authorization.page';
import * as data from '../../fixtures/qa.json';
import Metamask from '../../pages/Metamask.module';
import { BrowserContext } from 'playwright';
import Racing from '../../pages/Racing.module';


describe('Racing', () => {
  let auth: Authorization;
  let pages: any;
  let browserContext: BrowserContext;
  let metamask: Metamask;
  let racing : Racing;

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

  xit('ZED-XX - Not Implemented Yet', async () => {
    expect(await pages[0].isVisible(auth.objects.ethBalance)).toBe(true);
  });

  it('ZED-79 Racing Service allows the user to see finished race details', async () => {
    await pages[0].click(racing.objects.menuRacing)
    await pages[0].click(racing.objects.subMenuResults)
    await pages[0].waitForTimeout(3000)
    expect(await pages[0].url()).toContain('results')
    const raceRow = await pages[0].$$(racing.objects.resultRaceTab.raceRowCount)
    const raceCol = await pages[0].$$(racing.objects.resultRaceTab.raceColCount)
    const eventName = await pages[0].innerText(racing.objects.resultRaceTab.eventName(1))
    const eventType = await pages[0].innerText(racing.objects.resultRaceTab.eventType(1))
    const distance = await pages[0].innerText(racing.objects.resultRaceTab.distance(1))
    const date = await pages[0].innerText(racing.objects.resultRaceTab.date(1))
    const pricePool = await pages[0].innerText(racing.objects.resultRaceTab.pricePool(1))
    expect(await eventName).not.toBe('')
    expect(['V', 'D', 'DG' ,'IV', 'III', 'II','I','VI'].findIndex(v => v === eventType)).not.toBe(-1)
    expect(await distance).toContain('m')
    expect(await date).not.toBe('')
    expect(await raceRow.length).toBeGreaterThanOrEqual(1)
    expect(await raceCol.length).toBe(5)
  
  });

  it('ZED-80 Racing Service allows the user to filter `My racehorse only` while authenticated.', async () => {
    await pages[0].click(racing.objects.menuRacing)
    await pages[0].click(racing.objects.subMenuResults)
    await pages[0].waitForTimeout(3000)
    expect(await pages[0].url()).toContain('results')
    await pages[0].click(racing.objects.resultRaceTab.myRacehorseOnlyCheckbox,{ force: true })
    await pages[0].waitForTimeout(3000)
    const raceRow = await pages[0].$$(racing.objects.resultRaceTab.raceRowCount)
    const raceCol = await pages[0].$$(racing.objects.resultRaceTab.raceColCount)
    for (let racesRow =1; racesRow<= raceRow.length; racesRow++){
    const registeredIcon = await pages[0].locator(racing.objects.resultRaceTab.registeredIcon(racesRow)).getAttribute('class');
    expect(await registeredIcon).toBe('registered-icon d-none d-md-inline-block')
    }
    expect(await raceRow.length).toBeGreaterThanOrEqual(1)
    expect(await raceCol.length).toBe(5) 
  });

});
