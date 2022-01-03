import { Page } from 'playwright';
import fs from 'fs';
const PNG = require('pngjs').PNG;
const pixelmatch = require('pixelmatch');

class BreedingAndStud {
  public page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  objects = {
    btnBreeding: 'text=\'BREEDING\'',
    tfSearch: '.search-input > .search',
    btnClearSearch: '.search-input .icn',
    lstHorses: (id?: number) => id ? `.panel:nth-child(${id})` : '.panel',
    txtHorseName: (id: number) => `.panel:nth-child(${id}) .stud`,
    lblHorseName: '.panel.open .md-text',
    divHorsePanel: '.panel.open .panel-horse',
    lblOwnerNameAtStud: '.panel.open .green',
    lblPanelValue: (id: number) => `(//div[@class='panel open']//div[@class='item']//*[contains(@class, 'primary-text')])[${id}]`,
    lblHorseHeader: '.d-flex.header-text',
    lblOwner: '.subheader-text > span',
    loader: '.loader-container',
    lblOwnerNameAtProfile: '.subheader-text > a',
    divHorseProfile: '.horse-profile_properties',
    divHorseImage: '.horse-profile_image',
    imgHorse3D: '.horse-inspector',
    imgClose3D: '.horse-inspector-modal .close-icon',
    divView3D: '.viewer-body',
    lblInfoLeft: '.other-infos  > .left .primary-text',
    btnShare: '.share-btn',
    textShareUrl: '.share-url',
    btnCopy: '.copy-link',
    imgCopied: '.copy-link > img',
    lblProfileProperty: (id: number) => `(//*[contains(@class, 'xs')])[${id}]`,
    lblProfileValue: (id: number) => `((//*[contains(@class, 'xs')])//following-sibling::div/*)[${id}]`,
    lblCareerProperty: (id: number) => `.career-property:nth-child(${id}) .overline-text`,
    lblCareerValue: (id: number) => `.career-property:nth-child(${id}) .primary-text`,
    btnStableFilterOptions: '.filters-btn',
    stubList:{
      HorseCard: '//div[@class=\'panel\']',
      HorseList: '(//div[@role=\'tabpanel\'])',
      horseCard: '(//div[@class=\'label-content\'])[1]',
      lblStableValue: (id: number) =>`(//div[@class="label-content"])[${id}]/div[2]/div[1]`,
      lblHorseNmValue: (id: number) =>`(//div[@class="label-content"])[${id}]/div[1]/div[2]/div[1]`,
    },
    filtersPanel: {
      divPanelFilterStud: '//div[contains(@class,"sidebar-wrapper side-filter-wrapper")]',
      btnCloseFilterPanel:'//div[@class=\'title-wrapper\']//button[1]',
      breeds: '//span[text()=\'BREEDS\']',
      breedGenesisCheckBox: '#genesis',
      breedGenesisLabel: '//label[text()=\'genesis\']',
      gender: '//span[text()=\'GENDER\']',
      genderColtCheckBox: '#Colt',
      genderColtLabel: '//label[text()=\'Colt\']',
      bloodline: '//span[text()=\'BLOODLINE\']', 
      bloodlineButerinCheckBox: '#Buterin',
      bloodlineButerinLabel:'//label[@for=\'Buterin\']',
      zedGeneration: '//div[@class=\'f-part zed-generation\']',
      zedGenerationMin: '//div[@class=\'f-part zed-generation\']//input[1]',
      zedGenerationMax: '//div[@class=\'f-part zed-generation\']//input[2]',
    } ,
    
  };

  async getPageTitle() {
    return await this.page.title();
  }

  async getPageUrl() {
    return this.page.url();
  }

  // compares 2 images. function returns 0 if matched, a non-zero value if not matched
  async compareImages(pathImage1: string, pathImage2: string) {
    const img1 = PNG.sync.read(fs.readFileSync(pathImage1))
    const img2 = PNG.sync.read(fs.readFileSync(pathImage2))
    const {width, height} = img1
    return pixelmatch(img1.data, img2.data, null, width, height, {threshold: 0.1})
  }
}

export default BreedingAndStud;
