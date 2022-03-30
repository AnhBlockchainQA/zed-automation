import { Page } from 'playwright';

class Stable {
  public page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  objects = {
    h3EmptyStable: '//h3[text()=\'Your stable is currently empty.\']',
    lknExploreMarketPlace: '//div[contains(@class,\'explore-card explore-card-marketplace\')]//a[1]',
    imgStableProfile: '(//div[@class=\'icon-sm\']//img)[1]',
    imgStable: '(//div[@class=\'name-part\']//div)[1]',
    btnStart: '#app .app-content .header-desktop .start-part button',
    lblStableName: '(//h1[@class=\'stable-name\'])[2]',
    lblStableDescription: '//p[@class=\'primary-text secondary\']',
    lblStableThoroughbreds: '//h4[text()=\'Thoroughbreds\']/following-sibling::h3',
    lblStableTotalCareer: '//h4[text()=\'Total Career\']/following-sibling::h3',
    lblStableWinRate: '//h4[text()=\'Win Rate\']/following-sibling::h3',
    imgIconShareStable: '(//img[@class=\'icon icon-share\'])[1]',
    txtStableSearch: '//input[@placeholder=\'Search\']',
    btnClearSearch: '.icn.remove-txt',
    btnStableFilterOptions: '.filters-btn',
    ddlStableSortBy: '(//div[contains(@class,\'z-select__value-container z-select__value-container--has-value\')])[2]',
    ddlStableSortByDateNewest: '//div[text()=\'Date - Newest\']',
    ddlStableSortByDateOldest: '//div[text()=\'Date - Oldest\']',
    stableList:{
      HorseCard: '//div[@class=\'panel\']',
      HorseList: '(//div[@role=\'tabpanel\'])',
      horse: (id: number) => `(//div[@role=\'tabpanel\'])[${id}]`,
      txtHorseName: (id: number) => `.panel:nth-child(${id}) .primary-text.name`,
      stableDescription: '//div[@class=\'stable-text\']//p[1]',
      horseGenotype: '(//div[@class=\'horse-infos\']//div)[2]',
      horseBadge: (id: number) => `.panel:nth-child(${id}) .panel__label .badge`,
      newName: (id: number) => `.panel:nth-child(${id}) .outline-btn`,
      panelHorseName: '.panel.open .name-icon > div',
      panelHorseGen: '(//span[@class=\'primary-text gen\'])[1]',
      panelHorseBloodline: '(//div[@class=\'primary-text\'])[1]',
      panelHorseGender: (id: number) => `(//div[text()='gender']/following-sibling::div)[${id}]`,
      panelHorseCoat: '(//span[@class=\'primary-text\'])[1]',
      panelHorseRaces: '(//div[@class=\'primary-text\'])[3]',
      panelHorseCareer: '(//div[text()=\'career\']/following-sibling::div)[1]',
      panelHorseWinRate: '(//div[text()=\'win rate\']/following-sibling::div)[1]',
      panelHorseOffSpringInfo: '(//div[@class=\'offspring-info\'])[1]',
      panelHorseFullStamina: '(//div[@class=\'full\'])[1]',
      panelHorseImg: '(//img[@class=\'horse-glow\'])[2]',
      panelHorseBreedLink: '.panel.open .icn-txt:nth-child(2)',
      panelHorseTimeLeft: '.panel.open .time-left > .primary-text',
      panelCollapseOption: '(//div[@class=\'horse-properties\']//img)[1]',
      panelMinimize: (id: number) => `(//img[@class=\'open-label\'])[${id}]`,
      horseBreed: `(//div[contains(@class,'primary-text helpful')])[1]`,
      selectMateBtn: `//button[text()='Select Mate']`,
      dadHorse: `(//div[@class='stats'])[1]`,
      momHorse: `(//div[@class='stats'])[2]`,
    },
    btnOwnARacehorse: '//button[text()=\'own a racehorse\']',
    btnUserMenu: '.user-part .menu-button',
    btnMyStable: "text='My Stable'",
    btnSettings: '//span[text()=\'Settings\']',
    btnLogOut: '//span[text()=\'Log Out\']',
    imgIconSettings: '//div[@class="icon-part"]/img',
    btnAdvanced: '//div[text()=\'Advanced\']',
    btnGetApiKey: '//button[text()="Get API Key"]',
    btnDeleteKey: '//button[text()="Delete Key"]',
    txtApiKey: '//input[@type=\'text\']',
    btnNotifications: '//div[text()=\'Notifications\']',
    checkBoxNotification: '(//input[@class="switch"])[3]',
    checkBoxRaceReminder: '//label[text()="Race start reminder (1 min)"]',
    checkBoxMyRaceReminder: '//label[text()="Race start reminder (My Racehorses only) (1 min)"]',
    txtStableTitle :'(//label[text()=\'STABLE TITLE\']/following::input)[1]',
    txtStableDescription :'(//label[text()="STABLE DESCRIPTION"]/following::textarea)[1]',
    checkboxSureForUpdate:'//input[@id="sureForUpdate"]/following-sibling::label[1]',
    btnSaveChanges:'//button[text()="Save Changes"]',
    txtUpdate:'//i[text()="Updated"]', 
    imgIconCopyStableLink: '//h1[@class=\'stable-name\']//img[1]',
    tooltipStableLink: '//div[@role=\'tooltip\']',
    loader: '.loader-container',
    transactionLoader: '.transaction-loading-modal',
    bloodlineName: `(//div[text()='bloodline']/following-sibling::div)[1]`,
    closeDetails: `(//div[@class='horse-properties']//img)[1]`,
    gender: `(//div[text()='gender']/following-sibling::div)[1]`,
    filtersPanel: {
      divPanelFilter: '(//div[@class=\'page-content stable\']//div)[1]',
      btnCloseFilterPanel:'//div[@class=\'title-wrapper\']//button[1]',
      zedGeneration: '//div[@class=\'f-part zed-generation\']',
      zedGenerationMin: '//div[@class=\'f-part zed-generation\']//input[1]',
      zedGenerationMax: '//div[@class=\'f-part zed-generation\']//input[2]',
      zedGenerationMaxSlider: '(//div[@class=\'input-range__slider\'])[2]',
      bloodline: '//span[text()=\'BLOODLINE\']',
      gender: '//span[text()=\'GENDER\']',
      genderFillyCheckBox: '#Filly',
      genderFillyLabel: '//label[text()=\'Filly\']',
      genderMareLabel: '//label[text()=\'Mare\']',
      genderColtLabel: "text='Colt'",
      genderStallionLabel: "text='Stallion'",
      bloodlineNakamotoCheckBox: '#Nakamoto',
      bloodlineNakamotoLabel:'//label[@for=\'Nakamoto\']',
      bloodlineLabel : (bloodline: 'bloodline') => `//label[text()='${bloodline}']`,
      breeds: '//span[text()=\'BREEDS\']',
      breedGenesisCheckBox: '#genesis',
      breedLegendaryCheckBox: `//label[text()='legendary']`,
      breedExclusiveCheckBox: `//label[text()='exclusive']`,
      breedEliteCheckBox: `//label[text()='elite']`,
      breedECrossCheckBox: `//label[text()='cross']`,
      breedEPacerCheckBox: `//label[text()='pacer']`,
      breedGenesisLabel: '//label[text()=\'genesis\']',
      stableFilterClose: `(//div[@class='title-wrapper']//img)[2]`,
    },
    breedForm: {
      formBreed: '.breed-form',
      ddlStudDuration: '.breed-form .z-select__control',
      txtStudDuration: '.breed-form  .z-select__single-value',
      txt1Day: 'text="1 Day"',
      txt3Day: 'text="3 Days"',
      txt7Day: 'text="7 Days"',
      txtMetaMaskError: '.primary-text.error',
      btnCancel: '.handle-btns .secondary-btn',
      btnNext: '.handle-btns .primary-btn'
    },
    newbornForm: {
      tfName: "[placeholder='Choose Name']",
      lblConfirm: "[for='isChecked']",
      btnConfirm: '.confirm-btn'
    },
    transferHorse: {
      btnSelectRaceHorse: '.primary-btn.md',
      lstHorse: '.transfer-horse-card.false',
      btnSelect: '.hover-content .primary-btn.false',
      txtHorseName: '.horse-name',
      tfWalletAddress: '.transfer-infos .z-input',
      btnTransfer: '.transfer-infos .primary-btn',
      btnConfirm: '.transfer-nft-comfirm .primary-btn'
    }
  };

