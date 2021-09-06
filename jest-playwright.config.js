module.exports = {
    browser: ["chromium"],
    contextOptions: {
        ignoreHTTPSErrors: true,
        viewport: {
            width: 1280,
            height: 800
        }
    },
    errorOnPageError: false,
    launchOptions:{
        headless: false
    }
}
