  //  CONNECTION.
const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');
const multer  = require('multer');
const fs = require('node:fs');
const nodemailer = require("nodemailer");
const session = require('express-session');
const path = require('path');
const Brevo = require('@getbrevo/brevo');
const { createClient } = require('@supabase/supabase-js');

const connection = mysql.createConnection({
  host: process.env.MYSQL_HOST,
  port: process.env.MYSQL_PORT,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE
});

const app = express();
const hostname = process.env.SERVER_HOST_NAME;
const port = process.env.SERVER_PORT;
const apiInstance = new Brevo.TransactionalEmailsApi();
// Configure API key authorization: api-key
apiInstance.setApiKey(Brevo.TransactionalEmailsApiApiKeys.apiKey, process.env.BREVO_API_KEY);
const sendSmtpEmail = new Brevo.SendSmtpEmail();

sendSmtpEmail.sender = {"name": process.env.SENDER_NAME, "email": process.env.SENDER_EMAIL};
const upload = multer({ storage: multer.memoryStorage() });
// Create a single supabase client for interacting with your database
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY)



app.use(bodyParser.json());
app.use(cors({
  origin: 'https://dt-comia-realty-and-marketing-production.up.railway.app', // Allow only a specific origin
  credentials: true,            // Enable cookies and credentials
}));
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false }
}))
app.use(express.static(path.join(__dirname, 'public')));



connection.connect();



const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
let token = '';

  //  GENERATE TOKEN.
function tokenFunction() {
  for (let i = 0; i < 32; i++) {
    const randomIndex = Math.floor(Math.random() * 63);
    token += characters.charAt(randomIndex);
  };
};

function emailSender (email, name, subject, text, html) {
  sendSmtpEmail.to = [
    {
        "email": email,
        "name": name
    }
  ];
  sendSmtpEmail.subject = subject;
  sendSmtpEmail.textContent = text;
  sendSmtpEmail.htmlContent = html;

  apiInstance.sendTransacEmail(sendSmtpEmail);

};

  //  SIGN UP.
app.post('/sign-up', (req, res) => {

    //  USER INPUTS.
  const firstName = req.body.firstNameInput.split(" ");

    //  FIRST NAME INPUT.
  let firstNameInput = '';

  for(let i = 0; i < firstName.length; i++) {
    firstNameInput += firstName[i].charAt(0).toUpperCase() + firstName[i].substring(1, firstName[i].length).toLowerCase();

    if(firstName.length > 1 && i < firstName.length - 1) {
      firstNameInput += ' ';
    };
  };

    //  LAST NAME INPUT.
  const lastName = req.body.lastNameInput.split(" ");

  let lastNameInput = '';

  for(let i = 0; i < lastName.length; i++) {
    lastNameInput += lastName[i].charAt(0).toUpperCase() + lastName[i].substring(1, lastName[i].length).toLowerCase();

    if(lastName.length > 1 && i < lastName.length - 1) {
      lastNameInput += ' ';
    };
  };

  const emailAddressInput = req.body.emailAddressInput;
  const passwordInput = req.body.passwordInput;

    //  SELECT EMAIL ADDRESS QUERY.
  const selectEmailAddressQuery = 'SELECT email_address FROM main_user_table WHERE email_address = ?';

  connection.query(selectEmailAddressQuery, emailAddressInput, (err, selectEmailAddressResult) => {
    if(err) {throw err};

      //  FIRST NAME.
    let firstName2 = '';

    if(firstNameInput != "") {
      firstName2 = "FIRST NAME FOUND!";
    } else {
      firstName2 = "FRIST NAME NOT FOUND!";
    };

      //  LAST NAME.
    let lastName2 = '';

    if(lastNameInput != "") {
      lastName2 += "LAST NAME FOUND!";
    } else {
      lastName2 += "LAST NAME NOT FOUND!";
    };

      //  AT.
    let at = '';

    if(emailAddressInput.match("@") != null) {
      at = "EMAIL ADDRESS IS AN EMAIL!";
    } else {
      at = "EMAIL ADDRESS IS NOT AN EMAIL!";
    };

      //  USED.
    let used = '';

    if(selectEmailAddressResult.length > 0) {
      used = "EMAIL ADDRESS AREADY IN USED!";
    } else {
      used = "EMAIL ADDRESS IS NOT IN USE!";
    };

      //  EMAIL ADDRESS.
    let emailAddress = '';

    if(at != "EMAIL ADDRESS IS NOT AN EMAIL!" && used != "EMAIL ADDRESS AREADY IN USED!") {
      emailAddress = "EMAIL ADDRESS FOUND!";
    } else {
      emailAddress = "EMAIL ADDRESS NOT FOUND!";
    };
      
      //  LENGTH.
    let length = '';

    if(passwordInput.length > 5) {
      length = "PASSWORD MEETS THE REQUIRED LENGTH!";
    } else {
      length = "PASSWORD DIDN'T MEET THE REQUIRED LENGTH!";
    };

      //  LOWER CASE LETTER.
    let lowerCase;

    if(passwordInput.match(/[a-z]/) != null) {
      lowerCase = "PASSWORD HAS LOWER CASE!";  
    } else {
       lowerCase = "PASSWORD HAS NO LOWER CASE!";
    };

      //  NUMBER.
    let number;

    if(passwordInput.match(/\d/) != null) {
      number = "PASSWORD HAS NUMBER!";
    } else {
      number = "PASSWORD HAS NO NUMBER!";
    };

      //  SPACE.
    let space;

    if(passwordInput.match(" ") != null) {
      space = "PASSWORD HAS SAPCE!";
    } else {
      space = "PASSWORD HAS NO SPACE!";
    };

      //  SPECIAL CHARACTER.
    let specialCharacter;

    if(passwordInput.match(/\W/) != null) {
      specialCharacter = "PASSWORD HAS SPECIAL CHARACTER!";
    } else {
      specialCharacter = "PASSWORD HAS NO SPECIAL CHARACTER!";
    };

      //  UPPER CASE LETTER.
    let upperCase;

    if(passwordInput.match(/[A-Z]/) != null) {
      upperCase = "PASSWORD HAS UPPER CASE!";
    } else {
      upperCase = "PASSWORD HAS NO UPPER CASE!";
    };

      //  PASSWORD.
    let password = '';

    if(
      length != "PASSWORD DIDN'T MEET THE REQUIRED LENGTH!" &&
      lowerCase != "PASSWORD HAS NO LOWER CASE!" &&
      number != "PASSWORD HAS NO NUMBER!" &&
      specialCharacter != "PASSWORD HAS NO SPECIAL CHARACTER!" &&
      space != "PASSWORD HAS SPACE!" &&
      upperCase != "PASSWORD HAS NO UPPER CASE!"
    ) {
      password = "PASSWORD FOUND!";
    } else {
      password = "PASSWORD NOT FOUND!";
    };

    if(
        firstName2 != "FIRST NAME NOT FOUND!" &&
        lastName2 != "LAST NAME NOT FOUND!" &&
        emailAddress != "EMAIL ADDRESS NOT FOUND!" &&
        password != "PASSWORD NOT FOUND!"
    ) {
        //  SELECT PROXY USER QUERY.
      const selectProxyUserQuery = 'SELECT first_name, last_name, email_address, password, token, date_expired, attempt_count FROM proxy_user_table WHERE email_address = ?';

      connection.query(selectProxyUserQuery, emailAddressInput, (err, selectProxyUserResult) => {
        if(err) {throw err};

        if(selectProxyUserResult.length > 0) {
          if(parseInt(selectProxyUserResult[0].attempt_count) < 5) {
              //  SELECT TOKEN QUERY.
            const selectTokenQuery = 'SELECT token FROM proxy_user_table';

            connection.query(selectTokenQuery, (err, selectTokenResult) => {
              if(err) {throw err};

              tokenFunction();

              if(selectTokenResult.length > 0) {
                for(let i = 0; i < selectProxyUserResult.length; i++) {
                  if(selectTokenResult.token == token) {
                    token = '';
                    tokenFunction();

                    i = 0;

                  };

                };
                  
              };

              const d = new Date();
              const dateAttempted = d.getFullYear().toString().padStart(4, "0")  + '-' +
                                   (d.getMonth() + 1).toString().padStart(2, "0")  + '-' +
                                    d.getDate().toString().padStart(2, "0") + ' ' +
                                    d.getHours().toString().padStart(2, "0") + ':' +
                                    d.getMinutes().toString().padStart(2, "0") + ':' +
                                    d.getSeconds().toString().padStart(2, "0");

              d.setMinutes(d.getMinutes() + 30);
              const dateExpired = d.getFullYear().toString().padStart(4, "0")  + '-' +
                                 (d.getMonth() + 1).toString().padStart(2, "0")  + '-' +
                                  d.getDate().toString().padStart(2, "0") + ' ' +
                                  d.getHours().toString().padStart(2, "0") + ':' +
                                  d.getMinutes().toString().padStart(2, "0") + ':' +
                                  d.getSeconds().toString().padStart(2, "0");

                //  INSERT PROXY USER QUERY.
              const insertProxyUserQuery = 'UPDATE proxy_user_table SET token = ?, date_expired = ?, attempt_count = ?, date_attempted = ? WHERE token = ?';

                //  VALUE FOR insertProxyUserValue.
              const insertProxyUserValue = [
                                            token,
                                            dateExpired,
                                            parseInt(selectProxyUserResult[0].attempt_count) + 1,
                                            dateAttempted,
                                            selectProxyUserResult[0].token
                                           ];

              connection.query(insertProxyUserQuery, insertProxyUserValue, (err, insertProxyUserResult) => {
                if(err) {throw err};

                emailSender(selectProxyUserResult[0].email_address, selectProxyUserResult[0].first_name + ' ' + selectProxyUserResult[0].last_name, "Hello ✔", "Hello world?", "<a href='https://dt-comia-realty-and-marketing-production.up.railway.app/customer/emailVerification.html?emailAddress=" + selectProxyUserResult[0].email_address + "&token=" + token + "'>https://dt-comia-realty-and-marketing-production.up.railway.app/customer/emailVerification.html</a>");

                res.json({
                          firstName: firstName2,
                          lastName: lastName2,
                          email: emailAddress,
                          password: password
                        });

              });

            });

          } else {
            const d = new Date();         
            d.setMinutes(d.getMinutes() + 30);

            const dateAttempted = new Date(selectProxyUserResult[0].date_attempted);

            if(d < dateAttempted) {
                //  SELECT TOKEN QUERY.
              const selectTokenQuery = 'SELECT token FROM proxy_user_table';

              connection.query(selectTokenQuery, (err, selectTokenResult) => {
                if(err) {throw err};

                tokenFunction();

                if(selectTokenResult.length > 0) {
                  for(let i = 0; i < selectProxyUserResult.length; i++) {
                    if(selectTokenResult.token == token) {
                      token = '';
                      tokenFunction();

                      i = 0;

                    };

                  };
                    
                };

                const d = new Date();
                const dateAttempted = d.getFullYear().toString().padStart(4, "0")  + '-' +
                                     (d.getMonth() + 1).toString().padStart(2, "0")  + '-' +
                                      d.getDate().toString().padStart(2, "0") + ' ' +
                                      d.getHours().toString().padStart(2, "0") + ':' +
                                      d.getMinutes().toString().padStart(2, "0") + ':' +
                                      d.getSeconds().toString().padStart(2, "0");

                d.setMinutes(d.getMinutes() + 30);
                const dateExpired = d.getFullYear().toString().padStart(4, "0")  + '-' +
                                   (d.getMonth() + 1).toString().padStart(2, "0")  + '-' +
                                    d.getDate().toString().padStart(2, "0") + ' ' +
                                    d.getHours().toString().padStart(2, "0") + ':' +
                                    d.getMinutes().toString().padStart(2, "0") + ':' +
                                    d.getSeconds().toString().padStart(2, "0");

                  //  INSERT PROXY USER QUERY.
                const insertProxyUserQuery = 'UPDATE proxy_user_table SET token = ?, date_expired = ?, attempt_count = ?, date_attempted = ? WHERE token = ?';

                  //  VALUE FOR insertProxyUserValue.
                const insertProxyUserValue = [
                                          token,
                                          dateExpired,
                                          1,
                                          dateAttempted,
                                          selectProxyUserResult[0].token
                                        ];

                connection.query(insertProxyUserQuery, insertProxyUserValue, (err, insertProxyUserResult) => {
                  if(err) {throw err};

                  emailSender(selectProxyUserResult[0].email_address, selectProxyUserResult[0].first_name + ' ' + selectProxyUserResult[0].last_name, "Hello ✔", "Hello world?", "<a href='https://dt-comia-realty-and-marketing-production.up.railway.app/customer/emailVerification.html?emailAddress=" + selectProxyUserResult[0].email_address + "&token=" + token + "'>https://dt-comia-realty-and-marketing-production.up.railway.app/customer/emailVerification.html</a>");

                  res.json({
                            firstName: firstName2,
                            lastName: lastName2,
                            email: emailAddress,
                            password: password
                          });

                });

              });

            } else {
              res.json({dateAttempted: dateAttempted});

            };

          };

        } else {
            //  SELECT TOKEN QUERY.
          const selectTokenQuery = 'SELECT token FROM proxy_user_table';

          connection.query(selectTokenQuery, (err, selectTokenResult) => {
            if(err) {throw err};

            tokenFunction();

            if(selectTokenResult.length > 0) {
              for(let i = 0; i < selectProxyUserResult.length; i++) {
                if(selectTokenResult.token == token) {
                  token = '';
                  tokenFunction();

                  i = 0;

                };

              };
                
            };

            const d = new Date();
            const dateAttempted = d.getFullYear().toString().padStart(4, "0")  + '-' +
                                 (d.getMonth() + 1).toString().padStart(2, "0")  + '-' +
                                  d.getDate().toString().padStart(2, "0") + ' ' +
                                  d.getHours().toString().padStart(2, "0") + ':' +
                                  d.getMinutes().toString().padStart(2, "0") + ':' +
                                  d.getSeconds().toString().padStart(2, "0");

            d.setMinutes(d.getMinutes() + 30);
            const dateExpired = d.getFullYear().toString().padStart(4, "0")  + '-' +
                               (d.getMonth() + 1).toString().padStart(2, "0")  + '-' +
                                d.getDate().toString().padStart(2, "0") + ' ' +
                                d.getHours().toString().padStart(2, "0") + ':' +
                                d.getMinutes().toString().padStart(2, "0") + ':' +
                                d.getSeconds().toString().padStart(2, "0");

              //  INSERT PROXY USER QUERY.
            const insertProxyUserQuery = 'INSERT INTO proxy_user_table (first_name, last_name, email_address, password, token, date_expired, attempt_count, date_attempted) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';

              //  VALUE FOR insertProxyUserValue.
            const insertProxyUserValue = [
                                          firstNameInput,
                                          lastNameInput,
                                          emailAddressInput,
                                          passwordInput,
                                          token,
                                          dateExpired,
                                          1,
                                          dateAttempted
                                         ];

            connection.query(insertProxyUserQuery, insertProxyUserValue, (err, insertProxyUserResult) => {
              if(err) {throw err};

              emailSender(emailAddressInput, firstNameInput + ' ' + firstNameInput, "Hello ✔", "Hello world?", "<a href='https://dt-comia-realty-and-marketing-production.up.railway.app/customer/emailVerification.html?emailAddress=" + emailAddressInput + "&token=" + token + "'>https://dt-comia-realty-and-marketing-production.up.railway.app/customer/emailVerification.html</a>");

              res.json({
                        firstName: firstName2,
                        lastName: lastName2,
                        email: emailAddress,
                        password: password
                      });

            });

          });
        
        };

      });

    } else {
      res.json({
                firstName: firstName2,
                lastName: lastName2,
                email: emailAddress,
                password: password
              });
    };

  });

});

  //  EMAIL VERIFICATION.
app.post('/email-verification-link', (req, res) => {
    //  USER INPUTS.
  const emailAddressInput = req.body.emailAddressInput;
  const tokenInput = req.body.tokenInput;

    //  SELECT PROXY USER QUERY.
  const selectProxyUserQuery = 'SELECT first_name, last_name, email_address, password, token, date_expired, attempt_count, date_attempted FROM proxy_user_table WHERE token = ?';

  connection.query(selectProxyUserQuery, tokenInput, (err, selectProxyUserResult) => {
    if(err) {throw err};

      if(selectProxyUserResult.length > 0) {
        if(emailAddressInput != selectProxyUserResult[0].email_address) {
            //  IF USERS KEEPS SENDING THE SAME DATA OVER AND OVER THIS END-POINT WILL STOP,
            //  TO AVOID THAT BACK-END MUST SEND SOMETHING BACK TO FRONT-END.
          res.json("");

      } else {
        if(parseInt(selectProxyUserResult[0].attempt_count) < 5) {
            //  SELECT TOKEN QUERY.
          const selectTokenQuery = 'SELECT token FROM proxy_user_table';

          connection.query(selectTokenQuery, (err, selectTokenResult) => {
            if(err) {throw err};

            tokenFunction();

            if(selectTokenResult.length > 0) {
              for(let i = 0; i < selectProxyUserResult.length; i++) {
                if(selectTokenResult.token == token) {
                  token = '';
                  tokenFunction();

                  i = 0;

                };

              };
                
            };

            const d = new Date();
            const dateAttempted = d.getFullYear().toString().padStart(4, "0")  + '-' +
                                 (d.getMonth() + 1).toString().padStart(2, "0")  + '-' +
                                  d.getDate().toString().padStart(2, "0") + ' ' +
                                  d.getHours().toString().padStart(2, "0") + ':' +
                                  d.getMinutes().toString().padStart(2, "0") + ':' +
                                  d.getSeconds().toString().padStart(2, "0");

            d.setMinutes(d.getMinutes() + 30);
            const dateExpired = d.getFullYear().toString().padStart(4, "0")  + '-' +
                              (d.getMonth() + 1).toString().padStart(2, "0")  + '-' +
                                d.getDate().toString().padStart(2, "0") + ' ' +
                                d.getHours().toString().padStart(2, "0") + ':' +
                                d.getMinutes().toString().padStart(2, "0") + ':' +
                                d.getSeconds().toString().padStart(2, "0");

              //  INSERT PROXY USER QUERY.
            const insertProxyUserQuery = 'UPDATE proxy_user_table SET token = ?, date_expired = ?, attempt_count = ?, date_attempted = ? WHERE token = ?';

              //  VALUE FOR insertProxyUserValue.
            const insertProxyUserValue = [
                                          token,
                                          dateExpired,
                                          parseInt(selectProxyUserResult[0].attempt_count) + 1,
                                          dateAttempted,
                                          selectProxyUserResult[0].token
                                         ];

            connection.query(insertProxyUserQuery, insertProxyUserValue, (err, insertProxyUserResult) => {
              if(err) {throw err};

              emailSender(selectProxyUserResult[0].email_address, selectProxyUserResult[0].first_name + ' ' + selectProxyUserResult[0].last_name, "Hello ✔", "Hello world?", "<a href='https://dt-comia-realty-and-marketing-production.up.railway.app/customer/emailVerification.html?emailAddress=" + selectProxyUserResult[0].email_address + "&token=" + token + "'>https://dt-comia-realty-and-marketing-production.up.railway.app/customer/emailVerification.html</a>");

                //  IF USERS KEEPS SENDING THE SAME DATA OVER AND OVER THIS END-POINT WILL STOP,
                //  TO AVOID THAT BACK-END MUST SEND SOMETHING BACK TO FRONT-END.
              res.json("");

            });

          });

        } else {
          const d = new Date();         
          d.setMinutes(d.getMinutes() + 30);

          const dateAttempted = new Date(selectProxyUserResult[0].date_attempted);

          if(d < dateAttempted) {
              //  SELECT TOKEN QUERY.
            const selectTokenQuery = 'SELECT token FROM proxy_user_table';

            connection.query(selectTokenQuery, (err, selectTokenResult) => {
              if(err) {throw err};

              tokenFunction();

              if(selectTokenResult.length > 0) {
                for(let i = 0; i < selectProxyUserResult.length; i++) {
                  if(selectTokenResult.token == token) {
                  token = '';
                  tokenFunction();

                  i = 0;

                  };

                };
                  
              };

              const d = new Date();
              const dateAttempted = d.getFullYear().toString().padStart(4, "0")  + '-' +
                                   (d.getMonth() + 1).toString().padStart(2, "0")  + '-' +
                                    d.getDate().toString().padStart(2, "0") + ' ' +
                                    d.getHours().toString().padStart(2, "0") + ':' +
                                    d.getMinutes().toString().padStart(2, "0") + ':' +
                                    d.getSeconds().toString().padStart(2, "0");

              d.setMinutes(d.getMinutes() + 30);
              const dateExpired = d.getFullYear().toString().padStart(4, "0")  + '-' +
                                 (d.getMonth() + 1).toString().padStart(2, "0")  + '-' +
                                  d.getDate().toString().padStart(2, "0") + ' ' +
                                  d.getHours().toString().padStart(2, "0") + ':' +
                                  d.getMinutes().toString().padStart(2, "0") + ':' +
                                  d.getSeconds().toString().padStart(2, "0");

                //  INSERT PROXY USER QUERY.
              const insertProxyUserQuery = 'UPDATE proxy_user_table SET token = ?, date_expired = ?, attempt_count = ?, date_attempted = ? WHERE token = ?';

                //  VALUE FOR insertProxyUserValue.
              const insertProxyUserValue = [
                                            token,
                                            dateExpired,
                                            1,
                                            dateAttempted,
                                            selectProxyUserResult[0].token
                                          ];

              connection.query(insertProxyUserQuery, insertProxyUserValue, (err, insertProxyUserResult) => {
                if(err) {throw err};

                emailSender(selectProxyUserResult[0].email_address, selectProxyUserResult[0].first_name + ' ' + selectProxyUserResult[0].last_name, "Hello ✔", "Hello world?", "<a href='https://dt-comia-realty-and-marketing-production.up.railway.app/customer/emailVerification.html?emailAddress=" + selectProxyUserResult[0].email_address + "&token=" + token + "'>https://dt-comia-realty-and-marketing-production.up.railway.app/customer/emailVerification.html</a>");

                  //  IF USERS KEEPS SENDING THE SAME DATA OVER AND OVER THIS END-POINT WILL STOP,
                  //  TO AVOID THAT BACK-END MUST SEND SOMETHING BACK TO FRONT-END.
                res.json("");

              });

            });

          } else {
              //  IF USERS KEEPS SENDING THE SAME DATA OVER AND OVER THIS END-POINT WILL STOP,
              //  TO AVOID THAT BACK-END MUST SEND SOMETHING BACK TO FRONT-END.
            res.json("");

          };

        };
        
      };

    } else {
        //  IF USERS KEEPS SENDING THE SAME DATA OVER AND OVER THIS END-POINT WILL STOP,
        //  TO AVOID THAT BACK-END MUST SEND SOMETHING BACK TO FRONT-END.
      res.json("");

    };

  });

});

  //  EMAIL VERIFICATION.
