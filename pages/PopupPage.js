class PopupPage {
  constructor(page) {
    this.page = page;
  }

  async waitForLoadState() {
    console.log("--- Zed Run Automation Framework: Wait for load state ---");
    await this.page.waitForLoadState();
  }

  async waitForCloseEvent() {
    console.log("--- Zed Run Automation Framework: Wait for close event ---");
    await this.page.waitForEvent("close");
  }
}

module.exports = { PopupPage };
