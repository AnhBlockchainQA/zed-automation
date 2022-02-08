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
    horseList: (id?: number) => id ? `.masonry-tiles[role='grid'] [role='gridcell']:nth-child(${id})`:`[role='grid'] [role='gridcell']`,
    btnClose: '.horse-inspector-modal img.close-icon',
    geoType: `(//div[@class='details-value'])[2]`,
    horseColor: `//p[@class='horse-desc text-capitalize']//span[1]`,
    buyModalClose: '.buy-modal-content .close-icon',
    bloodline: `(//div[@class='details-block']//div)[2]`,
    genderFilly: `(//div[text()='Filly'])[1]`,
    noHorseFound: `//h3[text()='No racehorses found']`,
    clearFilters:`//button[text()='Clear Filters']`,
    filtersPanel: {
      genderFilly: '//label[@for=\'id-Filly\']',
      genderMare: '//label[@for=\'id-Mare\']',
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
      filterClose: '.f-header .close-icon',
      colorSearch: `(//div[text()='Search'])[2]`,
      firstCoat: `(//label[@class='primary-text secondary ']//span)[1]`,
      colorSelect : (color: 'color') => `//span[text()=${color}]`,
      colorExpand: `(//div[@class='f-title']//img)[3]`,
      bloodlineCollapse:`(//div[@class='f-title']//img)[1]`,
      genderCollapse:`(//div[@class='f-title']//img)[2]`,

    } ,
    horseCardsPanel: {
      horsesCards: '//div[@class="marketplace-content "]/div/div',
      horseGenGenderBloodlineValue : (id: number) => `//div[@role='gridcell'][${id}]/div/div[2]/p[1]`
    },
    footerContent:{
      copyWright: `//div[text()='Copyright ©Z']`,
      termsOfService: `//a[@class='primary-text secondary']`,
      privacyPolicy: `(//a[contains(@class,'primary-text secondary')])[3]`,
      ccpa: `(//div[@class='nav-part']//a)[3]`,
      ageLimit: `//span[text()='18+']`,
      zedIcon: `(//img[@class='icon icon-zed'])[1]`,
      zedLink: `(//a[@class='icon-part'])[1]`,
      twitch: `(//img[@class='icon icon-twitch'])[1]`,
      twitchLink: `(//a[@class='icon-part'])[2]`,
      discord: `(//img[@class='icon icon-discord'])[1]`,
      discordLink: `(//a[@class='icon-part'])[3]`,
      telegram: `(//img[@class='icon icon-telegram'])[1]`,
      telegramLink: `(//a[@class='icon-part']/following-sibling::a)[3]`,
      twitter: `(//img[@class='icon icon-twitter'])[1]`,
      youtube: `(//img[@class='icon icon-youtube'])[1]`,
      facebook: `(//img[@class='icon icon-facebook'])[1]`,
      instergram: `(//img[@class='icon icon-instagram'])[1]`,
      arrowUp: `//img[@alt='arrow-up']`,
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
