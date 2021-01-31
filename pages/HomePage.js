const {
    ACCEPT_BUTTON,
    MARKETPLACE_LINK,
    USER_AVATAR,
    ARROW_ICON,
    STUD_SERVICE_LINK,
    RACING_LINK,
    ETH_BALANCE,
    ZED_BALANCE,
    BREEDING_LINK,
    PROFILE_ICON,
    MY_STABLE
} = require("../locators/ZedRun");
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
            await this.page.waitForSelector(ACCEPT_BUTTON, {
                visible: true,
                timeout: 0,
            });
            await this.page.click(ACCEPT_BUTTON);
        } catch {
            throw new Error("Accept button is not present or not clickable");
        }
    }

    async clickOnWalletIcon() {
        console.log("---- Zed Run Automation Framework: Click on Wallet icon ---");
        try {
            await this.page.waitForSelector(WALLET_ICON, {
                timeout: 5000,
            });
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
            await this.page.waitForSelector(MARKETPLACE_LINK, {
                timeout: 0,
            });
            await this.page.click(MARKETPLACE_LINK);
        } catch {
            throw new Error("Marketplace link is not present or clickable");
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

    async clickOnRacingLink() {
        console.log("---- Zed Run Automation Framework: Click on Racing link ---");
        try {
            await this.page.waitForSelector(RACING_LINK, {timeout: 0});
            await this.page.click(RACING_LINK);
        } catch {
            throw new Error("Racing link is not present or clickable");
        }
    }

    async waitForBalanceInfoToBeShown() {
        try {
            await this.page.waitForSelector(ETH_BALANCE, {
                visible: true,
                timeout: 420000,
            });
            await this.page.waitForSelector(ZED_BALANCE, {
                visible: true,
                timeout: 420000,
            });
        } catch {
            throw new Error("Element is not present yet!");
        }
    }

    async waitForLoadState() {
        await this.page.waitForLoadState();
    }

    async clickOnBreedingLink() {
        console.log("---- Zed Run Automation Framework: Click on Breeding link ---");
        try {
            await this.page.waitForSelector(BREEDING_LINK, {timeout: 0});
            await this.page.click(BREEDING_LINK);
        } catch {
            throw new Error("Breeding link is not shown!");
        }
    }

    async waitUntilBalanceShown() {
        console.log("---- Zed Run Automation Framework: Wait until the balance shown ---");
        try {
            await this.page.waitForSelector(zedRunConfig.BALANCE_INFO, {timeout: 0});
        }
        catch {
            throw new Error("The Balance is not present");
        }

    }

    async navigateToMyStablePage(){
        console.log("---- Zed Run Automation Framework: Navigate to My Stable Page ---");
        try {
            await this.page.waitForSelector(PROFILE_ICON, {timeout: 0});
            await this.page.click(PROFILE_ICON);

            await this.page.waitForSelector(MY_STABLE, {timeout: 0});
            await this.page.click(MY_STABLE);
        }
        catch {
            throw new Error("The Profile Icon or My Stable Page is not present");
        }
    }
}

module.exports = {HomePage};
