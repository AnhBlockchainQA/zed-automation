const { REGEX } = require("../data/env");
const { TRANSACTION_ACTION, CHARGE_AMOUNT, ETH_CHARGE_AMOUNT, TRANSACTION_STATUS } = require("../locators/Detail");
const stringUtils = require("../utils/api/stringUtils");
class DetailPage {
  constructor(page) {
    this.page = page;
  }

  async waitForLoadState() {
    await this.page.waitForLoadState();
  }

  async bringToFront() {
    await this.page.bringToFront();
  }

  async verifyTransactionInfo(text) {
    console.log(
      "---- Zed Run Automation Framework: Verify if transaction info contains [%s] ---",
      text
    );
    await this.page.waitForSelector(TRANSACTION_ACTION, { timeout: 0 });
    const isVisible = await this.page.isVisible(TRANSACTION_ACTION);
    if (isVisible) {
      const transaction = await this.page.innerText(TRANSACTION_ACTION);
      if (!transaction.includes(text)) {
        throw new Error(
          `Assertion failed: Transaction ${transaction} did not contains ${text}`
        );
      }
    }
  }

  async verifyChargeAmount(amount) {
    console.log(
      "---- Zed Run Automation Framework: Verify if charge amount is [%s] ---",
      amount
    );
    await this.page.waitForSelector(CHARGE_AMOUNT, { timeout: 0 });
    const isVisible = await this.page.isVisible(CHARGE_AMOUNT);
    if (isVisible) {
      const chargeAmount = await this.page.innerText(CHARGE_AMOUNT);
      const actualValue = await stringUtils.matchStringByRegEx(REGEX.AMOUNT, chargeAmount, 0);
      console.log(" >>> Actual value: ", chargeAmount);
      console.log(" >>> Actual value: ", Number(actualValue).toFixed(2));
      console.log(" >>> Expected value: ", Number(amount).toFixed(2));
      if (Number(actualValue).toFixed(2) !== Number(amount).toFixed(2)) {
        throw new Error(
          `Assertion failed: Charge amount ${chargeAmount} is different to expected amount ${amount}`
        );
      }
    }
  }

  async verifyChargeAmountInETH(amount){
    console.log(
      "---- Zed Run Automation Framework: Verify if charge amount is [%s] ---",
      amount
    );
    await this.page.waitForLoadState();
    await this.page.waitForSelector(ETH_CHARGE_AMOUNT, { state: 'visible', timeout: 0 });
    const isVisible = await this.page.isVisible(ETH_CHARGE_AMOUNT, {timeout: 0});
    if (isVisible) {
      const chargeAmount = await this.page.innerText(ETH_CHARGE_AMOUNT);
      const actualValue = await stringUtils.splitStringByRegEx(" ", chargeAmount, 0);
      console.log(" >>> Charge amount: ", chargeAmount);
      console.log(" >>> Actual value: ", Number(actualValue).toFixed(4));
      console.log(" >>> Expected value: ", Number(amount).toFixed(4));
      if (Number(actualValue).toFixed(4) !== Number(amount).toFixed(4)) {
        throw new Error(
          `Assertion failed: Charge amount ${chargeAmount} is different to expected amount ${amount}`
        );
      }
    }
  }

  async verifyTransactionStatus(){
    console.log(
      "---- Zed Run Automation Framework: Check if the transaction is processed succesfully ---",
      amount
    );
    await this.page.waitForLoadState();
    await this.page.waitForSelector(TRANSACTION_STATUS, {timeout: 0});
    const status = await this.page.innerText(TRANSACTION_STATUS);
    if(status !== "Success"){
      throw new Error(`Assertion failed: Transaction status ${status} is different to expected status 'Success'`);
    }
  }
}

module.exports = { DetailPage };
