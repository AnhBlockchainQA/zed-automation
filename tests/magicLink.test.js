// import {sess} from '../utils/browser/session';
// import LoginPage from '../pages/LoginPage';
// const request = require('../utils/api/api');
const BrowserSession = require("../utils/browser/session");
const LoginPage = require("../pages/LoginPage");
  // describe('E2E test as an end-user, perform the test on below', () => {
  //   if('As an end-user, I want to input email', async() => {
  //      await BrowserSession.startTest('https://zed-front-pr-333.herokuapp.com/', true, 60000);
  //      await LoginPage.clickOnStartButton();
  //      await LoginPage.typeEmail('test@yopmail.com');
  //      await LoginPage.clickOnContinueButton();
  //   });

  // });
  (async () => {
    await BrowserSession.startTest(
      "https://zed-front-pr-333.herokuapp.com/",
      false,
      0
    );
    await LoginPage.clickOnStartButton();
    await LoginPage.typeEmail("test@yopmail.com");
    await LoginPage.clickOnContinueButton();
  })();
