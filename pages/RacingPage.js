const racingConfig = require("../locators/Racing");
const {EVENT_LIST_SIZE} = require("../data/env");
const stringUtils = require("../utils/api/stringUtils");
const {REGEX} = require("../data/env");
const {ADD_RACE_CONFIRM_BUTTON} = require("../locators/Payment");
const { RACING_EVENT_INFO, CUSTOM_CLASS_BUTTON, OPEN_GATE_LIST} = require("../locators/Racing");
const { MetamaskFactory } = require("../utils/browser/metamaskFactory");
var confirmMetamaskNotificationInstance;
var metamaskFactory = new MetamaskFactory();
const { ACCEPT_BUTTON } = require("../locators/ZedRun");

class RacingPage {
    constructor(page) {
        this.page = page;
        this.page.setDefaultTimeout(30000);
    }

    async bringToFront(){
        await this.page.bringToFront();
    }

    async waitUntilRacingEventShown() {
        console.log(
            "--- Zed Run Automation Framework: Wait until racing event shown ---"
        );
        await this.page.waitForFunction(
            ([locator, value]) => {
                return document.querySelectorAll(locator).length >= value;
            },
            [racingConfig.RACING_EVENT_LIST, EVENT_LIST_SIZE],
            {polling: 10000, timeout: 300000}
        );
    }

    async selectEntryFreeEvent() {
        console.log(
            "--- Zed Run Automation Framework: Wait until free entry event shown then click on---"
        );
        await this.page.waitForSelector(racingConfig.RACING_ENTRY_FREE, {
            timeout: 10000,
        });
        await this.page.click(racingConfig.RACING_ENTRY_FREE);
    }

    async selectFirstEntryHasFeeEvent() {
        console.log(
            "--- Zed Run Automation Framework: Wait until entry has a fee event shown then click on---"
        );
        await this.page.waitForSelector(racingConfig.RACING_ENTRY_HAS_FEE, {
            timeout: 0,
        });
        const numberOfRacing = await this.page.evaluate((locator) => {
            return document.querySelectorAll(locator).length;
        }, racingConfig.RACING_ENTRY_HAS_FEE);
        console.log("Has fee event", numberOfRacing);
        await this.page.click(racingConfig.RACING_ENTRY_HAS_FEE);
    }

    async returnEventName() {
        console.log("--- Zed Run Automation Framework: Get the Event Name---");
        await this.page.waitForSelector(racingConfig.RACING_EVENT_SELECTED, {
            timeout: 0,
        });
        const eventSelected = await this.page.evaluate((locator) => {
            return document.querySelector(locator).innerText;
        }, racingConfig.RACING_EVENT_SELECTED);
        return eventSelected;
    }

    async getGateOpening() {
        console.log(
            "--- Zed Run Automation Framework: Wait until the open gates display---"
        );
        await this.page.waitForSelector(OPEN_GATE_LIST, {timeout: 0});
        let listOfGate = [];

        const size = await this.page.evaluate((locator) => {
            return document.querySelectorAll(locator).length;
        }, listGateElement);
        console.log("Number of Gate are opening", size);

        for (let i = 2; i <= size + 1; i++) {
            let openingGates = `.buy-in-content .pick-gate .gate-group .gate-btn:nth-child(${i})`;
            const openGates = await this.page.evaluate((locator) => {
                return document.querySelector(locator).innerText;
            }, openingGates);
            listOfGate.push(openGates);
        }
        let numberOfGate = listOfGate
            .map((number) => {
                const check = Number.isInteger(parseInt(number));
                if (check) {
                    return number;
                }
            })
            .filter((e) => !!e);
        return numberOfGate;
    }

    async clickGateNumberAndSelectHorse(index) {
        console.log(
            `--- Zed Run Automation Framework: Select the open gate ${index} and add the racehorse ---`
        );

        await this.page.click(
            `//div[contains(@class,'pick-gate')]//div[@class='gate-group']/div[@class='gate-btn' and descendant::text()='${index}']`
        );
        await this.page.waitForLoadState();
        await this.page.hover(`.horse-infos`);
        await this.page.click('text="Enter"');
        await this.page.waitForLoadState();
    }

    async clickOnGateOpen(index) {
        console.log(
            `--- Zed Run Automation Framework: Select the open gate ${index} ---`
        );

        await this.page.click(
            `//div[contains(@class,'pick-gate')]//div[@class='gate-group']/div[@class='gate-btn' and descendant::text()='${index}']`
        );
        await this.page.waitForLoadState();
    }

    async bringToFront() {
        console.log("--- Zed Run Automation Framework: Bring page to upfront ---");
        await this.page.bringToFront();
    }

