const firstName = document.querySelector('#flexBox > #signUp > form input[name="First name"]');
const lastName = document.querySelector('#flexBox > #signUp > form input[name="Last name"]');
const email = document.querySelector('#flexBox > #signUp > form input[name="Email address"]');
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
email.addEventListener("mouseenter", validInputsMousEnter);
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
email.addEventListener("mouseleave", validInputsMousEave);
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

    /*
        IF INPUTS ARE INVALID AND THE USER INPUTS A VALUE INPUTS RESETS.
        IF USER INPUTS A VALUE IT ENABLES DISCARD BUTTON 
        IF THE USER DELETE THE VALUE OF THE ENTIRE INPUTS IT DISABLES THE DISCARD BUTTON
        UNLESS THE INPUTS SHOWS ERROR EVEN WITHOUT VALUE
        THIS HAPPENS WHEN THE USER INPUTS A VALUE IN A NON-REQUIRED FIELD AND SAVES IT.
    */
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

    if(email.value != "") {
        email.removeEventListener("mouseenter", invalidInputsMousEnter);
        email.removeEventListener("mouseleave", invalidInputsMousEave);

        email.style.backgroundColor = 'transparent';
        email.style.color = 'black';
        email.style.border = 'solid 1px #4f4b3a';
        email.style.transform = 'none';
        email.style.transition = 'none';
        email.style.boxShadow = 'none';  

        email.addEventListener("mouseenter", validInputsMousEnter);
        email.addEventListener("mouseleave", validInputsMousEave);

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
email.addEventListener("input", inputChange);
password.addEventListener("input", inputChange);

    //  FUNCTION FOR SUBMITTING FORM.
async function submitButton() {
    const firstNameInput = firstName.value;
    const lastNameInput = lastName.value;
    const emailAddressInput = email.value;
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

        } else {            
            firstName.removeEventListener("mouseenter", invalidInputsMousEnter);
            firstName.removeEventListener("mouseleave", invalidInputsMousEave);

            firstName.style.backgroundColor = 'transparent';
            firstName.style.color = 'black';
            firstName.style.border = 'solid 1px #4f4b3a';
            firstName.style.boxShadow = 'none';  

            firstName.addEventListener("mouseenter", validInputsMousEnter);
            firstName.addEventListener("mouseleave", validInputsMousEave);

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

        } else {          
            lastName.removeEventListener("mouseenter", invalidInputsMousEnter);
            lastName.removeEventListener("mouseleave", invalidInputsMousEave);

            lastName.style.backgroundColor = 'transparent';
            lastName.style.color = 'black';
            lastName.style.border = 'solid 1px #4f4b3a';
            lastName.style.boxShadow = 'none';  

            lastName.addEventListener("mouseenter", validInputsMousEnter);
            lastName.addEventListener("mouseleave", validInputsMousEave);

        };
        
        if(data.email != "EMAIL ADDRESS FOUND!") {
            email.removeEventListener("mouseenter", validInputsMousEnter);
            email.removeEventListener("mouseleave", validInputsMousEave);

            email.style.backgroundColor = '#faebcf';
            email.style.color = 'black';
            email.style.border = 'solid red';
            email.style.boxShadow = '0px 0px 10px red';
                
            email.addEventListener("mouseenter", invalidInputsMousEnter);
            email.addEventListener("mouseleave", invalidInputsMousEave);

        } else {            
            email.removeEventListener("mouseenter", invalidInputsMousEnter);
            email.removeEventListener("mouseleave", invalidInputsMousEave);

            email.style.backgroundColor = 'transparent';
            email.style.color = 'black';
            email.style.border = 'solid 1px #4f4b3a';
            email.style.boxShadow = 'none';  

            email.addEventListener("mouseenter", validInputsMousEnter);
            email.addEventListener("mouseleave", validInputsMousEave);

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

        } else {            
            password.removeEventListener("mouseenter", invalidInputsMousEnter);
            password.removeEventListener("mouseleave", invalidInputsMousEave);

            password.style.backgroundColor = 'transparent';
            password.style.color = 'black';
            password.style.border = 'solid 1px #4f4b3a';
            password.style.boxShadow = 'none';  

            password.addEventListener("mouseenter", validInputsMousEnter);
            password.addEventListener("mouseleave", validInputsMousEave);

        };

        if(
            data.firstName != "FIRST NAME NOT FOUND!" &&
            data.lastName != "LAST NAME NOT FOUND!" &&
            data.email != "EMAIL ADDRESS NOT FOUND!" &&
            data.password != "PASSWORD NOT FOUND!"
        ) {
            firstName.value = '';
            lastName.value = '';
            email.value = '';
            password.value = '';

            window.location = "./emailSent.html?emailAddress";

        };

    };
    
};


document.querySelector('#flexBox > #signUp > form > input[name="Submit button"]').addEventListener("click", submitButton);
