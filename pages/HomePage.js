const {
    ACCEPT_BUTTON,
    STUD_SERVICE_LINK,
    BALANCE_INFO,
    MARKETPLACE_LINK,
    USER_AVATAR,
    ARROW_ICON,
    RACING_LINK,
    ETH_BALANCE,
    ZED_BALANCE,
    BREEDING_LINK,
    PROFILE_ICON,
    MY_STABLE,
    HOMEPAGE_ICON,
    STREAMING_NOW,
    DISCORD_CHAT,
    UP_AND_COMING,
    MORE_RACES_BUTTON,
    LIST_HORSE_ON_SALE,
    EXPLORE_MARKET_BUTTON,
    LIST_HORSE_IN_STUD,
    MORE_BREEDING_BUTTON,
    SHOW_HORSE_BUTTON
} = require("../locators/ZedRun");
const {
    EVENT_TAB
} = require("../locators/Racing");
const {WALLET_ICON} = require("../locators/Wallet");

class HomePage {
    constructor(page) {
        this.page = page;
        this.page.setDefaultTimeout(45000);
    }

    async bringToFront() {
        console.log("---- Zed Run Automation Framework: Bring page upfront ---");
        await this.page.bringToFront();
    }

    async clickOnAcceptButton() {
        console.log(
            "---- Zed Run Automation Framework: Click on Accept button ---"
        );
        try {
            await expect(this.page).toHaveSelector(ACCEPT_BUTTON, {timeout: 0});
            await this.page.click(ACCEPT_BUTTON);
        } catch {
            throw new Error("Accept button is not present or not clickable");
        }
    }

    async clickOnWalletIcon() {
        console.log("---- Zed Run Automation Framework: Click on Wallet icon ---");
        try {
            await expect(this.page).toHaveSelector(WALLET_ICON, {timeout: 0});
            await this.page.click(WALLET_ICON);
        } catch {
            throw new Error("Wallet icon is not present or clickable");
        }
    }

    async clickOnMarketplaceLink() {
        console.log(
            "---- Zed Run Automation Framework: Click on Marketplace link ---"
        );
        try {
            await expect(this.page).toHaveSelector(MARKETPLACE_LINK, {
                timeout: 0,
            });
            await this.page.click(MARKETPLACE_LINK);
        } catch {
            throw new Error("Marketplace link is not presnet or clickable");
        }
    }

    async checkIfAvatarPresent() {
        console.log(
            "---- Zed Run Automation Framework: Check if user avatar is present ---"
        );
        try {
            await expect(this.page).toHaveSelector(USER_AVATAR, {
                timeout: 0,
            });
        } catch {
            throw new Error("User avatar is not present");
        }
    }

    async clickOnArrowIcon() {
        console.log("---- Zed Run Automation Framework: Click on arrow icon ---");
        try {
            await expect(this.page).toHaveSelector(ARROW_ICON, {timeout: 0});
            await this.page.click(ARROW_ICON);
        } catch {
            throw new Error("Arrow icon is not present or clickable");
        }
    }

    async clickOnStudServiceLink() {
        console.log("---- Zed Run Automation Framework: Click on Stud service ---");
        try {
            await expect(this.page).toHaveSelector(STUD_SERVICE_LINK, {
                timeout: 0,
            });
            await this.page.click(STUD_SERVICE_LINK);
        } catch {
            throw new Error("Stud service link is not present or clickable");
        }
    }

    async clickOnRacingLink() {
        console.log("---- Zed Run Automation Framework: Click on Racing link ---");
        try {
            await expect(this.page).toHaveSelector(RACING_LINK, {timeout: 0});
            await this.page.click(RACING_LINK);
        } catch {
            throw new Error("Racing link is not present or clickable");
        }
    }


    async waitForBalanceInfoToBeShown() {
        try {
            await expect(this.page).toHaveSelectorCount(BALANCE_INFO, 2);
        } catch {
            throw new Error("Element is not present yet!");
        }
    }

