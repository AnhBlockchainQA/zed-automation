module.exports = {
  ZEDRUN_URL: 'https://goerli-test.zed.run/',
  SEED_PHRASE: 'promote involve unaware today camera major net tail area rule manual humor',
  PASSWORD: 'nidalee1',
  CONFIRM_PASSWORD: 'nidalee1',
  CARD_NUMBER: "371449635398431",
  CARD_EXPIRATION_DATE: "08/25",
  CARD_CVC: "324",
  ACCOUNT_LIST: {
    FIRST_ACCOUNT: {
       EMAIL: "zedrun@1secmail.net",
       LOGIN: "zedrun",
       DOMAIN: "1secmail.net"
    },
    SECOND_ACCOUNT: {
      EMAIL : "zedrun1@1secmail.org",
      LOGIN: "zedrun1",
      DOMAIN: "1secmail.org"
    },
    THIRD_ACCOUNT: {
      EMAIL : "zedrun2@1secmail.com",
      LOGIN: "zedrun2",
      DOMAIN: "1secmail.com"
    },
    FOURTH_ACCOUNT: {
      EMAIL : "zedrun3@wwjmp.com",
      LOGIN: "zedrun3",
      DOMAIN: "wwjmp.com"
    },
    FIFTH_ACCOUNT: {
      EMAIL : "zedrun4@esiix.com",
      LOGIN: "zedrun4",
      DOMAIN: "@esiix.com"
    }
  },
  AMOUNT : "0.01",
  FIXED_DISCOUNT: {
    CODE: "ZED-15-DOLLARS",
    VALUE: "15.0"
  },
  PERCENT_DISCOUNT: {
    CODE: "Z8_50PERCENT",
    VALUE: "50.5%",
    NET_VALUE : 0.505
  },
  EXPIRED_CODE: {
    CODE: "EXPIRED_COUPON",
    ERROR: "Voucher Expired"
  },
  INVALID_CODE: {
    CODE: "INVALID_COUPON",
    ERROR: "Voucher Not Found"
  },
  HORSE_LIST_SIZE: 1,
  EVENT_LIST_SIZE: 10,
  REGEX: {
    NUMBER: /\$\{i\}/g,
    TEXT: /\$\{name\}/g,
    AMOUNT: /([0-9].*)/g
  }
}