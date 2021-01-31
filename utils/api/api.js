const superagent = require("superagent");
require("superagent-retry-delay")(superagent);
const request = require("supertest");
const errorCode = require("../../data/errorCode");
const { EMAIL_API, WAIT_TIME, THRESHOLD, GENERATE_RANDOM_EMAIL, GET_MESSAGES, READ_MESSAGE, PATTERN } = require("../../data/api");

class APIRequest {
  constructor() {
    this.server = EMAIL_API;
    this.threshold = THRESHOLD;
    this.waitTime = WAIT_TIME;
    this.errorCode = errorCode.getErrorCodes();
    this.pattern = PATTERN;
  }

  async callGetAPI(path, query) {
    return await request(this.server)
      .get(path)
      .query(query)
      .retry(this.threshold, this.waitTime, this.errorCode);
  }

  async generateRandomEmail() {
    let randomEmail = await this.callGetAPI("/", {
      action: GENERATE_RANDOM_EMAIL,
      count: 10,
    });
    let testEmail = randomEmail.body[
      Math.floor(Math.random() * randomEmail.body.length)
    ].toString();
    return testEmail;
  }

  async getZedRunMessageId(login, domain) {
    console.log(" >> Login [%s], domain [%s]", login, domain);
    let checkInbox = await this.callGetAPI("/", {
      action: GET_MESSAGES,
      login: login,
      domain: domain,
    });
    if (checkInbox.body !== []) {
      return Number(checkInbox.body[0].id);
    } else {
      throw new Error("Something went wrong!");
    }
  }

  async getMagicLink(login, domain, messageId) {
    let getMagicLink = await this.callGetAPI("/", {
      action: READ_MESSAGE,
      login: login,
      domain: domain,
      id: messageId,
    });
    let emailBody = getMagicLink.body.body;
    return emailBody.match(this.pattern)[1];
  }
}

module.exports = new APIRequest();