    async selectEventsTab() {
        console.log("--- Zed Run Automation Framework: Select the Events tab on Racing page ---");
        try {
            await this.page.waitForSelector(EVENT_TAB, {timeout : 0});
            await this.page.click(EVENT_TAB);
        }
        catch {
            throw new Error("Events Tab is not present or not clickable");
        }
    }


    async waitForLoadState() {
        await this.page.waitForLoadState();
    }

    async clickOnBreedingLink() {
        console.log(
            "---- Zed Run Automation Framework: Click on Breeding link ---"
        );
        try {
            await expect(this.page).toHaveSelector(BREEDING_LINK, {timeout: 0});
            await this.page.click(BREEDING_LINK);
        } catch {
            throw new Error("Breeding link is not shown!");
        }
    }

    async checkIfAvatarPresent() {
        console.log(
            "---- Zed Run Automation Framework: Check if user avatar is present ---"
        );
        try {
            await this.page.waitForSelector(USER_AVATAR, {
                visible: true,
                timeout: 0,
            });
        } catch {
            throw new Error("User avatar is not present");
        }
    }

    async clickOnArrowIcon() {
        console.log("---- Zed Run Automation Framework: Click on arrow icon ---");
        try {
            await this.page.waitForSelector(ARROW_ICON, {timeout: 0});
            await this.page.click(ARROW_ICON);
        } catch {
            throw new Error("Arrow icon is not present or clickable");
        }
    }

    async clickOnStudServiceLink() {
        console.log("---- Zed Run Automation Framework: Click on Stud service ---");
        try {
            await this.page.waitForSelector(STUD_SERVICE_LINK, {
                timeout: 0,
            });
            await this.page.click(STUD_SERVICE_LINK);
        } catch {
            throw new Error("Stud service link is not present or clickable");
        }
    }

    async clickOnBreedingLink() {
        console.log(
            "---- Zed Run Automation Framework: Click on Breeding link ---"
        );
        try {
            await this.page.waitForSelector(BREEDING_LINK, {timeout: 0});
            await this.page.click(BREEDING_LINK);
        } catch {
            throw new Error("Breeding link is not shown!");
        }
    }

    async waitUntilBalanceShown() {
        console.log(
            "---- Zed Run Automation Framework: Wait until the balance shown ---"
        );
        try {
            await this.page.waitForSelector(BALANCE_INFO, {timeout: 0});
        } catch {
            throw new Error("The Balance is not present");
        }
    }

    async navigateToMyStablePage() {
        console.log(
            "---- Zed Run Automation Framework: Navigate to My Stable Page ---"
        );
        try {
            await this.page.waitForSelector(PROFILE_ICON, {timeout: 0});
            await this.page.click(PROFILE_ICON);

            await this.page.waitForSelector(MY_STABLE, {timeout: 0});
            await this.page.click(MY_STABLE);
        } catch {
            throw new Error("The Profile Icon or My Stable Page is not present");
        }
    }

    async navigateToHomePage() {
        console.log("---- Zed Run Automation Framework: Navigate To Home Page ---");
        try {
            await this.page.waitForSelector(HOMEPAGE_ICON, {timeout: 0});
            await this.page.click(HOMEPAGE_ICON);
        } catch {
            throw new Error("Cannot navigate to Home Page");
        }
    }

    async validateStreamingWidgetSection() {
        console.log("---- Zed Run Automation Framework: Validate the Streaming Widget Section on Home Page ---");
        try {
            await this.page.waitForSelector(STREAMING_NOW, {timeout: 10000});
            const getLinkStreaming = await this.page.evaluate((locator) => {
                return document.querySelector(locator).getAttribute('src');
            }, STREAMING_NOW);
            await expect(getLinkStreaming).toContain('https://player.twitch.tv');

        } catch {
            throw new Error("There is no Streaming widget section display");
        }
    }

