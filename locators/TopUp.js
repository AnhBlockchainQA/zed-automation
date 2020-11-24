const config = require('config')
const marketPlaceConfig = config.get("deposite")

module.exports = {
    WALLET_ICON: marketPlaceConfig.DEPOSITE_TO_ZED_BUTTON,
    DEPOSITE_BUTTON: marketPlaceConfig.DEPOSITE_TO_ZED_BUTTON,
    DEPOSITE_AMOUNT_INPUT: marketPlaceConfig.DEPOSITE_TO_ZED_BUTTON,
    DEPOSITE_TO_ZED_BUTTON: marketPlaceConfig.DEPOSITE_TO_ZED_BUTTON
}