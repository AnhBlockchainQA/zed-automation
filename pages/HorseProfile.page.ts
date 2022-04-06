import { Page } from 'playwright';

class HorseProfile {
  public page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  objects = {
    breedingDecay: `(//span[contains(@class,'primary-text helpful')])[2]`,
    genesisTier: `//div[text()='Tier 0']`
   };

  async getPageTitle() {
    return await this.page.title();
  }

  async getPageUrl() {
    return this.page.url();
  }

}

export default HorseProfile;