    async validateDiscordWidgetSection() {
        console.log("---- Zed Run Automation Framework: Validate the Discord Widget Section on Home Page ---");
        try {
            await this.page.waitForSelector(DISCORD_CHAT, {timeout: 10000});
            const getLinkDiscordChat = await this.page.evaluate((locator) => {
                return document.querySelector(locator).getAttribute('src');
            }, DISCORD_CHAT);
            await expect(getLinkDiscordChat).toContain('https://widgetbot.io/channels');
        } catch {
            throw new Error("There is no Discord widget section display");
        }
    }

    async validateRaceSection() {
        console.log("---- Zed Run Automation Framework: Validate the Race Section on Home Page ---");
        try {
            await this.page.waitForSelector(UP_AND_COMING, {timeout: 10000});
            const checkUpAndComingVisible = await this.page.isVisible(UP_AND_COMING);
            if (checkUpAndComingVisible) {
                const totalUpAndComing = await this.page.evaluate((locator) => {
                    return document.querySelectorAll(locator).length;
                }, UP_AND_COMING);
                await expect(totalUpAndComing).toBeGreaterThan(0);
            }
            console.log("---- Zed Run Automation Framework: Validate the More Races Button on Home Page ---");
            const checkMoreRacesButton = await this.page.isVisible(MORE_RACES_BUTTON);
            if (!checkMoreRacesButton) {
                throw new Error("The More Races button does not display as expected");
            }
        } catch {
            throw new Error("The Race Section does not display as expected");
        }
    }

    async validateHorseOnSaleSection() {
        console.log("---- Zed Run Automation Framework: Validate the Horse On Sale Section on Home Page ---");
        try {
            await this.page.waitForSelector(LIST_HORSE_ON_SALE, {timeout: 10000});
            const checkHorseOnSaleVisible = await this.page.isVisible(LIST_HORSE_ON_SALE);
            if (checkHorseOnSaleVisible) {
                const totalHorseOnSale = await this.page.evaluate((locator) => {
                    return document.querySelectorAll(locator).length;
                }, LIST_HORSE_ON_SALE);
                await expect(totalHorseOnSale).toBeGreaterThan(0);
            }

            console.log("---- Zed Run Automation Framework: Validate the Explore Market Button on Home Page ---");
            const checkExploreMarketButton = await this.page.isVisible(EXPLORE_MARKET_BUTTON);
            if (!checkExploreMarketButton) {
                throw new Error("The Explore Market button does not display as expected");
            }
        } catch {
            throw new Error("The Horse On Sale does not display as expected");
        }
    }

    async validateInStudSection() {
        console.log("---- Zed Run Automation Framework: Validate the In Stub Section on Home Page ---");
        try {
            await this.page.waitForSelector(LIST_HORSE_IN_STUD, {timeout: 10000});
            const checkListHorseInStudVisible = await this.page.isVisible(LIST_HORSE_IN_STUD);
            if (checkListHorseInStudVisible) {
                const totalHorseInStud = await this.page.evaluate((locator) => {
                    return document.querySelectorAll(locator).length;
                }, LIST_HORSE_IN_STUD);
                await expect(totalHorseInStud).toBeGreaterThan(0);
            }

            console.log("---- Zed Run Automation Framework: Validate the More Breeding Button on Home Page ---");
            const checkMoreBreedingButton = await this.page.isVisible(MORE_BREEDING_BUTTON);
            if (!checkMoreBreedingButton) {
                throw new Error("The More Breeding button does not display as expected");
            }
        } catch {
            throw new Error("The Horse In Stud does not display as expected");
        }
    }

    async validateZEDSection() {
        console.log("---- Zed Run Automation Framework: Validate the ZED Section on Home Page ---");
        try {
            const checkShowHorseButton = await this.page.isVisible(SHOW_HORSE_BUTTON);
            if (!checkShowHorseButton) {
                throw new Error("The Show Horse button does not display as expected");
            }
        } catch {
            throw new Error("The ZED Section does not display as expected");
        }
    }

    async validateFooterSection() {
        console.log("---- Zed Run Automation Framework: Validate the Footer Section on Home Page ---");
        try {

        } catch {
            throw new Error("");
        }
    }
}

module.exports = {HomePage};
