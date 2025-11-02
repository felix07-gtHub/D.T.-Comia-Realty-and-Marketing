const firstName = document.querySelector('#flexBox > #signUp > form input[name="First name"]');
const lastName = document.querySelector('#flexBox > #signUp > form input[name="Last name"]');
const emailAddress = document.querySelector('#flexBox > #signUp > form input[name="Email address"]');
const password = document.querySelector('#flexBox > #signUp > form input[name="Password"]');

    //  FUNCTION FOR VALID INPUTS mouseenter.
function validInputsMousEnter(e) {
    e.target.style.backgroundColor = '#faebcf';
    e.target.style.color = 'black';
    e.target.style.border = 'solid #d0a553';
    e.target.style.transform = 'scale(1.05)';
    e.target.style.transition = 'transform 0.25s';
    e.target.style.boxShadow = '0px 0px 10px #f8ce7f';
};

firstName.addEventListener("mouseenter", validInputsMousEnter);
lastName.addEventListener("mouseenter", validInputsMousEnter);
emailAddress.addEventListener("mouseenter", validInputsMousEnter);
password.addEventListener("mouseenter", validInputsMousEnter);

    //  FUNCTION FOR VALID INPUTS mouseleave.
function validInputsMousEave(e) {
    e.target.style.backgroundColor = 'transparent';
    e.target.style.color = 'black';
    e.target.style.border = 'solid 1px #4f4b3a';
    e.target.style.transform = 'none';
    e.target.style.transition = 'none';
    e.target.style.boxShadow = 'none';
};

firstName.addEventListener("mouseleave", validInputsMousEave);
lastName.addEventListener("mouseleave", validInputsMousEave);
emailAddress.addEventListener("mouseleave", validInputsMousEave);
password.addEventListener("mouseleave", validInputsMousEave);

    //  FUNCTION FOR INVALID INPUTS mouseenter.
function invalidInputsMousEnter(e) {
    e.target.style.backgroundColor = '#faebcf';
    e.target.style.color = 'black';
    e.target.style.border = 'solid red';
    e.target.style.transform = 'scale(1.05)';
    e.target.style.transition = 'transform 0.25s';
    e.target.style.boxShadow = '0px 0px 10px red';
};

    //  FUNCTION FOR INVALID INPUTS mouseleave.
function invalidInputsMousEave(e) {
    e.target.style.backgroundColor = '#faebcf';
    e.target.style.color = 'black';
    e.target.style.border = 'solid red';
    e.target.style.transform = 'none';
    e.target.style.transition = 'none';
    e.target.style.boxShadow = '0px 0px 10px red';
};

    //  .
function inputChange() {
    if(firstName.value != "") {   
        firstName.removeEventListener("mouseenter", invalidInputsMousEnter);
        firstName.removeEventListener("mouseleave", invalidInputsMousEave);

        firstName.style.backgroundColor = 'transparent';
        firstName.style.color = 'black';
        firstName.style.border = 'solid 1px #4f4b3a';
        firstName.style.transform = 'none';
        firstName.style.transition = 'none';
        firstName.style.boxShadow = 'none';  

        firstName.addEventListener("mouseenter", validInputsMousEnter);
        firstName.addEventListener("mouseleave", validInputsMousEave);

    };

    if(lastName.value != "") { 
        lastName.removeEventListener("mouseenter", invalidInputsMousEnter);
        lastName.removeEventListener("mouseleave", invalidInputsMousEave);

        lastName.style.backgroundColor = 'transparent';
        lastName.style.color = 'black';
        lastName.style.border = 'solid 1px #4f4b3a';
        lastName.style.transform = 'none';
        lastName.style.transition = 'none';
        lastName.style.boxShadow = 'none';  

        lastName.addEventListener("mouseenter", validInputsMousEnter);
        lastName.addEventListener("mouseleave", validInputsMousEave);

    };

    if(emailAddress.value != "") {
        emailAddress.removeEventListener("mouseenter", invalidInputsMousEnter);
        emailAddress.removeEventListener("mouseleave", invalidInputsMousEave);

        emailAddress.style.backgroundColor = 'transparent';
        emailAddress.style.color = 'black';
        emailAddress.style.border = 'solid 1px #4f4b3a';
        emailAddress.style.transform = 'none';
        emailAddress.style.transition = 'none';
        emailAddress.style.boxShadow = 'none';  

        emailAddress.addEventListener("mouseenter", validInputsMousEnter);
        emailAddress.addEventListener("mouseleave", validInputsMousEave);

    };

    if(password.value != "") {
        password.removeEventListener("mouseenter", invalidInputsMousEnter);
        password.removeEventListener("mouseleave", invalidInputsMousEave);

        password.style.backgroundColor = 'transparent';
        password.style.color = 'black';
        password.style.border = 'solid 1px #4f4b3a';
        password.style.transform = 'none';
        password.style.transition = 'none';
        password.style.boxShadow = 'none';  

        password.addEventListener("mouseenter", validInputsMousEnter);
        password.addEventListener("mouseleave", validInputsMousEave);

    };

};

