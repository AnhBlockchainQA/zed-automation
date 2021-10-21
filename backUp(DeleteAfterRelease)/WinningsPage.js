const {
    WINNINGS_TAB
} = require("./Winnings");
class WinningsPage{

    constructor(page){
        this.page = page;
    }

    async validateListOfWinningsDisplay() {
        const listOfWinningResult = ".list-content .horse-row";
        try {
            await this.page.waitForSelector(listOfWinningResult, {timeout : 20000});
            const numberWinningsResult = await this.page.evaluate((locator) => {
                return document.querySelectorAll(locator).length;
            }, listOfWinningResult);
            console.log("Number of Winnings  is: [%s]", numberWinningsResult);
            expect(numberWinningsResult).toBeGreaterThan(0);
        } catch {
            throw new Error("There is none of Winnings display");
        }
    }

    async selectWinningsTab() {
        console.log("--- Zed Run Automation Framework: Select the Winning tab on Racing page ---");
        try {
            await this.page.waitForSelector(WINNINGS_TAB, {timeout : 0});
            await this.page.click(WINNINGS_TAB);
        }
        catch {
            throw new Error("Winnings Tab is not present or not clickable");
        }
    }

}
module.exports = { WinningsPage};