    async addRaceHorseIntoRace() {
        console.log(
            "--- Zed Run Automation Framework: Add racehorse into a race---"
        );
        let listNumber = await this.getGateOpening();
        console.log("List of gates: ", listNumber.toString());
        console.log("Length of Gate: ", listNumber.length);
        for (let i = 0; i < listNumber.length; i++) {
            await this.page.click(
                `//div[contains(@class,'pick-gate')]//div[@class='gate-group']/div[@class='gate-btn' and descendant::text()=${listNumber[i]}]`
            );
            await this.page.waitForLoadState();
            await this.page.hover(`.horse-infos`);
            await this.page.click('text="Free Entry"');
            await this.page.waitForLoadState();
        }
        await this.page.waitForLoadState();
        return await this.returnEventName();
    }


    async validateRacingEventAfterInNextToRun(expectedEvent) {
        console.log("Expected Event Name is: ", expectedEvent);
        const listOfNextToRun = ".next-run-list .race-name";
        try {
            await this.page.waitForSelector(listOfNextToRun, {
                timeout: 10000,
            });
        } catch (e) {
            throw new Error(`The Event name ${expectedEvent} do not display on Next To Run`);
        }
        const totalNextToRun = await this.page.evaluate((locator) => {
            return document.querySelectorAll(locator).length;
        }, listOfNextToRun);
        console.log("Total number of Event is: ", totalNextToRun);
        for (let i = 1; i < totalNextToRun + 1; i++) {
            const nameOfEventEle = `.next-run-list a:nth-child(${i}) .race-name span`;
            const nameOfEvent = await this.page.evaluate((locator) => {
                return document.querySelector(locator).innerText;
            }, nameOfEventEle);
            if (expectedEvent.includes(nameOfEvent)) {
                await this.page.click(
                    `//div[@class='race-list']/div[@class='next-run-list']/a[@class='race-tile ']//span[text()='${nameOfEvent}']`
                );
                break;
            }
        }
        const raceEventNameEle = ".race-description .race-name";
        await this.page.waitForSelector(raceEventNameEle, {
            timeout: 0,
        });
        const actualEventName = await this.page.evaluate((locator) => {
            return document.querySelector(locator).innerText;
        }, raceEventNameEle);
        console.log("Actual Event Name Detail is: ", actualEventName);
        await expect(expectedEvent).toEqual(actualEventName);
    }

    async getListOfRacingEvents() {
        console.log(
            "--- Zed Run Automation Framework: Get list of racing event ---"
        );
        await this.page.waitForSelector(racingConfig.RACING_EVENT_LIST, {
            timeout: 0,
        });
        const size = await this.page.evaluate((locator) => {
            return document.querySelectorAll(locator).length;
        }, racingConfig.RACING_EVENT_LIST);
        console.log(">>>>>> Size of free racing event list: ", size);
        return size;
    }

    async getRandomIndexOfRacingEvent() {
        console.log(
            "--- Zed Run Automation Framework: Get random index of free racing event ---"
        );
        let size = await this.getListOfRacingEvents();
        const index = Math.floor(Math.random() * size + 1);
        console.log(">>>>>> Index: ", index);
        return index;
    }

    async scrollToEventByIndexIfNeeded(i) {
        console.log(
            "--- Zed Run Automation Framework: Scroll to free event by index if needed ---"
        );
        let locator = await stringUtils.replaceTemplateString(
            REGEX.NUMBER,
            racingConfig.SELECTED_RACING_EVENT,
            i
        );
        await this.page.waitForSelector(locator, {timeout: 0});
        if (i !== 1) {
            await this.page.evaluate((selector) => {
                document.querySelector(selector).scrollIntoView(true);
            }, locator);
        }
    }

    async clickOnRacingEventWithIndex(i) {
        console.log(
            "--- Zed Run Automation Framework: Click on free racing event by index " +
            i +
            " ---"
        );
        let locator = await stringUtils.replaceTemplateString(
            REGEX.NUMBER,
            racingConfig.SELECTED_RACING_EVENT,
            i
        );
        await this.page.waitForSelector(locator, {timeout: 0});
        await this.page.click(locator);
    }

    async getRegisteredHorsesInfo(i) {
        console.log(
            "--- Zed Run Automation Framework: Get registered horses info of racing event with index " +
            i +
            " ---"
        );
        let locator = await stringUtils.replaceTemplateString(
            REGEX.NUMBER,
            racingConfig.SELECTED_GATE_REGISTERED_INFO,
            i
        );
        await this.page.waitForSelector(locator, {timeout: 0});
        return await this.page.evaluate((selector) => {
            return document.evaluate(
                selector,
                document,
                null,
                XPathResult.FIRST_ORDERED_NODE_TYPE,
                null
            ).singleNodeValue.innerText;
        }, locator);
    }

