const {
  DEPOSITE_BUTTON,
  DEPOSITE_AMOUNT_INPUT,
  DEPOSITE_TO_ZED_BUTTON,
  WITHDRAW_BUTTON,
  WITHDRAW_AMOUNT_INPUT,
  WITHDRAW_FROM_ZED_BUTTON,
  ZED_BALANCE,
  ETH_BALANCE,
  CONFIRM_DEPOSITE_BUTTON,
} = require("../locators/Wallet");
const { threshold } = require("../utils/api/api");

class WalletPage {
  constructor(page) {
    this.page = page;
    this.page.setDefaultTimeout(300000);
  }

  async clickOnDepositButton() {
    try {
      console.log(
        " ---- Zed Run Automation Framework: Click on Deposit button ---"
      );
      await this.page.waitForSelector(DEPOSITE_BUTTON, {
        visible: true,
        timeout: 0,
      });
      await this.page.click(DEPOSITE_BUTTON);
    } catch {
      throw new Error("Deposit button is not present yet!");
    }
  }

  async typeDepositeAmount(amount) {
    try {
      console.log(
        " ---- Zed Run Automation Framework: Type deposit amount ---"
      );
      await this.page.waitForSelector(DEPOSITE_AMOUNT_INPUT, {
        visible: true,
        timeout: 0,
      });
      await this.page.fill(DEPOSITE_AMOUNT_INPUT, "");
      await this.page.type(DEPOSITE_AMOUNT_INPUT, amount, {
        delay: 50,
      });
    } catch {
      throw new Error("Deposit amount input field is not present yet!");
    }
  }

  async clickOnDepositeToZedWallet() {
    try {
      console.log(
        " ---- Zed Run Automation Framework: Click on Deposite to Zed Balance button ---"
      );
      await this.page.waitForSelector(DEPOSITE_TO_ZED_BUTTON, {
        visible: true,
        timeout: 0,
      });
      await this.page.click(DEPOSITE_TO_ZED_BUTTON);
    } catch {
      throw new Error("Deposite to Zed Balance button is not present!");
    }
  }

  async clickOnWithdrawButton() {
    try {
      console.log(
        " ---- Zed Run Automation Framework: Click on Withdraw button ---"
      );
      await this.page.waitForSelector(WITHDRAW_BUTTON, {
        timeout: 0,
        visible: true,
      });
      await this.page.click(WITHDRAW_BUTTON);
    } catch {
      throw new Error("Withdraw button is not present!");
    }
  }

  async typeWithDrawAmount(amount) {
    try {
      console.log(
        " ---- Zed Run Automation Framework: Type withdraw amount ---"
      );
      await this.page.waitForSelector(WITHDRAW_AMOUNT_INPUT, {
        visible: true,
        timeout: 0,
      });
      await this.page.fill(WITHDRAW_AMOUNT_INPUT, "");
      await this.page.type(WITHDRAW_AMOUNT_INPUT, amount, {
        delay: 50,
      });
    } catch {
      throw new Error("Withdraw amount input field is not present");
    }
  }

  async clickOnWithdrawFromZedWallet() {
    try {
      console.log(
        " ---- Zed Run Automation Framework: Click on Withdraw from Zed Balance ---"
      );
      await this.page.waitForSelector(WITHDRAW_FROM_ZED_BUTTON, {
        visible: true,
        timeout: 0,
      });
      await this.page.click(WITHDRAW_FROM_ZED_BUTTON);
    } catch {
      throw new Error("Withdraw from ZED Balance button is not present!");
    }
  }

  async getBalance(locator) {
    try {
      console.log(" ---- Zed Run Automation Framework: Get the balance ---");
      await this.page.waitForSelector(locator, { timeout: 0 });
      await this.page.waitForFunction(
        (locator) => {
          return Number(document.querySelector(locator).innerText) > 0;
        },
        locator,
        4000,
        { timeout: 0 }
      );
      const value = await this.page.evaluate((locator) => {
        return document.querySelector(locator).innerText;
      }, locator);
      return Number(value);
    } catch {
      throw new Error("Balance is not present!");
    }
  }

  async checkIfBalanceUpdated(locator, oldValue, newValue) {
    console.log(
      " ---- Zed Run Automation Framework: Check if balance updated ---"
    );
    await this.page.waitForSelector(locator, { timeout: 0 });
    await this.page.waitForFunction(
      ([locator, oldValue]) => {
        return Number(document.querySelector(locator).innerText) < oldValue;
      },
      [locator, oldValue],
      5000,
      { timeout: 120000 }
    );
    const value = await this.page.evaluate((locator) => {
      return document.querySelector(locator).innerText;
    }, locator);
    if (Number(value).toFixed(2).trim() !== newValue.toFixed(2).trim()) {
      console.log(
        "Assertion failed: Actual balance [%s] is different to expected value [%s]",
        Number(value).toFixed(2).trim(),
        newValue.toFixed(2).trim()
      );
      return false;
    } else {
      return true;
    }
  }

  async getZedBalance() {
    try {
      console.log(" ---- Zed Run Automation Framework: Get Zed Balance ---");
      return await this.getBalance(ZED_BALANCE);
    } catch {
      throw new Error("ZED Balance is not present!");
    }
  }

  async getETHBalance() {
    try {
      console.log(" ---- Zed Run Automation Framework: Get ETH Balance ---");
      return await this.getBalance(ETH_BALANCE);
    } catch {
      throw new Error("ETH Balance is not present!");
    }
  }

  async checkIfZedBalanceUpdated(oldValue, newValue) {
    console.log(
      " ---- Zed Run Automation Framework: Check if Zed balance is updated ---"
    );
    return await this.checkIfBalanceUpdated(ZED_BALANCE, oldValue, newValue);
  }

  async checkIfETHBalanceUpdated(oldValue, newValue) {
    console.log(
      " ---- Zed Run Automation Framework: Check if ETH balance is updated ---"
    );
    return await this.checkIfBalanceUpdated(ETH_BALANCE, oldValue, newValue);
  }

  async scrollToZedBalance() {
    console.log(
      " ---- Zed Run Automation Framework: Scroll to Zed balance section ---"
    );
    await this.page.waitForSelector(ZED_BALANCE, {
      visible: true,
      timeout: 0,
    });
    await this.page.evaluate((locator) => {
      document.querySelector(locator).scrollIntoView(true);
    }, ZED_BALANCE);
  }

  async clickOnConfirmDepositeButton() {
    console.log(
      " ---- Zed Run Automation Framework: Click on Confirm button to confirm deposite action ---"
    );
    try {
      await this.page.waitForSelector(CONFIRM_DEPOSITE_BUTTON, {
        visible: true,
        timeout: 0,
      });
      await this.page.click(CONFIRM_DEPOSITE_BUTTON);
    } catch {
      throw new Error("Confirm button is not present");
    }
  }

  async bringToFront() {
    await this.page.bringToFront();
  }
}

module.exports = { WalletPage };
