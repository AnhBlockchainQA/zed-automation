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
    horseList:(id?: number) => id ? `button.panel__label .label-content:nth-child(${id})` : 'button.panel__label .label-content',
    txtHorseName: (id: number) => `.panel:nth-child(${id}) .stud`,
    firstHorseName: `(//div[@class='h-img-name d-flex']//div)[2]`,
    lblHorseName: `(//div[contains(@class,'primary-text stud')])[2]`,
    divPanelFirstRow:`(//button[@role='tab']//div)[1]`,
    divHorsePanel: `(//div[@class='horse-container']/following-sibling::div)[2]`,
    lblOwnerNameAtStud: `//a[contains(@class,'overline-text bold')]`,
    lblPanelDate: '.panel.open .date-key .date',
    lblPanelLink: '.panel.open .date-key .key',
    lblPanelInfo: (id: number) => `(//div[@class='panel open']//div[@class='item']//*[contains(@class, 'primary-caption')])[${id}]`,
    lblPanelValue: (id: number) => `(//div[@class='panel open']//div[@class='item']//*[contains(@class, 'primary-text')])[${id}]`,
    lblHorseHeader: `(//div[@class='md-text'])[1]`,
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
    txtAvgWin: '.subheader-text-white',
    txtOffspringCount: '.offspring-count',
    cardParents: '.horse-family-card.parent',
    cardOffsprings: '.horse-family-card.undefined',
    txtNoOffspring: "[class='offspring-prompt']",
    btnBreed: '.dedicate-horse > div > button',
    btnLoadMore: '.more-offspring-button',
    btnStableFilterOptions: '.filters-btn',
    lblFilterCounter: '//div[@class=\'filters-btn \']//div[1]',
    ddlStudSortBy: '(//div[contains(@class,\'z-select__value-container z-select__value-container--has-value\')])[2]',
    ddlStudSortByRecentlyListed: '//div[text()=\'Recently Listed\']',
    ddlStudSortByExpiringSoon: '//div[text()=\'Expiring Soon\']',
    ddlStudSortByHighestPrice: '//div[text()=\'Highest Price\']',
    ddlStudSortByLowestPrice: '//div[text()=\'Lowest Price\']',
    lblBreeding: '//h2[text()="breeding"]',
    lblFilterCount: '//div[contains(@class,"sidebar-wrapper side-filter-wrapper")]/following-sibling::div[1]',
    lblFooter:'(//div[@class="footer-content"])[1]',
    lblAddHorseStudFarm : '//div[text()="Add a Horse to Stud Farm"]',
    btnSelectHorse: '//button[text()="Select Horse"]',
    imgHorse: `(//img[@class='horse-shadow']/following-sibling::img)[1]`,
    stableOwnerName: `(//div[contains(@class,'primary-text helpful')])[2]`,
    horseBloodline: `(//div[text()='bloodline']/following-sibling::div)[1]`,
    horseGen: `(//div[text()='gen']/following-sibling::span)[2]`,
    horseGender: `(//div[text()='gender']/following-sibling::div)[1]`,
    horseCoat: `(//div[text()='coat']/following-sibling::span)[1]`,
    horseRaces: `(//div[text()='races']/following-sibling::div)[1]`,
    horseCareer: `(//div[text()='career']/following-sibling::div)[1]`,
    horseWinRate: `(//div[text()='win rate']/following-sibling::div)[1]`,
    horseOffSpringInfo: `(//div[@class='offspring-info']//div)[1]`,
    horseoffSpring: `(//div[@class='primary-text']/following-sibling::div)[1]`,
    horseColour: `//span[@class='primary-text']`,
    studList:{
      HorseCard: '//div[@class=\'panel\']',
      HorseList: '(//div[@role=\'tabpanel\'])',
      horseCard: '(//div[@class=\'label-content\'])[1]',
      timeLeftValue: '(//div[@class=\'time\']//div)[2]',
      offspringValue:`(//div[@class='offspring-info']//div)[1]`,
      btnMinimize:`(//div[@class='name-properties']//img)[1]`,
      lblStableValue: (id: number) =>`(//div[@class="label-content"])[${id}]/div[2]/div[1]`,
      lblHorseNmValue: (id: number) =>`(//div[@class="label-content"])[${id}]/div[1]/div[2]/div[1]`,
      lblTimeLeftValue:(id: number) => `(//div[@class="label-content"])[${id}]/div[2]/div[2]`,
      lblStudFeeValue:(id: number) => `(//div[@class="label-content"])[${id}]/div[2]/div[3]/span[1]`,
      lblGenBoodlineValue: (id: number) => `(//div[@class="label-content"])[${id}]/div[1]/div[2]/div[2]`,
      collapsedPanelOpen: (id: number) => `(//div[@class="label-content"])[${id}]`,
      panelMinimize: (id: number) =>`(//img[@class=\'open-label\'])[${id}]`,
      timeLeft: (id: number) =>`(//div[@class='primary-text date'])[${id}]`,
      btnSelectMate: (id: number) =>`(//button[contains(@class,"primary-btn md")])[${id}]`,
      lblGenderValue: (id: number) => `(//div[text()='gender']/following-sibling::div)[${id}]`,
      txtStudFeeBox: (id: number) => `(//div[@class='price-input']//div)[${id}]`,
      lblZedGen: (id: number) => `(//div[@class='properties-content'])[${id}]/div[1]/span[1]`,
      lblBreedType: (id: number) => `(//div[@class='properties-content'])[${id}]/div[1]/span[2]`,
      lblBloodline: (id: number) => `(//div[@class='properties-content'])[${id}]/div[2]/div[2]`,
      lblStableOwner: (id: number) => `(//div[contains(@class,'primary-text green')])[${id}]`,
      lblRaceValue: (id: number) => `(//div[@class='properties-content'])[${id}]/div[5]/div[2]`,
      lblCareerValue: (id: number) => `(//div[@class='properties-content'])[${id}]/div[6]/div[2]`,
      lblWinRateValue: (id: number) => `(//div[@class='properties-content'])[${id}]/div[7]/div[2]`,
      lblOffspringValue: (id: number) => `(//div[@class='properties-content'])[${id}]/div[8]/div[2]/div[1]`,
      lblOffspringLeft: (id: number) => `(//div[@class='properties-content'])[${id}]/div[8]/div[2]/div[2]`,
      lblCoatValue: (id: number) => ` (//div[@class='properties-content'])[${id}]/div[4]/span`,
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
      genderStallionCheckBox: '#Stallion',
      bloodline: '//span[text()=\'BLOODLINE\']', 
      bloodlineButerinCheckBox: '#Buterin',
      bloodlineButerinLabel:'//label[@for=\'Buterin\']',
      zedGeneration: '//div[@class=\'f-part zed-generation\']',
      zedGenerationMin: '//div[@class=\'f-part zed-generation\']//input[1]',
      zedGenerationMax: '//div[@class=\'f-part zed-generation\']//input[2]',
      colour: `//span[text()='COLOUR']`,
      colourSearch: `(//input[@placeholder='Search'])[3]`,
      colorSelect : (color: 'color') => `//label[text()='${color}']`,
      filterClose: `(//div[@class='title-wrapper']//img)[2]`,
      colourGroup: `//span[text()='COLOUR GROUP']`,
      mysticalColourGroup: `//label[text()='Mystical']`,
      colourRarity: `//span[text()='COLOUR RARITY']`,
      superCoatColourRarity: `//label[@for='supercoat-switcher']//div[@class='line']`,
      commonColourRarity: `//label[normalize-space()='Common']`
    } ,
    selectMate: {
      lblBreeding: '//h2[text()="breeding"]',
      btnSelectFemale: '//div[text()="select female"]',
      lblSelectedFemaleNm: '(//div[@class="female-content selected"]//div)[1]',
      lblFemaleHorse: (id: number) => `(//div[@class="primary-text name"])[${id}]`,
      btnSelect : '(//div[@class="actions"]//button)[1]',
      txtStudHorseName: '.stud-content > .overline-text',
      txtBoxSearchRaceHorseLogo : '//div[text()="Search a racehorse"]',
      txtBoxSearchRaceHorse: '//div[@class="css-1g6gooi"]/div',
      lblHorseStatus: '//div[@class="breeds-and-type"]/div[1]',

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

  async searchHorseWithRetries(input: string, maxRetries: number): Promise<string | null> {
    if (!maxRetries) 
      return null;
    await this.page.fill(this.objects.tfSearch, input)
    await this.page.waitForTimeout(2000)
    await this.page.waitForSelector(this.objects.loader, { state: 'hidden', timeout: 30000 })
    const result = await this.page.innerText(this.objects.firstHorseName, { timeout: 1000 }).catch(() => null)
    if (!result) {
      await this.page.click(this.objects.btnClearSearch)
      await this.page.waitForSelector(this.objects.loader)
      await this.page.waitForTimeout(10000)
      return this.searchHorseWithRetries(input, maxRetries - 1)
    }
    return result
  }

  async getHorseWithOffspring(startId: number): Promise<any> {
    let res: any = await this.page.click(this.objects.horseList(startId), { timeout: 10000 }).catch(() => null)
    if (res !== null) {
      res = await this.page.innerText(this.objects.lblPanelValue(9))
      if (res === '0')
        return await this.getHorseWithOffspring(startId + 1)
    }
    return res
  }

  async getHorseWithNoOffspring(startId: number): Promise<any> {
    let res: any = await this.page.click(this.objects.horseList(startId), { timeout: 10000 }).catch(() => null)
    if (res !== null) {
      res = await this.page.innerText(this.objects.lblPanelValue(9))
      if (res !== '0')
        return await this.getHorseWithNoOffspring(startId + 1)
    }
    return res
  }
}

export default BreedingAndStud;