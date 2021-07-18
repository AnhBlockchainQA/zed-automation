const superagent = require("superagent");
require("superagent-retry-delay")(superagent);
const request = require("supertest");
const { THRESHOLD, WAIT_TIME, ZED_LOGIN_API, ZED_LOGIN_PATH, AVAILABLE_HORSES_API, PAID_HORSES_PATH } = require("../../data/api");
const errorCode = require("../../data/errorCode");
const stringUtils = require("./stringUtils");

class ZedRunAPI{
    constructor() {
        this.threshold = THRESHOLD;
        this.waitTime = WAIT_TIME;
        this.errorCode = errorCode.getErrorCodes();
        // this.pattern = PATTERN;
      }

    /**
     * This method returns the acess_token for other API
     * @param {*} address: public address 
     * @param {*} signed : signed message
     * @returns jwt token
     */
    async login(address, signed) {
        let response = await request(ZED_LOGIN_API)
          .post(ZED_LOGIN_PATH)
          .send({public_address: address, signed_message: signed})
          .retry(this.threshold, this.waitTime, this.errorCode);
        return response.body.jwt;
    }
    
    async getListOfUserHorsesByClass(access_token, public_address, offset, value){
      let response = await request(AVAILABLE_HORSES_API)
          .get(PAID_HORSES_PATH)
          .set({Authorization : 'Bearer ' + access_token})
          .query({public_address: public_address, offset: offset, horse_name: "", race_class: value})
          .retry(this.threshold, this.waitTime, this.errorCode);
      return response.body; 
    }

    async checkIfUserHorsesEnoughByClass(access_token, public_address){
      let array = [];
      let firstOffSet, secondOffSet;
      for (let index = 0; index < 6; index++){
        firstOffSet = await this.getListOfUserHorsesByClass(access_token, public_address, 0, index); // Query first offset
        secondOffSet = await this.getListOfUserHorsesByClass(access_token, public_address, 10, index); // Query second offset
        if(firstOffSet.length + secondOffSet.length >= 12){
          array.push(index);
        }  
      }
      const mapIntToString = function(e){
        switch(e){
          case 0:
            return "Griffin";
          case 1:
            return "Class I";
          case 2:
            return "Class II";
          case 3:
            return "Class III";
          case 4:
            return "Class IV";
          case 5:
            return "Class V";
          default:
            return "";          
       }
      }; 
      return stringUtils.transformArrayToStringArray(array, mapIntToString);
    }
}

module.exports = new ZedRunAPI();