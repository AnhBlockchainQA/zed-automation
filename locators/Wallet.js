
module.exports = {
    WALLET_ICON: "//header/div[@class='header-content']//div[@class='right-part']/div[@class='balance-part']/img[@class='icon']",
    DEPOSITE_BUTTON: "//div[contains(@class,'balance-sidebar') and contains(@class,'opened')]/div[@class='sidebar-content']/div[@class='deposit-withdraw']//div[text()='Deposit']",
    DEPOSITE_AMOUNT_INPUT: "//div[contains(@class,'balance-sidebar') and contains(@class,'opened')]/div[@class='sidebar-content']/div[@class='dw-content-container']/div[contains(@class,'dw-content')]/div[@class='matic-deposit']/div[contains(@class,'dw-price')]/input[1]",
    DEPOSITE_TO_ZED_BUTTON: "//div[contains(@class,'balance-sidebar') and contains(@class,'opened')]/div[@class='sidebar-content']/div[@class='dw-content-container']/div[contains(@class,'dw-content')]/div[@class='matic-deposit']/button[text()='Deposit to ZED Balance']",
    ETH_BALANCE: ".header-desktop .header > div[class*='balance-sidebar'] .sidebar-content > div[class*='wallet'] .wallet-price div[class*='lg-text']",
    WITHDRAW_BUTTON: "//div[@class='header-desktop']//div[contains(@class,'balance-sidebar') and contains(@class,'opened')]/div[@class='sidebar-content']/div[@class='deposit-withdraw']//div[text()='Withdraw']",
    WITHDRAW_AMOUNT_INPUT : "//div[@class='header-desktop']//div[contains(@class,'balance-sidebar') and contains(@class,'opened')]/div[@class='sidebar-content']/div[@class='dw-content-container']/div[contains(@class,'open') and contains(@class,'dw-content')]/div[@class='matic-withdraw']/div[contains(@class,'dw-price')]/input[not(@disabled)]",
    WITHDRAW_FROM_ZED_BUTTON: "//div[@class='header-desktop']//div[contains(@class,'balance-sidebar') and contains(@class,'opened')]/div[@class='sidebar-content']/div[@class='dw-content-container']/div[contains(@class,'open') and contains(@class,'dw-content')]/div[@class='matic-withdraw']/button[text()='Withdraw from ZED Balance']",
    ZED_BALANCE: ".header-desktop .header > div[class*='balance-sidebar'] .sidebar-content > div[class*='zed'] .wallet-price div[class*='lg-text']",
    CLAIM_BUTTON: ".header-desktop header div.balance-sidebar.opened div.sidebar-content div.wallet button",
    CONFIRM_DEPOSITE_BUTTON: "form > section > .section-footer > .d-flex > .primary-btn"
};