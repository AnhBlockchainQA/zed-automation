const {
  CLICK_NEXT_BUTTON,
  CLICK_CONNECT_BUTTON,
  CLICK_SIGN_BUTTON,
  CLICK_CONFIRM_BUTTON,
} = require("../locators/Metamask");

class MetamaskNotificationPage {
  constructor(page) {
    this.page = page;
    this.page.setDefaultTimeout(45000);
  }

  async clickOnNextButton() {
    console.log("--- Zed Run Automation Framework: Click on Next button ---");
    try {
      await expect(this.page).toHaveSelector(CLICK_NEXT_BUTTON, { timeout: 0 });
      await this.page.click(CLICK_NEXT_BUTTON);
    } catch {
      throw new Error("Error button is not shown or clickable");
    }
  }

  async clickOnConnectButton() {
    console.log(
      "--- Zed Run Automation Framework: Click on Connect button ---"
    );
    await expect(this.page).toHaveSelector(CLICK_CONNECT_BUTTON, {
      timeout: 0,
    });
    await this.page.click(CLICK_CONNECT_BUTTON);
  }

  async clickOnSignButton() {
    console.log("--- Zed Run Automation Framework: Click on Sign button ---");
    await expect(this.page).toHaveSelector(CLICK_SIGN_BUTTON, { timeout: 0 });
    await this.page.click(CLICK_SIGN_BUTTON);
  }

  async waitForLoadState() {
    console.log("--- Zed Run Automation Framework: Wait for load state ---");
    await this.page.waitForLoadState();
  }

  async waitForCloseEvent() {
    console.log("--- Zed Run Automation Framework: Wait for close event ---");
    await this.page.waitForEvent("close");
  }

  async clickOnConfirmButton() {
    console.log(
      "--- Zed Run Automation Framework: Click on Confirm button  ---"
    );
    try {
      await expect(this.page).toHaveSelector(CLICK_CONFIRM_BUTTON, {
        timeout: 0,
      });
      await this.page.click(CLICK_CONFIRM_BUTTON);
    } catch {
      throw new Error("Confirm button is not present or clickable!");
    }
  }
}

module.exports = { MetamaskNotificationPage };
