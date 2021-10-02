const {
    RESULT_TAB
} = require("./Results");
class ResultsPage{

    constructor(page){
        this.page = page;
    }

    async validateEventsResultDisplay(){
        const listEventsResult = ".panel .label-content";
        try {
            await this.page.waitForSelector(listEventsResult, {timeout : 20000});
            const numberEventResult = await this.page.evaluate((locator)=> {
                return document.querySelectorAll(locator).length;
            }, listEventsResult);
            console.log("Number of Events result is: [%s]", numberEventResult);

            await expect(numberEventResult).toBeGreaterThan(0);
        }catch {
            throw new Error("There is no result display");
        }

    }

    async selectResultsTab() {
        console.log("--- Zed Run Automation Framework: Select the Results tab on Racing page ---");
        try {
            await this.page.waitForSelector(RESULT_TAB, {timeout : 0});
            await this.page.click(RESULT_TAB);
        }
        catch {
            throw new Error("Result Tab is not present or not clickable");
        }
    }

}
module.exports = { ResultsPage};
