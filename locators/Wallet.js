const config = require('config')
const walletConfig = config.get("wallet")

module.exports = {
    WALLET_ICON: walletConfig.WALLET_ICON,
    DEPOSITE_BUTTON: walletConfig.DEPOSITE_BUTTON,
    DEPOSITE_AMOUNT_INPUT: walletConfig.DEPOSITE_AMOUNT_INPUT,
    DEPOSITE_TO_ZED_BUTTON: walletConfig.DEPOSITE_TO_ZED_BUTTON,
    ETH_BALANCE : walletConfig.ETH_BALANCE,
    WITHDRAW_BUTTON: walletConfig.WITHDRAW_BUTTON,
    WITHDRAW_AMOUNT_INPUT : walletConfig.WITHDRAW_AMOUNT_INPUT,
    ZED_BALANCE: walletConfig.ZED_BALANCE,
    WITHDRAW_FROM_ZED_BUTTON: walletConfig.WITHDRAW_FROM_ZED_BUTTON,
}