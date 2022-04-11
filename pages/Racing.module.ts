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
    racingMenu:{
      racingArrowButton: ".header-content .left-part div[data-tour='header-racing'] button",
      nextToRunLabel : "text=Next to Run",
      eventsLabel : "text=Events",
      resultLabel : "text=Results",
    },
    activeMenuLabel : "#sub-header-desktop .sub-headers-content .tab-item.active a .item-content div",
    tournamentsLabel : ".events .filter-toggles input#tournament-switcher",
    myRaceLabel : ".events .filter-toggles input#my-racehorse-switcher",
    eventPopUp: {
      closeIcon: 'svg[class*="close-icon"]'
    },
    raceOpenSectionLabel : ".buy-in .events-container .events-content .open-races .race-open",
    allEventsList : ".buy-in .events-container .events-content table tbody tr",
    resultsList : ".result .accordion-container table tbody tr",
    eventWithIndex: {
      event : (id: number) => `.buy-in .events-container .events-content table tbody tr:nth-child(${id})`,
      eventName: (id: number) => `.buy-in .events-container .events-content table tbody tr:nth-child(${id}) td:nth-child(1) div:nth-child(1)`,
      txtRaceName : (id: number) => `.buy-in .events-container .events-content table tbody tr:nth-child(${id}) .buy-in-content .race-info .race-name`,
      distanceRaceDetail : (id: number) => `.buy-in .events-container .events-content table tbody tr .buy-in-content .race-info .race-description .race-details .race-detail:nth-child(2) span`,
    },
    raceNumber: ".result .results-info h3 span:nth-child(1)",
    freeEventsList: "//img[@class='free-race-badge']/ancestor::tr",
    txtHorseName: (id: number) => `.panel:nth-child(${id}) .primary-text.name`,
    filterButton: "div.result .page-top .filters-btn",
    filterOptions:{
      classesLabel: ".result .page-top .racing-results-filter-sidebar .classes-part span",
      classesOptions: ".result .page-top .racing-results-filter-sidebar .classes-part .class-options .z-checkbox input",
      dateLabel: ".result .page-top .racing-results-filter-sidebar .date-part span[role='button']",
      distanceLabel: '.result .page-top .racing-results-filter-sidebar .distance-part span[role="button"]',
      distanceMinInput: '.result .racing-results-filter-sidebar .distance-part div input.distance-min',
      distanceMaxInput: '.result .racing-results-filter-sidebar .distance-part div input.distance-max',
      distanceFilteredResults: '.result .accordion-container table tbody tr td:nth-child(3) div',
    },
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
