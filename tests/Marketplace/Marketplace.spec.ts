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
    await pages[0].waitForSelector(marketplace.objects.firstHorseCard)
    await pages[0].waitForTimeout(3000);
    expect(await pages[0].isVisible(marketplace.objects.marketPlaceFilter)).toBe(true);
    expect(await pages[0].isVisible(marketplace.objects.marketPlaceContent)).toBe(true);
    expect(await pages[0].isVisible(marketplace.objects.horseDetailsCard)).toBe(true);
    await pages[0].click(marketplace.objects.firstHorseCard);
    await pages[0].waitForSelector(marketplace.objects.buyButton)
    expect(await pages[0].isVisible(marketplace.objects.buyButton)).toBe(true);
    expect(await pages[0].isVisible(marketplace.objects.priceBadge)).toBe(true);
    expect(await pages[0].innerText(marketplace.objects.buyButton)).toContain(data.buy_btn_text);
  });

  it('ZED-9 Marketplace allows the user to buy a Horse using ETH', async () => {
    await pages[0].waitForSelector(marketplace.objects.firstHorseCard)
    await pages[0].waitForTimeout(5000);
    await pages[0].click(marketplace.objects.firstHorseCard);
    await pages[0].waitForSelector(marketplace.objects.buyButton);
    let horseName = await pages[0].innerText(marketplace.objects.horseName);
    await pages[0].click(marketplace.objects.buyButton);
    await pages[0].waitForSelector(marketplace.objects.btnBuyConfirm);
    await pages[0].click(marketplace.objects.btnBuyConfirm);
    await pages[0].waitForTimeout(1000);
    await metamask.confirmBuyRaceHorse(browserContext);
    await pages[0].waitForTimeout(5000);
    expect(await pages[0].isVisible(marketplace.objects.successImage)).toBe(true);
    expect(await pages[0].isVisible(marketplace.objects.btnDone)).toBe(true);
    expect(await pages[0].innerText(marketplace.objects.paymentSuccessModal)).toContain(data.transaction_success_message);
    expect(await pages[0].innerText(marketplace.objects.horseNameInBuySuccessModal)).toContain(horseName);
    await pages[0].click(marketplace.objects.btnDone);
  });

  it('ZED-48 Marketplace allows the user to filter out the racehorse list by Gender', async () => {
    await pages[0].waitForSelector(marketplace.objects.firstHorseCard)
    await pages[0].waitForTimeout(5000);
    await pages[0].click(marketplace.objects.marketPlaceFilter);
    await pages[0].waitForTimeout(1000)
    await pages[0].click(marketplace.objects.filtersPanel.genderColt) 
    await pages[0].waitForSelector(marketplace.objects.horseCardsPanel.horsesCards)
    await pages[0].waitForTimeout(10000)
    const horsesCount = await pages[0].$$(marketplace.objects.horseCardsPanel.horsesCards)
    for(let horseRow = 1; horseRow<= parseInt(horsesCount.length); horseRow++){
    const horseGenGenderBloodlineValue = await pages[0].innerText(marketplace.objects.horseCardsPanel.horseGenGenderBloodlineValue(horseRow))
    const horseGenGenderBloodlineValueArray = horseGenGenderBloodlineValue.split(' · ')
    const horseGender = horseGenGenderBloodlineValueArray[1]
    expect(horseGender).toBe('Colt')
    }
  });
  
  it('ZED-43 Marketplace allows the user to sort the racehorses list by price', async () => {
    await pages[0].waitForSelector(marketplace.objects.firstHorseCard)
    await pages[0].waitForTimeout(5000);
    expect(await pages[0].isVisible(marketplace.objects.sortByPriceDefault)).toBe(true);
    await pages[0].click(marketplace.objects.horseList(1))
    await pages[0].waitForSelector(marketplace.objects.buyButton);
    let firstHorsePrice = await pages[0].innerText(marketplace.objects.priceBadge)
    const horsePriceFirstHorse = parseFloat(firstHorsePrice.substr(1));
    await pages[0].click(marketplace.objects.btnClose)
    await pages[0].waitForTimeout(5000);
    await pages[0].click(marketplace.objects.horseList(2))
    await pages[0].waitForSelector(marketplace.objects.buyButton);
    let secondHorsePrice = await pages[0].innerText(marketplace.objects.priceBadge)
    const horsePriceSecondHorse = parseFloat(secondHorsePrice.substr(1));
    expect(horsePriceFirstHorse).toBeLessThanOrEqual(horsePriceSecondHorse);
    await pages[0].click(marketplace.objects.btnClose)
    await pages[0].click(marketplace.objects.sortByPriceDropdownIndicator)
    await pages[0].click(marketplace.objects.sortByPriceHighestPrice)
    await pages[0].waitForTimeout(5000);
    await pages[0].click(marketplace.objects.horseList(1))
    await pages[0].waitForSelector(marketplace.objects.buyButton);
    let priceOne = await pages[0].innerText(marketplace.objects.priceBadge)
    const horsePrice1stHorse = parseFloat(priceOne.substr(1));
    await pages[0].click(marketplace.objects.btnClose)
    await pages[0].waitForTimeout(5000);
    await pages[0].click(marketplace.objects.horseList(2))
    await pages[0].waitForSelector(marketplace.objects.buyButton);
    let priceTwo = await pages[0].innerText(marketplace.objects.priceBadge)
    const horsePrice2ndHorse = parseFloat(priceTwo.substr(1));
    expect(horsePrice1stHorse).toBeGreaterThanOrEqual(horsePrice2ndHorse);
  });

});
