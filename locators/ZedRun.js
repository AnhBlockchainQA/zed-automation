const config = require('config')
const zedRunConfig = config.get("zedRun")
module.exports = {
    LOGIN_START_BUTTON: zedRunConfig.LOGIN_START_BUTTON,
    EMAIL_INPUT: zedRunConfig.EMAIL_INPUT,
    CONTINUE_BUTTON: zedRunConfig.CONTINUE_BUTTON,
    AUTHENTICATE_BUTTON: zedRunConfig.AUTHENTICATE_BUTTON,
    WELCOME_LABEL: zedRunConfig.WELCOME_LABEL,
    TRUST_ME_BUTTON: zedRunConfig.TRUST_ME_BUTTON,
    LOGIN_SUCESSFUL_MESSAGE: zedRunConfig.LOGIN_SUCESSFUL_MESSAGE,
    CONNECT_METAMASK: zedRunConfig.CONNECT_METAMASK,
    ACCEPT_BUTTON: zedRunConfig.ACCEPT_BUTTON,
    MARKETPLACE_LINK: zedRunConfig.MARKETPLACE_LINK,
    LOGIN_POPUP: zedRunConfig.LOGIN_POPUP,
    USER_AVATAR: zedRunConfig.USER_AVATAR,
    ARROW_ICON: zedRunConfig.ARROW_ICON,
    STUD_SERVICE_LINK: zedRunConfig.STUD_SERVICE_LINK,
    RACING_LINK: zedRunConfig.RACING_LINK,
}