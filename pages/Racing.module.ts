import { Page } from 'playwright';

class Racing {
  public page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  objects = {
    btnStart: '#app .app-content .header-desktop .start-part button',
    btnMetamaskOption: '#login-modal .login-options .metamask-login',
    menuRacing: "(//div[@class='primary-text text-uppercase'])[1]",
    subMenuResults: "//div[text()='Results']",
    events: {
      lstRaces: (id?: number) => id ? `.panel:nth-child(${id})` : '.panel',
      lstGates: (id?: number) => id ? `.gate-btn:nth-child(${id}) > div` : '.gate-btn  > div',
    },
    formNominate: {
      paneHorseList: '.z-auto__menu-list',
      lstAvailHorse: "[class='horse-card closed ']",
      txtAvailName: "[class='horse-card closed '] .h-img-name > div",
      btnAvailNominate: "[class='horse-card closed '] .nominate",
      btnConfirm: '.confirm-btn',
      btnClose: '.select-for-nomination-form > svg '
    },
    resultRaceTab:{
      raceRowCount: "//table[contains(@class,'sc-dtMgUX dKBigf')]/tbody[1]/tr", 
      raceColCount: "//table[contains(@class,'sc-dtMgUX dKBigf')]/thead[1]/tr/th",
      eventName: (id: number) => `//table[contains(@class,'sc-dtMgUX dKBigf')]/tbody[1]/tr[${id}]/td[1]/div[1]`,
      eventType: (id: number) => `//table[contains(@class,'sc-dtMgUX dKBigf')]/tbody[1]/tr[${id}]/td[2]/div[1]`,
      distance: (id: number) => `//table[contains(@class,'sc-dtMgUX dKBigf')]/tbody[1]/tr[${id}]/td[3]/div[1]`,
      date: (id: number) => `//table[contains(@class,'sc-dtMgUX dKBigf')]/tbody[1]/tr[${id}]/td[4]/div[1]`,
      pricePool: (id: number) => `//table[contains(@class,'sc-dtMgUX dKBigf')]/tbody[1]/tr[${id}]/td[5]`,
    }
  };

  async getPageTitle() {
    return await this.page.title();
  }

  async getPageUrl() {
    return this.page.url();
  }

}

export default Racing;
