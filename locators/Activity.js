const config = require('config')
const activityConfig = config.get("activity")

module.exports = {
    ACTIVITY_HORSE_INFO_NAME: activityConfig.ACTIVITY_HORSE_INFO_NAME,
};    