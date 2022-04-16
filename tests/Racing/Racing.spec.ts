import Authorization from "../../pages/Authorization.page";
import Metamask from "../../pages/Metamask.module";
import * as data from "../../fixtures/qa.json";
import { BrowserContext, ElementHandle } from "playwright";
import Racing from "../../pages/Racing.module";
import { expect } from "@playwright/test";

describe("Racing", () => {
  let auth: Authorization;
  let racing: Racing;
  let pages: any;
  let browserContext: BrowserContext;
  let metamask: Metamask;
  let dateTimeFormat: Intl.DateTimeFormat = new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
  let now: Date = new Date();

  beforeAll(async () => {
    metamask = new Metamask();
    browserContext = await metamask.init();
    pages = await metamask.authenticate(browserContext);
    auth = new Authorization(pages);
    racing = new Racing(pages);
  });

  beforeEach(async () => {
    await pages[0].goto(data.baseUrl);
    await pages[0].waitForLoadState();
  });

  afterAll(async () => {
    await pages[0].close();
    await browserContext.close();
    await metamask.close(pages, browserContext);
  });

  it("ZED-73 - Racing Service is showing information for Next To Run", async () => {
    await pages[0].waitForLoadState();
    await pages[0].waitForSelector(racing.objects.racingMenu.racingArrowButton);
    await pages[0].click(racing.objects.racingMenu.racingArrowButton);
    await pages[0].waitForSelector(racing.objects.racingMenu.nextToRunLabel);
    await pages[0].click(racing.objects.racingMenu.nextToRunLabel);
    await pages[0].waitForLoadState("domcontentloaded");
    await pages[0].waitForSelector(racing.objects.activeMenuLabel);
    expect(
      (await pages[0].locator(racing.objects.myRaceLabel).isVisible()) &&
        (await pages[0].locator(racing.objects.tournamentsLabel).isVisible())
    ).toBeTruthy();
  });

  it("ZED-74 - Racing Service is showing openings", async () => {
    await pages[0].waitForLoadState();
    await pages[0].waitForSelector(racing.objects.racingMenu.racingArrowButton);
    await pages[0].click(racing.objects.racingMenu.racingArrowButton);
    await pages[0].waitForSelector(racing.objects.racingMenu.eventsLabel);
    await pages[0].click(racing.objects.racingMenu.eventsLabel);
    await pages[0].waitForSelector(racing.objects.eventPopUp.closeIcon);
    await pages[0].locator(racing.objects.eventPopUp.closeIcon).click();
    await pages[0].waitForSelector(racing.objects.allEventsList);
    const counts = await pages[0].$$(racing.objects.allEventsList);
    expect(counts.length).toBeGreaterThan(0);
  });

  it('ZED-76 - Racing Service shows open race details', async () => {
    await pages[0].waitForLoadState();
    await pages[0].waitForSelector(racing.objects.racingMenu.racingArrowButton);
    await pages[0].click(racing.objects.racingMenu.racingArrowButton);
    await pages[0].waitForSelector(racing.objects.racingMenu.eventsLabel);
    await pages[0].click(racing.objects.racingMenu.eventsLabel);
    await pages[0].waitForSelector(racing.objects.eventPopUp.closeIcon);
    await pages[0].locator(racing.objects.eventPopUp.closeIcon).click();
    await pages[0].waitForSelector(racing.objects.allEventsList);
    const expectedRaceName = await pages[0].locator(racing.objects.eventWithIndex.eventName(1)).innerText();
    const list = await pages[0].locator(racing.objects.allEventsList);
    await list.nth(0).click();
    await pages[0].waitForLoadState("domcontentloaded");
    await pages[0].waitForSelector(racing.objects.eventWithIndex.txtRaceName(1));
    const actualRaceName = await pages[0].locator(racing.objects.eventWithIndex.txtRaceName(1)).innerText();
    console.log(actualRaceName);
    expect(actualRaceName).toContain(expectedRaceName);
  });

  it("ZED-78 - Racing Service shows list of finished races", async () => {
    await pages[0].waitForLoadState();
    await pages[0].waitForSelector(racing.objects.racingMenu.racingArrowButton);
    await pages[0].click(racing.objects.racingMenu.racingArrowButton);
    await pages[0].waitForSelector(racing.objects.racingMenu.resultLabel);
    await pages[0].click(racing.objects.racingMenu.resultLabel);
    await pages[0].waitForLoadState();
    await pages[0].waitForSelector(racing.objects.activeMenuLabel);
    const counts = await pages[0].$$(racing.objects.resultsList);
    expect(counts.length).toBeGreaterThan(0);
  });

  it('ZED-79 Racing Service allows the user to see finished race details', async () => {
    await pages[0].click(racing.objects.menuRacing)
    await pages[0].click(racing.objects.subMenuResults)
    await pages[0].waitForTimeout(3000)
    expect(await pages[0].url()).toContain('results')
    const raceRow = await pages[0].$$(racing.objects.resultRaceTab.raceRowCount)
    const raceCol = await pages[0].$$(racing.objects.resultRaceTab.raceColCount)
    const eventName = await pages[0].innerText(racing.objects.resultRaceTab.eventName(1))
    const eventType = await pages[0].innerText(racing.objects.resultRaceTab.eventType(1))
    const distance = await pages[0].innerText(racing.objects.resultRaceTab.distance(1))
    const date = await pages[0].innerText(racing.objects.resultRaceTab.date(1))
    const pricePool = await pages[0].innerText(racing.objects.resultRaceTab.pricePool(1))
    expect(await eventName).not.toBe('')
    expect(['V', 'D', 'DG' ,'IV', 'III', 'II','I','VI'].findIndex(v => v === eventType)).not.toBe(-1)
    expect(await distance).toContain('m')
    expect(await date).not.toBe('')
    expect(await raceRow.length).toBeGreaterThanOrEqual(1)
    expect(await raceCol.length).toBe(5)

  });

  it('ZED-80 Racing Service allows the user to filter `My racehorse only` while authenticated.', async () => {
    await pages[0].click(racing.objects.menuRacing)
    await pages[0].click(racing.objects.subMenuResults)
    await pages[0].waitForTimeout(3000)
    expect(await pages[0].url()).toContain('results')
    await pages[0].click(racing.objects.resultRaceTab.myRacehorseOnlyCheckbox,{ force: true })
    await pages[0].waitForTimeout(3000)
    const raceRow = await pages[0].$$(racing.objects.resultRaceTab.raceRowCount)
    const raceCol = await pages[0].$$(racing.objects.resultRaceTab.raceColCount)
    for (let racesRow =1; racesRow<= raceRow.length; racesRow++){
    const registeredIcon = await pages[0].locator(racing.objects.resultRaceTab.registeredIcon(racesRow)).getAttribute('class');
    expect(await registeredIcon).toBe('registered-icon d-none d-md-inline-block')
    }
    expect(await raceRow.length).toBeGreaterThanOrEqual(1)
    expect(await raceCol.length).toBe(5)
  });

  it("ZED-82 - Racing Service allows the user to filter out the results by Distance", async () => {
    await pages[0].waitForLoadState();
    await pages[0].waitForSelector(racing.objects.racingMenu.racingArrowButton);
    await pages[0].click(racing.objects.racingMenu.racingArrowButton);
    await pages[0].waitForSelector(racing.objects.racingMenu.resultLabel);
    await pages[0].click(racing.objects.racingMenu.resultLabel);
    await pages[0].waitForSelector(racing.objects.activeMenuLabel);
    await pages[0].waitForSelector(racing.objects.filterButton, {timeout : 5000});
    await pages[0].click(racing.objects.filterButton);
    await pages[0].waitForSelector(racing.objects.filterOptions.distanceLabel);
    await pages[0].click(racing.objects.filterOptions.distanceLabel);
    await pages[0].waitForSelector(racing.objects.filterOptions.distanceMinInput);
    await pages[0].locator(racing.objects.filterOptions.distanceMinInput).fill("1200");
    await pages[0].waitForSelector(racing.objects.filterOptions.distanceMaxInput);
    await pages[0].locator(racing.objects.filterOptions.distanceMaxInput).fill("1800");
    await pages[0].locator(racing.objects.activeMenuLabel).click(); // need to click somewhere to trigger the filter
    await pages[0].waitForLoadState("domcontentloaded");
    await pages[0].waitForSelector(racing.objects.filterOptions.distanceFilteredResults);
    const list = await pages[0].$$(racing.objects.filterOptions.distanceFilteredResults);
    for (let index =0; index<list.length; index++){
      const distanceValue = await pages[0].locator(racing.objects.filterOptions.resultWithIndex(index+1)).innerText();
      const distanceNumber = Number.parseInt(distanceValue);
      expect(distanceNumber).toBeGreaterThanOrEqual(1200);
      expect(distanceNumber).toBeLessThanOrEqual(1800);
    }
  });

  it("ZED-83 - Racing Service allows the user to filter out the results by Today date's", async () => {
    await pages[0].waitForLoadState();
    await pages[0].waitForSelector(racing.objects.racingMenu.racingArrowButton);
    await pages[0].click(racing.objects.racingMenu.racingArrowButton);
    await pages[0].waitForSelector(racing.objects.racingMenu.resultLabel);
    await pages[0].click(racing.objects.racingMenu.resultLabel);
    await pages[0].waitForSelector(racing.objects.activeMenuLabel);
    await pages[0].waitForSelector(racing.objects.filterButton, {
      timeout: 5000,
    });
    await pages[0].click(racing.objects.filterButton);
    await pages[0].waitForSelector(racing.objects.filterOptions.dateLabel);
    await pages[0].click(racing.objects.filterOptions.dateLabel);
    await pages[0].dispatchEvent(
      racing.objects.filterOptions.dateFilterButton,
      "mousedown"
    );
    await pages[0].click(racing.objects.filterOptions.todayOption);
    await pages[0].click(racing.objects.activeMenuLabel);
    await pages[0].waitForLoadState("domcontentloaded");
    const list = await pages[0].$$(racing.objects.resultsList);
    if (list.length > 0) {
      for (let index = 0; index <= Math.floor((list.length - 1) / 2); index++) {
        await pages[0].waitForSelector(
          racing.objects.filterOptions.resultWithDateIndex(index + 1)
        );
        const dateValue = await pages[0]
          .locator(racing.objects.filterOptions.resultWithDateIndex(index + 1))
          .innerText();
        const actualDate = new Date(dateValue).toISOString().split("T")[0];
        const expectedDate = now.toISOString().split("T")[0];
        expect(expectedDate == actualDate).toBeTruthy();
      }
    } else {
      expect(
        await pages[0]
          .locator(racing.objects.filterOptions.noResult)
          .isVisible()
      ).toBeTruthy();
    }
    await pages[0].waitForSelector(
      racing.objects.filterOptions.resetDateFilterIcon
    );
    await pages[0].click(racing.objects.filterOptions.resetDateFilterIcon);
  });

  it("ZED-84 - Racing Service allows the user to filter out the results by Yesterday date's", async () => {
    await pages[0].waitForLoadState();
    await pages[0].waitForSelector(racing.objects.racingMenu.racingArrowButton);
    await pages[0].click(racing.objects.racingMenu.racingArrowButton);
    await pages[0].waitForSelector(racing.objects.racingMenu.resultLabel);
    await pages[0].click(racing.objects.racingMenu.resultLabel);
    await pages[0].waitForSelector(racing.objects.activeMenuLabel);
    await pages[0].waitForSelector(racing.objects.filterButton, {
      timeout: 5000,
    });
    await pages[0].click(racing.objects.filterButton);
    await pages[0].waitForSelector(racing.objects.filterOptions.dateLabel);
    await pages[0].click(racing.objects.filterOptions.dateLabel);
    await pages[0].dispatchEvent(
      racing.objects.filterOptions.dateFilterButton,
      "mousedown"
    );
    await pages[0].click(racing.objects.filterOptions.yesterdayOption);
    await pages[0].click(racing.objects.activeMenuLabel);
    await pages[0].waitForLoadState("domcontentloaded");
    let expectedDate = dateTimeFormat.format(now);
    const list = await pages[0].$$(racing.objects.resultsList);
    if (list.length > 0) {
      for (let index = 0; index <= Math.floor((list.length - 1) / 2); index++) {
        await pages[0].waitForSelector(
          racing.objects.filterOptions.resultWithDateIndex(index + 1)
        );
        const dateValue = await pages[0]
          .locator(racing.objects.filterOptions.resultWithDateIndex(index + 1))
          .innerText();
        expect(dateValue).toContain(expectedDate);
      }
    } else {
      expect(
        await pages[0]
          .locator(racing.objects.filterOptions.noResult)
          .isVisible()
      ).toBeTruthy();
    }
    await pages[0].waitForSelector(
      racing.objects.filterOptions.resetDateFilterIcon
    );
    await pages[0].click(racing.objects.filterOptions.resetDateFilterIcon);
  });

  it("ZED-85 - Racing Service allows the user to filter out the results by current week", async () => {
    await pages[0].waitForLoadState();
    await pages[0].waitForSelector(racing.objects.racingMenu.racingArrowButton);
    await pages[0].click(racing.objects.racingMenu.racingArrowButton);
    await pages[0].waitForSelector(racing.objects.racingMenu.resultLabel);
    await pages[0].click(racing.objects.racingMenu.resultLabel);
    await pages[0].waitForSelector(racing.objects.activeMenuLabel);
    await pages[0].waitForSelector(racing.objects.filterButton, {
      timeout: 5000,
    });
    await pages[0].click(racing.objects.filterButton);
    await pages[0].waitForSelector(racing.objects.filterOptions.dateLabel);
    await pages[0].click(racing.objects.filterOptions.dateLabel);
    await pages[0].dispatchEvent(
      racing.objects.filterOptions.dateFilterButton,
      "mousedown"
    );
    await pages[0].click(racing.objects.filterOptions.currentWeekOption);
    await pages[0].click(racing.objects.activeMenuLabel);
    await pages[0].waitForLoadState("domcontentloaded");
    let startDate = new Date(
      now.setDate(now.getDate() - now.getDay() + (now.getDay() == 0 ? -7 : 0))
    )
      .toISOString()
      .split("T")[0];
    let endDate = new Date(now.setDate(now.getDate() - now.getDay() + 6))
      .toISOString()
      .split("T")[0];
    const list = await pages[0].$$(racing.objects.resultsList);
    if (list.length > 0) {
      for (let index = 0; index <= Math.floor((list.length - 1) / 2); index++) {
        await pages[0].waitForSelector(
          racing.objects.filterOptions.resultWithDateIndex(index + 1)
        );
        const dateValue = await pages[0]
          .locator(racing.objects.filterOptions.resultWithDateIndex(index + 1))
          .innerText();
        const eventDate = new Date(dateValue);
        const eventIsoDate = new Date(
          eventDate.getTime() - eventDate.getTimezoneOffset() * 60000
        )
          .toISOString()
          .split("T")[0];
        expect(
          eventIsoDate >= startDate && eventIsoDate <= endDate
        ).toBeTruthy();
      }
    }
    await pages[0].waitForSelector(
      racing.objects.filterOptions.resetDateFilterIcon
    );
    await pages[0].click(racing.objects.filterOptions.resetDateFilterIcon);
  });

  it("ZED-86 - Racing Service allows the user to filter out the results by last week", async () => {
    await pages[0].waitForLoadState();
    await pages[0].waitForSelector(racing.objects.racingMenu.racingArrowButton);
    await pages[0].click(racing.objects.racingMenu.racingArrowButton);
    await pages[0].waitForSelector(racing.objects.racingMenu.resultLabel);
    await pages[0].click(racing.objects.racingMenu.resultLabel);
    await pages[0].waitForSelector(racing.objects.activeMenuLabel);
    await pages[0].waitForSelector(racing.objects.filterButton, {
      timeout: 5000,
    });
    await pages[0].click(racing.objects.filterButton);
    await pages[0].waitForSelector(racing.objects.filterOptions.dateLabel);
    await pages[0].click(racing.objects.filterOptions.dateLabel);
    await pages[0].dispatchEvent(
      racing.objects.filterOptions.dateFilterButton,
      "mousedown"
    );
    await pages[0].click(racing.objects.filterOptions.lastWeekOption);
    await pages[0].click(racing.objects.activeMenuLabel);
    await pages[0].waitForLoadState("domcontentloaded");
    let previousWeek = new Date(new Date().getTime() - 60 * 60 * 24 * 7 * 1000);
    var previousWeekDay = new Date(previousWeek);
    var day = previousWeekDay.getDay();
    var diffToMonday = previousWeek.getDate() - day + (day === 0 ? -7 : 0);
    var lastSunday = new Date(previousWeek.setDate(diffToMonday))
      .toISOString()
      .split("T")[0];
    var lastSaturday = new Date(previousWeekDay.setDate(diffToMonday + 6))
      .toISOString()
      .split("T")[0];
    const list = await pages[0].$$(racing.objects.resultsList);
    if (list.length > 0) {
      for (let index = 0; index <= Math.floor((list.length - 1) / 2); index++) {
        await pages[0].waitForSelector(
          racing.objects.filterOptions.resultWithDateIndex(index + 1)
        );
        const dateValue = await pages[0]
          .locator(racing.objects.filterOptions.resultWithDateIndex(index + 1))
          .innerText();
        const eventDate = new Date(dateValue);
        const eventIsoDate = new Date(
          eventDate.getTime() - eventDate.getTimezoneOffset() * 60000
        )
          .toISOString()
          .split("T")[0];
        expect(
          eventIsoDate >= lastSunday && eventIsoDate <= lastSaturday
        ).toBeTruthy();
      }
    }
    await pages[0].waitForSelector(
      racing.objects.filterOptions.resetDateFilterIcon
    );
    await pages[0].click(racing.objects.filterOptions.resetDateFilterIcon);
  });

  it("ZED-87 - Racing Service allows the user to filter out the results by current month", async () => {
    await pages[0].waitForLoadState();
    await pages[0].waitForSelector(racing.objects.racingMenu.racingArrowButton);
    await pages[0].click(racing.objects.racingMenu.racingArrowButton);
    await pages[0].waitForSelector(racing.objects.racingMenu.resultLabel);
    await pages[0].click(racing.objects.racingMenu.resultLabel);
    await pages[0].waitForSelector(racing.objects.activeMenuLabel);
    await pages[0].waitForSelector(racing.objects.filterButton, {
      timeout: 5000,
    });
    await pages[0].click(racing.objects.filterButton);
    await pages[0].waitForSelector(racing.objects.filterOptions.dateLabel);
    await pages[0].click(racing.objects.filterOptions.dateLabel);
    await pages[0].dispatchEvent(
      racing.objects.filterOptions.dateFilterButton,
      "mousedown"
    );
    await pages[0].click(racing.objects.filterOptions.currentMonthOption);
    await pages[0].click(racing.objects.activeMenuLabel);
    await pages[0].waitForLoadState("domcontentloaded");
    let startISODate = new Date(now.getFullYear(), now.getMonth(), 0)
      .toISOString()
      .split("T")[0];
    let endISODate = new Date(now.getFullYear(), now.getMonth() + 1, 0)
      .toISOString()
      .split("T")[0];
    const list = await pages[0].$$(racing.objects.resultsList);
    if (list.length > 0) {
      for (let index = 0; index <= Math.floor((list.length - 1) / 2); index++) {
        await pages[0].waitForSelector(
          racing.objects.filterOptions.resultWithDateIndex(index + 1)
        );
        const dateValue = await pages[0]
          .locator(racing.objects.filterOptions.resultWithDateIndex(index + 1))
          .innerText();
        const eventDate = new Date(dateValue);
        const eventIsoDate = new Date(
          eventDate.getTime() - eventDate.getTimezoneOffset() * 60000
        )
          .toISOString()
          .split("T")[0];
        expect(
          eventIsoDate >= startISODate && eventIsoDate <= endISODate
        ).toBeTruthy();
      }
    }
    await pages[0].waitForSelector(
      racing.objects.filterOptions.resetDateFilterIcon
    );
    await pages[0].click(racing.objects.filterOptions.resetDateFilterIcon);
  });

  it("ZED-88 - Racing Service allows the user to filter out the results by last month", async () => {
    await pages[0].waitForLoadState();
    await pages[0].waitForSelector(racing.objects.racingMenu.racingArrowButton);
    await pages[0].click(racing.objects.racingMenu.racingArrowButton);
    await pages[0].waitForSelector(racing.objects.racingMenu.resultLabel);
    await pages[0].click(racing.objects.racingMenu.resultLabel);
    await pages[0].waitForSelector(racing.objects.activeMenuLabel);
    await pages[0].waitForSelector(racing.objects.filterButton, {
      timeout: 5000,
    });
    await pages[0].click(racing.objects.filterButton);
    await pages[0].waitForSelector(racing.objects.filterOptions.dateLabel);
    await pages[0].click(racing.objects.filterOptions.dateLabel);
    await pages[0].dispatchEvent(
      racing.objects.filterOptions.dateFilterButton,
      "mousedown"
    );
    await pages[0].click(racing.objects.filterOptions.lastMonthOption);
    await pages[0].click(racing.objects.activeMenuLabel);
    await pages[0].waitForLoadState("domcontentloaded");
    const list = await pages[0].$$(racing.objects.resultsList);
    expect(list.length).toBeGreaterThan(0);
    await pages[0].waitForSelector(
      racing.objects.filterOptions.resetDateFilterIcon
    );
    await pages[0].click(racing.objects.filterOptions.resetDateFilterIcon);
  });

  it("ZED-89 - Racing Service allows the user to filter out the results by date range", async () => {
    await pages[0].waitForLoadState();
    await pages[0].waitForSelector(racing.objects.racingMenu.racingArrowButton);
    await pages[0].click(racing.objects.racingMenu.racingArrowButton);
    await pages[0].waitForSelector(racing.objects.racingMenu.resultLabel);
    await pages[0].click(racing.objects.racingMenu.resultLabel);
    await pages[0].waitForSelector(racing.objects.activeMenuLabel);
    await pages[0].waitForSelector(racing.objects.filterButton, {
      timeout: 5000,
    });
    await pages[0].click(racing.objects.filterButton);
    await pages[0].waitForSelector(racing.objects.filterOptions.dateLabel);
    await pages[0].click(racing.objects.filterOptions.dateLabel);
    await pages[0].dispatchEvent(
      racing.objects.filterOptions.dateFilterButton,
      "mousedown"
    );
    await pages[0].waitForSelector(
      racing.objects.filterOptions.activeDatesList
    );
    const activeDates = await pages[0].$$(
      racing.objects.filterOptions.activeDatesList
    );
    const length = await activeDates.length;
    await pages[0].click(racing.objects.filterOptions.activeDatesWithIndex(1));
    await pages[0].waitForTimeout(2000); // add some pacing time to simulate real-user behavior
    await pages[0].click(
      racing.objects.filterOptions.activeDatesWithIndex(length)
    );
    await pages[0].click(racing.objects.activeMenuLabel);
    await pages[0].waitForLoadState("domcontentloaded");
    const list = await pages[0].$$(racing.objects.resultsList);
    expect(list.length).toBeGreaterThan(0);
    await pages[0].waitForSelector(
      racing.objects.filterOptions.resetDateFilterIcon
    );
    await pages[0].click(racing.objects.filterOptions.resetDateFilterIcon);
  });
});
