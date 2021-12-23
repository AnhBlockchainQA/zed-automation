import { Page } from 'playwright';

class BreedingAndStud {
  public page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  objects = {
    lstHorses: (id?: Number) => id ? `.panel:nth-child(${id})` : '.panel',
    btnBreeding: 'text=\'BREEDING\'',
    lblHorseName: '.panel.open .md-text',
    divHorsePanel: '.panel.open .panel-horse',
    lblHorseHeader: '.d-flex.header-text',
    lblOwnerNameAtStud: '.panel.open .green',
    lblOwner: '.subheader-text > span',
    lblOwnerNameAtProfile: '.subheader-text > a',
    divHorseProfile: '.horse-profile_properties',
    divHorseImage: '.horse-profile_image',
    imgHorse3D: '.horse-inspector',
    imgClose3D: '.horse-inspector-modal .close-icon',
    divView3D: '.viewer-body',
    btnShare: '.share-btn',
    textShareUrl: '.share-url',
    btnCopy: '.copy-link',
    imgCopied: '.copy-link > img',
    lblProfileProperty: (id: Number) => `(//*[contains(@class, 'xs')])[${id}]`,
    lblProfileValue: (id: Number) => `(//*[contains(@class, 'xs')])[${id}]/following-sibling::div/div`,
    lblProfileSubValue: (id: Number) => `(//*[contains(@class, 'xs')])[${id}]/following-sibling::div/span`,
    lblCareerProperty: (id: Number) => `.career-property:nth-child(${id}) .overline-text`,
    lblCareerValue: (id: Number) => `.career-property:nth-child(${id}) .primary-text`
  };

  async getPageTitle() {
    return await this.page.title();
  }

  async getPageUrl() {
    return this.page.url();
  }
}

export default BreedingAndStud;