app.post('/email-verification', (req, res) => {
    //  USER INPUTS.
  const emailAddressInput = req.body.emailAddressInput;
  const tokenInput = req.body.tokenInput;

    //  SELECT PROXY USER QUERY.
  const selectProxyUserQuery = 'SELECT first_name, last_name, email_address, password, token, date_expired, attempt_count, date_attempted FROM proxy_user_table WHERE token = ?';

  connection.query(selectProxyUserQuery, tokenInput, (err, selectProxyUserResult) => {
    if(err) {throw err};

    let text = "Link expired.";
    let link = "./emailSent.html";

    if(selectProxyUserResult.length > 0) {
      if(emailAddressInput != selectProxyUserResult[0].email_address) {
        res.json({text: text, link: link});

      } else {
        if(selectProxyUserResult[0].attempt_count != null) {
            // USER INPUTS.
          const dateExpired = new Date(selectProxyUserResult[0].date_expired);
          const d = new Date();

          if(dateExpired < d) {
            res.json({text: text, link: link});

          } else {
            const typeOfUser = "Customer";
            const dateJoined = d.getFullYear().toString().padStart(4, "0")  + '-' +
                              (d.getMonth() + 1).toString().padStart(2, "0")  + '-' +
                               d.getDate().toString().padStart(2, "0") + ' ' +
                               d.getHours().toString().padStart(2, "0") + ':' +
                               d.getMinutes().toString().padStart(2, "0") + ':' +
                               d.getSeconds().toString().padStart(2, "0");

            let userId = '';

              //  GENERATE USER ID.
            function userIdFunction() {
              const randomIndex = Math.floor(Math.random() * 9999);
              userId = "USER" + randomIndex;
            };

              //  SELECT USER ID QUERY.
            const selectUserIdQuery = 'SELECT user_id FROM main_user_table WHERE user_id LIKE "%' + userId.substring(4, 8) + '"';

            connection.query(selectUserIdQuery, (err, sselectUserIdResult) => {
              if(err) {throw err};

              userIdFunction();

              if(sselectUserIdResult.length > 0) {
                for(let i = 0; i < sselectUserIdResult.length; i++) {
                  if(sselectUserIdResult[0].user_id == userId) {
                    userIdFunction();

                    i = 0;

                  };

                };

              };

              text = "Your account has been successfully verified.";
              link = "https://dt-comia-realty-and-marketing-production.up.railway.app/customer/logIn.html";

                //  INSERT USER QUERY.
              const insertUserQuery = 'INSERT INTO main_user_table (user_id, type_of_user, first_name, last_name, user_name, email_address, recovery_email_address, password, date_joined) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?)';

                //  VALUE FOR insertProxyUserValue.
              const insertUserValue = [
                                       userId,
                                       typeOfUser,
                                       selectProxyUserResult[0].first_name,
                                       selectProxyUserResult[0].last_name,
                                       userId,
                                       selectProxyUserResult[0].email_address,
                                       selectProxyUserResult[0].email_address,
                                       selectProxyUserResult[0].password,
                                       dateJoined
                                      ];

              connection.query(insertUserQuery, insertUserValue, (err, insertUserResult) => {
                if(err) {throw err}; 

                  //  DELETE PROXY USER QUERY.
                const deleteProxyUserQuery = 'DELETE FROM proxy_user_table WHERE token = ?';

                  //  DECLARE deleteProxyUserValue.
                const deleteProxyUserValue = selectProxyUserResult[0].token;

                connection.query(deleteProxyUserQuery, deleteProxyUserValue, (err, deleteProxyUserResult) => {
                  if(err) {throw err};

                  req.session.userId = userId;

                  res.json({text: text, link: link});

                });
                    
              });

            });

          };

        } else {
            // USER INPUTS.
          const dateAttempted = new Date(selectProxyUserResult[0].date_attempted);
          const d = new Date();

          if(dateAttempted < d) {
            res.json({text: text, link: link});

          } else {
            text = "Link expired.";

            res.json({text: text, link: link});

          };

        };

      };

    } else {
      res.json({text: text, link: link});

    };

  });

});

  //  USER.
app.get('/user', (req, res) => {
  if(req.session.userId != undefined) {
    const userId = req.session.userId;
    
      //  SELECT USER QUERY.
    const selectUserQuery = 'SELECT user_id, type_of_user, photo, first_name, last_name, user_name, contact_number, telephone_number email_address, recovery_email_address, password, date_joined, date_leaved FROM main_user_table WHERE user_id = ?';

    connection.query(selectUserQuery, userId, (err, selectUserResult) => {
      if(err) {throw err};
          
      res.json({user: selectUserResult});
    });
  } else {  
      //  IF USERS KEEPS SENDING THE SAME DATA OVER AND OVER THIS END-POINT WILL STOP,
      //  TO AVOID THAT BACK-END MUST SEND SOMETHING BACK TO FRONT-END.
    res.json("");
  };

});

  //  DELETE THE USER SESSION.
app.get('/log-out', (req, res) => {
  req.session.destroy;
  res.clearCookie('connect.sid');

    //  IF USERS KEEPS SENDING THE SAME DATA OVER AND OVER THIS END-POINT WILL STOP,
    //  TO AVOID THAT BACK-END MUST SEND SOMETHING BACK TO FRONT-END.
  res.json("");
});

  //  LOG IN.
app.post('/log-in', (req, res) => {
    //  USER INPUTS.
  const accountInput = req.body.accountInput;
  const passwordInput = req.body.passwordInput;

    //  SELECT USER QUERY.
  const selectUserQuery = 'SELECT user_id, type_of_user, first_name, last_name, user_name, contact_number, telephone_number, email_address, recovery_email_address, password, date_joined, date_leaved FROM main_user_table WHERE (user_name = ? OR email_address = ?)';

    //  DECALRES selectUserValue.
  const selectUserValue = [accountInput, accountInput];

  connection.query(selectUserQuery, selectUserValue, (err, selectUserResult) => {
    if(err) {throw err};
      //  USER NAME.
    let account = '';

    if(selectUserResult.length > 0) {
      if(selectUserResult[0].password != passwordInput) {
        account = "ACCOUNT DOESN'T MATCH!";
      } else {
        account = "ACCOUNT MATCHED!";
      };
    } else {
      account = "ACCOUNT NOT FOUND!";
    };

    if(account == "ACCOUNT MATCHED!") {
        //  DELETE PROXY USER QUERY.
      const deleteLogInQuery = 'DELETE FROM log_in_table WHERE account = ?';

      connection.query(deleteLogInQuery, accountInput, (err, deleteLogInResult) => {
        if(err) {throw err};
                
        const typeOfUser = selectUserResult[0].type_of_user;
        const userId = selectUserResult[0].user_id;

        req.session.userId = userId;

        res.json({account: account, typeOfUser: typeOfUser});

      });
    
    } else if(account == "ACCOUNT DOESN'T MATCH!") {
        //  SELECT LOG IN QUERY.
      const selectLogInQuery = 'SELECT account, password, token, attempt_count FROM log_in_table WHERE account= ?';

      connection.query(selectLogInQuery, accountInput, (err, selectLogInResult) => {
        if(err) {throw err};

        if(selectLogInResult.length > 0) {
          if(parseInt(selectLogInResult[0].attempt_count) < 5) {

              //  INSERT LOG IN QUERY.
            const insertLogInQuery = 'UPDATE log_in_table SET attempt_count = ? WHERE account = ?';

              //  VALUE FOR insertLogInValue.
            const insertLogInValue = [
                                      parseInt(selectLogInResult[0].attempt_count) + 1,
                                      account
                                     ];

            connection.query(insertLogInQuery, insertLogInValue, (err, insertLogInResult) => {
              if(err) {throw err};                

              res.json({account: account});

            });

          } else {
              //  IF USERS KEEPS SENDING THE SAME DATA OVER AND OVER THIS END-POINT WILL STOP,
              //  TO AVOID THAT BACK-END MUST SEND SOMETHING BACK TO FRONT-END.
            res.json("");

          };

        } else {
            //  INSERT LOG IN QUERY.
          const insertLogInQuery = 'INSERT INTO log_in_table (account, attempt_count) VALUES (?, ?)';

            //  VALUE FOR insertLogInValue.
          const insertLogInValue = [
                              accountInput,
                              1
                              ];

          connection.query(insertLogInQuery, insertLogInValue, (err, insertLogInResult) => {
            if(err) {throw err};

            res.json({account: account});

          });

        };

      });
              
    } else {
      res.json({account: account});

    };

  });

});

  //  FORGOT PASSWORD.
app.post('/forgot-password', (req, res) => {
    //  USER INPUTS.
  const recoveryEmailAddressInput = req.body.recoveryEmailAddressInput;

    //  SELECT USER QUERY.
  const selectUserQuery = 'SELECT user_id, type_of_user, first_name, last_name, user_name, contact_number, telephone_number, email_address, recovery_email_address, password, date_joined, date_leaved FROM main_user_table WHERE recovery_email_address = ?';

  connection.query(selectUserQuery, recoveryEmailAddressInput, (err, selectUserResult) => {
    if(err) {throw err};

      //  RECOVERY EMAIL ADDRESS.
    let recoveryEmailAddress = '';

    if(selectUserResult.length > 0) {
      recoveryEmailAddress = "RECOVERY EMAIL ADDRESS FOUND!";
    } else {
      recoveryEmailAddress = "RECOVERY EMAIL ADDRESS NOT FOUND!";
    };

    if(recoveryEmailAddress != "RECOVERY EMAIL ADDRESS NOT FOUND!") {

        //  SELECT FORGET PASSWORD QUERY.
      const selectForgetPasswordQuery = 'SELECT first_name, last_name, recovery_email_address, token, date_expired, attempt_count FROM forget_password_table WHERE recovery_email_address = ?';

      connection.query(selectForgetPasswordQuery, recoveryEmailAddressInput, (err, selectForgetPasswordResult) => {
        if(err) {throw err};

        if(selectForgetPasswordResult.length > 0) {
          if(parseInt(selectForgetPasswordResult[0].attempt_count) < 5) {
              //  SELECT TOKEN QUERY.
            const selectTokenQuery = 'SELECT token FROM forget_password_table';

            connection.query(selectTokenQuery, (err, selectTokenResult) => {
              if(err) {throw err};

              tokenFunction();

              if(selectTokenResult.length > 0) {
                for(let i = 0; i < selectForgetPasswordResult.length; i++) {
                  if(selectTokenResult.token == token) {
                    token = '';
                    tokenFunction();

                    i = 0;

                  };

                };
                    
              };

              const d = new Date();
              const dateAttempted = d.getFullYear().toString().padStart(4, "0")  + '-' +
                                   (d.getMonth() + 1).toString().padStart(2, "0")  + '-' +
                                    d.getDate().toString().padStart(2, "0") + ' ' +
                                    d.getHours().toString().padStart(2, "0") + ':' +
                                    d.getMinutes().toString().padStart(2, "0") + ':' +
                                    d.getSeconds().toString().padStart(2, "0");

              d.setMinutes(d.getMinutes() + 30);
              const dateExpired = d.getFullYear().toString().padStart(4, "0")  + '-' +
                                 (d.getMonth() + 1).toString().padStart(2, "0")  + '-' +
                                  d.getDate().toString().padStart(2, "0") + ' ' +
                                  d.getHours().toString().padStart(2, "0") + ':' +
                                  d.getMinutes().toString().padStart(2, "0") + ':' +
                                  d.getSeconds().toString().padStart(2, "0");

                //  INSERT PROXY USER QUERY.
              const insertForgetPasswordQuery = 'UPDATE forget_password_table SET token = ?, date_expired = ?, attempt_count = ?, date_attempted = ? WHERE token = ?';

                //  VALUE FOR insertForgetPasswordValue.
              const insertForgetPasswordValue = [
                                                 token,
                                                 dateExpired,
                                                 parseInt(selectForgetPasswordResult[0].attempt_count) + 1,
                                                 dateAttempted,
                                                 selectForgetPasswordResult[0].token
                                               ];

              connection.query(insertForgetPasswordQuery, insertForgetPasswordValue, (err, insertForgetPasswordResult) => {
                if(err) {throw err};

                emailSender(selectForgetPasswordResult[0].recovery_email_address, selectForgetPasswordResult[0].first_name + ' ' + selectForgetPasswordResult[0].last_name, "Hello ✔", "Hello world?", "<a href='https://dt-comia-realty-and-marketing-production.up.railway.app/customer/passwordVerification.html?emailAddress=" + selectForgetPasswordResult[0].recovery_email_address + "&token=" + token + "'>https://dt-comia-realty-and-marketing-production.up.railway.app/customer/passwordVerification.html</a>");

                res.json({recoveryEmailAddress: recoveryEmailAddress});

              });

            });

          } else {
            const d = new Date();         
            d.setMinutes(d.getMinutes() + 30);

            const dateAttempted = new Date(selectForgetPasswordResult[0].date_attempted);

            if(d < dateAttempted) {
                //  SELECT TOKEN QUERY.
              const selectTokenQuery = 'SELECT token FROM forget_password_table';

              connection.query(selectTokenQuery, (err, selectTokenResult) => {
                if(err) {throw err};

                tokenFunction();

                if(selectTokenResult.length > 0) {
                  for(let i = 0; i < selectForgetPasswordResult.length; i++) {
                    if(selectTokenResult.token == token) {
                      token = '';
                      tokenFunction();

                      i = 0;

                    };

                  };
                    
                };

                const d = new Date();
                const dateAttempted = d.getFullYear().toString().padStart(4, "0")  + '-' +
                                     (d.getMonth() + 1).toString().padStart(2, "0")  + '-' +
                                      d.getDate().toString().padStart(2, "0") + ' ' +
                                      d.getHours().toString().padStart(2, "0") + ':' +
                                      d.getMinutes().toString().padStart(2, "0") + ':' +
                                      d.getSeconds().toString().padStart(2, "0");

                d.setMinutes(d.getMinutes() + 30);
                const dateExpired = d.getFullYear().toString().padStart(4, "0")  + '-' +
                                   (d.getMonth() + 1).toString().padStart(2, "0")  + '-' +
                                    d.getDate().toString().padStart(2, "0") + ' ' +
                                    d.getHours().toString().padStart(2, "0") + ':' +
                                    d.getMinutes().toString().padStart(2, "0") + ':' +
                                    d.getSeconds().toString().padStart(2, "0");

                  //  INSERT PROXY USER QUERY.
                const insertForgetPasswordQuery = 'UPDATE forget_password_table SET token = ?, date_expired = ?, attempt_count = ?, date_attempted = ? WHERE token = ?';

                  //  VALUE FOR insertForgetPasswordValue.
                const insertForgetPasswordValue = [
                                                   token,
                                                   dateExpired,
                                                   1,
                                                   dateAttempted,
                                                   selectForgetPasswordResult[0].token
                                                 ];

                connection.query(insertForgetPasswordQuery, insertForgetPasswordValue, (err, insertForgetPasswordResult) => {
                  if(err) {throw err};

                  emailSender(selectForgetPasswordResult[0].recovery_email_address, selectForgetPasswordResult[0].first_name + ' ' + selectForgetPasswordResult[0].last_name, "Hello ✔", "Hello world?", "<a href='https://dt-comia-realty-and-marketing-production.up.railway.app/customer/passwordVerification.html?emailAddress=" + selectForgetPasswordResult[0].recovery_email_address + "&token=" + token + "'>https://dt-comia-realty-and-marketing-production.up.railway.app/customer/passwordVerification.html</a>");

                  res.json({recoveryEmailAddress: recoveryEmailAddress});

                });

              });

            } else {
              res.json({dateAttempted: dateAttempted});

            };

          };

        } else {
            //  SELECT TOKEN QUERY.
          const selectTokenQuery = 'SELECT token FROM forget_password_table';

          connection.query(selectTokenQuery, (err, selectTokenResult) => {
            if(err) {throw err};

            tokenFunction();

            if(selectTokenResult.length > 0) {
              for(let i = 0; i < selectForgetPasswordResult.length; i++) {
                if(selectTokenResult.token == token) {
                  token = '';
                  tokenFunction();

                  i = 0;

                };

              };
                    
            };

            const d = new Date();
            const dateAttempted = d.getFullYear().toString().padStart(4, "0")  + '-' +
                                 (d.getMonth() + 1).toString().padStart(2, "0")  + '-' +
                                  d.getDate().toString().padStart(2, "0") + ' ' +
                                  d.getHours().toString().padStart(2, "0") + ':' +
                                  d.getMinutes().toString().padStart(2, "0") + ':' +
                                  d.getSeconds().toString().padStart(2, "0");

            d.setMinutes(d.getMinutes() + 30);
            const dateExpired = d.getFullYear().toString().padStart(4, "0")  + '-' +
                               (d.getMonth() + 1).toString().padStart(2, "0")  + '-' +
                                d.getDate().toString().padStart(2, "0") + ' ' +
                                d.getHours().toString().padStart(2, "0") + ':' +
                                d.getMinutes().toString().padStart(2, "0") + ':' +
                                d.getSeconds().toString().padStart(2, "0");

              //  INSERT PROXY USER QUERY.
            const insertForgetPasswordQuery = 'INSERT INTO forget_password_table (first_name, last_name, password, recovery_email_address, token, date_expired, attempt_count, date_attempted) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';

              //  VALUE FOR insertForgetPasswordValue.
            const insertForgetPasswordValue = [
                                               selectUserResult[0].first_name,
                                               selectUserResult[0].last_name,
                                               selectUserResult[0].password,
                                               selectUserResult[0].recovery_email_address,
                                               token,
                                               dateExpired,
                                               1,
                                               dateAttempted
                                             ];

            connection.query(insertForgetPasswordQuery, insertForgetPasswordValue, (err, insertForgetPasswordResult) => {
              if(err) {throw err};

              emailSender(selectUserResult[0].recovery_email_address, selectUserResult[0].first_name + ' ' + selectUserResult[0].last_name, "Hello ✔", "Hello world?", "<a href='https://dt-comia-realty-and-marketing-production.up.railway.app/customer/passwordVerification.html?emailAddress=" + selectUserResult[0].recovery_email_address + "&token=" + token + "'>https://dt-comia-realty-and-marketing-production.up.railway.app/customer/passwordVerification.html</a>");

              res.json({recoveryEmailAddress: recoveryEmailAddress});

            });

          });

        };

      });

    } else {
      res.json({recoveryEmailAddress: recoveryEmailAddress});
              
    };

  });

});

  //  PASSOWRD CHANGE.
