const config = require('config')
const marketPlaceConfig = config.get("marketPlace")

module.exports = {
    FIRST_HORSE_PREVIEW: marketPlaceConfig.FIRST_HORSE_PREVIEW,
    BUY_WITH_CREDIT_CARD_BUTTON: marketPlaceConfig.BUY_WITH_CREDIT_CARD_BUTTON,
    BUY_WITH_CREDIT_CARD_LABEL: marketPlaceConfig.BUY_WITH_CREDIT_CARD_LABEL,
    CREDIT_CARD_NUMBER_INPUT: marketPlaceConfig.CREDIT_CARD_NUMBER_INPUT,
    CREDIT_CARD_EXPIRATION_DATE_INPUT: marketPlaceConfig.CREDIT_CARD_EXPIRATION_DATE_INPUT,
    CREDIT_CARD_CVC_INPUT: marketPlaceConfig.CREDIT_CARD_CVC_INPUT,
    PAY_BUTTON: marketPlaceConfig.PAY_BUTTON,
    PAYMENT_SUCESSFUL_LABEL: marketPlaceConfig.PAYMENT_SUCESSFUL_LABEL,
    DONE_BUTTON: marketPlaceConfig.DONE_BUTTON,
    BUY_WITH_ETH_BUTTON: marketPlaceConfig.BUY_WITH_ETH_BUTTON,
    CONFIRM_BUTTON: marketPlaceConfig.CONFIRM_BUTTON,
    DOWNWARD_ARROW : marketPlaceConfig.DOWNWARD_ARROW,
    COUPON_INPUT: marketPlaceConfig.COUPON_INPUT,
    APPLY_BUTTON: marketPlaceConfig.APPLY_BUTTON,
    DISCOUNT_LABEL: marketPlaceConfig.DISCOUNT_LABEL,
    HORSE_PRICE: marketPlaceConfig.HORSE_PRICE,
    HORSE_NAME: marketPlaceConfig.HORSE_NAME,
    HORSE_LIST: marketPlaceConfig.HORSE_LIST,
    ERROR_MESSAGE: marketPlaceConfig.ERROR_MESSAGE
};    