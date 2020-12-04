const superagent = require("superagent");
require("superagent-retry-delay")(superagent);
const request = require("supertest");
const { EMAIL_API, WAIT_TIME, THRESHOLD } = require("../../data/env");
const config = require("config");
const apiConfig = config.get("apiConfig");

class APIRequest {
  constructor() {
    this.server = EMAIL_API;
    this.threshold = THRESHOLD;
    this.waitTime = WAIT_TIME;
    this.errorCode = apiConfig.ERROR_CODES;
  }

  async callGetAPI(path, query) {
    return await request(this.server)
      .get(path)
      .query(query)
      .retry(this.threshold, this.waitTime, this.errorCode);
  }

  async generateRandomEmail() {
    let randomEmail = await this.callGetAPI("/", {
      action: apiConfig.GENERATE_RANDOM_EMAIL,
      count: 10,
    });
    console.log(">>> Random email is : " + randomEmail);
    let testEmail = randomEmail.body[
      Math.floor(Math.random() * randomEmail.body.length)
    ].toString();
    return testEmail;
  }

  async getZedRunMessageId(login, domain) {
    let checkInbox = await this.callGetAPI("/", {
      action: apiConfig.GET_MESSAGES,
      login: login,
      domain: domain,
    });

    console.log(">>> Get message from email : " + checkInbox.body);

    if (checkInbox.body !== []) {
      return Number(checkInbox.body[0].id);
    } else {
      return -1;
    }
  }

  async getMagicLink(login, domain, messageId, pattern) {
    let getMagicLink = await this.callGetAPI("/", {
      action: apiConfig.READ_MESSAGE,
      login: login,
      domain: domain,
      id: messageId,
    });

    let emailBody = getMagicLink.body.body;
    // console.log(">>> Email body is: " + emailBody);
    return emailBody.match(pattern)[1];
  }
}

module.exports = new APIRequest();