    async getNumberOfRegisteredHorse(i) {
        console.log(
            "--- Zed Run Automation Framework: Get number of registered horses of racing with index " +
            i +
            " ---"
        );
        const info = await this.getRegisteredHorsesInfo(i);
        return Number(stringUtils.splitStringByRegEx("/", info, 0));
    }

    async getTotalNumberOfHorses(i) {
        console.log(
            "--- Zed Run Automation Framework: Get total number of horses of racing with index " +
            i +
            " ---"
        );
        const info = await this.getRegisteredHorsesInfo(i);
        return Number(stringUtils.splitStringByRegEx("/", info, 1));
    }

    async scrollToOpenGatesBox(i) {
        console.log(
            "--- Zed Run Automation Framework: Scroll to open gate box of racing with index " +
            i +
            " ---"
        );
        let locator = await stringUtils.replaceTemplateString(
            REGEX.NUMBER,
            racingConfig.SELECTED_RACING_EVENT_GATE_HEADER,
            i
        );
        await this.page.waitForSelector();
        await this.page.evaluate((selector) => {
            document.querySelector(selector).scrollIntoView(true);
        }, locator);
    }

    async getRacingEventNameByIndex(i) {
        console.log(
            "--- Zed Run Automation Framework: Get racing event name with index " +
            i +
            " ---"
        );
        let locator = await stringUtils.replaceTemplateString(
            REGEX.NUMBER,
            racingConfig.SELECTED_RACING_EVENT_NAME,
            i
        );
        await this.page.waitForSelector(locator, {timeout: 0});
        return await this.page.evaluate((selector) => {
            return document.querySelector(selector).innerText;
        }, locator);
    }

    async getSizeOfOpenGatesList(i) {
        console.log(
            "--- Zed Run Automation Framework: Get size of open gates list of racing with index " +
            i +
            " ---"
        );
        let locator = await stringUtils.replaceTemplateString(
            REGEX.NUMBER,
            racingConfig.SELECTED_RACING_EVENT_OPEN_GATES_LIST,
            i
        );
        await this.page.waitForSelector();
        return await this.page.evaluate((locator) => {
            return document.querySelectorAll(locator).length;
        }, locator);
    }

    async clickConfirmButton(){
        console.log("--- Zed Run Automation Framework: Click Confirm button to confirm add horses to race ---");
        try{
            await this.page.waitForSelector(ADD_RACE_CONFIRM_BUTTON, {timeout: 0,});
            await this.page.waitForLoadState();
            await this.page.click(ADD_RACE_CONFIRM_BUTTON);
        }catch {
            throw new Error('There is no Confirm display as expected')
        }

    }
    async waitForLoadState() {
        await this.page.waitForLoadState();
    }


    async validateOpenGatesListSizeCorrect(expectedValue, actualValue) {
        console.log(
            "--- Zed Run Automation Framework: Check if open gates list size is correct ---"
        );
        if (expectedValue == null) {
            throw new Error("Expected value is null! Please verify selector");
        }
        if (actualValue == null) {
            throw new Error("Actual value is null! Please verify selector");
        }
        if (expectedValue !== actualValue) {
            throw new Error(
                "Assertion failed: Actual total number of open gates [" +
                actualValue +
                "] is different to expected total number of open gates [" +
                expectedValue +
                "]"
            );
        }
    }

    async clickOnAcceptButton() {
        console.log(
            "---- Zed Run Automation Framework: Click on Accept button ---"
        );
        try {
            await this.page.waitForSelector(ACCEPT_BUTTON, {
                visible: true,
                timeout: 0,
            });
            await this.page.click(ACCEPT_BUTTON);
        } catch {
            throw new Error("Accept button is not present or not clickable");
        }
    }

    async clickOnRacingClass(clazzName){
        console.log(
            "--- Zed Run Automation Framework: Click on the racing class with name ---", clazzName
        );
        let locator = await stringUtils.replaceTemplateString(
            REGEX.TEXT,
            CUSTOM_CLASS_BUTTON,
            clazzName
          );
        try{
            console.log(" >>>> Locator : ", locator);
            await this.page.waitForSelector(locator, {timeout: 0});
            await this.page.click(locator);
        }catch{
            throw new Error("Selector not found or dettached! Please update your selector");
        }
    }
    
    async goToRaceByLink(url){
        console.log(
            "--- Zed Run Automation Framework: Navigate to race event by link ---", url);
        try{
            await this.page.goto(url);
            await this.page.waitForLoadState();
        }catch{
            throw new Error('URL is unreachable or incorrect');
        }  

    }
}

module.exports = {RacingPage};
