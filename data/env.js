module.exports = {
  ZEDRUN_URL: 'https://goerli-test.zed.run/',
  EMAIL_API : 'https://www.1secmail.com/api/v1/',
  SEED_PHRASE: 'promote involve unaware today camera major net tail area rule manual humor',
  PASSWORD: 'nidalee1',
  CONFIRM_PASSWORD: 'nidalee1',
  WAIT_TIME: 5000,
  THRESHOLD: 3,
  CARD_NUMBER: "371449635398431",
  CARD_EXPIRATION_DATE: "08/25",
  CARD_CVC: "324",
  TEST_EMAIL: "zedrun@1secmail.net",
  TEST_LOGIN : "zedrun", 
  TEST_DOMAIN: "1secmail.net",
  OTHER_TEST_EMAIL: "zedrun1@1secmail.org",
  OTHER_TEST_LOGIN : "zedrun1", 
  OTHER_TEST_DOMAIN: "1secmail.org",
  ANOTHER_TEST_EMAIL: "zedrun2@1secmail.com",
  ANOTHER_TEST_LOGIN : "zedrun2", 
  ANOTHER_TEST_DOMAIN: "1secmail.com",
  AMOUNT : "0.01",
  FIXED_DISCOUNT: {
    CODE: "ZED-15-DOLLARS",
    VALUE: "15.0"
  },
  PERCENT_DISCOUNT: {
    CODE: "ZED-10-PERCENT",
    VALUE: "10.0%",
    NET_VALUE : 0.1
  },
  EXPIRED_CODE: {
    CODE: "EXPIRED_COUPON",
    ERROR: "Voucher Expired"
  },
  INVALID_CODE: {
    CODE: "INVALID_COUPON",
    ERROR: "Voucher Not Found"
  },
  HORSE_LIST_SIZE: 3,
  EVENT_LIST_SIZE: 10,
  REGEX: {
    NUMBER: /\$\{i\}/g,
    TEXT: /\$\{name\}/g,
  }
}