module.exports = {
    WALLET_ICON: "//header/div[@class='header-content']//div[@class='right-part']/div[@class='balance-part']/img[@class='icon']",
    DEPOSITE_BUTTON: "(//div[@class='header-desktop']//div[text()='Deposit'])[2]",
    DEPOSITE_AMOUNT_INPUT: ".dw-content-container > .open > .matic-deposit > .dw-price > .z-input",
    DEPOSITE_TO_WETH_BUTTON: "(//div[@class='header-desktop']//button[text()='Deposit to WETH Balance'])[2]",
    ETH_BALANCE: ".header > .sidebar-wrapper:nth-child(3) > .sidebar-content > .wallet > .top > .wallet-price > .lg-text",
    WITHDRAW_BUTTON: ".header > .sidebar-wrapper:nth-child(3) > .sidebar-content > .deposit-withdraw > .dw-option:nth-child(2) > .primary-text",
    WITHDRAW_AMOUNT_INPUT : ".dw-content-container > .open > .matic-withdraw > .dw-price > .z-input",
    WITHDRAW_FROM_ZED_BUTTON: ".sidebar-content > .dw-content-container > .open > .matic-withdraw > .primary-btn",
    ZED_BALANCE: ".header > .sidebar-wrapper:nth-child(3) > .sidebar-content > .zed > .top > .wallet-price > .lg-text",
    CLAIM_BUTTON: ".header > .sidebar-wrapper:nth-child(3) > .sidebar-content > .wallet > .down > .tr-item:nth-child(${i})> .right > button.primary-btn",
    CONFIRM_DEPOSITE_BUTTON: ".ReactModalPortal > .ReactModal__Overlay > .ReactModal__Content > .buttons-row > .primary-btn",
    CONFIRM_WITHDRAW_BUTTON: "//button[text()='Confirm']",
    CLAIM_AMOUNT_LIST: ".header > .sidebar-wrapper:nth-child(3) > .sidebar-content > .wallet > .down > .tr-item > .right > button",
    CASH_BALANCE : ".header > .sidebar-wrapper:nth-child(3) > .sidebar-content > .wallet .wallet-price > .secondary"
};