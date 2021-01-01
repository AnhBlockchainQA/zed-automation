const config = require('config')
const marketPlaceConfig = config.get("marketPlace")

module.exports = {
    FIRST_HORSE_PREVIEW: marketPlaceConfig.FIRST_HORSE_PREVIEW,
    DOWNWARD_ARROW : marketPlaceConfig.DOWNWARD_ARROW,
    COUPON_INPUT: marketPlaceConfig.COUPON_INPUT,
    APPLY_BUTTON: marketPlaceConfig.APPLY_BUTTON,
    DISCOUNT_LABEL: marketPlaceConfig.DISCOUNT_LABEL,
    HORSE_PRICE: marketPlaceConfig.HORSE_PRICE,
    HORSE_NAME: marketPlaceConfig.HORSE_NAME,
    HORSE_LIST: marketPlaceConfig.HORSE_LIST,
    ERROR_MESSAGE: marketPlaceConfig.ERROR_MESSAGE
};    