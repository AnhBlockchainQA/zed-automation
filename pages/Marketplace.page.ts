import { Page } from 'playwright';

class Marketplace {
  public page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  objects = {
    btnStart: '#app .app-content .header-desktop .start-part button',
    btnMetamaskOption: '#login-modal .login-options .metamask-login',
    btnMarketPlace: `//div[text()='Marketplace']`,
    marketPlaceContent: '.marketplace-content .masonry-tiles',
    marketPlaceFilter: '.filters-btn .filters',
    horseDetailsCard: '.horse-details.horse-sale-card',
    firstHorseCard: `(//div[@role='gridcell']/following-sibling::div)[1]`,
    buyButton: '.details-block .buy-btn.primary-btn',
    priceBadge: '.details-block .price-badge',
    btnBuyConfirm: '.buy-confirm-modal .confirm-btn.primary-btn',
    btnConfirm: '.confirm-btn.primary-btn',
    paymentSuccessModal: '.buy-confirm-modal .payment-successful',
    goToTheStable:`//h4[text()='Go To Stable']`,
    btnDone: `//button[text()='Done']`,
    successImage:'.cc-successful-img .generic-card',
    horseName:'.details-block.horse-name',
    horseWETHPrice: '.grey-text.my-2',
    horsePriceInBuySuccessModal: '.buy-modal-content .horse-price',
    horseNameInBuySuccessModal:'.buy-modal-content .horse-name',
    sortByPriceDefault: `//div[text()='Lowest price']`,
    sortByPriceDropdownIndicator: `(//div[contains(@class,'z-select__indicator z-select__dropdown-indicator')])[2]`,
    sortByPriceHighestPrice: `//div[text()='Highest price']`,
    horseList: (id?: number) => id ? `[role='grid'] [role='gridcell']:nth-child(${id})`:`[role='grid'] [role='gridcell']`,
    btnClose: '.horse-inspector-modal img.close-icon',
    geoType: `(//div[@class='details-value'])[2]`,
    filtersPanel: {
      genderFilly: '//label[@for=\'id-Filly\']',
      genderFillyCheckBox: '#id-Filly',
      genderColt: '//label[@for=\'id-Colt\']',
      genderColtCheckBox: '#id-Colt',
      bloodlineNakamotoCheckBox: '#id-Nakamoto',
      bloodlineNakamotoLabel: '//label[@for=\'id-Nakamoto\']',
      bloodlineButerinCheckBox: '#id-Buterin',
      bloodlineButerinLabel:'//label[@for=\'id-Buterin\']',
      genoTypeMinValue:`(//label[text()='Pacer']/following::input)[1]`,
      genoTypeMaxValue:`(//label[text()='Pacer']/following::input)[2]`,
      minPriceInput: `(//input[@step='1'])[1]`,
      currency:`//div[text()='price (']`,
      filterClose: `(//img[@class='close-icon'])[2]`
    } ,
    horseCardsPanel: {
      horsesCards: '//div[@class="marketplace-content "]/div/div',
      horseGenGenderBloodlineValue : (id: number) => `//div[@role='gridcell'][${id}]/div/div[2]/p[1]`
    }
  };

  async getPageTitle() {
    return await this.page.title();
  }

  async getNumberFromText(value: string){
    const regex = /[\d|,|.|e|E|\+]+/g;
    let amount = value.match(regex);
    return amount;
  }

  async getPageUrl() {
    return this.page.url();
  }

  async verifyBloodLineFilter(bloodlineType: string){
    const horsesCount = await this.page.$$(this.objects.horseCardsPanel.horsesCards)
    for(let horseRow = 1; horseRow<= horsesCount.length; horseRow++){
    const horseGenGenderBloodlineValue = await this.page.innerText(this.objects.horseCardsPanel.horseGenGenderBloodlineValue(horseRow))
    const horseGenGenderBloodlineValueArray = horseGenGenderBloodlineValue.split(' · ')
    const horseBloodline = horseGenGenderBloodlineValueArray[2]
    expect(horseBloodline).toBe(bloodlineType)
   }
  }
  async verifyGenderFilter(genderType: string){
    const horsesCount = await this.page.$$(this.objects.horseCardsPanel.horsesCards)
    for(let horseRow = 1; horseRow<= horsesCount.length; horseRow++){
    const horseGenGenderBloodlineValue = await this.page.innerText(this.objects.horseCardsPanel.horseGenGenderBloodlineValue(horseRow))
    const horseGenGenderBloodlineValueArray = horseGenGenderBloodlineValue.split(' · ')
    const horseGender = horseGenGenderBloodlineValueArray[1]
    expect(horseGender).toBe(genderType) 
  }
}}

export default Marketplace;