lastName.addEventListener("input", inputChange);
firstName.addEventListener("input", inputChange);
emailAddress.addEventListener("input", inputChange);
password.addEventListener("input", inputChange);

    //  FUNCTION FOR SUBMITTING FORM.
async function submitButton() {
    const firstNameInput = firstName.value;
    const lastNameInput = lastName.value;
    const emailAddressInput = emailAddress.value;
    const passwordInput = password.value;

    const response = await fetch('https://dt-comia-realty-and-marketing-production.up.railway.app/sign-up', {
        method: 'POST',
        headers: {                    
                    'User-Agent': 'undici-stream-example',
                    'Content-Type': 'application/json'
        },
        body: JSON.stringify({
                              firstNameInput,
                              lastNameInput,
                              emailAddressInput,
                              passwordInput
                            })
    });
    const data = await response.json();

    if(data.dateAttempted != undefined) {
        alert("Too much attempt, try again after 5 hours.");
        
    } else {
        if(data.firstName != "FIRST NAME FOUND!") {
            firstName.removeEventListener("mouseenter", validInputsMousEnter);
            firstName.removeEventListener("mouseleave", validInputsMousEave);

            firstName.style.backgroundColor = '#faebcf';
            firstName.style.color = 'black';
            firstName.style.border = 'solid red';
            firstName.style.boxShadow = '0px 0px 10px red';
                    
            firstName.addEventListener("mouseenter", invalidInputsMousEnter);
            firstName.addEventListener("mouseleave", invalidInputsMousEave);

        };

        if(data.lastName != "LAST NAME FOUND!") {
            lastName.removeEventListener("mouseenter", validInputsMousEnter);
            lastName.removeEventListener("mouseleave", validInputsMousEave);

            lastName.style.backgroundColor = '#faebcf';
            lastName.style.color = 'black';
            lastName.style.border = 'solid red';
            lastName.style.boxShadow = '0px 0px 10px red';
                    
            lastName.addEventListener("mouseenter", invalidInputsMousEnter);
            lastName.addEventListener("mouseleave", invalidInputsMousEave);

        };

        if(data.emailAddress != "EMAIL ADDRESS FOUND!") {
            emailAddress.removeEventListener("mouseenter", validInputsMousEnter);
            emailAddress.removeEventListener("mouseleave", validInputsMousEave);

            emailAddress.style.backgroundColor = '#faebcf';
            emailAddress.style.color = 'black';
            emailAddress.style.border = 'solid red';
            emailAddress.style.boxShadow = '0px 0px 10px red';
                    
            emailAddress.addEventListener("mouseenter", invalidInputsMousEnter);
            emailAddress.addEventListener("mouseleave", invalidInputsMousEave);

        };

        if(data.password != "PASSWORD FOUND!") {
            password.removeEventListener("mouseenter", validInputsMousEnter);
            password.removeEventListener("mouseleave", validInputsMousEave);

            password.style.backgroundColor = '#faebcf';
            password.style.color = 'black';
            password.style.border = 'solid red';
            password.style.boxShadow = '0px 0px 10px red';
                    
            password.addEventListener("mouseenter", invalidInputsMousEnter);
            password.addEventListener("mouseleave", invalidInputsMousEave);

        };

        if(
            data.firstName != "FIRST NAME NOT FOUND!" &&
            data.lastName != "LAST NAME NOT FOUND!" &&
            data.emailAddress != "EMAIL ADDRESS NOT FOUND!" &&
            data.password != "PASSWORD NOT FOUND!"
        ) {
            firstName.value = '';
            lastName.value = '';
            emailAddress.value = '';
            password.value = '';

            window.location = "./emailSent.html?emailAddress";

        };

    }
    
};

document.querySelector('#flexBox > #signUp > form > input[name="Submit button"]').addEventListener("click", submitButton);