app.post('/password-change-link', (req, res) => {
    //  USER INPUTS.
  const recoveryEmailAddressInput = req.body.recoveryEmailAddressInput;
  const tokenInput = req.body.tokenInput;

    //  SELECT PROXY USER QUERY.
  const selectForgetPasswordQuery = 'SELECT first_name, last_name, recovery_email_address, token, date_expired, attempt_count, date_attempted FROM forget_password_table WHERE token = ?';

  connection.query(selectForgetPasswordQuery, tokenInput, (err, selectForgetPasswordResult) => {
    if(err) {throw err};

      if(selectForgetPasswordResult.length > 0) {
        if(recoveryEmailAddressInput != selectForgetPasswordResult[0].recovery_email_address) {
            //  IF USERS KEEPS SENDING THE SAME DATA OVER AND OVER THIS END-POINT WILL STOP,
            //  TO AVOID THAT BACK-END MUST SEND SOMETHING BACK TO FRONT-END.
          res.json("");

      } else {
        if(parseInt(selectForgetPasswordResult[0].attempt_count) < 5) {
            //  SELECT TOKEN QUERY.
          const selectTokenQuery = 'SELECT token FROM forget_password_table';

          connection.query(selectTokenQuery, (err, selectTokenResult) => {
            if(err) {throw err};

            tokenFunction();

            if(selectTokenResult.length > 0) {
              for(let i = 0; i < selectForgetPasswordResult.length; i++) {
                if(selectTokenResult.token == token) {
                  token = '';
                  tokenFunction();

                  i = 0;

                };

              };
                  
            };

            const d = new Date();
            const dateAttempted = d.getFullYear().toString().padStart(4, "0")  + '-' +
                                 (d.getMonth() + 1).toString().padStart(2, "0")  + '-' +
                                  d.getDate().toString().padStart(2, "0") + ' ' +
                                  d.getHours().toString().padStart(2, "0") + ':' +
                                  d.getMinutes().toString().padStart(2, "0") + ':' +
                                  d.getSeconds().toString().padStart(2, "0");

            d.setMinutes(d.getMinutes() + 30);
            const dateExpired = d.getFullYear().toString().padStart(4, "0")  + '-' +
                               (d.getMonth() + 1).toString().padStart(2, "0")  + '-' +
                                d.getDate().toString().padStart(2, "0") + ' ' +
                                d.getHours().toString().padStart(2, "0") + ':' +
                                d.getMinutes().toString().padStart(2, "0") + ':' +
                                d.getSeconds().toString().padStart(2, "0");

              //  INSERT PROXY USER QUERY.
            const insertForgetPasswordQuery = 'UPDATE forget_password_table SET token = ?, date_expired = ?, attempt_count = ?, date_attempted = ? WHERE token = ?';

              //  VALUE FOR insertForgetPasswordValue.
            const insertForgetPasswordValue = [
                                               token,
                                               dateExpired,
                                               parseInt(selectForgetPasswordResult[0].attempt_count) + 1,
                                               dateAttempted,
                                               selectForgetPasswordResult[0].token
                                              ];

            connection.query(insertForgetPasswordQuery, insertForgetPasswordValue, (err, insertForgetPasswordResult) => {
              if(err) {throw err};

              emailSender(selectForgetPasswordResult[0].recovery_email_address, selectForgetPasswordResult[0].first_name + ' ' + selectForgetPasswordResult[0].last_name, "Hello ✔", "Hello world?", "<a href='https://dt-comia-realty-and-marketing-production.up.railway.app/customer/passwordVerification.html?emailAddress=" + selectForgetPasswordResult[0].recovery_email_address + "&token=" + token + "'>https://dt-comia-realty-and-marketing-production.up.railway.app/customer/passwordVerification.html</a>");

                //  IF USERS KEEPS SENDING THE SAME DATA OVER AND OVER THIS END-POINT WILL STOP,
                //  TO AVOID THAT BACK-END MUST SEND SOMETHING BACK TO FRONT-END.
              res.json("");

            });

          });

        } else {
          const d = new Date();         
          d.setMinutes(d.getMinutes() + 30);

          const dateAttempted = new Date(selectProxyUserResult[0].date_attempted);

          if(d < dateAttempted) {
              //  SELECT TOKEN QUERY.
            const selectTokenQuery = 'SELECT token FROM forget_password_table';

            connection.query(selectTokenQuery, (err, selectTokenResult) => {
              if(err) {throw err};

              tokenFunction();

              if(selectTokenResult.length > 0) {
                for(let i = 0; i < selectForgetPasswordResult.length; i++) {
                  if(selectTokenResult.token == token) {
                    token = '';
                    tokenFunction();

                    i = 0;

                  };

                };
                  
              };

              const d = new Date();
              const dateAttempted = d.getFullYear().toString().padStart(4, "0")  + '-' +
                                   (d.getMonth() + 1).toString().padStart(2, "0")  + '-' +
                                    d.getDate().toString().padStart(2, "0") + ' ' +
                                    d.getHours().toString().padStart(2, "0") + ':' +
                                    d.getMinutes().toString().padStart(2, "0") + ':' +
                                    d.getSeconds().toString().padStart(2, "0");

              d.setMinutes(d.getMinutes() + 30);
              const dateExpired = d.getFullYear().toString().padStart(4, "0")  + '-' +
                                 (d.getMonth() + 1).toString().padStart(2, "0")  + '-' +
                                  d.getDate().toString().padStart(2, "0") + ' ' +
                                  d.getHours().toString().padStart(2, "0") + ':' +
                                  d.getMinutes().toString().padStart(2, "0") + ':' +
                                  d.getSeconds().toString().padStart(2, "0");

                //  INSERT PROXY USER QUERY.
              const insertForgetPasswordQuery = 'UPDATE forget_password_table SET token = ?, date_expired = ?, attempt_count = ?, date_attempted = ? WHERE token = ?';

                //  VALUE FOR insertForgetPasswordValue.
              const insertForgetPasswordValue = [
                                                token,
                                                dateExpired,
                                                1,
                                                dateAttempted,
                                                selectForgetPasswordResult[0].token
                                               ];

              connection.query(insertForgetPasswordQuery, insertForgetPasswordValue, (err, insertForgetPasswordResult) => {
                if(err) {throw err};

                emailSender(selectForgetPasswordResult[0].recovery_email_address, selectForgetPasswordResult[0].first_name + ' ' + selectForgetPasswordResult[0].last_name, "Hello ✔", "Hello world?", "<a href='https://dt-comia-realty-and-marketing-production.up.railway.app/customer/passwordVerification.html?emailAddress=" + selectForgetPasswordResult[0].recovery_email_address + "&token=" + token + "'>https://dt-comia-realty-and-marketing-production.up.railway.app/customer/passwordVerification.html</a>");

                  //  IF USERS KEEPS SENDING THE SAME DATA OVER AND OVER THIS END-POINT WILL STOP,
                  //  TO AVOID THAT BACK-END MUST SEND SOMETHING BACK TO FRONT-END.
                res.json("");

              });

            });

          } else {
              //  IF USERS KEEPS SENDING THE SAME DATA OVER AND OVER THIS END-POINT WILL STOP,
              //  TO AVOID THAT BACK-END MUST SEND SOMETHING BACK TO FRONT-END.
            res.json("");

          };

        };
        
      };

    } else {
        //  IF USERS KEEPS SENDING THE SAME DATA OVER AND OVER THIS END-POINT WILL STOP,
        //  TO AVOID THAT BACK-END MUST SEND SOMETHING BACK TO FRONT-END.
      res.json("");

    };

  });

});

  //  PASSWORD VERIFICATION.
app.post('/password-verification', (req, res) => {
    //  USER INPUTS.
  const recoveryEmailAddressInput = req.body.recoveryEmailAddressInput;
  const tokenInput = req.body.tokenInput;

    //  SELECT FORGET PASSWORD QUERY.
  const selectForgetPasswordQuery = 'SELECT first_name, last_name, recovery_email_address, token, date_expired, attempt_count, date_attempted FROM forget_password_table WHERE token = ?';

  connection.query(selectForgetPasswordQuery, tokenInput, (err, selectForgetPasswordResult) => {
    if(err) {throw err};

    let text = "Link expired.";
    let link = "./emailSent.html";

    if(selectForgetPasswordResult.length > 0) {
      if(recoveryEmailAddressInput != selectForgetPasswordResult[0].recovery_email_address) {
        res.json({text: text, link: link});

      } else {
        if(selectForgetPasswordResult[0].attempt_count != null) {
            // USER INPUTS.
          const dateExpired = new Date(selectForgetPasswordResult[0].date_expired);
          const d = new Date();

          if(dateExpired < d) {
            res.json({text: text, link: link});

          } else {
            text = "Password verified.";
            link = "https://dt-comia-realty-and-marketing-production.up.railway.app/customer/passwordChange.html?recoveryEmailAddress=" + selectForgetPasswordResult[0].recovery_email_address + "&token=" + selectForgetPasswordResult[0].token;
            
            res.json({text: text, link: link});
          };

        } else {
            // USER INPUTS.
          const dateAttempted = new Date(selectForgetPasswordResult[0].date_attempted);
          const d = new Date();

          if(dateAttempted < d) {
            res.json({text: text, link: link});

          } else {
            text = "Link expired.";
            link = selectForgetPasswordResult[0].date_attempted;

            res.json({text: text, link: link});

          };

        };

      };

    } else {
      res.json({text: text, link: link});

    };

  });

});

  //  PASSWORD CHANGE.
app.post('/password-change', (req, res) => {
    //  USER INPUTS.
  const recoveryEmailAddressInput = req.body.recoveryEmailAddressInput;
  const tokenInput = req.body.tokenInput;
  const newPasswordInput = req.body.newPasswordInput;
  const confirmPasswordInput = req.body.confirmPasswordInput;

    //  SELECT FORGET PASSWORD QUERY.
  const selectForgetPasswordQuery = 'SELECT first_name, last_name, recovery_email_address, token, date_expired, attempt_count, date_attempted FROM forget_password_table WHERE token = ?';

  connection.query(selectForgetPasswordQuery, tokenInput, (err, selectForgetPasswordResult) => {
    if(err) {throw err};

    if(selectForgetPasswordResult.length > 0) {
      if(recoveryEmailAddressInput != selectForgetPasswordResult[0].recovery_email_address) {
          //  IF USERS KEEPS SENDING THE SAME DATA OVER AND OVER THIS END-POINT WILL STOP,
          //  TO AVOID THAT BACK-END MUST SEND SOMETHING BACK TO FRONT-END.
        res.json("");

      } else { 
        if(selectForgetPasswordResult[0].password != newPasswordInput) {       
            //  LENGTH.
          let length = '';

          if(newPasswordInput.length > 5) {
            length = "NEW PASSWORD MEETS THE REQUIRED LENGTH!";
          } else {
            length = "NEW PASSWORD DIDN'T MEET THE REQUIRED LENGTH!";
          };

            //  LOWER CASE LETTER.
          let lowerCase;

          if(newPasswordInput.match(/[a-z]/) != null) {
            lowerCase = "NEW PASSWORD HAS LOWER CASE!";  
          } else {
            lowerCase = "NEW PASSWORD HAS NO LOWER CASE!";
          };

            //  NUMBER.
          let number;

          if(newPasswordInput.match(/\d/) != null) {
            number = "NEW PASSWORD HAS NUMBER!";
          } else {
            number = "NEW PASSWORD HAS NO NUMBER!";
          };

            //  SPACE.
          let space;

          if(newPasswordInput.match(" ") != null) {
            space = "NEW PASSWORD HAS SAPCE!";
          } else {
            space = "NEW PASSWORD HAS NO SPACE!";
          };

            //  SPECIAL CHARACTER.
          let specialCharacter;

          if(newPasswordInput.match(/\W/) != null) {
            specialCharacter = "NEW PASSWORD HAS SPECIAL CHARACTER!";
          } else {
            specialCharacter = "NEW PASSWORD HAS NO SPECIAL CHARACTER!";
          };

            //  UPPER CASE LETTER.
          let upperCase;

          if(newPasswordInput.match(/[A-Z]/) != null) {
            upperCase = "NEW PASSWORD HAS UPPER CASE!";
          } else {
            upperCase = "NEW PASSWORD HAS NO UPPER CASE!";
          };

            // SAME.
          let same = '';

          if(selectForgetPasswordResult[0].password != newPasswordInput) {
            same = "NEW PASSWORD IS NOT THE SAME AS THE OLD PASSWORD!";
          } else {
            same = "NEW PASSWORD IS THE SAME AS THE OLD PASSWORD!";
          };

            //  NEW PASSWORD.
          let newPassword = '';

          if(
            length != "NEW PASSWORD DIDN'T MEET THE REQUIRED LENGTH!" &&
            lowerCase != "NEW PASSWORD HAS NO LOWER CASE!" &&
            number != "NEW PASSWORD HAS NO NUMBER!" &&
            specialCharacter != "NEW PASSWORD HAS NO SPECIAL CHARACTER!" &&
            space != "NEW PASSWORD HAS SPACE!" &&
            upperCase != "NEW PASSWORD HAS NO UPPER CASE!" &&
            same != "NEW PASSWORD IS THE SAME AS THE OLD PASSWORD!"
          ) {
            newPassword = "NEW PASSWORD FOUND!";
          } else {
            newPassword = "NEW PASSWORD NOT FOUND!";
          };

            // CONFIRM PASSWORD.
          let confirmPassword = '';

          if(confirmPasswordInput != newPasswordInput) {
            confirmPassword = "CONFIRM PASSWORD NOT FOUND!";
          } else {
            confirmPassword = "CONFIRM PASSWORD FOUND!";
          };

          if(newPassword != "NEW PASSWORD NOT FOUND!" && confirmPassword != "CONFIRM PASSWORD NOT FOUND!") {
              //  UPADTE CUSTOMER PASSWORD QUERY.
            const updateCustomerPasswordQuery = 'UPDATE main_user_table SET password = ? WHERE recovery_email_address = ?';

              //  VALUE FOR updateeCustomerPasswordValue.
            const updateeCustomerPasswordValue = [newPasswordInput, recoveryEmailAddressInput];

            connection.query(updateCustomerPasswordQuery, updateeCustomerPasswordValue, (err, updateeCustomerPasswordResult) => {
              if(err) {throw err};

                //  UPADTE AGENT PASSWORD QUERY.
              const updateAgentPasswordQuery = 'UPDATE main_user_table SET password = ? WHERE recovery_email_address = ?';

                //  VALUE FOR updateAgentPasswordValue.
              const updateAgentPasswordValue = [newPasswordInput, recoveryEmailAddressInput];

              connection.query(updateAgentPasswordQuery, updateAgentPasswordValue, (err, updateAgentPasswordResult) => {
                if(err) {throw err};

                  //  DELETE FORGET PASSWORD QUERY.
                const deleteForgetPasswordQuery = 'DELETE FROM forget_password_table WHERE token = ?';

                connection.query(deleteForgetPasswordQuery, tokenInput, (err, deleteForgetPasswordResult) => {
                  if(err) {throw err};

                  res.json({newPassword: newPassword, confirmPassword: confirmPassword});

                });

            });

            });

          } else {
            res.json({newPassword: newPassword, confirmPassword: confirmPassword});
                      
          };

        } else {
            //  IF USERS KEEPS SENDING THE SAME DATA OVER AND OVER THIS END-POINT WILL STOP,
            //  TO AVOID THAT BACK-END MUST SEND SOMETHING BACK TO FRONT-END.
          res.json("");

        };
        
      };

    } else {
        //  IF USERS KEEPS SENDING THE SAME DATA OVER AND OVER THIS END-POINT WILL STOP,
        //  TO AVOID THAT BACK-END MUST SEND SOMETHING BACK TO FRONT-END.
      res.json("");

    };

  });

});



/*
    *******************
    *  CUSTOMER SIDE  *
    *******************
*/

  //  SELECT FEATURED PROPERIES.
app.get('/featured-property', (req, res) => {

    //  SELECT FEATURED PORPERTY LISTINGS QUERY.
  const selectFeaturedPropertyListingsQuery = 'SELECT property_id, user_id, location, address, main_image, image_1, image_2, image_3, image_4, image_5, image_6, image_7, image_8, image_9, image_10, property_type, FORMAT(price, 2) AS price_formatted, FORMAT(area, 2) AS area_formatted, room_count, bath_count, description, status, date_featured, date_created, date_deleted FROM property_table WHERE status != "SOLD" AND date_featured IS NOT NULL AND date_deleted IS NULL';

  connection.query(selectFeaturedPropertyListingsQuery, (err, selectFeaturedPropertyListingsResult) => {
    if (err) {throw err};

      //  SELECT RESERVATION LISTINGS QUERY.
    const selectReservationListingsQuery = 'SELECT reservation_id, agent_id, customer_id, property_id, full_name, contact_number, email_address, property, reservation_period_from, reservation_period_to, status, date_archived, reason_for_cancelling, note FROM reservation_table WHERE status = "On Going"';

    connection.query(selectReservationListingsQuery, (err, selectReservationListingsResult) => {
      if (err) {throw err};

      let userId = '';

      if(req.session.userId != undefined) {
        userId = req.session.userId;

          //  SELECT TYPE OF USER QUERY
        const selectTypeOfUserQuery = 'SELECT type_of_user FROM main_user_table WHERE user_id = ?';

        connection.query(selectTypeOfUserQuery, userId, (err, selectTypeOfUserResult) => {
          if (err) {throw err};
          
          if(selectTypeOfUserResult[0].type_of_user != "Customer") {
            userId = '';

            res.json({userId: userId,
                      featuredPropertyListings: selectFeaturedPropertyListingsResult,
                      reservationListings: selectReservationListingsResult
                    });

          } else {

              //  SELECT SAVED PROPERTY LISTINGS QUERY.
            const selectSavedPropertyListingsQuery = 'SELECT property_id FROM saved_property_table WHERE user_id = ?';

            connection.query(selectSavedPropertyListingsQuery, userId, (err, selectSavedPropertyListingsResult) => {
              if (err) {throw err};

              res.json({userId: userId,
                        featuredPropertyListings: selectFeaturedPropertyListingsResult,
                        reservationListings: selectReservationListingsResult, 
                        savedPropertyListings: selectSavedPropertyListingsResult
                       });
                  
                });

          };

        });

      } else {
          res.json({userId: userId,
                    featuredPropertyListings: selectFeaturedPropertyListingsResult,
                    reservationListings: selectReservationListingsResult
                  });

      };
            
    });

  });
  
});

  //  SELECT LOCATIONS.
app.post('/select-location', (req, res) => {
    //  SELECT DISTINCT LOCATION QUERY.
  const selectDisitnctLocationQuery = 'SELECT DISTINCT location FROM property_table WHERE status != "SOLD" AND date_deleted IS NULL';

  connection.query(selectDisitnctLocationQuery, (err, selectDisitnctLocationResult) => {
    if (err) {throw err};

    res.json({distinctLocation: selectDisitnctLocationResult});
            
  });

});

  //  SELECT HOUSE LISTINGS.
app.post('/house-listings', (req, res) => {
    //  USER INPUTS.
  const minRangeInput = req.body.minRangeInput;
  const maxRangeInput = req.body.maxRangeInput;
  const propertyTypeInput = req.body.propertyTypeInput;
  const bedroomsInput = req.body.bedroomsInput;
  const bathroomsInput = req.body.bathroomsInput;
  const locationInput = req.body.locationInput;
  const sortInput = req.body.sortInput;

    //  INITIALIZED THE VALUE FOR selectHouseListingsQuery.
  let selectHouseListingsQuery = 'SELECT property_id, user_id, location, address, main_image, image_1, image_2, image_3, image_4, image_5, image_6, image_7, image_8, image_9, image_10, property_type, FORMAT(price, 2) AS price_formatted, FORMAT(area, 2) AS area_formatted, room_count, bath_count, description, status, date_featured, date_created, date_deleted FROM property_table WHERE status != "SOLD" AND date_deleted IS NULL AND price >= ? and price <= ? AND ' + propertyTypeInput;

    //  DECLARES sortValue.
  const sortValue = [];

    //  INITIALIZED THE VALUE FOR sortValue.
  sortValue.push(minRangeInput, maxRangeInput);

   //  ADDS THE USER INPUTS ON selectHouseListingsQuery.
  if(bedroomsInput != "") {
    selectHouseListingsQuery +=(' AND room_count = ?');
    sortValue.push(bedroomsInput);
  };

  if(bathroomsInput != "") {
    selectHouseListingsQuery +=(' AND bath_count = ?');
    sortValue.push(bathroomsInput);
  };

  if(locationInput != "Any") {
    selectHouseListingsQuery += ' AND location = ?';
    sortValue.push(locationInput);
  };

  if(sortInput != ": Default") {
    selectHouseListingsQuery += ' ORDER BY';
          
    if(sortInput == ": Price ↑") {
      selectHouseListingsQuery += ' price_formatted DESC';
    } else if(sortInput == ": Price ↓") {
      selectHouseListingsQuery += ' price_formatted ASC';
    } else if(sortInput == ": Date ↑") {
      selectHouseListingsQuery += ' date_created DESC';
    } else if(sortInput == ": Date ↓") {
      selectHouseListingsQuery += ' date_created ASC';
    };
  };

  connection.query(selectHouseListingsQuery, sortValue, (err, selectHouseListingsResult) => {
    if (err) {throw err};

      //  SELECT RESERVATION LISTINGS QUERY.
    const selectReservationListingsQuery = 'SELECT reservation_id, agent_id, customer_id, property_id, full_name, contact_number, email_address, property, reservation_period_from, reservation_period_to, status, date_archived, reason_for_cancelling, note FROM reservation_table WHERE status = "On Going"';

    connection.query(selectReservationListingsQuery, (err, selectReservationListingsResult) => {
      if (err) {throw err};

      let userId = '';

      if(req.session.userId != undefined) {
        userId = req.session.userId;

          //  SELECT TYPE OF USER QUERY
        const selectTypeOfUserQuery = 'SELECT type_of_user FROM main_user_table WHERE user_id = ?';

        connection.query(selectTypeOfUserQuery, userId, (err, selectTypeOfUserResult) => {
          if (err) {throw err};
          
          if(selectTypeOfUserResult[0].type_of_user != "Customer") {
            userId = '';

            res.json({userId: userId,
                      houseListings: selectHouseListingsResult,
                      reservationListings: selectReservationListingsResult
                      });

          } else {

              //  SELECT SAVED PROPERTY LISTINGS QUERY.
            const selectSavedHouseListingsQuery = 'SELECT property_id FROM saved_property_table WHERE user_id = ?';

            connection.query(selectSavedHouseListingsQuery, userId, (err, selectSavedHouseListingsResult) => {
              if (err) {throw err};

              res.json({houseListings: selectHouseListingsResult,
                        userId: userId,
                        reservationListings: selectReservationListingsResult, 
                        savedHouseListings: selectSavedHouseListingsResult
                      });
                    
            });

          };

        });

      } else {
        res.json({userId: userId,
                  houseListings: selectHouseListingsResult,
                  reservationListings: selectReservationListingsResult
                });

      };
            
    });

  });
  
});

  //  SELECT LAND LISTINGS.
