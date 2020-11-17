const PageActions = require('../utils/page/action');
const ZedRunLocators = require('../locators/ZedRun');

class LoginPage{
    async clickOnStartButton(){
        console.log("--- Zed Run Automation Framework: Click on Start Button ---");
        PageActions.clickOnElement(ZedRunLocators.START_BUTTON);
    }

    async typeEmail(email){
        console.log("--- Zed Run Automation Framework: Input value to email field ---");
        PageActions.setValue(ZedRunLocators.EMAIL_INPUT, email);
    }

    async clickOnContinueButton(){
        console.log("--- Zed Run Automation Framework: Click on Continue Button ---");
        PageActions.setValue(ZedRunLocators.EMAIL_INPUT, email);
    }
}

module.exports = new LoginPage