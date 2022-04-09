import { Page } from 'playwright';

class Racing {
  public page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  objects = {
    btnStart: '#app .app-content .header-desktop .start-part button',
    btnMetamaskOption: '#login-modal .login-options .metamask-login',
    menuRacing: "(//div[contains(@class, 'primary-text text-uppercase')])[1]",
    racingArrowButton: ".header-content .left-part div[data-tour='header-racing'] button",
    nextToRunLabel : "text=Next to Run",
    eventsLabel : "text=Events",
    activeMenuLabel : "#sub-header-desktop .sub-headers-content .tab-item.active a .item-content div",
    eventPopUp: {
      closeIcon: 'svg[class*="close-icon"]'
    },
    freeEventsList: "//img[@class='free-race-badge']/ancestor::tr",
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
