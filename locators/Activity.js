const config = require('config')
const activityConfig = config.get("activity")

module.exports = {
    FIRST_STATEMENT_INFO: activityConfig.FIRST_STATEMENT_INFO
};    