app.post('/land-listings', (req, res) => {
    //  USER INPUTS.
  const minRangeInput = req.body.minRangeInput;
  const maxRangeInput = req.body.maxRangeInput;
  const propertyTypeInput = req.body.propertyTypeInput;
  const locationInput = req.body.locationInput;
  const sortInput = req.body.sortInput;

    //  INITIALIZED THE VALUE FOR selectLandListingsQuery.
  let selectLandListingsQuery = 'SELECT property_id, user_id, location, address, main_image, image_1, image_2, image_3, image_4, image_5, image_6, image_7, image_8, image_9, image_10, property_type, FORMAT(price, 2) AS price_formatted, FORMAT(area, 2) AS area_formatted, room_count, bath_count, description, status, date_featured, date_created, date_deleted FROM property_table WHERE status != "SOLD" AND date_deleted IS NULL AND price >= ? and price <= ? AND ' + propertyTypeInput;

    //  DECLARES sortValue.
  const sortValue = [];

    //  INITIALIZED THE VALUE FOR sortValue.
  sortValue.push(minRangeInput, maxRangeInput);

   //  ADDS THE USER INPUTS ON selectLandListingsQuery.

  if(locationInput != "Any") {
    selectLandListingsQuery += ' AND location = ?';
    sortValue.push(locationInput);
  };

  if(sortInput != ": Default") {
    selectLandListingsQuery += ' ORDER BY';
          
    if(sortInput == ": Price ↑") {
      selectLandListingsQuery += ' price_formatted DESC';
    } else if(sortInput == ": Price ↓") {
      selectLandListingsQuery += ' price_formatted ASC';
    } else if(sortInput == ": Date ↑") {
      selectLandListingsQuery += ' date_created DESC';
    } else if(sortInput == ": Date ↓") {
      selectLandListingsQuery += ' date_created ASC';
    };
  };

  connection.query(selectLandListingsQuery, sortValue, (err, selectLandListingsResult) => {
    if (err) {throw err};

      //  SELECT RESERVATION LISTINGS QUERY.
    const selectReservationListingsQuery = 'SELECT reservation_id, agent_id, customer_id, property_id, full_name, contact_number, email_address, property, reservation_period_from, reservation_period_to, status, date_archived, reason_for_cancelling, note FROM reservation_table WHERE status = "On Going"';

    connection.query(selectReservationListingsQuery, (err, selectReservationListingsResult) => {
      if (err) {throw err};

      let userId = '';

      if(req.session.userId != undefined) {
        userId = req.session.userId;

          //  SELECT TYPE OF USER QUERY
        const selectTypeOfUserQuery = 'SELECT type_of_user FROM main_user_table WHERE user_id = ?';

        connection.query(selectTypeOfUserQuery, userId, (err, selectTypeOfUserResult) => {
          if (err) {throw err};
          
          if(selectTypeOfUserResult[0].type_of_user != "Customer") {
            userId = '';

            res.json({userId: userId,
                      landListings: selectLandListingsResult,
                      reservationListings: selectReservationListingsResult
                      });

          } else {

              //  SELECT SAVED PROPERTY LISTINGS QUERY.
            const selectSavedLandListingsQuery = 'SELECT property_id FROM saved_property_table WHERE user_id = ?';

            connection.query(selectSavedLandListingsQuery, userId, (err, selectSavedLandListingsResult) => {
              if (err) {throw err};

              res.json({landListings: selectLandListingsResult,
                        userId: userId,
                        reservationListings: selectReservationListingsResult, 
                        savedLandListings: selectSavedLandListingsResult
                      });
                    
            });

          };

        });

      } else {
        res.json({userId: userId,
                  landListings: selectLandListingsResult,
                  reservationListings: selectReservationListingsResult
                });

      };
            
    });

  });
  
});

  //  INSERT SAVED PROPERTIES.
app.post('/saved', (req, res) => {
    //  USER INPUT.
  const propertyIdInput = req.body.propertyIdInput;
  const d = new Date();
  const dateSavedInput = d.getFullYear().toString().padStart(4, "0")  + '-' +
                        (d.getMonth() + 1).toString().padStart(2, "0") + '-' +
                         d.getDate().toString().padStart(2, "0") + ' ' +
                         d.getHours().toString().padStart(2, "0") + ':' +
                         d.getMinutes().toString().padStart(2, "0") + ':' +
                         d.getSeconds().toString().padStart(2, "0");

  if(req.session.userId != undefined) {
  const userId = req.session.userId;

      //  SELECT TYPE OF USER QUERY
    const selectTypeOfUserQuery = 'SELECT type_of_user FROM main_user_table WHERE user_id = ?';

    connection.query(selectTypeOfUserQuery, userId, (err, selectTypeOfUserResult) => {
      if (err) {throw err};
      
      if(selectTypeOfUserResult[0].type_of_user != "Customer") { 
          //  IF USERS KEEPS SENDING THE SAME DATA OVER AND OVER THIS END-POINT WILL STOP,
          //  TO AVOID THAT BACK-END MUST SEND SOMETHING BACK TO FRONT-END.
        res.json("");

      } else {
          //  SELECT SAVED PROPERTIES QUERY.
        const selectSavedPropertiesQuery = 'SELECT property_id, date_saved FROM saved_property_table WHERE user_id = ? AND property_id = ?';

          //  DECALARS selectSavedPropertiesValue.
        const selectSavedPropertiesValue = [userId, propertyIdInput, dateSavedInput];

        connection.query(selectSavedPropertiesQuery, selectSavedPropertiesValue, (err, selectSavedPropertiesResult) => {
          if (err) {throw err};

            //  DELETE savedInput FROM SAVED PROPERTY TABLE WHEN ITS ALREADY EXISTING ELSE, INSERT.
          if(selectSavedPropertiesResult.length > 0) {
              //  DELETE SAVED PROPERTIES QUERY.
            const deleteSavedPropertiesQuery = 'DELETE FROM saved_property_table WHERE user_id = ? AND property_id = ?';

            connection.query(deleteSavedPropertiesQuery, selectSavedPropertiesValue, (err, deleteSavedPropertiesResult) => {
              if (err) {throw err};

                //  IF USERS KEEPS SENDING THE SAME DATA OVER AND OVER THIS END-POINT WILL STOP,
                //  TO AVOID THAT BACK-END MUST SEND SOMETHING BACK TO FRONT-END.
              res.json("");
            });

          } else {
              //  INSERT FAVORITE PROPERTIES QUERY.
            const insertSavedPropertiesQuery = 'INSERT INTO saved_property_table (user_id, property_id, date_saved) VALUES (?, ?, ?)';

            connection.query(insertSavedPropertiesQuery, selectSavedPropertiesValue, (err, insertSavedPropertiesResult) => {
              if (err) {throw err};

                //  IF USERS KEEPS SENDING THE SAME DATA OVER AND OVER THIS END-POINT WILL STOP,
                //  TO AVOID THAT BACK-END MUST SEND SOMETHING BACK TO FRONT-END.
              res.json("");
            });

          };

        });

      };

    });

  } else {    
      //  IF USERS KEEPS SENDING THE SAME DATA OVER AND OVER THIS END-POINT WILL STOP,
      //  TO AVOID THAT BACK-END MUST SEND SOMETHING BACK TO FRONT-END.
    res.json("");

  };
  
});

  //  SELECT SAVED PROPERIES.
app.get('/saved-property', (req, res) => {

    //  SELECT SAVED PORPERTY LISTINGS QUERY.
  const selectPropertyListingsQuery = 'SELECT property_id, user_id, location, address, main_image, image_1, image_2, image_3, image_4, image_5, image_6, image_7, image_8, image_9, image_10, property_type, FORMAT(price, 2) AS price_formatted, FORMAT(area, 2) AS area_formatted, room_count, bath_count, description, status, date_featured, date_created, date_deleted FROM property_table WHERE date_deleted IS NULL';

  connection.query(selectPropertyListingsQuery, (err, selectPropertyListingsResult) => {
    if (err) {throw err};

      //  SELECT RESERVATION LISTINGS QUERY.
    const selectReservationListingsQuery = 'SELECT reservation_id, agent_id, customer_id, property_id, full_name, contact_number, email_address, property, reservation_period_from, reservation_period_to, status, date_archived, reason_for_cancelling, note FROM reservation_table WHERE status = "On Going"';

    connection.query(selectReservationListingsQuery, (err, selectReservationListingsResult) => {
      if (err) {throw err};

      let userId = '';

      if(req.session.userId != undefined) {
        userId = req.session.userId;

          //  SELECT TYPE OF USER QUERY
        const selectTypeOfUserQuery = 'SELECT type_of_user FROM main_user_table WHERE user_id = ?';

        connection.query(selectTypeOfUserQuery, userId, (err, selectTypeOfUserResult) => {
          if (err) {throw err};
          
          if(selectTypeOfUserResult[0].type_of_user != "Customer") {
              //  IF USERS KEEPS SENDING THE SAME DATA OVER AND OVER THIS END-POINT WILL STOP,
              //  TO AVOID THAT BACK-END MUST SEND SOMETHING BACK TO FRONT-END.
            res.json("");

          } else {

              //  SELECT SAVED PROPERTY LISTINGS QUERY.
            const selectSavedPropertyListingsQuery = 'SELECT property_id, date_saved FROM saved_property_table WHERE user_id = ? ORDER BY date_saved DESC';

            connection.query(selectSavedPropertyListingsQuery, userId, (err, selectSavedPropertyListingsResult) => {
              if (err) {throw err};

              res.json({propertyListings: selectPropertyListingsResult,
                        userId: userId,
                        reservationListings: selectReservationListingsResult, 
                        savedPropertyListings: selectSavedPropertyListingsResult
                       });
                  
                });

          };

        });

      } else {
          //  IF USERS KEEPS SENDING THE SAME DATA OVER AND OVER THIS END-POINT WILL STOP,
          //  TO AVOID THAT BACK-END MUST SEND SOMETHING BACK TO FRONT-END.
        res.json("");

      };
            
    });

  });
  
});

  //  DELETE ALL SAVED.
app.post('/delete-all-saved', (req, res) => {
    //  USER INPUTS.
  const propertyIdInput = req.body.propertyIdInput;

  if(req.session.userId != undefined) {
    const userId = req.session.userId;

      //  SELECT TYPE OF USER QUERY
    const selectTypeOfUserQuery = 'SELECT type_of_user FROM main_user_table WHERE user_id = ?';

    connection.query(selectTypeOfUserQuery, userId, (err, selectTypeOfUserResult) => {
      if (err) {throw err};
      
      if(selectTypeOfUserResult[0].type_of_user != "Customer") { 
          //  IF USERS KEEPS SENDING THE SAME DATA OVER AND OVER THIS END-POINT WILL STOP,
          //  TO AVOID THAT BACK-END MUST SEND SOMETHING BACK TO FRONT-END.
        res.json("");

      } else {
          //  DELETE ALL QUERY.
        let deleteAllSavedQuery = '';

        if(propertyIdInput.length > 1) {
          deleteAllSavedQuery += 'DELETE FROM saved_property_table WHERE user_id = "' + userId + '" AND ';
            
            //  SELECT EVERY propertyIdInput VALUES.
          for(let i = 0; i < propertyIdInput.length; i++) {
            deleteAllSavedQuery += 'property_id = ?';
            
            if(propertyIdInput.length > 1 && i < propertyIdInput.length - 1) {
              deleteAllSavedQuery += ' OR ';
            };
          };

          connection.query(deleteAllSavedQuery, propertyIdInput, (err, deleteAllSavedResult) => {
            if (err) {throw err};

              //  IF USERS KEEPS SENDING THE SAME DATA OVER AND OVER THIS END-POINT WILL STOP,
              //  TO AVOID THAT BACK-END MUST SEND SOMETHING BACK TO FRON-END.
            res.json("");
          });

        } else if(propertyIdInput.length > 0) {
          deleteAllSavedQuery += 'DELETE FROM saved_property_table WHERE user_id = "' + userId + '" AND property_id = ?';
          
          connection.query(deleteAllSavedQuery, propertyIdInput, (err, deleteAllSavedResult) => {
            if (err) {throw err};

              //  IF USERS KEEPS SENDING THE SAME DATA OVER AND OVER THIS END-POINT WILL STOP,
              //  TO AVOID THAT BACK-END MUST SEND SOMETHING BACK TO FRONT-END.
            res.json("");
          });

        } else {
            //  IF USERS KEEPS SENDING THE SAME DATA OVER AND OVER THIS END-POINT WILL STOP,
            //  TO AVOID THAT BACK-END MUST SEND SOMETHING BACK TO FRONT-END.
          res.json("");

        };

      };

    });

  } else {    
      //  IF USERS KEEPS SENDING THE SAME DATA OVER AND OVER THIS END-POINT WILL STOP,
      //  TO AVOID THAT BACK-END MUST SEND SOMETHING BACK TO FRONT-END.
    res.json("");
  };

});

  //  INSERT HISTORY PROPERTIES.
app.post('/history', (req, res) => {
    //  USER INPUT.
  const propertyIdInput = req.body.propertyIdInput;
  const d = new Date();
  const dateHistoryInput = d.getFullYear().toString().padStart(4, "0")  + '-' +
                        (d.getMonth() + 1).toString().padStart(2, "0") + '-' +
                         d.getDate().toString().padStart(2, "0") + ' ' +
                         d.getHours().toString().padStart(2, "0") + ':' +
                         d.getMinutes().toString().padStart(2, "0") + ':' +
                         d.getSeconds().toString().padStart(2, "0");

  if(req.session.userId != undefined) {
    const userId = req.session.userId;

      //  SELECT TYPE OF USER QUERY
    const selectTypeOfUserQuery = 'SELECT type_of_user FROM main_user_table WHERE user_id = ?';

    connection.query(selectTypeOfUserQuery, userId, (err, selectTypeOfUserResult) => {
      if (err) {throw err};
      
      if(selectTypeOfUserResult[0].type_of_user != "Customer") { 
          //  IF USERS KEEPS SENDING THE SAME DATA OVER AND OVER THIS END-POINT WILL STOP,
          //  TO AVOID THAT BACK-END MUST SEND SOMETHING BACK TO FRONT-END.
        res.json("");

      } else {
          //  SELECT HISTORY PROPERTIES QUERY.
        const selectHistoryPropertiesQuery = 'SELECT property_id, date_history FROM history_property_table WHERE user_id = ? AND property_id = ?';

          //  DECALARS selectHistoryPropertiesValue.
        const selectHistoryPropertiesValue = [userId, propertyIdInput, dateHistoryInput];

        connection.query(selectHistoryPropertiesQuery, selectHistoryPropertiesValue, (err, selectHistoryPropertiesResult) => {
          if (err) {throw err};

            //  DELETE historyInput FROM HISTORY PROPERTY TABLE WHEN ITS ALREADY EXISTING ELSE, INSERT.
          if(selectHistoryPropertiesResult.length > 0) {
              //  UPADATE HISTORY PROPERTIES QUERY.
            const updateHistoryPropertiesQuery = 'UPDATE history_property_table SET date_history = ? WHERE user_id = ? AND property_id = ?';

              // DECLARES updateHistoryPropertiesValue.
            const updateHistoryPropertiesValue = [dateHistoryInput, userId, propertyIdInput];

            connection.query(updateHistoryPropertiesQuery, updateHistoryPropertiesValue, (err, updateHistoryPropertiesResult) => {
              if (err) {throw err};

                //  IF USERS KEEPS SENDING THE SAME DATA OVER AND OVER THIS END-POINT WILL STOP,
                //  TO AVOID THAT BACK-END MUST SEND SOMETHING BACK TO FRONT-END.
              res.json("");

            });

          } else {
              //  INSERT FAVORITE PROPERTIES QUERY.
            const insertHistoryPropertiesQuery = 'INSERT INTO history_property_table (user_id, property_id, date_history) VALUES (?, ?, ?)';

            connection.query(insertHistoryPropertiesQuery, selectHistoryPropertiesValue, (err, insertHistoryPropertiesResult) => {
              if (err) {throw err};

                //  IF USERS KEEPS SENDING THE SAME DATA OVER AND OVER THIS END-POINT WILL STOP,
                //  TO AVOID THAT BACK-END MUST SEND SOMETHING BACK TO FRONT-END.
              res.json("");

            });

          };

        });

      };

    });

  } else {    
      //  IF USERS KEEPS SENDING THE SAME DATA OVER AND OVER THIS END-POINT WILL STOP,
      //  TO AVOID THAT BACK-END MUST SEND SOMETHING BACK TO FRONT-END.
    res.json("");

  };
  
});

  //  SELECT HISTORY PROPERIES.
app.get('/history-property', (req, res) => {

    //  SELECT HISTORY PORPERTY LISTINGS QUERY.
  const selectPropertyListingsQuery = 'SELECT property_id, user_id, location, address, main_image, image_1, image_2, image_3, image_4, image_5, image_6, image_7, image_8, image_9, image_10, property_type, FORMAT(price, 2) AS price_formatted, FORMAT(area, 2) AS area_formatted, room_count, bath_count, description, status, date_featured, date_created, date_deleted FROM property_table WHERE date_deleted IS NULL';

  connection.query(selectPropertyListingsQuery, (err, selectPropertyListingsResult) => {
    if (err) {throw err};

      //  SELECT RESERVATION LISTINGS QUERY.
    const selectReservationListingsQuery = 'SELECT reservation_id, agent_id, customer_id, property_id, full_name, contact_number, email_address, property, reservation_period_from, reservation_period_to, status, date_archived, reason_for_cancelling, note FROM reservation_table WHERE status = "On Going"';

    connection.query(selectReservationListingsQuery, (err, selectReservationListingsResult) => {
      if (err) {throw err};

      let userId = '';

      if(req.session.userId != undefined) {
        userId = req.session.userId;

          //  SELECT TYPE OF USER QUERY
        const selectTypeOfUserQuery = 'SELECT type_of_user FROM main_user_table WHERE user_id = ?';

        connection.query(selectTypeOfUserQuery, userId, (err, selectTypeOfUserResult) => {
          if (err) {throw err};
          
          if(selectTypeOfUserResult[0].type_of_user != "Customer") {
              //  IF USERS KEEPS SENDING THE SAME DATA OVER AND OVER THIS END-POINT WILL STOP,
              //  TO AVOID THAT BACK-END MUST SEND SOMETHING BACK TO FRONT-END.
            res.json("");

          } else {

              //  SELECT SAVED PROPERTY LISTINGS QUERY.
            const selectSavedPropertyListingsQuery = 'SELECT property_id, date_saved FROM saved_property_table WHERE user_id = ? ORDER BY date_saved DESC';

            connection.query(selectSavedPropertyListingsQuery, userId, (err, selectSavedPropertyListingsResult) => {
              if (err) {throw err};

                //  SELECT HISTORY PROPERTY LISTINGS QUERY.
              const selectHistoryPropertyListingsQuery = 'SELECT property_id, date_history FROM history_property_table WHERE user_id = ? ORDER BY date_history DESC';

              connection.query(selectHistoryPropertyListingsQuery, userId, (err, selectHistoryPropertyListingsResult) => {
                if (err) {throw err};

                res.json({userId: userId,
                          propertyListings: selectPropertyListingsResult,
                          reservationListings: selectReservationListingsResult, 
                          historyPropertyListings: selectHistoryPropertyListingsResult, 
                          savedPropertyListings: selectSavedPropertyListingsResult
                        });
                    
              });
                  
            });

          };

        });

      } else {
          //  IF USERS KEEPS SENDING THE SAME DATA OVER AND OVER THIS END-POINT WILL STOP,
          //  TO AVOID THAT BACK-END MUST SEND SOMETHING BACK TO FRONT-END.
        res.json("");

      };
            
    });

  });
  
});

  //  DELETE ALL HISTORY.
