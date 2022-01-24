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
    
    filtersPanel: {
      genderColt: '(//label[text()="Colt"])[2]',
      genderColtCheckBox: '#id-Colt',
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

}

export default Marketplace;
