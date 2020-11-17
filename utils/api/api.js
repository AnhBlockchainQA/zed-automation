const superagent = require('superagent');
require("superagent-retry-delay")(superagent);
const request = require('supertest');

class APIRequest{

    async callGetAPI(server, path, query, threshold, waitTime, errorCodes){
       return await request(server)
        .get(path)
        .query(query)
        .retry(threshold, waitTime, errorCodes);
    }

}

module.exports = new APIRequest