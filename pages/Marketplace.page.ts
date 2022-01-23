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
    firsthorseCard: `(//div[@role='gridcell']/following-sibling::div)[1]`,
    buyButton: '.details-block .buy-btn.primary-btn',
    priceBadge: '.details-block .price-badge'
  };

  async getPageTitle() {
    return await this.page.title();
  }

  async getPageUrl() {
    return this.page.url();
  }

}

export default Marketplace;
