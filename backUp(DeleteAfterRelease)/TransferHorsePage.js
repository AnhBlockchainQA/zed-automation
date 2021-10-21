const {
  SELECT_FIRST_HORSE_BUTTON,
  FIRST_TRANSFER_HORSE_NAME,
  WALLET_ADDRESS_FIELD,
  TRANSFER_BUTTON,
  TRANSACTION_FEE,
  CONFIRM_BUTTON
} = require("./TransferHorse");
const { TRANSFER_HORSES_LIST } = require("./ZedRun");

class TransferHorsePage {
  constructor(page) {
    this.page = page;
    this.page.setDefaultTimeout(40000);
  }

  async waitForLoadState() {
    await this.page.waitForLoadState();
  }

  async bringToFront(){
    await this.page.bringToFront();
  }

  async checkIfTransferHorseListShown(value) {
    console.log(
      "--- Zed Run Automation Framework: Check if transfer horse list shown with size bigger than [%s]--- ",
      value
    );
    try {
      await this.page.waitForSelector(TRANSFER_HORSES_LIST, { timeout: 0 });
      const count = await this.page.$$eval(
        TRANSFER_HORSES_LIST,
        (el) => el.length
      );
      if (count < value) {
        throw new Error(
          `Assertion failed: Actual list size ${count} is different to expected list size ${value}`
        );
      }
    } catch {
      throw new Error("Transfer horse list is empty or not present");
    }
  }

  async hoverOnFirstHorseToBeTransfered() {
    console.log(
      "--- Zed Run Automation Framework: Hover on first horse to be transfered --- "
    );
    try {
      await this.page.waitForSelector(FIRST_TRANSFER_HORSE_NAME, {
        timeout: 0,
      });
      await this.page.hover(FIRST_TRANSFER_HORSE_NAME, { force: true });
    } catch {
      throw new Error("Horse is not shown or not clickable");
    }
  }

  async clickOnSelectButtonOfFirstHorse() {
    console.log(
      "--- Zed Run Automation Framework: Click on Select button of first horse --- "
    );
    try {
      await this.page.waitForLoadState();
      await this.page.waitForSelector(SELECT_FIRST_HORSE_BUTTON, {
        timeout: 0,
      });
      await this.page.click(SELECT_FIRST_HORSE_BUTTON);
    } catch {
      throw new Error("Transfor horse is not present or not clickable");
    }
  }

  async typeAddress(address) {
    console.log(
      "--- Zed Run Automation Framework: Type address [%s] --- ",
      address
    );
    try {
      await this.page.waitForSelector(WALLET_ADDRESS_FIELD, { timeout: 0 });
      await this.page.type(WALLET_ADDRESS_FIELD, "");
      await this.page.type(WALLET_ADDRESS_FIELD, address, { delay: 100 });
    } catch {
      throw new Error("Wallet address is not present");
    }
  }

  // async clickOnTransactionFee(){
  //   console.log("--- Zed Run Automation Framework: Click on Transaction Fee --- ");
  //   try {
  //     await this.page.waitForLoadState();
  //     await this.page.waitForSelector(TRANSACTION_FEE, {
  //       timeout: 0,
  //     });
  //     await this.page.click(TRANSACTION_FEE);
  //   } catch {
  //     throw new Error("Transfor fee is not present");
  //   }
  // }

  async clickOnTransferButton() {
    console.log(
      "--- Zed Run Automation Framework: Click on Transfer button --- "
    );
    try {
      await this.page.waitForLoadState();
      await this.page.waitForSelector(TRANSFER_BUTTON, {
        timeout: 0,
      });
      await this.page.click(TRANSFER_BUTTON);
    } catch {
      throw new Error("Transfor button is not present or not clickable");
    }
  }

  async getNameOfFirstHorse(){
    console.log(
      "--- Zed Run Automation Framework: Get name of first horse --- "
    );
    try {
      await this.page.waitForSelector(FIRST_TRANSFER_HORSE_NAME, {
        timeout: 0,
      });
      return await this.page.innerText(FIRST_TRANSFER_HORSE_NAME);
    } catch {
      throw new Error("Horse is not shown or not clickable");
    }
  }

  async clickOnConfirmButton(){
    console.log(
      "--- Zed Run Automation Framework: Click on Confirm button --- "
    );
    try {
      await this.page.waitForSelector(CONFIRM_BUTTON, {
        timeout: 0,
      });
      return await this.page.click(CONFIRM_BUTTON);
    } catch {
      throw new Error("Horse is not shown or not clickable");
    }
  }
}
module.exports = { TransferHorsePage };