  async getPageTitle() {
    return await this.page.title();
  }

  async getPageUrl() {
    return this.page.url();
  }

  async getHorseInStable(startId: number, fnCondition: (newName: any, badge: string) => boolean): Promise<any> {
    let i: number;
    const exist = await this.page.waitForSelector(this.objects.stableList.horse(startId)).catch(() => null)
    if (!exist) return
    const horseList = await this.page.$$(this.objects.stableList.HorseList)
    for (i = startId; i <= horseList.length; i++) {
      const newName = await this.page.$(this.objects.stableList.newName(i))
      const badge = await this.page.innerText(this.objects.stableList.horseBadge(i))
      if (fnCondition(newName, badge)) {
        await horseList[i - 1].click()
        return i
      }
    }
    await this.page.waitForTimeout(1000)
    if (!await this.page.isVisible(this.objects.btnOwnARacehorse)) {
      await this.page.evaluate('window.scrollTo(0, document.body.scrollHeight)')
      return await this.getHorseInStable(i, fnCondition)
    }
  }

  /* get the first horse in the list that is:
  1. not in stud
  2. not in race
  3. not a newborn
  */
  getFirstAvailHorse(newName: any, badge: string) {
    return !newName && badge === ''
  }

  getFirstHorseInStud(newName: any, badge: string) {
    return !newName && badge === 'IN STUD'
  }

  getFirstHorseInRace(newName: any, badge: string) {
    return !newName && badge === 'IN RACE'
  }

  getFirstNewborn(newName: any) {
    return newName !== null
  }
}

export default Stable;
