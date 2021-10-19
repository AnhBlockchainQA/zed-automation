import { Page } from 'playwright';

class Stable {
  public page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  objects = {
    btnStart: '#app .app-content .header-desktop .start-part button',
    lblStableName: '(//h1[@class=\'stable-name\'])[2]',
    lblStableDescription: '//p[@class=\'primary-text secondary\']',
    lblStableThoroughbreds: '//h4[text()=\'Thoroughbreds\']/following-sibling::h3',
    lblStableTotalCareer: '//h4[text()=\'Total Career\']/following-sibling::h3',
    lblStableWinRate: '//h4[text()=\'Win Rate\']/following-sibling::h3',
    imgIconShareStable: '(//img[@class=\'icon icon-share\'])[1]',
    txtStableSearch: '//input[@placeholder=\'Search\']',
    btnStableFilterOptions: '.filters-btn',
    ddlStableSortBy: '(//div[contains(@class,\'z-select\')])[2]',
    stableList:{
      horseCard: '(//div[@class=\'label-content\'])[1]',
      horseName: '(//div[@class=\'primary-text name\'])[1]',
      horseGenotype: '(//div[@class=\'horse-infos\']//div)[2]',
      panelHorseGen: '(//span[@class=\'primary-text gen\'])[1]',
      panelHorseBloodline: '(//div[@class=\'primary-text\'])[1]',
      panelHorseGender: '(//div[@class=\'primary-text\'])[2]',
      panelHorseCoat: '(//span[@class=\'primary-text\'])[1]',
      panelHorseRaces: '(//div[@class=\'primary-text\'])[3]',
      panelHorseCareer: '(//div[text()=\'career\']/following-sibling::div)[1]',
      panelHorseWinRate: '(//div[text()=\'win rate\']/following-sibling::div)[1]',
      panelHorseOffSpringInfo: '(//div[@class=\'offspring-info\'])[1]',
      panelHorseFullStamina: '(//div[@class=\'full\'])[1]',
      panelHorseImg: '(//img[@class=\'horse-glow\'])[2]',
      panelHorseDetailsLink: '(//div[@class=\'panel-btns false\'])[1]//div[@class=\'left\']/div[1]',
      panelHorseBreedLink: '(//div[@class=\'panel-btns false\'])[1]//div[@class=\'left\']/div[2]',
      panelCollapseOption: '(//div[@class=\'horse-properties\']//img)[1]'
    },
    btnOwnARacehorse: '//button[text()=\'own a racehorse\']',
    btnSettings: 'Settings',
    filtersPanel: {
      zedGeneration: '//div[@class=\'f-part zed-generation\']',
      zedGenerationMin: '//div[@class=\'f-part zed-generation\']//input[1]',
      zedGenerationMax: '//div[@class=\'f-part zed-generation\']//input[2]',
      zedGenerationMaxSlider: '(//div[@class=\'input-range__slider\'])[2]',
      bloodline: '//span[text()=\'BLOODLINE\']',
      bloodlineCheckBoxOptions: '(//div[@class=\'Collapsible\'])[1]//input[@type=\'checkbox\']'
    }
  };

  btnStart = async () =>
    await this.page.$('#app .app-content .header-desktop .start-part button');

  async getPageTitle() {
    return await this.page.title();
  }

  async getPageUrl() {
    return this.page.url();
  }
}

export default Stable;