app.post('/delete-all-history', (req, res) => {
    //  USER INPUTS.
  const propertyIdInput = req.body.propertyIdInput;

  if(req.session.userId != undefined) {
    const userId = req.session.userId;

      //  SELECT TYPE OF USER QUERY
    const selectTypeOfUserQuery = 'SELECT type_of_user FROM main_user_table WHERE user_id = ?';

    connection.query(selectTypeOfUserQuery, userId, (err, selectTypeOfUserResult) => {
      if (err) {throw err};
      
      if(selectTypeOfUserResult[0].type_of_user != "Customer") { 
          //  IF USERS KEEPS SENDING THE SAME DATA OVER AND OVER THIS END-POINT WILL STOP,
          //  TO AVOID THAT BACK-END MUST SEND SOMETHING BACK TO FRONT-END.
        res.json("");

      } else {
          //  DELETE ALL QUERY.
        let deleteAllHistoryQuery = '';

        if(propertyIdInput.length > 1) {
          deleteAllHistoryQuery += 'DELETE FROM history_property_table WHERE user_id = "' + userId + '" AND ';
            
            //  SELECT EVERY propertyIdInput VALUES.
          for(let i = 0; i < propertyIdInput.length; i++) {
            deleteAllHistoryQuery += 'property_id = ?';
            
            if(propertyIdInput.length > 1 && i < propertyIdInput.length - 1) {
              deleteAllHistoryQuery += ' OR ';
            };
          };

          connection.query(deleteAllHistoryQuery, propertyIdInput, (err, deleteAllHistoryResult) => {
            if (err) {throw err};

              //  IF USERS KEEPS SENDING THE SAME DATA OVER AND OVER THIS END-POINT WILL STOP,
              //  TO AVOID THAT BACK-END MUST SEND SOMETHING BACK TO FRON-END.
            res.json("");
          });

        } else if(propertyIdInput.length > 0) {
          deleteAllHistoryQuery += 'DELETE FROM history_property_table WHERE user_id = "' + userId + '" AND property_id = ?';
          
          connection.query(deleteAllHistoryQuery, propertyIdInput, (err, deleteAllHistoryResult) => {
            if (err) {throw err};

              //  IF USERS KEEPS SENDING THE SAME DATA OVER AND OVER THIS END-POINT WILL STOP,
              //  TO AVOID THAT BACK-END MUST SEND SOMETHING BACK TO FRONT-END.
            res.json("");
          });

        } else {
            //  IF USERS KEEPS SENDING THE SAME DATA OVER AND OVER THIS END-POINT WILL STOP,
            //  TO AVOID THAT BACK-END MUST SEND SOMETHING BACK TO FRONT-END.
          res.json("");

        };

      };

    });

  } else {    
      //  IF USERS KEEPS SENDING THE SAME DATA OVER AND OVER THIS END-POINT WILL STOP,
      //  TO AVOID THAT BACK-END MUST SEND SOMETHING BACK TO FRONT-END.
    res.json("");
  };

});

  //  SELECT PROPERTY INFORMATION.
app.post('/property-information', (req, res) => {
    //  USER INPUTS.
  const propertyId = req.body.propertyId;

    //  SELECT PROPERTY INFORMATION QUERY.
  const selectPropertyInformationQuery = 'SELECT property_id, user_id, location, address, main_image, image_1, image_2, image_3, image_4, image_5, image_6, image_7, image_8, image_9, image_10, property_type, FORMAT(price, 2) AS price_formatted, FORMAT(area, 2) AS area_formatted, room_count, bath_count, description, status, date_featured, date_created, date_deleted FROM property_table WHERE property_id = ? AND status = "AVAILABLE" AND date_deleted IS NULL';

  connection.query(selectPropertyInformationQuery, propertyId, (err, selectPropertyInformationResult) => {
    if (err) {throw err};

      if(req.session.userId != undefined) {
        const userId = req.session.userId;

          //  SELECT TYPE OF USER QUERY
        const selectTypeOfUserQuery = 'SELECT type_of_user FROM main_user_table WHERE user_id = ?';

        connection.query(selectTypeOfUserQuery, userId, (err, selectTypeOfUserResult) => {
          if (err) {throw err};
          
          if(selectTypeOfUserResult[0].type_of_user != "Customer") {
              //  IF USERS KEEPS SENDING THE SAME DATA OVER AND OVER THIS END-POINT WILL STOP,
              //  TO AVOID THAT BACK-END MUST SEND SOMETHING BACK TO FRONT-END.
            res.json("");

          } else {
             res.json({propertyInformation: selectPropertyInformationResult, userId: userId});

          };

        });

      } else {
          //  IF USERS KEEPS SENDING THE SAME DATA OVER AND OVER THIS END-POINT WILL STOP,
          //  TO AVOID THAT BACK-END MUST SEND SOMETHING BACK TO FRONT-END.
        res.json("");

      };

  });
  
});

  //  INSERT RESERVATION.
app.post('/reservation', (req, res) => {
    //  USER INPUTS.
  const fullNameInput = req.body.fullNameInput;
  const contactNumberInput = req.body.contactNumberInput;
  const emailAddressInput = req.body.emailAddressInput;
  const propertyId = req.body.propertyId;
  const reservataionPeriodFromInput = req.body.reservataionPeriodFromInput;
  const reservataionPeriodToInput = req.body.reservataionPeriodToInput;
  const status = "On Going";

    //  SELECT PROPERTY INFORMATION QUERY.
  const selectPropertyInformationQuery = 'SELECT property_id, user_id, location, address, main_image, image_1, image_2, image_3, image_4, image_5, image_6, image_7, image_8, image_9, image_10, property_type, FORMAT(price, 2) AS price_formatted, FORMAT(area, 2) AS area_formatted, room_count, bath_count, description, status, date_featured, date_created, date_deleted FROM property_table WHERE property_id = ? AND status = "AVAILABLE" AND date_deleted IS NULL';

  connection.query(selectPropertyInformationQuery, propertyId, (err, selectPropertyInformationResult) => {
    if (err) {throw err};

    if(req.session.userId != undefined) {
      const userId = req.session.userId;

        //  SELECT TYPE OF USER QUERY
      const selectTypeOfUserQuery = 'SELECT type_of_user FROM main_user_table WHERE user_id = ?';

      connection.query(selectTypeOfUserQuery, userId, (err, selectTypeOfUserResult) => {
        if (err) {throw err};
            
        if(selectTypeOfUserResult[0].type_of_user != "Customer") {
            //  IF USERS KEEPS SENDING THE SAME DATA OVER AND OVER THIS END-POINT WILL STOP,
            //  TO AVOID THAT BACK-END MUST SEND SOMETHING BACK TO FRONT-END.
          res.json("");

        } else { 

            //  SELECT RESERVATION QUERY.
          const selectReservationQuery = 'SELECT reservation_id, agent_id, customer_id, property_id, full_name, contact_number, email_address, property, reservation_period_from, reservation_period_to, status, date_archived, reason_for_cancelling, note FROM reservation_table';

          connection.query(selectReservationQuery, (err, selectReservationResult) => {
            if(err) {throw err};

            let reservationId = '';

              //  GENERATE RESERVATION ID.
            function reservationIdFunction() {
              const randomIndex = Math.floor(Math.random() * 10000);
              reservationId = "RSRV" + randomIndex;
            };

              //  SELECT RESERVATION ID QUERY.
            const selectReservationIdQuery = 'SELECT reservation_id FROM reservation_table WHERE reservation_id LIKE "%' + userId.substring(6, 10) + '"';

            connection.query(selectReservationIdQuery, (err, selectReservationIdResult) => {
              if(err) {throw err};

              reservationIdFunction();

              if(selectReservationIdResult.length > 0) {
                for(let i = 0; i < selectReservationIdResult.length; i++) {
                  if(selectReservationIdResult[0].user_id == selectReservationResult[0].reservation_id) {
                    reservationIdFunction();

                    i = 0;

                  };

                };

              };

                //  INSERT RESERVATION QUERY.
              const insertReservationQuery = 'INSERT INTO reservation_table (reservation_id, agent_id, customer_id, property_id, full_name, contact_number, email_address, property, reservation_period_from, reservation_period_to, status) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
                    
                //  DECLARES insertReservationValue.
              const insertReservationValue = [reservationId, selectPropertyInformationResult[0].user_id, userId, propertyId, fullNameInput, contactNumberInput, emailAddressInput, selectPropertyInformationResult[0].address, reservataionPeriodFromInput, reservataionPeriodToInput, status];

              connection.query(insertReservationQuery, insertReservationValue, (err, insertReservationQuery) => {
                if (err) {throw err};

                  //  RESERVED PROPERTY QUERY.
                const reservedPropertyQuery = 'UPDATE property_table SET status = "RESERVED" WHERE user_id = ? AND property_id = ?';

                  //  DECLARES reservedPropertyValue.
                const reservedPropertyValue = [selectPropertyInformationResult[0].user_id, propertyId]

                connection.query(reservedPropertyQuery, reservedPropertyValue, (err, reservedPropertyResult) => {
                  if (err) {throw err};

                    //  IF USERS KEEPS SENDING THE SAME DATA OVER AND OVER THIS END-POINT WILL STOP,
                    //  TO AVOID THAT BACK-END MUST SEND SOMETHING BACK TO FRON-END.
                  res.json("");

                });

              });

            });

          });

        };

      });

    } else {
        //  IF USERS KEEPS SENDING THE SAME DATA OVER AND OVER THIS END-POINT WILL STOP,
        //  TO AVOID THAT BACK-END MUST SEND SOMETHING BACK TO FRONT-END.
      res.json("");

    };

  });
  
});

  //  SELECT ACTIVE TOUR AND RESRERVATION.
app.post('/tour-reservation-active', (req, res) => {
    //  USER INPUTS.
  const sortInput = req.body.sortInput.toLowerCase();

    //  SELECT USER LISTINGS QUERY.
  const selectUserListingsQuery = 'SELECT user_id, type_of_user, photo, first_name, last_name, user_name, contact_number, telephone_number, email_address, recovery_email_address, password, date_joined, date_leaved FROM main_user_table WHERE date_leaved IS NULL';

  connection.query(selectUserListingsQuery, (err, selectUserListingsResult) => {
    if (err) {throw err};

      //  SELECT PORPERTY LISTINGS QUERY.
    const selectPropertyListingsQuery = 'SELECT property_id, user_id, location, address, main_image, image_1, image_2, image_3, image_4, image_5, image_6, image_7, image_8, image_9, image_10, property_type, FORMAT(price, 2) AS price_formatted, FORMAT(area, 2) AS area_formatted, room_count, bath_count, description, status, date_featured, date_created, date_deleted FROM property_table WHERE date_deleted IS NULL';

    connection.query(selectPropertyListingsQuery, (err, selectPropertyListingsResult) => {
      if (err) {throw err};

      let userId = '';

      if(req.session.userId != undefined) {
        userId = req.session.userId;

          //  SELECT TYPE OF USER QUERY
        const selectTypeOfUserQuery = 'SELECT type_of_user FROM main_user_table WHERE user_id = ?';

        connection.query(selectTypeOfUserQuery, userId, (err, selectTypeOfUserResult) => {
          if (err) {throw err};
            
          if(selectTypeOfUserResult[0].type_of_user != "Customer") {
              //  IF USERS KEEPS SENDING THE SAME DATA OVER AND OVER THIS END-POINT WILL STOP,
              //  TO AVOID THAT BACK-END MUST SEND SOMETHING BACK TO FRONT-END.
            res.json("");

          } else {

              //------------------------------------------------------------TOUR LISTINGS--------------------------------------------------.

              //  SELECT RESERVATION LISTINGS QUERY.
            const selectReservationListingsQuery = 'SELECT reservation_id, agent_id, customer_id, property_id, full_name, contact_number, email_address, property, reservation_period_from, reservation_period_to, status, date_archived, reason_for_cancelling, note FROM reservation_table WHERE customer_id = ? AND status = "on going"';

            connection.query(selectReservationListingsQuery, userId, (err, selectReservationListingsResult) => {
              if (err) {throw err};

              if(sortInput == "all") {
                res.json({propertyListings: selectPropertyListingsResult, 
                          userListings: selectUserListingsResult, 
                          userId: userId,
                          reservationListings: selectReservationListingsResult
                        });

              } else if(sortInput == "reservations") {
                 res.json({propertyListings: selectPropertyListingsResult,
                          userListings: selectUserListingsResult, 
                          userId: userId,
                          reservationListings: selectReservationListingsResult
                        });

              } else {
                res.json({propertyListings: selectPropertyListingsResult,
                          userListings: selectUserListingsResult, 
                          userId: userId,
                        });

              };

            });

              //---------------------------------------------------------------------------------------------------------------------------.

          };

        });

      } else {
          //  IF USERS KEEPS SENDING THE SAME DATA OVER AND OVER THIS END-POINT WILL STOP,
          //  TO AVOID THAT BACK-END MUST SEND SOMETHING BACK TO FRONT-END.
        res.json("");

      };

    });

  });
  
});

  //  CANCEL RESERVATION.
app.post('/cancel-reservation', (req, res) => {
    //  USER INPUTS
  const agentIdInput = req.body.agentIdInput;
  const propertyIdInput = req.body.propertyIdInput;
  const reservationIdInput = req.body.reservationIdInput;
  
  if(req.session.userId != undefined) {
    const userId = req.session.userId;

      //  SELECT TYPE OF USER QUERY
    const selectTypeOfUserQuery = 'SELECT type_of_user FROM main_user_table WHERE user_id = ?';

    connection.query(selectTypeOfUserQuery, userId, (err, selectTypeOfUserResult) => {
      if (err) {throw err};
      
      if(selectTypeOfUserResult[0].type_of_user != "Customer") { 
          //  IF USERS KEEPS SENDING THE SAME DATA OVER AND OVER THIS END-POINT WILL STOP,
          //  TO AVOID THAT BACK-END MUST SEND SOMETHING BACK TO FRONT-END.
        res.json("");

      } else {  
          //  UPDATE STATUS RESERVATION QUERY.
        const updateStatusReservationQuery = 'UPDATE reservation_table SET status = ?, reason_for_cancelling = ? WHERE reservation_id = ?';

          //  DECLARES updateStatusReservationValue.
        const updateStatusReservationValue = ["cancelled", "Buyer backed off", reservationIdInput];

        connection.query(updateStatusReservationQuery, updateStatusReservationValue, (err, updateStatusReservationResult) => {
          if(err) {throw err};
          
            //  UPDATE STATUS PROPERTY QUERY.
          const updateStatusPropertyQuery = 'UPDATE property_table SET status = "available" WHERE user_id = ? AND  property_id = ?';

            //  DECLARES updateStatuPropertyValue.
          const updateStatusPropertyValue = [agentIdInput, propertyIdInput];

          connection.query(updateStatusPropertyQuery, updateStatusPropertyValue, (err, updateStatusPropertyResult) => {
            if(err) {throw err};
          
              //  IF USERS KEEPS SENDING THE SAME DATA OVER AND OVER THIS END-POINT WILL STOP,
              //  TO AVOID THAT BACK-END MUST SEND SOMETHING BACK TO FRONT-END.
            res.json("");
              
          });
          
        });

      };
      
    });

  } else {  
      //  IF USERS KEEPS SENDING THE SAME DATA OVER AND OVER THIS END-POINT WILL STOP,
      //  TO AVOID THAT BACK-END MUST SEND SOMETHING BACK TO FRONT-END.
    res.json("");

  };

});

  //  SELECT HISTORY TOUR AND RESRERVATION.
app.post('/tour-reservation-history', (req, res) => {
    //  USER INPUTS.
  const sortInput = req.body.sortInput.toLowerCase();
  
    //  INITIALIZE VALUE FOR selectTourResercationStatus.
  let selectTourResercationStatus = '';

  if(sortInput == "all") {
    selectTourResercationStatus = 'status != "On Going"';

  } else if(sortInput == "Completed") {
    selectTourResercationStatus = 'status = "Completed"';

  } else {
    selectTourResercationStatus = 'status != "On Going" AND status != "Completed"';

  };

    //  SELECT USER LISTINGS QUERY.
  const selectUserListingsQuery = 'SELECT user_id, type_of_user, photo, first_name, last_name, user_name, contact_number, telephone_number, email_address, recovery_email_address, password, date_joined, date_leaved FROM main_user_table WHERE date_leaved IS NULL';

  connection.query(selectUserListingsQuery, (err, selectUserListingsResult) => {
    if (err) {throw err};

      //  SELECT PORPERTY LISTINGS QUERY.
    const selectPropertyListingsQuery = 'SELECT property_id, user_id, location, address, main_image, image_1, image_2, image_3, image_4, image_5, image_6, image_7, image_8, image_9, image_10, property_type, FORMAT(price, 2) AS price_formatted, FORMAT(area, 2) AS area_formatted, room_count, bath_count, description, status, date_featured, date_created, date_deleted FROM property_table WHERE date_deleted IS NULL';

    connection.query(selectPropertyListingsQuery, (err, selectPropertyListingsResult) => {
      if (err) {throw err};

      let userId = '';

      if(req.session.userId != undefined) {
        userId = req.session.userId;

          //  SELECT TYPE OF USER QUERY
        const selectTypeOfUserQuery = 'SELECT type_of_user FROM main_user_table WHERE user_id = ?';

        connection.query(selectTypeOfUserQuery, userId, (err, selectTypeOfUserResult) => {
          if (err) {throw err};
            
          if(selectTypeOfUserResult[0].type_of_user != "Customer") {
              //  IF USERS KEEPS SENDING THE SAME DATA OVER AND OVER THIS END-POINT WILL STOP,
              //  TO AVOID THAT BACK-END MUST SEND SOMETHING BACK TO FRONT-END.
            res.json("");

          } else {

              //------------------------------------------------------------TOUR LISTINGS--------------------------------------------------.

              //  SELECT RESERVATION LISTINGS QUERY.
            const selectReservationListingsQuery = 'SELECT reservation_id, agent_id, customer_id, property_id, full_name, contact_number, email_address, property, reservation_period_from, reservation_period_to, status, date_archived, reason_for_cancelling, note FROM reservation_table WHERE customer_id = ? AND ' + selectTourResercationStatus;

            connection.query(selectReservationListingsQuery, userId, (err, selectReservationListingsResult) => {
              if (err) {throw err};

              res.json({propertyListings: selectPropertyListingsResult,
                        userListings: selectUserListingsResult, 
                        userId: userId,
                        reservationListings: selectReservationListingsResult
                      });

            });

              //---------------------------------------------------------------------------------------------------------------------------.

          };

        });

      } else {
          //  IF USERS KEEPS SENDING THE SAME DATA OVER AND OVER THIS END-POINT WILL STOP,
          //  TO AVOID THAT BACK-END MUST SEND SOMETHING BACK TO FRONT-END.
        res.json("");

      };

    });

  });
  
});



/*
    ****************
    *  AGENT SIDE  *
    ****************
*/

  //  SELECT PROPERTY LISTINGS.
app.get('/featured-house-listings', (req, res) => {
  if(req.session.userId != undefined) {
    const userId = req.session.userId;

      //  SELECT TYPE OF USER QUERY
    const selectTypeOfUserQuery = 'SELECT user_id, type_of_user, photo, first_name, last_name, user_name, contact_number, telephone_number, email_address, recovery_email_address, password, date_joined, date_leaved FROM main_user_table WHERE user_id = ?';

    connection.query(selectTypeOfUserQuery, userId, (err, selectTypeOfUserResult) => {
      if (err) {throw err};
      
      if(selectTypeOfUserResult[0].type_of_user != "Agent") { 
          //  IF USERS KEEPS SENDING THE SAME DATA OVER AND OVER THIS END-POINT WILL STOP,
          //  TO AVOID THAT BACK-END MUST SEND SOMETHING BACK TO FRONT-END.
        res.json("");

      } else {
          //  SELECT FEATURED HOUSE LISTINGS QUERY.
        const selectFeaturedHouseListingsQuery = 'SELECT property_id, user_id, location, address, main_image, image_1, image_2, image_3, image_4, image_5, image_6, image_7, image_8, image_9, image_10, property_type, FORMAT(price, 2) AS price_formatted, FORMAT(area, 2) AS area_formatted, room_count, bath_count, description, status, date_featured, date_created, date_deleted FROM property_table WHERE user_id = ? AND (property_type = "bungalow" OR property_type = "two-storey house" OR property_type = "one-and-a-half storey house" OR property_type = "multi-storey house" OR property_type = "split-level house" OR property_type = "duplex" OR property_type = "triplex / fourplex" OR property_type = "townhouse / row house" OR property_type = "semi-detached house" OR property_type = "single-detached house" OR property_type = "modern house" OR property_type = "contemporary house" OR property_type = "villa" OR property_type = "cottage" OR property_type = "farmhouse" OR property_type = "beach house" OR property_type = "rest house / vacation home") AND date_featured IS NOT NULL AND date_deleted IS NULL ORDER BY date_featured';

        connection.query(selectFeaturedHouseListingsQuery, userId, (err, selectFeaturedHouseListingsResult) => {
          if (err) {throw err};

              //  SELECT RESERVATION LISTINGS QUERY.
            const selectReservationListingsQuery = 'SELECT reservation_id, agent_id, customer_id, property_id, full_name, contact_number, email_address, property, reservation_period_from, reservation_period_to, status, date_archived, reason_for_cancelling, note FROM reservation_table WHERE agent_id = ? AND date_archived IS NULL LIMIT 10';
              
            connection.query(selectReservationListingsQuery, userId, (err, selectReservationListingsResult) => {
              if (err) {throw err};
                        
              res.json({featuredHouseListings: selectFeaturedHouseListingsResult, reservationListings: selectReservationListingsResult});

            });

        });

      };
    
    });

  } else {    
      //  IF USERS KEEPS SENDING THE SAME DATA OVER AND OVER THIS END-POINT WILL STOP,
      //  TO AVOID THAT BACK-END MUST SEND SOMETHING BACK TO FRONT-END.
    res.json("");

  };

});

  //  SELECT PROPERTY LISTINGS.
