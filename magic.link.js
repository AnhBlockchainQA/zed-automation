const {chromium} = require('playwright');
const request = require("supertest");

(async () => {
  let randomEmail;
  let username;
  var messageId;
  let domain;
  let magicLink;

  let server = "https://www.1secmail.com/api/v1";
  
  //Random the email
//   request(server)
//     .get("/")
//     .query({
//       action: "genRandomMailbox",
//       count: 10,
//     })
//     .end((err, res) => {
//       if (err) {
//         throw new Error("An error occured with the payment service, err: " + err);
//       }else{
//       randomEmail = res.body[Math.floor(Math.random() * res.body.length)];
//       username = randomEmail.split("@")[0];
//       domain = randomEmail.split("@")[1];
//       console.log(randomEmail + " " + username + " " + domain );
//       }
//     });

    // Launch ZED Run and input email
    const browser = await chromium.launch({headless: false, slowMo: 20, timeout: 60000});
    const context = await browser.newContext();
    const zedPage = await context.newPage();
    const page = await context.newPage()
    
    zedPage.bringToFront();
    await zedPage.goto('https://zed-front-pr-333.herokuapp.com/');
    // await zedPage.click('div.start-part');
    // await zedPage.fill('div.m-input-content > input[placeholder="Email"]', randomEmail);
    // await zedPage.click('button[type="Submit"]');

    // Check email inbox
    // request(server)
    // .get("/")
    // .query({
    //   action: "getMessages",
    //   login: username,
    //   domain: domain,
    // })
    // .end((err, res) => {
    //   if (err) {
    //     throw new Error("An error occured with the payment service, err: " + err);
    //   }else{
    //     console.log(res.body);
    //     let message = res.body.find(el => el.subject == "[TEST] Log in to ZED Run");
    //     if(message !== undefined) {
    //       messageId = message.id;
    //     }
    //   }
    //   });

      request(server)
      .get("/")
      .query({
        action: "readMessage",
        login: "2bd51hcp",
        domain: "1secmail.com",
        id: 93283243
      }).end((err, res) => {
            var pattern =/<a style="color: #27B18A; text-decoration: none; line-height: inherit;" target="_blank" href="(.*)">/;
            if(res.body !== []){
               let emailBody = res.body.body;
               console.log(emailBody);
               magicLink = emailBody.match(pattern)[1];
               console.log('\n', magicLink);

               page.bringToFront();
               page.goto(magicLink);  
            }
      })


    //   const page = await context.newPage()
    //   await page.goto(magicLink);

      zedPage.bringToFront();
      //Validate that we login successfully

})();
