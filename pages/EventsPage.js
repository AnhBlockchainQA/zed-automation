
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



}
module.exports = { EventsPage};