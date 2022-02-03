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
    auth = new Authorization(pages[0]);
    marketplace = new Marketplace(pages[0]);
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
    await marketplace.verifyGenderFilter('Colt')
    expect(await pages[0].isChecked(marketplace.objects.filtersPanel.genderColtCheckBox)).toBe(true)
    await pages[0].click(marketplace.objects.filtersPanel.genderColt) 

    await pages[0].click(marketplace.objects.filtersPanel.genderFilly) 
    await pages[0].waitForSelector(marketplace.objects.horseCardsPanel.horsesCards)
    await pages[0].waitForTimeout(10000)
    await marketplace.verifyGenderFilter('Filly')
    expect(await pages[0].isChecked(marketplace.objects.filtersPanel.genderFillyCheckBox)).toBe(true)   
  });

  it('ZED-47 Marketplace allows the user to filter out the racehorse list by BloodLine', async () => {
    await pages[0].waitForSelector(marketplace.objects.firstHorseCard)
    await pages[0].click(marketplace.objects.marketPlaceFilter);
    await pages[0].waitForTimeout(1000)
    await pages[0].click(marketplace.objects.filtersPanel.bloodlineNakamotoLabel) 
    await pages[0].waitForSelector(marketplace.objects.horseCardsPanel.horsesCards)
    await pages[0].waitForTimeout(10000)
    await marketplace.verifyBloodLineFilter('Nakamoto')
    expect(await pages[0].isChecked(marketplace.objects.filtersPanel.bloodlineNakamotoCheckBox)).toBe(true)
    await pages[0].click(marketplace.objects.filtersPanel.bloodlineNakamotoLabel) 
    await pages[0].click(marketplace.objects.filtersPanel.bloodlineButerinLabel)
    await pages[0].waitForSelector(marketplace.objects.horseCardsPanel.horsesCards)
    await pages[0].waitForTimeout(10000)
    await marketplace.verifyBloodLineFilter('Buterin')
    expect(await pages[0].isChecked(marketplace.objects.filtersPanel.bloodlineButerinCheckBox)).toBe(true) 
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

  it('ZED-44 Marketplace allows the user to filter out the racehorses list by Genotype', async () => {
    await pages[0].click(marketplace.objects.marketPlaceFilter);
    await pages[0].waitForTimeout(1000)
    await pages[0].waitForSelector(marketplace.objects.filtersPanel.genoTypeMinValue)
    let genoTypeMin = await pages[0].innerText(marketplace.objects.filtersPanel.genoTypeMinValue)
    let genoTypeMax = await pages[0].innerText(marketplace.objects.filtersPanel.genoTypeMaxValue)
    await pages[0].waitForTimeout(3000)
    await pages[0].click(marketplace.objects.horseList(1))
    await pages[0].waitForSelector(marketplace.objects.buyButton);
    let firstHorseGenoType = await pages[0].innerText(marketplace.objects.geoType)
    const GenoType = parseInt(firstHorseGenoType);
     expect(GenoType).toBeGreaterThanOrEqual(genoTypeMin);
     expect(GenoType).toBeLessThan(genoTypeMax);
  });

  it('ZED-46 Marketplace allows the user to filter out the racehorse list by Price', async () => {
    await pages[0].click(marketplace.objects.marketPlaceFilter);
    await pages[0].waitForTimeout(1000)
    await pages[0].waitForSelector(marketplace.objects.filtersPanel.minPriceInput)
    expect(await pages[0].innerText(marketplace.objects.filtersPanel.currency)).toContain(data.currency_usd);
    await pages[0].waitForTimeout(1000) 
    await pages[0].fill(marketplace.objects.filtersPanel.minPriceInput,'10')
    await pages[0].waitForTimeout(3000)
    await pages[0].click(marketplace.objects.horseList(1))
    await pages[0].waitForSelector(marketplace.objects.buyButton);
    let firstHorsePrice = await pages[0].innerText(marketplace.objects.priceBadge)
    const priceHorse = parseFloat(firstHorsePrice.substr(1));
    expect(priceHorse).toBeGreaterThanOrEqual(10);
  });


  it('ZED-49 Marketplace allows the user to filter out the racehorse list by Color', async () => {
    await pages[0].waitForTimeout(3000)
    await pages[0].click(marketplace.objects.horseList(1))
    await pages[0].waitForSelector(marketplace.objects.buyButton);
    await pages[0].click(marketplace.objects.buyButton);
    const horseColorCoat = await pages[0].innerText(marketplace.objects.horseColor)
    const horseColor = (horseColorCoat.substr(2))
    console.log(horseColor)
    await pages[0].click(marketplace.objects.buyModalClose);
    await pages[0].click(marketplace.objects.btnClose)
    await pages[0].click(marketplace.objects.marketPlaceFilter);
    await pages[0].waitForSelector(marketplace.objects.filtersPanel.minPriceInput)
    await pages[0].click(marketplace.objects.filtersPanel.bloodlineCollapse);
    await pages[0].click(marketplace.objects.filtersPanel.genderCollapse);
    await pages[0].waitForTimeout(2000)
    await pages[0].click(marketplace.objects.filtersPanel.colorSearch);
    await pages[0].waitForTimeout(1000)
    await pages[0].type(marketplace.objects.filtersPanel.colorSearch,horseColor)
    await pages[0].waitForSelector(marketplace.objects.filtersPanel.firstCoat)
    await pages[0].click(marketplace.objects.filtersPanel.firstCoat)
    await pages[0].waitForTimeout(1000)
    await pages[0].click(marketplace.objects.filtersPanel.filterClose)
    await pages[0].waitForTimeout(3000)
    await pages[0].click(marketplace.objects.horseList(1))
    await pages[0].waitForSelector(marketplace.objects.buyButton);
    await pages[0].click(marketplace.objects.buyButton);
    const color= await pages[0].innerText(marketplace.objects.horseColor)
    const coatColor = (color.substr(2))
    expect(coatColor).toBe(horseColor)
  });

  it('ZED-55 Marketplace allows the user to filter out the racehorse list by Gender/Bloodline (mixed filtering)', async () => {
    await pages[0].waitForSelector(marketplace.objects.firstHorseCard)
    await pages[0].waitForTimeout(3000)
    await pages[0].click(marketplace.objects.marketPlaceFilter);
    await pages[0].waitForTimeout(1000)
    await pages[0].waitForSelector(marketplace.objects.filtersPanel.minPriceInput)
    await pages[0].click(marketplace.objects.filtersPanel.bloodlineNakamotoLabel) 
    await pages[0].waitForTimeout(1000)
    await pages[0].click(marketplace.objects.filtersPanel.genderFilly) 
    await pages[0].waitForTimeout(1000)
    await pages[0].click(marketplace.objects.filtersPanel.filterClose)
    await pages[0].waitForTimeout(3000)
    await pages[0].click(marketplace.objects.horseList(1))
    await pages[0].waitForSelector(marketplace.objects.buyButton);
    await pages[0].waitForTimeout(3000)
    let bloodline =  await pages[0].innerText(marketplace.objects.bloodline)
    expect(bloodline).toBe(data.bloodline)
    let gender =  await pages[0].innerText(marketplace.objects.genderFilly)
    expect(gender).toBe(data.gender)
  });

  it('ZED-45 Marketplace allows the user to clear out the filter options on the racehorse list', async () => {
    await pages[0].waitForSelector(marketplace.objects.firstHorseCard)
    await pages[0].click(marketplace.objects.marketPlaceFilter);
    await pages[0].waitForTimeout(3000)
    await pages[0].waitForSelector(marketplace.objects.filtersPanel.minPriceInput)
    await pages[0].click(marketplace.objects.filtersPanel.genderMare) 
    await pages[0].waitForTimeout(1000)
    await pages[0].click(marketplace.objects.filtersPanel.bloodlineNakamotoLabel)
    await pages[0].waitForTimeout(1000) 
    await pages[0].click(marketplace.objects.filtersPanel.colorSearch);
    await pages[0].waitForTimeout(1000)
    await pages[0].type(marketplace.objects.filtersPanel.colorSearch,data.horseColor)
    await pages[0].waitForSelector(marketplace.objects.filtersPanel.firstCoat)
    await pages[0].click(marketplace.objects.filtersPanel.firstCoat)
    await pages[0].click(marketplace.objects.filtersPanel.filterClose)
    await pages[0].waitForTimeout(1000)
    expect(await pages[0].innerText(marketplace.objects.noHorseFound)).toBe(data.nohorseFound)
    await pages[0].click(marketplace.objects.clearFilters)
    await pages[0].waitForTimeout(3000)
    await pages[0].click(marketplace.objects.horseList(1))
    await pages[0].waitForTimeout(2000)
    await pages[0].waitForSelector(marketplace.objects.buyButton);
    await pages[0].click(marketplace.objects.buyButton);
    const color= await pages[0].innerText(marketplace.objects.horseColor)
    const coatColor = (color.substr(2))
    expect(coatColor).not.toEqual(data.horseColor)
  });
    
});
