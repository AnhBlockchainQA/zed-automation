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
    subMenuResults: "//div[text()='Results']",
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
    resultsList : "//div[contains(@class,'result')]//div[@class='accordion-container']/table/tbody/tr",
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
      dateFilterButton: '.result .page-top .racing-results-filter-sidebar .date-part input.date-range-input',
      resetDateFilterIcon: ".result .page-top .racing-results-filter-sidebar .date-part img.icn-reset-picked-dates",
      todayOption: "text=Today",
      yesterdayOption: "text=Yesterday",
      currentWeekOption: "text=This Week",
      lastWeekOption: "text=Last Week",
      currentMonthOption: "text=This Month",
      lastMonthOption: "text=Last Month",
      noResult : "text=No races have been finished yet. Please check back later.",
      activeDatesList: ".result .page-top .racing-results-filter-sidebar .date-part .filter-range-wrap .rdrMonthsHorizontal .rdrDays button:not([class*='rdrDayDisabled']):not([class*='rdrDayPassive'])",
      activeDatesWithIndex: (id: number) => `//div[contains(@class, 'result')]//div[contains(@class, 'date-part')]//div[contains(@class, 'results-filter-range')]//div[contains(@class, 'rdrMonthsHorizontal')]//div[contains(@class, 'rdrDays')]//button[not(contains(@class,'rdrDayPassive')) and not(contains(@class,'rdrDayDisabled'))][${id}]`,
      resultWithIndex: (id: number) => `//div[contains(@class,'result')]//div[@class="accordion-container"]/table/tbody/tr[${id}]/td[3]/div`,
      resultWithDateIndex: (id: number) => `//div[contains(@class,'result')]//div[@class="accordion-container"]/table/tbody/tr[${id}]/td[4]/div`,
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
    },
    resultRaceTab:{
      myRacehorseOnlyCheckbox: "//input[@id='my-racehorse-switcher']",
      raceRowCount: "//table[contains(@class,'sc')]/tbody[1]/tr", 
      raceColCount: "//table[contains(@class,'sc')]/thead[1]/tr/th",
      eventName: (id: number) => `//table[contains(@class,'sc')]/tbody[1]/tr[${id}]/td[1]/div[1]`,
      registeredIcon: (id: number) => `//table[contains(@class,'sc')]/tbody[1]/tr[${id}]/td[1]/div[1]/img[1]`,
      eventType: (id: number) => `//table[contains(@class,'sc')]/tbody[1]/tr[${id}]/td[2]/div[1]`,
      distance: (id: number) => `//table[contains(@class,'sc')]/tbody[1]/tr[${id}]/td[3]/div[1]`,
      date: (id: number) => `//table[contains(@class,'sc')]/tbody[1]/tr[${id}]/td[4]/div[1]`,
      pricePool: (id: number) => `//table[contains(@class,'sc')]/tbody[1]/tr[${id}]/td[5]`,
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
