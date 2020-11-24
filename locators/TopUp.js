const config = require('config')
const depositeConfig = config.get("deposite")

module.exports = {
    WALLET_ICON: depositeConfig.WALLET_ICON,
    DEPOSITE_BUTTON: depositeConfig.DEPOSITE_BUTTON,
    DEPOSITE_AMOUNT_INPUT: depositeConfig.DEPOSITE_AMOUNT_INPUT,
    DEPOSITE_TO_ZED_BUTTON: depositeConfig.DEPOSITE_TO_ZED_BUTTON,
    CURRENT_ZED_BALANCE: depositeConfig.CURRENT_ZED_BALANCE,
}