import { Page } from 'playwright';

class ELO {
  public page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  objects = {
    btnStart: '#app .app-content .header-desktop .start-part button',
    btnMetamaskOption: '#login-modal .login-options .metamask-login',
    divCardsUpAndUpcoming: "//div[contains(@class,'race-card')]",
    divOnSaleCardPlaceHolders: "//div[contains(@class,'horse-sale-card horse-skeleton placeholder')]",
    divInStudHorsesSection: "//div[contains(@class,'horses')]/div[@class='horse']",
    lblH1MagicLinkFormTitle: "//h1[text()='ENTER YOUR EMAIL']",
    lblH1ChooseAccountModalTitle: "//h1[text()='CHOOSE AN ACCOUNT']",
  };

  async getPageTitle() {
    return await this.page.title();
  }

  async getPageUrl() {
    return this.page.url();
  }

}

export default ELO;