app.get('/featured-land-listings', (req, res) => {
  if(req.session.userId != undefined) {
    const userId = req.session.userId;

      //  SELECT TYPE OF USER QUERY
    const selectTypeOfUserQuery = 'SELECT user_id, type_of_user, photo, first_name, last_name, user_name, contact_number, telephone_number, email_address, recovery_email_address, password, date_joined, date_leaved FROM main_user_table WHERE user_id = ?';

    connection.query(selectTypeOfUserQuery, userId, (err, selectTypeOfUserResult) => {
      if (err) {throw err};
      
      if(selectTypeOfUserResult[0].type_of_user != "Agent") { 
          //  IF USERS KEEPS SENDING THE SAME DATA OVER AND OVER THIS END-POINT WILL STOP,
          //  TO AVOID THAT BACK-END MUST SEND SOMETHING BACK TO FRONT-END.
        res.json("");

      } else {
          //  SELECT FEATURED LAND LISTINGS QUERY.
        const selectFeaturedLandListingsQuery = 'SELECT property_id, user_id, location, address, main_image, image_1, image_2, image_3, image_4, image_5, image_6, image_7, image_8, image_9, image_10, property_type, FORMAT(price, 2) AS price_formatted, FORMAT(area, 2) AS area_formatted, room_count, bath_count, description, status, date_featured, date_created, date_deleted FROM property_table WHERE user_id = ? AND (property_type = "residential lot" OR property_type = "commercial lot" OR property_type = "industrial lot" OR property_type = "agricultural / farm land" OR property_type = "subdivision lot" OR property_type = "beachfront lot" OR property_type = "mountain / hillside lot" OR property_type = "mixed-use lot" OR property_type = "vacant lot" OR property_type = "raw land" OR property_type = "investment lot") AND date_featured IS NOT NULL AND date_deleted IS NULL ORDER BY date_featured';

        connection.query(selectFeaturedLandListingsQuery, userId, (err, selectFeaturedLandListingsResult) => {
          if (err) {throw err};

              //  SELECT RESERVATION LISTINGS QUERY.
            const selectReservationListingsQuery = 'SELECT reservation_id, agent_id, customer_id, property_id, full_name, contact_number, email_address, property, reservation_period_from, reservation_period_to, status, date_archived, reason_for_cancelling, note FROM reservation_table WHERE agent_id = ? AND date_archived IS NULL LIMIT 10';
              
            connection.query(selectReservationListingsQuery, userId, (err, selectReservationListingsResult) => {
              if (err) {throw err};
                        
              res.json({featuredLandListings: selectFeaturedLandListingsResult, reservationListings: selectReservationListingsResult});

            });

        });

      };
    
    });

  } else {    
      //  IF USERS KEEPS SENDING THE SAME DATA OVER AND OVER THIS END-POINT WILL STOP,
      //  TO AVOID THAT BACK-END MUST SEND SOMETHING BACK TO FRONT-END.
    res.json("");

  };

});

  //  REMOVE FEATURED PROPERTY.
app.post('/remove-featured', (req, res) => {
    //  USER INPUTS.
  const propertyIdInput = req.body.propertyIdInput;
  
  if(req.session.userId != undefined) {
    const userId = req.session.userId;

      //  SELECT TYPE OF USER QUERY
    const selectTypeOfUserQuery = 'SELECT user_id, type_of_user, photo, first_name, last_name, user_name, contact_number, telephone_number, email_address, recovery_email_address, password, date_joined, date_leaved FROM main_user_table WHERE user_id = ?';

    connection.query(selectTypeOfUserQuery, userId, (err, selectTypeOfUserResult) => {
      if (err) {throw err};
      
      if(selectTypeOfUserResult[0].type_of_user != "Agent") { 
          //  IF USERS KEEPS SENDING THE SAME DATA OVER AND OVER THIS END-POINT WILL STOP,
          //  TO AVOID THAT BACK-END MUST SEND SOMETHING BACK TO FRONT-END.
        res.json("");

      } else {
          //  REMOVE FEATURED PROPERTY QUERY.
        const removeFeaturedPropertyQuery = 'UPDATE property_table SET date_featured = NULL WHERE user_id = ? AND property_id = ?';

          //  DECLARES removeFeaturedPropertyValue.
        const removeFeaturedPropertyValue = [userId, propertyIdInput]

        connection.query(removeFeaturedPropertyQuery, removeFeaturedPropertyValue, (err, removeFeaturedPropertyResult) => {
          if (err) {throw err};

              //  IF USERS KEEPS SENDING THE SAME DATA OVER AND OVER THIS END-POINT WILL STOP,
              //  TO AVOID THAT BACK-END MUST SEND SOMETHING BACK TO FRONT-END.
            res.json("");

        });

      };

    });

  } else {    
      //  IF USERS KEEPS SENDING THE SAME DATA OVER AND OVER THIS END-POINT WILL STOP,
      //  TO AVOID THAT BACK-END MUST SEND SOMETHING BACK TO FRONT-END.
    res.json("");

  };
})

  //  SELECT PROPERTY LISTINGS.
app.get('/house-listings-2', (req, res) => {
  if(req.session.userId != undefined) {
    const userId = req.session.userId;

      //  SELECT TYPE OF USER QUERY
    const selectTypeOfUserQuery = 'SELECT user_id, type_of_user, photo, first_name, last_name, user_name, contact_number, telephone_number, email_address, recovery_email_address, password, date_joined, date_leaved FROM main_user_table WHERE user_id = ?';

    connection.query(selectTypeOfUserQuery, userId, (err, selectTypeOfUserResult) => {
      if (err) {throw err};
      
      if(selectTypeOfUserResult[0].type_of_user != "Agent") {
          //  IF USERS KEEPS SENDING THE SAME DATA OVER AND OVER THIS END-POINT WILL STOP,
          //  TO AVOID THAT BACK-END MUST SEND SOMETHING BACK TO FRONT-END.
        res.json("");

      } else {  
          //  SELECT HOUSE LISTINGS QUERY.
        const selectHouseListingsQuery = 'SELECT property_id, user_id, location, address, main_image, image_1, image_2, image_3, image_4, image_5, image_6, image_7, image_8, image_9, image_10, property_type, FORMAT(price, 2) AS price_formatted, FORMAT(area, 2) AS area_formatted, room_count, bath_count, description, status, date_featured, date_created, date_deleted FROM property_table WHERE user_id = ? AND (property_type = "bungalow" OR property_type = "two-storey house" OR property_type = "one-and-a-half storey house" OR property_type = "multi-storey house" OR property_type = "split-level house" OR property_type = "duplex" OR property_type = "triplex / fourplex" OR property_type = "townhouse / row house" OR property_type = "semi-detached house" OR property_type = "single-detached house" OR property_type = "modern house" OR property_type = "contemporary house" OR property_type = "villa" OR property_type = "cottage" OR property_type = "farmhouse" OR property_type = "beach house" OR property_type = "rest house / vacation home") AND date_featured IS NULL AND date_deleted IS NULL';

        connection.query(selectHouseListingsQuery, userId, (err, selectHouseListingsResult) => {
          if (err) {throw err};

              //  SELECT RESERVATION LISTINGS QUERY.
            const selectReservationListingsQuery = 'SELECT reservation_id, agent_id, customer_id, property_id, full_name, contact_number, email_address, property, reservation_period_from, reservation_period_to, status, date_archived, reason_for_cancelling, note FROM reservation_table WHERE agent_id = ? AND date_archived IS NULL LIMIT 10';
              
            connection.query(selectReservationListingsQuery, userId, (err, selectReservationListingsResult) => {
              if (err) {throw err};
                        
              res.json({houseListings: selectHouseListingsResult, reservationListings: selectReservationListingsResult});

            });

        });

      }; 

    });

  } else {    
      //  IF USERS KEEPS SENDING THE SAME DATA OVER AND OVER THIS END-POINT WILL STOP,
      //  TO AVOID THAT BACK-END MUST SEND SOMETHING BACK TO FRONT-END.
    res.json("");
  };
});

  //  SELECT PROPERTY LISTINGS.
app.get('/land-listings-2', (req, res) => {
  if(req.session.userId != undefined) {
    const userId = req.session.userId;

      //  SELECT TYPE OF USER QUERY
    const selectTypeOfUserQuery = 'SELECT user_id, type_of_user, photo, first_name, last_name, user_name, contact_number, telephone_number, email_address, recovery_email_address, password, date_joined, date_leaved FROM main_user_table WHERE user_id = ?';

    connection.query(selectTypeOfUserQuery, userId, (err, selectTypeOfUserResult) => {
      if (err) {throw err};
      
      if(selectTypeOfUserResult[0].type_of_user != "Agent") { 
          //  IF USERS KEEPS SENDING THE SAME DATA OVER AND OVER THIS END-POINT WILL STOP,
          //  TO AVOID THAT BACK-END MUST SEND SOMETHING BACK TO FRONT-END.
        res.json("");

      } else { 
          //  SELECT LAND LISTINGS QUERY.
        const selectlandListingsQuery = 'SELECT property_id, user_id, location, address, main_image, image_1, image_2, image_3, image_4, image_5, image_6, image_7, image_8, image_9, image_10, property_type, FORMAT(price, 2) AS price_formatted, FORMAT(area, 2) AS area_formatted, room_count, bath_count, description, status, date_featured, date_created, date_deleted FROM property_table WHERE user_id = ? AND (property_type = "residential lot" OR property_type = "commercial lot" OR property_type = "industrial lot" OR property_type = "agricultural / farm land" OR property_type = "subdivision lot" OR property_type = "beachfront lot" OR property_type = "mountain / hillside lot" OR property_type = "mixed-use lot" OR property_type = "vacant lot" OR property_type = "raw land" OR property_type = "investment lot") AND date_featured IS NULL AND date_deleted IS NULL';

        connection.query(selectlandListingsQuery, userId, (err, selectlandListingsResult) => {
          if (err) {throw err};

              //  SELECT RESERVATION LISTINGS QUERY.
            const selectReservationListingsQuery = 'SELECT reservation_id, agent_id, customer_id, property_id, full_name, contact_number, email_address, property, reservation_period_from, reservation_period_to, status, date_archived, reason_for_cancelling, note FROM reservation_table WHERE agent_id = ? AND date_archived IS NULL LIMIT 10';
              
            connection.query(selectReservationListingsQuery, userId, (err, selectReservationListingsResult) => {
              if (err) {throw err};
                        
              res.json({landListings: selectlandListingsResult, reservationListings: selectReservationListingsResult});

            });

        });

      }; 

    });

  } else {    
      //  IF USERS KEEPS SENDING THE SAME DATA OVER AND OVER THIS END-POINT WILL STOP,
      //  TO AVOID THAT BACK-END MUST SEND SOMETHING BACK TO FRONT-END.
    res.json("");
  };
});

  //  DELETE PROPERTY.
app.post('/delete-property', (req, res) => {
    //  USER INPUTS.
  const propertyIdInput = req.body.propertyIdInput;
  const d = new Date();
  const dateDeleted = d.getFullYear().toString().padStart(4, "0")  + '-' +
                     (d.getMonth() + 1).toString().padStart(2, "0") + '-' +
                      d.getDate().toString().padStart(2, "0") + ' ' +
                      d.getHours().toString().padStart(2, "0") + ':' +
                      d.getMinutes().toString().padStart(2, "0") + ':' +
                      d.getSeconds().toString().padStart(2, "0");
  
  if(req.session.userId != undefined) {
    const userId = req.session.userId;

      //  SELECT TYPE OF USER QUERY
    const selectTypeOfUserQuery = 'SELECT user_id, type_of_user, photo, first_name, last_name, user_name, contact_number, telephone_number, email_address, recovery_email_address, password, date_joined, date_leaved FROM main_user_table WHERE user_id = ?';

    connection.query(selectTypeOfUserQuery, userId, (err, selectTypeOfUserResult) => {
      if (err) {throw err};
      
      if(selectTypeOfUserResult[0].type_of_user != "Agent") { 
          //  IF USERS KEEPS SENDING THE SAME DATA OVER AND OVER THIS END-POINT WILL STOP,
          //  TO AVOID THAT BACK-END MUST SEND SOMETHING BACK TO FRONT-END.
        res.json("");

      } else {
        //  DELETE PROPERTY QUERY.
        const deletePropertyQuery = 'UPDATE property_table SET date_deleted = ? WHERE user_id = ? AND property_id = ?';

          //  DECLARES deleteValue.
        const deleteValue = [dateDeleted, userId, propertyIdInput];

        connection.query(deletePropertyQuery, deleteValue, (err, deletePropertyResult) => {
          if (err) {throw err};

              //  IF USERS KEEPS SENDING THE SAME DATA OVER AND OVER THIS END-POINT WILL STOP,
              //  TO AVOID THAT BACK-END MUST SEND SOMETHING BACK TO FRONT-END.
            res.json("");

        });

      };
    
    });

  } else {    
      //  IF USERS KEEPS SENDING THE SAME DATA OVER AND OVER THIS END-POINT WILL STOP,
      //  TO AVOID THAT BACK-END MUST SEND SOMETHING BACK TO FRONT-END.
    res.json("");
  };
})

  //  ADD FEATURED PROPERTY.
app.post('/add-featured', (req, res) => {
  const d = new Date();
  const dateFeatured = d.getFullYear().toString().padStart(4, "0")  + '-' +
                      (d.getMonth() + 1).toString().padStart(2, "0")  + '-' +
                       d.getDate().toString().padStart(2, "0") + ' ' +
                       d.getHours().toString().padStart(2, "0") + ':' +
                       d.getMinutes().toString().padStart(2, "0") + ':' +
                       d.getSeconds().toString().padStart(2, "0");

  const propertyIdInput = req.body.propertyIdInput;
  
  if(req.session.userId != undefined) {
    const userId = req.session.userId;

      //  SELECT TYPE OF USER QUERY
    const selectTypeOfUserQuery = 'SELECT user_id, type_of_user, photo, first_name, last_name, user_name, contact_number, telephone_number, email_address, recovery_email_address, password, date_joined, date_leaved FROM main_user_table WHERE user_id = ?';

    connection.query(selectTypeOfUserQuery, userId, (err, selectTypeOfUserResult) => {
      if (err) {throw err};
      
      if(selectTypeOfUserResult[0].type_of_user != "Agent") {
          //  IF USERS KEEPS SENDING THE SAME DATA OVER AND OVER THIS END-POINT WILL STOP,
          //  TO AVOID THAT BACK-END MUST SEND SOMETHING BACK TO FRONT-END.
        res.json("");

      } else {
          //  ADD FEATURED PROPERTY QUERY.
        let addFeaturedPropertyQuery = '';

        if(propertyIdInput.length > 0) {
          addFeaturedPropertyQuery += 'UPDATE property_table SET date_featured = "' + dateFeatured + '" WHERE user_id = "' + userId + '" AND ';
            
            //  SELECT EVERY propertyIdInput VALUES.
          for(let i = 0; i < propertyIdInput.length; i++) {
            addFeaturedPropertyQuery += 'property_id = ?';
            
            if(propertyIdInput.length > 1 && i < propertyIdInput.length - 1) {
              addFeaturedPropertyQuery += ' OR ';
            };
          };

          connection.query(addFeaturedPropertyQuery, propertyIdInput, (err, addFeaturedPropertyResult) => {
            if (err) {throw err};

              //  IF USERS KEEPS SENDING THE SAME DATA OVER AND OVER THIS END-POINT WILL STOP,
              //  TO AVOID THAT BACK-END MUST SEND SOMETHING BACK TO FRON-END.
            res.json("");
          });

        } else {
            //  IF USERS KEEPS SENDING THE SAME DATA OVER AND OVER THIS END-POINT WILL STOP,
            //  TO AVOID THAT BACK-END MUST SEND SOMETHING BACK TO FRON-END.
          res.json("");

        };

      };

    });

  } else {    
      //  IF USERS KEEPS SENDING THE SAME DATA OVER AND OVER THIS END-POINT WILL STOP,
      //  TO AVOID THAT BACK-END MUST SEND SOMETHING BACK TO FRONT-END.
    res.json("");
  };

});

  //  MARK SOLD PROPERTY.
app.post('/mark-sold', (req, res) => {
  const propertyIdInput = req.body.propertyIdInput;
  
  if(req.session.userId != undefined) {
    const userId = req.session.userId;

      //  SELECT TYPE OF USER QUERY
    const selectTypeOfUserQuery = 'SELECT user_id, type_of_user, photo, first_name, last_name, user_name, contact_number, telephone_number, email_address, recovery_email_address, password, date_joined, date_leaved FROM main_user_table WHERE user_id = ?';

    connection.query(selectTypeOfUserQuery, userId, (err, selectTypeOfUserResult) => {
      if (err) {throw err};
      
      if(selectTypeOfUserResult[0].type_of_user != "Agent") {
          //  IF USERS KEEPS SENDING THE SAME DATA OVER AND OVER THIS END-POINT WILL STOP,
          //  TO AVOID THAT BACK-END MUST SEND SOMETHING BACK TO FRONT-END.
        res.json(""); 

      } else {
          //  SELECT PROPERTY LISTINGS QUERY.
        const selectPropertyListingsQuery = 'SELECT property_id, user_id, location, address, main_image, image_1, image_2, image_3, image_4, image_5, image_6, image_7, image_8, image_9, image_10, property_type, FORMAT(price, 2) AS price_formatted, FORMAT(area, 2) AS area_formatted, room_count, bath_count, description, status, date_featured, date_created, date_deleted FROM property_table WHERE user_id = ? AND property_id = ? AND date_deleted IS NULL';

          //  DECALRES selectPropertyListingsValue.
        const selectPropertyListingsValue = [userId, propertyIdInput];

        connection.query(selectPropertyListingsQuery, selectPropertyListingsValue, (err, selectPropertyListingsResult) => {
          if (err) {throw err};

          if(
              selectPropertyListingsResult[0].status != "AVAILABLE" &&
              selectPropertyListingsResult[0].status != "SOLD" 
            ) {
              //  MARK SOLD PROPERTY QUERY.
            const markSoldPropertyQuery = 'UPDATE property_table SET status = "SOLD" WHERE user_id = ? AND property_id = ?';

              //  DECLARES markSoldPropertyValue.
            const markSoldPropertyValue = [userId, propertyIdInput]

            connection.query(markSoldPropertyQuery, markSoldPropertyValue, (err, markSoldPropertyResult) => {
              if (err) {throw err}; 
                  //  UPDATE STATUS RESERVATION QUERY.
                const updateStatusReservationQuery = 'UPDATE reservation_table SET status = ?, reason_for_cancelling = ? WHERE property_id = ?';

                  //  DECLARES updateStatusReservationValue.
                const updateStatusReservationValue = ["Cancelled", "Property has been sold", propertyIdInput];

                connection.query(updateStatusReservationQuery, updateStatusReservationValue, (err, updateStatusReservationResult) => {
                  if(err) {throw err};

                  //  IF USERS KEEPS SENDING THE SAME DATA OVER AND OVER THIS END-POINT WILL STOP,
                  //  TO AVOID THAT BACK-END MUST SEND SOMETHING BACK TO FRON-END.
                res.json("");

              });

            });
            
          } else {            
              //  MARK SOLD PROPERTY QUERY.
            const markSoldPropertyQuery = 'UPDATE property_table SET status = "SOLD" WHERE user_id = ? AND property_id = ?';

              //  DECLARES markSoldPropertyValue.
            const markSoldPropertyValue = [userId, propertyIdInput]

            connection.query(markSoldPropertyQuery, markSoldPropertyValue, (err, markSoldPropertyResult) => {
              if (err) {throw err};

                //  IF USERS KEEPS SENDING THE SAME DATA OVER AND OVER THIS END-POINT WILL STOP,
                //  TO AVOID THAT BACK-END MUST SEND SOMETHING BACK TO FRON-END.
              res.json("");

            });

          }

        });

      };

    });

  } else {    
      //  IF USERS KEEPS SENDING THE SAME DATA OVER AND OVER THIS END-POINT WILL STOP,
      //  TO AVOID THAT BACK-END MUST SEND SOMETHING BACK TO FRONT-END.
    res.json("");
  };

});

  //  TRIGGER THE OPEN STREET MAP END-POINT THROUGH THIS API SINCE BACK-END IS CORS ENABLED.
app.post('/search-location', async (req, res) => {
  const searchInput = req.body.locationValue;

    //  END-POINT PROVIDED BY NOMINATIM TO FETCH DATA FROM OPEN STREET MAP.
  const response = await fetch('https://nominatim.openstreetmap.org/search?q=' + searchInput + '&format=json',);
  const data = await response.json();

    //  INITIALIZED displayNameValue.
  const displayNameValue = [];

    //  PUSH EVERY FETCHED DISPLAY NAME TO displayNameValue.
  for(let i = 0; i < data.length; i++) {
    displayNameValue.push(data[i].display_name);
  }

  res.json({location: displayNameValue});
})

