const {
  BUY_WITH_CREDIT_CARD_BUTTON,
  BUY_WITH_CREDIT_CARD_LABEL,
  CREDIT_CARD_NUMBER_INPUT,
  CREDIT_CARD_EXPIRATION_DATE_INPUT,
  CREDIT_CARD_CVC_INPUT,
  PAY_BUTTON,
  PAYMENT_SUCESSFUL_LABEL,
  DONE_BUTTON,
  BUY_WITH_ETH_BUTTON,
  USE_DIFFERENT_CARD_BUTTON,
  CONFIRM_BUTTON,
} = require("../locators/Payment");

class PaymentPage {
  constructor(page) {
    this.page = page;
    this.page.setDefaultTimeout(60000);
  }

  async bringToFront() {
    console.log("---- Zed Run Automation Framework: Bring page upfront ---");
    await this.page.bringToFront();
  }

  async clickOnBuyWithCreditCardButton() {
    try {
      console.log(
        "---- Zed Run Automation Framework: Click on Accept button ---"
      );
      await expect(this.page).toHaveSelector(BUY_WITH_CREDIT_CARD_BUTTON, {
        visible: true,
        timeout: 0,
      });
      await this.page.click(BUY_WITH_CREDIT_CARD_BUTTON);
    } catch {
      throw new Error(
        "Buy with credit card button is not present or clickable"
      );
    }
  }

  async findFrameByMatchingUrl(url) {
    try {
      console.log(
        "--- Zed Run Automation Framework: Find frame by matching url ---"
      );
      let frames = await this.page.frames();
      return frames.find((f) => f.url().includes(url));
    } catch {
      throw new Error("No frame with matching url " + url + " is found!");
    }
  }

  async waitUntilPaymentFormPresent() {
    try {
      console.log(
        "--- Zed Run Automation Framework: Wait until payment form present ---"
      );
      await expect(this.page).toHaveSelector(BUY_WITH_CREDIT_CARD_LABEL, {
        timeout: 0,
      });
      await this.page.waitForLoadState();
    } catch {
      throw new Error("Payment form is not present!");
    }
  }

  async typeCreditCardNumber(cardNumber) {
    try {
      console.log(
        "--- Zed Run Automation Framework: Type credit card number ---"
      );
      const cardNumberFrame = await this.findFrameByMatchingUrl("cardNumber");
      await expect(cardNumberFrame)
        .toHaveSelector(CREDIT_CARD_NUMBER_INPUT, {
          timeout: 0,
        })
        .then(console.log("Credit card number input field is displayed!"));
      await cardNumberFrame.click(CREDIT_CARD_NUMBER_INPUT);
      await cardNumberFrame.type(CREDIT_CARD_NUMBER_INPUT, cardNumber, {
        delay: 50,
      });
    } catch {
      throw new Error("Credit card number input is not shown");
    }
  }

  async typeCreditCardExpirationDate(expireDate) {
    try {
      console.log(
        "--- Zed Run Automation Framework: Type credit card expiration date ---"
      );
      const cardExpiryDateFrame = await this.findFrameByMatchingUrl(
        "cardExpiry"
      );
      await expect(cardExpiryDateFrame)
        .toHaveSelector(CREDIT_CARD_EXPIRATION_DATE_INPUT, {
          timeout: 0,
        })
        .then(
          console.log("Credit card expiration date input field is displayed!")
        );
      await cardExpiryDateFrame.click(CREDIT_CARD_EXPIRATION_DATE_INPUT);
      await cardExpiryDateFrame.type(
        CREDIT_CARD_EXPIRATION_DATE_INPUT,
        expireDate,
        { delay: 50 }
      );
    } catch {
      throw new Error("Credit card expiration date input field is not present");
    }
  }

  async typeCreditCardCVC(cvc) {
    try {
      console.log(
        "--- Zed Run Automation Framework: Type credit card cvc number ---"
      );
      const cardCVCFrame = await this.findFrameByMatchingUrl("cardCvc");
      await expect(cardCVCFrame)
        .toHaveSelector(CREDIT_CARD_CVC_INPUT, {
          timeout: 0,
        })
        .then(console.log("Credit card CVC input field is displayed!"));
      await cardCVCFrame.click(CREDIT_CARD_CVC_INPUT);
      await cardCVCFrame.type(CREDIT_CARD_CVC_INPUT, cvc, {
        delay: 50,
      });
    } catch {
      throw new Error("Credit card CVC input field is not present!");
    }
  }

  async clickPayButton() {
    try {
      console.log("--- Zed Run Automation Framework: Click on Pay button ---");
      await expect(this.page)
        .toHaveSelector(PAY_BUTTON, {
          timeout: 0,
        })
        .then(console.log("Pay button is displayed!"));
      await this.page.click(PAY_BUTTON);
    } catch {
      throw new Error("Pay button is not present or not clickable!");
    }
  }

  async checkPaySuccessfulLabelPresent() {
    console.log(
      "--- Zed Run Automation Framework: Check if Payment sucessful label is present ---"
    );
    try {
      await expect(this.page).toHaveSelector(PAYMENT_SUCESSFUL_LABEL, {
        visible: true,
        timeout: 0,
      });
      await this.page.waitForLoadState();
    } catch {
      throw new Error("Element is not present or not enabled yet!");
    }
  }

  async clickDoneButton() {
    try {
      console.log("--- Zed Run Automation Framework: Click Done button ---");
      await expect(this.page).toHaveSelector(DONE_BUTTON, { timeout: 0 });
      await this.page.click(DONE_BUTTON);
    } catch {
      throw new Error("Element is not present or not enabled yet!");
    }
  }

  async clickOnBuyWithETH() {
    try {
      console.log(
        "--- Zed Run Automation Framework: Click on Buy with ETH button ---"
      );
      await expect(this.page).toHaveSelector(BUY_WITH_ETH_BUTTON, {
        timeout: 0,
      });
      await this.page.click(BUY_WITH_ETH_BUTTON, { timeout: 0 });
    } catch {
      throw new Error("Element is not present or not enabled yet!");
    }
  }

  async waitForLoadState() {
    await this.page.waitForLoadState();
  }

  async clickOnUseDifferentCardIfNeed() {
    console.log(
      "--- Zed Run Automation Framework: Click on Use different card if needed ---"
    );
    try {
      await this.page.waitForSelector(USE_DIFFERENT_CARD_BUTTON, {
        timeout: 15000,
      });
      await this.page.click(USE_DIFFERENT_CARD_BUTTON);
    } catch {
      console.log("No credit card is saved! Skip this step");
    }
  }

  async clickOnConfirmButton() {
    console.log(
      "--- Zed Run Automation Framework: Click on Confirm button to process ETH checkout process ---"
    );
    try {
      await this.page.waitForSelector(CONFIRM_BUTTON, { timeput: 0 });
      await this.page.evaluate((locator) => {
        document.querySelector(locator).click();
      }, CONFIRM_BUTTON);
      await this.page.waitForLoadState();
    } catch {
      throw new Error("Button Confirm is not present or not clickable");
    }
  }
}

module.exports = { PaymentPage };
