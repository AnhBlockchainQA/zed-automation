const config = require('config')

const metamaskConfig = config.get("metamask")

module.exports = {
    CLICK_FIRST_TIME_FLOW__BUTTON: metamaskConfig.CLICK_FIRST_TIME_FLOW__BUTTON,
    CLICK_PAGE_CONTAINER_FOOTER: metamaskConfig.CLICK_PAGE_CONTAINER_FOOTE,
    FILL_TEXT_AREA_FILL_PASSPHASE: metamaskConfig.FILL_TEXT_AREA_FILL_PASSPHAS,
    SEED_PHASE: metamaskConfig.SEED_PHAS,
    FILL_PASSWORD_INPUT: metamaskConfig.FILL_PASSWORD_INPU,
    PASSWORD: metamaskConfig.PASSWOR,
    FILL_PASSWORD_CONFIRM_INPUT: metamaskConfig.FILL_PASSWORD_CONFIRM_INPU,
    PASSWORD_CONFIRM: metamaskConfig.PASSWORD_CONFIR,
    CHECKBOX_AGREE: metamaskConfig.CHECKBOX_AGRE,
    CLICK_ALL_DONE: metamaskConfig.CLICK_ALL_DON,
    CLICK_CLOSE: metamaskConfig.CLICK_CLOS,
    CLICK_NETWORK_NAME: metamaskConfig.CLICK_NETWORK_NAM,
    CLICK_CHOOSE_NETWORK: metamaskConfig.CLICK_CHOOSE_NETWOR,
}