const uploadMiddleware = upload.fields([{ name: 'Main_image'}, { name: 'Additional_images', maxCount: 10 }])
app.post('/add-house', uploadMiddleware, function (req, res) {
    //  USER INPUTS.
  const locationInput = req.body.Location;
  const addressInput = req.body.Address;
  const mainImage = req.files['Main_image'][0].originalname;
  const additionalImages = req.files['Additional_images'];

    //  INITIALIZED VALUE FOR additionalImagesInput.
  const additionalImagesInput = [];

    //  .
  if(additionalImages != undefined) {
    for(let i = 0; i < additionalImages.length; i++) {
      additionalImagesInput.push(additionalImages[i].originalname);
    };
  };

  const houseTypeInput = req.body.house_type;
  const priceInput = parseInt(req.body.Price.replace(/\D/g, '')) + 0.00;
  const areaInput = req.body.Area.replace(/\D/g, '');
  const roomCount = req.body.Room_count.replace(/\D/g, '');
  const bathCountInput = req.body.Bath_count.replace(/\D/g, '');
  const descriptionInput = req.body.Description;
  const status = "AVAILABLE";
  const d = new Date();
  const dateCreated = d.getFullYear().toString().padStart(4, "0")  + '-' +
                    (d.getMonth() + 1).toString().padStart(2, "0")  + '-' +
                      d.getDate().toString().padStart(2, "0") + ' ' +
                      d.getHours().toString().padStart(2, "0") + ':' +
                      d.getMinutes().toString().padStart(2, "0") + ':' +
                      d.getSeconds().toString().padStart(2, "0");

  if(req.session.userId != undefined) {
    const userId = req.session.userId;
    const propertyId = "PROP" + Math.floor(Math.random() * 10000);

      //  SELECT TYPE OF USER QUERY
    const selectTypeOfUserQuery = 'SELECT user_id, type_of_user, photo, first_name, last_name, user_name, contact_number, telephone_number, email_address, recovery_email_address, password, date_joined, date_leaved FROM main_user_table WHERE user_id = ?';

    connection.query(selectTypeOfUserQuery, userId, (err, selectTypeOfUserResult) => {
      if (err) {throw err};
      
      if(selectTypeOfUserResult[0].type_of_user != "Agent") { 
          //  IF USERS KEEPS SENDING THE SAME DATA OVER AND OVER THIS END-POINT WILL STOP,
          //  TO AVOID THAT BACK-END MUST SEND SOMETHING BACK TO FRONT-END.
        res.json("");

      } else {
          //  INITIALIZED VALUE FOR insertPropertyValue.
        const insertPropertyValue = [userId,
                                    propertyId,
                                    locationInput,
                                    addressInput,
                                    mainImage
        ];

          //  .
        if(additionalImagesInput.length > 0) {
          for(let i = 0; i < additionalImagesInput.length; i++) {
            insertPropertyValue.push(additionalImagesInput[i]);
          };
        };

        insertPropertyValue.push(houseTypeInput,
                                priceInput,
                                areaInput,
                                roomCount,
                                bathCountInput,
                                descriptionInput,
                                status,
                                dateCreated

        );

          //  .
        if(insertPropertyValue.length > 0) {
          for(let i = 0; i < insertPropertyValue.length; i++) {
            if(insertPropertyValue[i] == "") {
              insertPropertyValue[i] = null;
            };
          };
        };

          //  INSERT PROPERTY QUERY.
        let insertPropertyQuery = 'INSERT INTO property_table (user_id, property_id, location, address, main_image';

          //  .
        if(additionalImagesInput.length > 0) {
          for(let i = 0; i < additionalImagesInput.length; i++) {
            insertPropertyQuery += ', image_' + (i + 1);
          };
        };

        insertPropertyQuery += ', property_type, price, area, room_count, bath_count, description, status, date_created) VALUES (?, ?, ?, ?, ?';

          //  .
        if(additionalImagesInput.length > 0) {
          for(let i = 0; i < additionalImagesInput.length; i++) {
            insertPropertyQuery += ', ?';
          };
        };

        insertPropertyQuery += ', ?, ?, ?, ?, ?, ?, ?, ?)';

        connection.query(insertPropertyQuery, insertPropertyValue, (err, insertPropertyResult) => {
          if (err) {throw err};

          async function imageUploader() {
            const avatarFile = req.files['Main_image'][0]
            const { data, error } = await supabase
            .storage
            .from('D.T. Comia Realty and Marketing')
            .upload('PROPERTY/' + userId + '/' + propertyId + '/' + req.files['Main_image'][0].originalname, avatarFile.buffer, {
              cacheControl: '3600',
              upsert: false
            })

            if(req.files['Additional_images'] != undefined) {
              for(let i = 0; i < req.files['Additional_images'].length; i++) {
                const avatarFile = req.files['Additional_images'][i]
                const { data, error } = await supabase
                .storage
                .from('D.T. Comia Realty and Marketing')
                .upload('PROPERTY/' + userId + '/' + propertyId + '/' + req.files['Additional_images'][i].originalname, avatarFile.buffer, {
                  cacheControl: '3600',
                  upsert: false
                })
              };
            };
          };  

          /*
            EXAMPLE FOLDER STRUCTURE:
              resources/
                PROPERTY/
                  [USER ID(1)]
                    [PROPERTY ID(1)]
                      FILE(ORIGINAL NAME)
                    [PROPERTY ID(2)]
                      FILE(ORIGINAL NAME)(1)
                      FILE(ORIGINAL NAME)(2)
                  [USER ID(2)]
                    [PROPERTY ID]
                      FILE(ORIGINAL NAME)(1)
                      FILE(ORIGINAL NAME)(2)
                      FILE(ORIGINAL NAME)(3)
          */

          imageUploader().catch(console.error);

            //  IF USERS KEEPS SENDING THE SAME DATA OVER AND OVER THIS END-POINT WILL STOP,
            //  TO AVOID THAT BACK-END MUST SEND SOMETHING BACK TO FRONT-END.
          res.json("");
        });
      };
    });
  } else {    
      //  IF USERS KEEPS SENDING THE SAME DATA OVER AND OVER THIS END-POINT WILL STOP,
      //  TO AVOID THAT BACK-END MUST SEND SOMETHING BACK TO FRONT-END.
    res.json("");
  };

});

app.post('/add-land', uploadMiddleware, function (req, res) {
    //  USER INPUTS.
  const locationInput = req.body.Location;
  const addressInput = req.body.Address;
  const mainImage = req.files['Main_image'][0].originalname;
  const additionalImages = req.files['Additional_images'];

    //  INITIALIZED VALUE FOR additionalImagesInput.
  const additionalImagesInput = [];

    //  .
  if(additionalImages != undefined) {
    for(let i = 0; i < additionalImages.length; i++) {
      additionalImagesInput.push(additionalImages[i].originalname);
    };
  };

  const landTypeInput = req.body.land_type;
  const priceInput = parseInt(req.body.Price.replace(/\D/g, '')) + 0.00;
  const areaInput = req.body.Area.replace(/\D/g, '');
  const descriptionInput = req.body.Description;
  const status = "AVAILABLE";
  const d = new Date();
  const dateCreated = d.getFullYear().toString().padStart(4, "0")  + '-' +
                    (d.getMonth() + 1).toString().padStart(2, "0")  + '-' +
                      d.getDate().toString().padStart(2, "0") + ' ' +
                      d.getHours().toString().padStart(2, "0") + ':' +
                      d.getMinutes().toString().padStart(2, "0") + ':' +
                      d.getSeconds().toString().padStart(2, "0");

  if(req.session.userId != undefined) {
    const userId = req.session.userId;
    const propertyId = "PROP" + Math.floor(Math.random() * 10000);

      //  SELECT TYPE OF USER QUERY
    const selectTypeOfUserQuery = 'SELECT user_id, type_of_user, photo, first_name, last_name, user_name, contact_number, telephone_number, email_address, recovery_email_address, password, date_joined, date_leaved FROM main_user_table WHERE user_id = ?';

    connection.query(selectTypeOfUserQuery, userId, (err, selectTypeOfUserResult) => {
      if (err) {throw err};
      
      if(selectTypeOfUserResult[0].type_of_user != "Agent") { 
          //  IF USERS KEEPS SENDING THE SAME DATA OVER AND OVER THIS END-POINT WILL STOP,
          //  TO AVOID THAT BACK-END MUST SEND SOMETHING BACK TO FRONT-END.
        res.json("");

      } else {
          //  INITIALIZED VALUE FOR insertPropertyValue.
        const insertPropertyValue = [userId,
                                    propertyId,
                                    locationInput,
                                    addressInput,
                                    mainImage
        ];

          //  .
        if(additionalImagesInput.length > 0) {
          for(let i = 0; i < additionalImagesInput.length; i++) {
            insertPropertyValue.push(additionalImagesInput[i]);
          };
        };

        insertPropertyValue.push(landTypeInput,
                                priceInput,
                                areaInput,
                                descriptionInput,
                                status,
                                dateCreated

        );

          //  .
        if(insertPropertyValue.length > 0) {
          for(let i = 0; i < insertPropertyValue.length; i++) {
            if(insertPropertyValue[i] == "") {
              insertPropertyValue[i] = null;
            };
          };
        };

          //  INSERT PROPERTY QUERY.
        let insertPropertyQuery = 'INSERT INTO property_table (user_id, property_id, location, address, main_image';

          //  .
        if(additionalImagesInput.length > 0) {
          for(let i = 0; i < additionalImagesInput.length; i++) {
            insertPropertyQuery += ', image_' + (i + 1);
          };
        };

        insertPropertyQuery += ', property_type, price, area, description, status, date_created) VALUES (?, ?, ?, ?, ?';

          //  .
        if(additionalImagesInput.length > 0) {
          for(let i = 0; i < additionalImagesInput.length; i++) {
            insertPropertyQuery += ', ?';
          };
        };

        insertPropertyQuery += ', ?, ?, ?, ?, ?, ?)';

        connection.query(insertPropertyQuery, insertPropertyValue, (err, insertPropertyResult) => {
          if (err) {throw err};

          async function imageUploader() {
            const avatarFile = req.files['Main_image'][0]
            const { data, error } = await supabase
            .storage
            .from('D.T. Comia Realty and Marketing')
            .upload('PROPERTY/' + userId + '/' + propertyId + '/' + req.files['Main_image'][0].originalname, avatarFile.buffer, {
              cacheControl: '3600',
              upsert: false
            })

            if(req.files['Additional_images'] != undefined) {
              for(let i = 0; i < req.files['Additional_images'].length; i++) {
                const avatarFile = req.files['Additional_images'][i]
                const { data, error } = await supabase
                .storage
                .from('D.T. Comia Realty and Marketing')
                .upload('PROPERTY/' + userId + '/' + propertyId + '/' + req.files['Additional_images'][i].originalname, avatarFile.buffer, {
                  cacheControl: '3600',
                  upsert: false
                })
              };
            };
          };  

          /*
            EXAMPLE FOLDER STRUCTURE:
              resources/
                PROPERTY/
                  [USER ID(1)]
                    [PROPERTY ID(1)]
                      FILE(ORIGINAL NAME)
                    [PROPERTY ID(2)]
                      FILE(ORIGINAL NAME)(1)
                      FILE(ORIGINAL NAME)(2)
                  [USER ID(2)]
                    [PROPERTY ID]
                      FILE(ORIGINAL NAME)(1)
                      FILE(ORIGINAL NAME)(2)
                      FILE(ORIGINAL NAME)(3)
          */

          imageUploader().catch(console.error);

            //  IF USERS KEEPS SENDING THE SAME DATA OVER AND OVER THIS END-POINT WILL STOP,
            //  TO AVOID THAT BACK-END MUST SEND SOMETHING BACK TO FRONT-END.
          res.json("");
        });
      };
    });
  } else {    
      //  IF USERS KEEPS SENDING THE SAME DATA OVER AND OVER THIS END-POINT WILL STOP,
      //  TO AVOID THAT BACK-END MUST SEND SOMETHING BACK TO FRONT-END.
    res.json("");
  };

});

  //  SELECT RESERVATION LISTINGS.
app.post('/reservation-listings', (req, res) => {
    //  USER INPUTS.

  const orderByInput = req.body.orderByInput;
  const orderInput = req.body.orderInput;
  const searchInput = req.body.searchInput;
  const pageNumberInput = req.body.pageNumberInput;

  let userId = '';

    if(req.session.userId != undefined) {
      userId = req.session.userId;

      //  SELECT TYPE OF USER QUERY
    const selectTypeOfUserQuery = 'SELECT user_id, type_of_user, photo, first_name, last_name, user_name, contact_number, telephone_number, email_address, recovery_email_address, password, date_joined, date_leaved FROM main_user_table WHERE user_id = ?';

    connection.query(selectTypeOfUserQuery, userId, (err, selectTypeOfUserResult) => {
      if (err) {throw err};
      
      if(selectTypeOfUserResult[0].type_of_user != "Agent") { 
            //  IF USERS KEEPS SENDING THE SAME DATA OVER AND OVER THIS END-POINT WILL STOP,
            //  TO AVOID THAT BACK-END MUST SEND SOMETHING BACK TO FRONT-END.
          res.json("");

        } else {  
            //  SELECT RESERVATION LISTINGS QUERY.
          const selectReservationListingsQuery = 'SELECT number, reservation_id, agent_id, customer_id, property_id, full_name, contact_number, email_address, property, reservation_period_from, reservation_period_to, status, date_archived, reason_for_cancelling, note FROM(' +
                                                   'SELECT ROW_NUMBER() OVER (ORDER BY reservation_period_from) AS number, reservation_id, agent_id, customer_id, property_id, full_name, contact_number, email_address, property, reservation_period_from, reservation_period_to, status, date_archived, reason_for_cancelling, note FROM reservation_table WHERE agent_id = ? AND date_archived IS NULL' +
                                                   ' ) as reservation_table ' +
                                                   'WHERE (number LIKE "%' + searchInput + '%" OR full_name LIKE "%' + searchInput + '%" OR contact_number LIKE "%' + searchInput + '%" OR property LIKE "%' + searchInput + '%" OR reservation_period_from LIKE "%' + searchInput + '%" OR reservation_period_to LIKE "%' + searchInput + '%" OR status LIKE "%' + searchInput + '%") ORDER BY ' + orderByInput + ' ' + orderInput + ' LIMIT 10 OFFSET ?';
            
            //  DECLARES selectReservationListingsValue.
          const selectReservationListingsValue = [userId, pageNumberInput];
            
          connection.query(selectReservationListingsQuery, selectReservationListingsValue, (err, selectReservationListingsResult) => {
            if (err) {throw err};

                //  SELECT PROPERTY LISTINGS QUERY.
              const selectPropertyListingsQuery = 'SELECT property_id, user_id, location, address, main_image, image_1, image_2, image_3, image_4, image_5, image_6, image_7, image_8, image_9, image_10, property_type, FORMAT(price, 2) AS price_formatted, FORMAT(area, 2) AS area_formatted, room_count, bath_count, description, status, date_featured, date_created, date_deleted FROM property_table WHERE user_id = ? AND date_deleted IS NULL';
                  
              connection.query(selectPropertyListingsQuery, userId, (err, selectPropertyListingsResult) => {
                if (err) {throw err};
                        
                  res.json({reservationListings: selectReservationListingsResult, propertyListings: selectPropertyListingsResult});

              });

          });

        };

      });

    } else {  
        //  IF USERS KEEPS SENDING THE SAME DATA OVER AND OVER THIS END-POINT WILL STOP,
        //  TO AVOID THAT BACK-END MUST SEND SOMETHING BACK TO FRONT-END.
      res.json("");

    };
  
});

  //  EDIT INFO.
app.post('/edit-info', (req, res) => {
    //  USER INPUTS
  const reservationIdInput = req.body.reservationIdInput;
  const nameInput = req.body.nameInput;
  let contactNoInput = req.body.contactNoInput.replace(/\D/g, "");
  const d = new Date();
  const reservedUntilInput = d.getFullYear().toString().padStart(4, "0")  + '-' +
                            (d.getMonth() + 1).toString().padStart(2, "0")  + '-' +
                             d.getDate().toString().padStart(2, "0") + ' ' +
                             d.getHours().toString().padStart(2, "0") + ':' +
                             d.getMinutes().toString().padStart(2, "0") + ':' +
                             d.getSeconds().toString().padStart(2, "0");
  
  if(req.session.userId != undefined) {
    const userId = req.session.userId;

      //  SELECT TYPE OF USER QUERY
    const selectTypeOfUserQuery = 'SELECT user_id, type_of_user, photo, first_name, last_name, user_name, contact_number, telephone_number, email_address, recovery_email_address, password, date_joined, date_leaved FROM main_user_table WHERE user_id = ?';

    connection.query(selectTypeOfUserQuery, userId, (err, selectTypeOfUserResult) => {
      if (err) {throw err};
      
      if(selectTypeOfUserResult[0].type_of_user != "Agent") { 
          //  IF USERS KEEPS SENDING THE SAME DATA OVER AND OVER THIS END-POINT WILL STOP,
          //  TO AVOID THAT BACK-END MUST SEND SOMETHING BACK TO FRONT-END.
        res.json("");

      } else { 
          //  SELECT RESERVATION LISTINGS QUERY.
        const selectReservationListingsQuery = 'SELECT reservation_id, agent_id, customer_id, property_id, full_name, contact_number, email_address, property, reservation_period_from, reservation_period_to, status, date_archived, reason_for_cancelling, note FROM reservation_table WHERE reservation_id = ?';

        connection.query(selectReservationListingsQuery, reservationIdInput, (err, selectReservationListingsResult) => {
          if(err) {throw err}; 

            //  UPDATE INFO QUERY.
          const updateInfoQuery = 'UPDATE reservation_table SET full_name = ?, contact_number = ?, reservation_period_to = ? WHERE reservation_id = ?';

            //  DECLARES updateInfoValue.
          const updateInfoValue = [
                                    nameInput,
                                    contactNoInput,
                                    reservedUntilInput,
                                    reservationIdInput
                                  ];

          connection.query(updateInfoQuery, updateInfoValue, (err, updateInfoResult) => {
            if(err) {throw err};
            
              //  IF USERS KEEPS SENDING THE SAME DATA OVER AND OVER THIS END-POINT WILL STOP,
              //  TO AVOID THAT BACK-END MUST SEND SOMETHING BACK TO FRONT-END.
            res.json("");
            
          });
          
        }); 

      };
      
    });

  } else {  
      //  IF USERS KEEPS SENDING THE SAME DATA OVER AND OVER THIS END-POINT WILL STOP,
      //  TO AVOID THAT BACK-END MUST SEND SOMETHING BACK TO FRONT-END.
    res.json("");

  };

});

  //  CHANGE STATUS.
app.post('/change-status', (req, res) => {
    //  USER INPUTS
  const agentIdInput = req.body.agentIdInput;
  const propertyIdInput = req.body.propertyIdInput;
  const reservationIdInput = req.body.reservationIdInput;
  const statusInput = req.body.statusInput
  const reasonCancellingInput = req.body.reasonCancellingInput;
  
  if(req.session.userId != undefined) {
    const userId = req.session.userId;

      //  SELECT TYPE OF USER QUERY
    const selectTypeOfUserQuery = 'SELECT user_id, type_of_user, photo, first_name, last_name, user_name, contact_number, telephone_number, email_address, recovery_email_address, password, date_joined, date_leaved FROM main_user_table WHERE user_id = ?';

    connection.query(selectTypeOfUserQuery, userId, (err, selectTypeOfUserResult) => {
      if (err) {throw err};
      
      if(selectTypeOfUserResult[0].type_of_user != "Agent") { 
          //  IF USERS KEEPS SENDING THE SAME DATA OVER AND OVER THIS END-POINT WILL STOP,
          //  TO AVOID THAT BACK-END MUST SEND SOMETHING BACK TO FRONT-END.
        res.json("");

      } else { 
          //  UPDATE STATUS RESERVATION QUERY.
        const updateStatusReservationQuery = 'UPDATE reservation_table SET status = ?, reason_for_cancelling = ? WHERE reservation_id = ?';

          //  DECLARES updateStatusReservationValue.
        const updateStatusReservationValue = [statusInput, reasonCancellingInput, reservationIdInput];

        connection.query(updateStatusReservationQuery, updateStatusReservationValue, (err, updateStatusReservationResult) => {
          if(err) {throw err};

          if(statusInput != "On Going") {
              //  UPDATE STATUS PROPERTY QUERY.
            const updateStatusPropertyQuery = 'UPDATE property_table SET status = "AVAILABLE" WHERE user_id = ? AND  property_id = ?';

              //  DECLARES updateStatuPropertyValue.
            const updateStatusPropertyValue = [agentIdInput, propertyIdInput];

            connection.query(updateStatusPropertyQuery, updateStatusPropertyValue, (err, updateStatusPropertyResult) => {
              if(err) {throw err};
          
                //  IF USERS KEEPS SENDING THE SAME DATA OVER AND OVER THIS END-POINT WILL STOP,
                //  TO AVOID THAT BACK-END MUST SEND SOMETHING BACK TO FRONT-END.
              res.json("");
              
            });

          } else {
              //  UPDATE STATUS PROPERTY QUERY.
            const updateStatusPropertyQuery = 'UPDATE property_table SET status = "RESERVED" WHERE user_id = ? AND  property_id = ?';

              //  DECLARES updateStatuPropertyValue.
            const updateStatusPropertyValue = [agentIdInput, propertyIdInput];

            connection.query(updateStatusPropertyQuery, updateStatusPropertyValue, (err, updateStatusPropertyResult) => {
              if(err) {throw err};
          
                //  IF USERS KEEPS SENDING THE SAME DATA OVER AND OVER THIS END-POINT WILL STOP,
                //  TO AVOID THAT BACK-END MUST SEND SOMETHING BACK TO FRONT-END.
              res.json("");
              
            });

          };
          
        });

      };
      
    });

  } else {  
      //  IF USERS KEEPS SENDING THE SAME DATA OVER AND OVER THIS END-POINT WILL STOP,
      //  TO AVOID THAT BACK-END MUST SEND SOMETHING BACK TO FRONT-END.
    res.json("");

  };

});

  //  RESERVATION ARCHIVE.
