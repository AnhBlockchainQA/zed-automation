const {
    TOTAL_THOROUGHBREDS,
    NUMBER_HORSE
} = require("../locators/MyStable");
class MyStablePage{

    constructor(page){
        this.page = page;
    }

    async validateRaceHorseDisplayCorrectly(){
        const getCurrentThoroughbreds = await this.page.evaluate((locator)=> {
            return document.querySelector(locator).innerText;
        }, TOTAL_THOROUGHBREDS);
        console.log("Currently, the Thoroughbreds is: [%s]", getCurrentThoroughbreds);

        await this.page.waitForSelector(NUMBER_HORSE, {timeout : 20000});
        const getListOfRaceHorseDisplay = await this.page.evaluate((locator)=> {
            return document.querySelectorAll(locator).length;
        }, NUMBER_HORSE);
        console.log("Currently, the number of racehorse displays: [%s]", getListOfRaceHorseDisplay);

        if(parseInt(getCurrentThoroughbreds) <= 10){
            await expect(parseInt(getListOfRaceHorseDisplay)).toEqual(parseInt(getCurrentThoroughbreds));
        } else {
            await expect(parseInt(getListOfRaceHorseDisplay)).toBeLessThanOrEqual(parseInt(getCurrentThoroughbreds));
        }
    }
}
module.exports = { MyStablePage};