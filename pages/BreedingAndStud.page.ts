import { Page } from 'playwright';

class BreedingAndStud {
  public page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  objects = {
    btnBreeding: 'text=\'BREEDING\'',
    lblHorseName: '.panel.open .md-text',
    divHorsePanel: '.panel.open .panel-horse',
    lblHorseHeader: '.d-flex.header-text',
    lblHorseOwner: '.panel.open .green',
    lblOwner: '.subheader-text > span',
    lblOwnerValue: '.subheader-text > a',
    divHorseProfile: '.horse-profile_properties',
    divHorseImage: '.horse-profile_image',
    imgHorse3D: '.horse-inspector',
    imgClose3D: '.horse-inspector-modal .close-icon',
    divView3D: '.viewer-body',
    btnShare: '.share-btn',
    textShareUrl: '.share-url',
    btnCopy: '.copy-link',
    imgCopied: '.copy-link > img',
    lblAttr: '.xs',
    lblAttrValue: '.xs + div > .primary-text.bold',
    lblBloodline: '//div[text()=\'bloodline\']',
    lstHorses: (id?: Number) => id ? `.panel:nth-child(${id})` : '.panel'
  };

  async getPageTitle() {
    return await this.page.title();
  }

  async getPageUrl() {
    return this.page.url();
  }
}

export default BreedingAndStud;
