const {
    EVENT_TAB
} = require("../locators/Racing");
class EventsPage{

    constructor(page){
        this.page = page;
    }

    async validateRacesOpenAndListEvents(){
        const raceOpen = ".race-filters .btn-group-toggle";
        const listEvents = ".panel .label-content";

        const numberRacesOpen = await this.page.evaluate((locator)=> {
            return document.querySelectorAll(locator).length;
        }, raceOpen);
        console.log("Number of Races Open is: [%s]", numberRacesOpen);

        const numberOfEvents = await this.page.evaluate((locator)=> {
            return document.querySelectorAll(locator).length;
        }, listEvents);
        console.log("Number of Events is: [%s]", numberOfEvents);

        await expect(numberRacesOpen).toBeGreaterThan(0);
        await expect(numberOfEvents).toBeGreaterThan(0);


    }

    async selectEventsTab() {
        console.log("--- Zed Run Automation Framework: Select the Events tab on Racing page ---");
        try {
            await this.page.waitForSelector(EVENT_TAB, {timeout : 0});
            await this.page.click(EVENT_TAB);
        }
        catch {
            throw new Error("Marketplace Tab is not present or not clickable");
        }
    }




}
module.exports = { EventsPage};