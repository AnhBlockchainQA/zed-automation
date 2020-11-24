#!/usr/bin/env node
const { chromium } = require("playwright");
const pathToExtension = require("path").join(
  __dirname,
  "metamask-chrome-8.1.3"
);
const userDataDir = __dirname + "/test-user-data-dir";
const fs = require("fs-extra");

console.log("userDataDir:", userDataDir);

class MetamaskFactory {
  constructor() {
    this.metamask = null;
    this.browserContext = null;
  }

  async removeCache() {
    await fs.remove(userDataDir, (err) => {
      if (err) return console.error(err);
      console.log("success!");
    });
  }

  async init() {
    this.browserContext = await chromium.launchPersistentContext(userDataDir, {
      headless: false,
      args: [
        `--disable-extensions-except=${pathToExtension}`,
        `--load-extension=${pathToExtension}`,
        `--start-maximized`,
      ],
      timeout: 0,
    });

    const [metamaskPage] = await Promise.all([
      this.browserContext.waitForEvent("page"),
      this.browserContext.backgroundPages()[0],
    ]);
    this.metamask = metamaskPage;
    return this.metamask;
  }

  async waitLoadPage() {
    return await this.browserContext.waitForEvent("page");
  }

  async waitForCloseEvent() {
    return await this.browserContext.waitForEvent("close");
  }

  async waitForLoadState() {
    return await this.browserContext
      .waitForLoadState()
      .then(console.log("Page is loaded completely!"));
  }

  async clickNewPage(page, selector) {
    const [newPage] = await Promise.all([
      this.browserContext.waitForEvent("page"),
      page.click(selector, { timeout: 0 }),
    ]);
    return newPage;
  }

  async newPage() {
    return await this.browserContext.newPage();
  }

  async close() {
    await this.removeCache();
    return await this.browserContext.close();
  }
}

module.exports = { MetamaskFactory };
