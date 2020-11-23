const config = require('config')
const metamaskConfig = config.get("metamask")

module.exports = {
    CLICK_GET_STARTED_BUTTON: metamaskConfig.CLICK_GET_STARTED_BUTTON,
    CLICK_IMPORT_WALLET_BUTTON: metamaskConfig.CLICK_IMPORT_WALLET_BUTTON,
    CLICK_I_AGREE_BUTTON: metamaskConfig.CLICK_I_AGREE_BUTTON,
    FILL_TEXT_AREA_FILL_PASSPHASE: metamaskConfig.FILL_TEXT_AREA_FILL_PASSPHASE,
    FILL_PASSWORD_INPUT: metamaskConfig.FILL_PASSWORD_INPUT,
    FILL_PASSWORD_CONFIRM_INPUT: metamaskConfig.FILL_PASSWORD_CONFIRM_INPUT,
    CHECKBOX_AGREE: metamaskConfig.CHECKBOX_AGREE,
    CLICK_IMPORT_BUTTON: metamaskConfig.CLICK_IMPORT_BUTTON,
    CLICK_ALL_DONE: metamaskConfig.CLICK_ALL_DONE,
    CLICK_CLOSE: metamaskConfig.CLICK_CLOSE,
    CLICK_NETWORK_NAME: metamaskConfig.CLICK_NETWORK_NAME,
    CLICK_CHOOSE_NETWORK: metamaskConfig.CLICK_CHOOSE_NETWORK,
    CLICK_NEXT_BUTTON: metamaskConfig.CLICK_NEXT_BUTTON,
    CLICK_CONNECT_BUTTON: metamaskConfig.CLICK_CONNECT_BUTTON,
    CLICK_SIGN_BUTTON: metamaskConfig.CLICK_SIGN_BUTTON,
}