app.post('/reservation-archive', (req, res) => {
    //  USER INPUTS
  const reservationIdInput = req.body.reservationIdInput;
  const d = new Date();
  const dateArchived = d.getFullYear().toString().padStart(4, "0")  + '-' +
                            (d.getMonth() + 1).toString().padStart(2, "0")  + '-' +
                             d.getDate().toString().padStart(2, "0") + ' ' +
                             d.getHours().toString().padStart(2, "0") + ':' +
                             d.getMinutes().toString().padStart(2, "0") + ':' +
                             d.getSeconds().toString().padStart(2, "0");
  
  if(req.session.userId != undefined) {
    const userId = req.session.userId;

      //  SELECT TYPE OF USER QUERY
    const selectTypeOfUserQuery = 'SELECT user_id, type_of_user, photo, first_name, last_name, user_name, contact_number, telephone_number, email_address, recovery_email_address, password, date_joined, date_leaved FROM main_user_table WHERE user_id = ?';

    connection.query(selectTypeOfUserQuery, userId, (err, selectTypeOfUserResult) => {
      if (err) {throw err};
      
      if(selectTypeOfUserResult[0].type_of_user != "Agent") {
          //  IF USERS KEEPS SENDING THE SAME DATA OVER AND OVER THIS END-POINT WILL STOP,
          //  TO AVOID THAT BACK-END MUST SEND SOMETHING BACK TO FRONT-END.
        res.json("");

      } else { 
          //  UPDATE ARCHIVE QUERY.
        const updateArchiveQuery = 'UPDATE reservation_table SET date_archived = ? WHERE reservation_id = ?';

          //  DECLARES updateArchiveValue.
        const updateArchiveValue = [dateArchived, reservationIdInput];

        connection.query(updateArchiveQuery, updateArchiveValue, (err, updateArchiveResult) => {
          if(err) {throw err};
          
            //  IF USERS KEEPS SENDING THE SAME DATA OVER AND OVER THIS END-POINT WILL STOP,
            //  TO AVOID THAT BACK-END MUST SEND SOMETHING BACK TO FRONT-END.
          res.json("");
          
        }); 

      };
      
    });

  } else {  
      //  IF USERS KEEPS SENDING THE SAME DATA OVER AND OVER THIS END-POINT WILL STOP,
      //  TO AVOID THAT BACK-END MUST SEND SOMETHING BACK TO FRONT-END.
    res.json("");

  };

});

  //  ADD NOT.
app.post('/add-note', (req, res) => {
    //  USER INPUTS
  const reservationIdInput = req.body.reservationIdInput;
  const noteInput = req.body.noteInput;
  
  if(req.session.userId != undefined) {
    const userId = req.session.userId;

      //  SELECT TYPE OF USER QUERY
    const selectTypeOfUserQuery = 'SELECT user_id, type_of_user, photo, first_name, last_name, user_name, contact_number, telephone_number, email_address, recovery_email_address, password, date_joined, date_leaved FROM main_user_table WHERE user_id = ?';

    connection.query(selectTypeOfUserQuery, userId, (err, selectTypeOfUserResult) => {
      if (err) {throw err};
      
      if(selectTypeOfUserResult[0].type_of_user != "Agent") { 
          //  IF USERS KEEPS SENDING THE SAME DATA OVER AND OVER THIS END-POINT WILL STOP,
          //  TO AVOID THAT BACK-END MUST SEND SOMETHING BACK TO FRONT-END.
        res.json("");

      } else { 
          //  UPDATE NOTE QUERY.
        const updateNoteQuery = 'UPDATE reservation_table SET note = ? WHERE reservation_id = ?';

          //  DECLARES updateNoteValue.
        const updateNoteValue = [noteInput, reservationIdInput];

        connection.query(updateNoteQuery, updateNoteValue, (err, updateNoteResult) => {
          if(err) {throw err};
          
            //  IF USERS KEEPS SENDING THE SAME DATA OVER AND OVER THIS END-POINT WILL STOP,
            //  TO AVOID THAT BACK-END MUST SEND SOMETHING BACK TO FRONT-END.
          res.json("");
          
        });

      };
      
    });

  } else {  
      //  IF USERS KEEPS SENDING THE SAME DATA OVER AND OVER THIS END-POINT WILL STOP,
      //  TO AVOID THAT BACK-END MUST SEND SOMETHING BACK TO FRONT-END.
    res.json("");

  };

});

  //  SELECT ALL RESERVATION LISTINGS.
app.get('/all-reservation-listings', (req, res) => {
  let userId = '';

  if(req.session.userId != undefined) {
    userId = req.session.userId;

      //  SELECT TYPE OF USER QUERY
    const selectTypeOfUserQuery = 'SELECT user_id, type_of_user, photo, first_name, last_name, user_name, contact_number, telephone_number, email_address, recovery_email_address, password, date_joined, date_leaved FROM main_user_table WHERE user_id = ?';

    connection.query(selectTypeOfUserQuery, userId, (err, selectTypeOfUserResult) => {
      if (err) {throw err};
      
      if(selectTypeOfUserResult[0].type_of_user != "Agent") { 
          //  IF USERS KEEPS SENDING THE SAME DATA OVER AND OVER THIS END-POINT WILL STOP,
          //  TO AVOID THAT BACK-END MUST SEND SOMETHING BACK TO FRONT-END.
        res.json("");

      } else {  
          //  SELECT ALL RESERVATION LISTINGS QUERY.
        const selectAllReservationListingsQuery = 'SELECT reservation_id, agent_id, customer_id, property_id, full_name, contact_number, email_address, property, reservation_period_from, reservation_period_to, status, date_archived, reason_for_cancelling, note FROM reservation_table WHERE agent_id = ? AND date_archived IS NULL';
              
        connection.query(selectAllReservationListingsQuery, userId, (err, selectAllReservationListingsResult) => {
          if (err) {throw err};
                        
          res.json({allReservationListings: selectAllReservationListingsResult});

        });   

      };

    });

    } else {  
        //  IF USERS KEEPS SENDING THE SAME DATA OVER AND OVER THIS END-POINT WILL STOP,
        //  TO AVOID THAT BACK-END MUST SEND SOMETHING BACK TO FRONT-END.
      res.json("");

    };
  
});

  //  SELECT ON GOING RESERVATION LISTINGS.
app.get('/on-going-reservation-listings', (req, res) => {
  let userId = '';

  if(req.session.userId != undefined) {
    userId = req.session.userId;

      //  SELECT TYPE OF USER QUERY
    const selectTypeOfUserQuery = 'SELECT user_id, type_of_user, photo, first_name, last_name, user_name, contact_number, telephone_number, email_address, recovery_email_address, password, date_joined, date_leaved FROM main_user_table WHERE user_id = ?';

    connection.query(selectTypeOfUserQuery, userId, (err, selectTypeOfUserResult) => {
      if (err) {throw err};
      
      if(selectTypeOfUserResult[0].type_of_user != "Agent") { 
          //  IF USERS KEEPS SENDING THE SAME DATA OVER AND OVER THIS END-POINT WILL STOP,
          //  TO AVOID THAT BACK-END MUST SEND SOMETHING BACK TO FRONT-END.
        res.json("");

      } else {  
          //  SELECT ONG GOING LISTINGS QUERY.
        const selectOnGoingReservationListingsQuery = 'SELECT reservation_id, agent_id, customer_id, property_id, full_name, contact_number, email_address, property, reservation_period_from, reservation_period_to, status, date_archived, reason_for_cancelling, note FROM reservation_table WHERE agent_id = ? AND status = "On Going" AND date_archived IS NULL';
              
        connection.query(selectOnGoingReservationListingsQuery, userId, (err, selectOnGoingReservationListingsResult) => {
          if (err) {throw err};
                        
          res.json({onGoingReservationListings: selectOnGoingReservationListingsResult});

        });

      };

    });

    } else {  
        //  IF USERS KEEPS SENDING THE SAME DATA OVER AND OVER THIS END-POINT WILL STOP,
        //  TO AVOID THAT BACK-END MUST SEND SOMETHING BACK TO FRONT-END.
      res.json("");

    };
  
});

  //  SELECT COMPLETED RESERVATION LISTINGS.
app.get('/completed-reservation-listings', (req, res) => {
  let userId = '';

  if(req.session.userId != undefined) {
    userId = req.session.userId;

      //  SELECT TYPE OF USER QUERY
    const selectTypeOfUserQuery = 'SELECT user_id, type_of_user, photo, first_name, last_name, user_name, contact_number, telephone_number, email_address, recovery_email_address, password, date_joined, date_leaved FROM main_user_table WHERE user_id = ?';

    connection.query(selectTypeOfUserQuery, userId, (err, selectTypeOfUserResult) => {
      if (err) {throw err};
      
      if(selectTypeOfUserResult[0].type_of_user != "Agent") { 
          //  IF USERS KEEPS SENDING THE SAME DATA OVER AND OVER THIS END-POINT WILL STOP,
          //  TO AVOID THAT BACK-END MUST SEND SOMETHING BACK TO FRONT-END.
        res.json("");

      } else {  
          //  SELECT ONG GOING LISTINGS QUERY.
        const selectCompletedReservationListingsQuery = 'SELECT reservation_id, agent_id, customer_id, property_id, full_name, contact_number, email_address, property, reservation_period_from, reservation_period_to, status, date_archived, reason_for_cancelling, note FROM reservation_table WHERE agent_id = ? AND status = "Completed" AND date_archived IS NULL';
              
        connection.query(selectCompletedReservationListingsQuery, userId, (err, selectCompletedReservationListingsResult) => {
          if (err) {throw err};
                        
          res.json({completedReservationListings: selectCompletedReservationListingsResult});

        });

      };

    });

    } else {  
        //  IF USERS KEEPS SENDING THE SAME DATA OVER AND OVER THIS END-POINT WILL STOP,
        //  TO AVOID THAT BACK-END MUST SEND SOMETHING BACK TO FRONT-END.
      res.json("");

    };
  
});

  //  SELECT CANCELLED RESERVATION LISTINGS.
app.get('/cancelled-reservation-listings', (req, res) => {
  let userId = '';

  if(req.session.userId != undefined) {
    userId = req.session.userId;

      //  SELECT TYPE OF USER QUERY
    const selectTypeOfUserQuery = 'SELECT user_id, type_of_user, photo, first_name, last_name, user_name, contact_number, telephone_number, email_address, recovery_email_address, password, date_joined, date_leaved FROM main_user_table WHERE user_id = ?';

    connection.query(selectTypeOfUserQuery, userId, (err, selectTypeOfUserResult) => {
      if (err) {throw err};
      
      if(selectTypeOfUserResult[0].type_of_user != "Agent") { 
          //  IF USERS KEEPS SENDING THE SAME DATA OVER AND OVER THIS END-POINT WILL STOP,
          //  TO AVOID THAT BACK-END MUST SEND SOMETHING BACK TO FRONT-END.
        res.json("");

      } else {  
          //  SELECT ONG GOING LISTINGS QUERY.
        const selectCancelledReservationListingsQuery = 'SELECT reservation_id, agent_id, customer_id, property_id, full_name, contact_number, email_address, property, reservation_period_from, reservation_period_to, status, date_archived, reason_for_cancelling, note FROM reservation_table WHERE agent_id = ? AND status = "Cancelled" AND date_archived IS NULL';
              
        connection.query(selectCancelledReservationListingsQuery, userId, (err, selectCancelledReservationListingsResult) => {
          if (err) {throw err};
                        
          res.json({cancelledReservationListings: selectCancelledReservationListingsResult});

        });

      };

    });

    } else {  
        //  IF USERS KEEPS SENDING THE SAME DATA OVER AND OVER THIS END-POINT WILL STOP,
        //  TO AVOID THAT BACK-END MUST SEND SOMETHING BACK TO FRONT-END.
      res.json("");

    };
  
});

  //  SELECT DELETED PROPERTY LISTINGS.
app.get('/deleted-listings', (req, res) => {
  if(req.session.userId != undefined) {
    const userId = req.session.userId;

      //  SELECT TYPE OF USER QUERY
    const selectTypeOfUserQuery = 'SELECT user_id, type_of_user, photo, first_name, last_name, user_name, contact_number, telephone_number, email_address, recovery_email_address, password, date_joined, date_leaved FROM main_user_table WHERE user_id = ?';

    connection.query(selectTypeOfUserQuery, userId, (err, selectTypeOfUserResult) => {
      if (err) {throw err};
      
      if(selectTypeOfUserResult[0].type_of_user != "Agent") {
          //  IF USERS KEEPS SENDING THE SAME DATA OVER AND OVER THIS END-POINT WILL STOP,
          //  TO AVOID THAT BACK-END MUST SEND SOMETHING BACK TO FRONT-END.
        res.json("");  

      } else { 
          //  SELECT DELETE PROPERTY LISTINGS QUERY.
        const selectDeletedPropertyListingsQuery = 'SELECT property_id, user_id, location, address, main_image, image_1, image_2, image_3, image_4, image_5, image_6, image_7, image_8, image_9, image_10, property_type, FORMAT(price, 2) AS price_formatted, FORMAT(area, 2) AS area_formatted, room_count, bath_count, description, status, date_featured, date_created, date_deleted FROM property_table WHERE user_id = ? AND (date_deleted IS NOT NULL AND date_deleted > "1970-01-01 00:00:00") ORDER BY date_deleted';

        connection.query(selectDeletedPropertyListingsQuery, userId, (err, selectDeletedPropertyListingsResult) => {
          if (err) {throw err};
              
            res.json({deletedPropertyListings: selectDeletedPropertyListingsResult});

        });

      };

    });

  } else {    
      //  IF USERS KEEPS SENDING THE SAME DATA OVER AND OVER THIS END-POINT WILL STOP,
      //  TO AVOID THAT BACK-END MUST SEND SOMETHING BACK TO FRONT-END.
    res.json("");
  };
});

  //  RESTORE ALL PROPERTY.
app.post('/restore-all-property', (req, res) => {
    //  USER INPUTS.
  const propertyIdInput = req.body.propertyIdInput;

  if(req.session.userId != undefined) {
    const userId = req.session.userId;

      //  SELECT TYPE OF USER QUERY
    const selectTypeOfUserQuery = 'SELECT user_id, type_of_user, photo, first_name, last_name, user_name, contact_number, telephone_number, email_address, recovery_email_address, password, date_joined, date_leaved FROM main_user_table WHERE user_id = ?';

    connection.query(selectTypeOfUserQuery, userId, (err, selectTypeOfUserResult) => {
      if (err) {throw err};
      
      if(selectTypeOfUserResult[0].type_of_user != "Agent") { 
          //  IF USERS KEEPS SENDING THE SAME DATA OVER AND OVER THIS END-POINT WILL STOP,
          //  TO AVOID THAT BACK-END MUST SEND SOMETHING BACK TO FRONT-END.
        res.json("");

      } else {
          //  RESTORE ALL PROPERTY QUERY.
        let restoreAllPropertyQuery = '';

        if(propertyIdInput.length > 1) {
          restoreAllPropertyQuery += 'UPDATE property_table SET date_deleted = NULL WHERE user_id = "' + userId + '" AND ';
            
            //  SELECT EVERY propertyIdInput VALUES.
          for(let i = 0; i < propertyIdInput.length; i++) {
            restoreAllPropertyQuery += 'property_id = ?';
            
            if(propertyIdInput.length > 1 && i < propertyIdInput.length - 1) {
              restoreAllPropertyQuery += ' OR ';
            };
          };

          connection.query(restoreAllPropertyQuery, propertyIdInput, (err, restoreAllPropertyResult) => {
            if (err) {throw err};

              //  IF USERS KEEPS SENDING THE SAME DATA OVER AND OVER THIS END-POINT WILL STOP,
              //  TO AVOID THAT BACK-END MUST SEND SOMETHING BACK TO FRON-END.
            res.json("");
          });

        } else if(propertyIdInput.length > 0) {
          restoreAllPropertyQuery += 'UPDATE property_table SET date_deleted = NULL WHERE user_id = "' + userId + '" AND property_id = ?';
          
          connection.query(restoreAllPropertyQuery, propertyIdInput, (err, restoreAllPropertyResult) => {
            if (err) {throw err};

              //  IF USERS KEEPS SENDING THE SAME DATA OVER AND OVER THIS END-POINT WILL STOP,
              //  TO AVOID THAT BACK-END MUST SEND SOMETHING BACK TO FRONT-END.
            res.json("");
          });

        } else {
            //  IF USERS KEEPS SENDING THE SAME DATA OVER AND OVER THIS END-POINT WILL STOP,
            //  TO AVOID THAT BACK-END MUST SEND SOMETHING BACK TO FRONT-END.
          res.json("");

        };  

      };

    });

  } else {    
      //  IF USERS KEEPS SENDING THE SAME DATA OVER AND OVER THIS END-POINT WILL STOP,
      //  TO AVOID THAT BACK-END MUST SEND SOMETHING BACK TO FRONT-END.
    res.json("");
  };

});

  //  DELETE ALL PROPERTY.
app.post('/delete-all-property', (req, res) => {
    //  USER INPUTS.
  const propertyIdInput = req.body.propertyIdInput;

  if(req.session.userId != undefined) {
    const userId = req.session.userId;

      //  SELECT TYPE OF USER QUERY
    const selectTypeOfUserQuery = 'SELECT user_id, type_of_user, photo, first_name, last_name, user_name, contact_number, telephone_number, email_address, recovery_email_address, password, date_joined, date_leaved FROM main_user_table WHERE user_id = ?';

    connection.query(selectTypeOfUserQuery, userId, (err, selectTypeOfUserResult) => {
      if (err) {throw err};
      
      if(selectTypeOfUserResult[0].type_of_user != "Agent") { 
          //  IF USERS KEEPS SENDING THE SAME DATA OVER AND OVER THIS END-POINT WILL STOP,
          //  TO AVOID THAT BACK-END MUST SEND SOMETHING BACK TO FRONT-END.
        res.json("");

      } else {
          //  DELETE ALL PROPERTY QUERY.
        let deleteAllPropertyQuery = '';

        if(propertyIdInput.length > 1) {
          deleteAllPropertyQuery += 'UPDATE property_table SET date_deleted = "1970-01-01 00:00:00" WHERE user_id = "' + userId + '" AND ';
            
            //  SELECT EVERY propertyIdInput VALUES.
          for(let i = 0; i < propertyIdInput.length; i++) {
            deleteAllPropertyQuery += 'property_id = ?';
            
            if(propertyIdInput.length > 1 && i < propertyIdInput.length - 1) {
              deleteAllPropertyQuery += ' OR ';
            };
          };

          connection.query(deleteAllPropertyQuery, propertyIdInput, (err, deleteAllPropertyResult) => {
            if (err) {throw err};

              //  IF USERS KEEPS SENDING THE SAME DATA OVER AND OVER THIS END-POINT WILL STOP,
              //  TO AVOID THAT BACK-END MUST SEND SOMETHING BACK TO FRON-END.
            res.json("");
          });

        } else if(propertyIdInput.length > 0) {
          deleteAllPropertyQuery += 'UPDATE property_table SET date_deleted = "1970-01-01 00:00:00" WHERE user_id = "' + userId + '" AND property_id = ?';
          
          connection.query(deleteAllPropertyQuery, propertyIdInput, (err, deleteAllPropertyResult) => {
            if (err) {throw err};

              //  IF USERS KEEPS SENDING THE SAME DATA OVER AND OVER THIS END-POINT WILL STOP,
              //  TO AVOID THAT BACK-END MUST SEND SOMETHING BACK TO FRONT-END.
            res.json("");
          });

        } else {
            //  IF USERS KEEPS SENDING THE SAME DATA OVER AND OVER THIS END-POINT WILL STOP,
            //  TO AVOID THAT BACK-END MUST SEND SOMETHING BACK TO FRONT-END.
          res.json("");

        };

      };

    });

  } else {    
      //  IF USERS KEEPS SENDING THE SAME DATA OVER AND OVER THIS END-POINT WILL STOP,
      //  TO AVOID THAT BACK-END MUST SEND SOMETHING BACK TO FRONT-END.
    res.json("");
  };

});

  //  DELETE THIRTY DAYS PROPERTY.
app.post('/delete-thirty-days-property', (req, res) => {
    //  USER INPUTS.
  const propertyIdInput = req.body.propertyIdInput;

  if(req.session.userId != undefined) {
    const userId = req.session.userId;

      //  SELECT TYPE OF USER QUERY
    const selectTypeOfUserQuery = 'SELECT user_id, type_of_user, photo, first_name, last_name, user_name, contact_number, telephone_number, email_address, recovery_email_address, password, date_joined, date_leaved FROM main_user_table WHERE user_id = ?';

    connection.query(selectTypeOfUserQuery, userId, (err, selectTypeOfUserResult) => {
      if (err) {throw err};
      
      if(selectTypeOfUserResult[0].type_of_user != "Agent") { 
          //  IF USERS KEEPS SENDING THE SAME DATA OVER AND OVER THIS END-POINT WILL STOP,
          //  TO AVOID THAT BACK-END MUST SEND SOMETHING BACK TO FRONT-END.
        res.json("");

      } else {
          //  DELETE THIRTY DAYS PROPERTY QUERY.
        const deleteThirtyDaysPropertyQuery = 'UPDATE property_table SET date_deleted = "1970-01-01 00:00:00" WHERE user_id = "' + userId +  '" AND property_id = ?';

        connection.query(deleteThirtyDaysPropertyQuery, propertyIdInput, (err, deleteThirtyDaysPropertyResult) => {
          if (err) {throw err};

              //  IF USERS KEEPS SENDING THE SAME DATA OVER AND OVER THIS END-POINT WILL STOP,
              //  TO AVOID THAT BACK-END MUST SEND SOMETHING BACK TO FRONT-END.
            res.json("");

        });

      };

    });

  } else {    
      //  IF USERS KEEPS SENDING THE SAME DATA OVER AND OVER THIS END-POINT WILL STOP,
      //  TO AVOID THAT BACK-END MUST SEND SOMETHING BACK TO FRONT-END.
    res.json("");

  };
})


app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});




