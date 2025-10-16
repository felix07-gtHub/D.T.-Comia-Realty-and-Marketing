const accountInputField = document.querySelector('.input-field:nth-child(2)');
const passwordInputField = document.querySelector('.input-field:nth-child(3)');
const backLogIn = document.querySelector('.main-container > a');

    //  FUNCTION FOR VALID INPUTS mouseenter.
function validInputsMousEnter(e) {
    e.target.style.backgroundColor = '#f5f2e8';
    e.target.style.transform = 'scale(1.05)';
    e.target.style.transition = 'transform 0.25s';
    e.target.style.boxShadow = '0px 0px 10px #f5f2e8';
};

accountInputField.addEventListener("mouseenter", validInputsMousEnter);
passwordInputField.addEventListener("mouseenter", validInputsMousEnter);

    //  FUNCTION FOR VALID INPUTS mouseleave.
function validInputsMousEave(e) {
    e.target.style.backgroundColor = 'transparent';
    e.target.style.transform = 'none';
    e.target.style.transition = 'none';
    e.target.style.boxShadow = 'none';
};

accountInputField.addEventListener("mouseleave", validInputsMousEave);
passwordInputField.addEventListener("mouseleave", validInputsMousEave);

    //  FUNCTION FOR INVALID INPUTS mouseenter.
function invalidInputsMousEnter(e) {
    e.target.style.transform = 'scale(1.05)';
    e.target.style.transition = 'transform 0.25s';
};

    //  FUNCTION FOR INVALID INPUTS mouseleave.
function invalidInputsMousEave(e) {
    e.target.style.transform = 'none';
    e.target.style.transition = 'none';
};

    /*
        IF INPUTS ARE INVALID AND THE USER INPUTS A VALUE INPUTS RESETS.
        IF USER INPUTS A VALUE IT ENABLES DISCARD BUTTON 
        IF THE USER DELETE THE VALUE OF THE ENTIRE INPUTS IT DISABLES THE DISCARD BUTTON
        UNLESS THE INPUTS SHOWS ERROR EVEN WITHOUT VALUE
        THIS HAPPENS WHEN THE USER INPUTS A VALUE IN A NON-REQUIRED FIELD AND SAVES IT.
    */
function inputChange() {
    if(accountInputField.style.border != "none" && accountInputField.children[1].value != "") {   
        accountInputField.removeEventListener("mouseenter", invalidInputsMousEnter);
        accountInputField.removeEventListener("mouseleave", invalidInputsMousEave);

        accountInputField.style.backgroundColor = 'transparent';
        accountInputField.style.transform = 'none';
        accountInputField.style.transition = 'none';
        accountInputField.style.boxShadow = 'none';

        accountInputField.addEventListener("mouseenter", validInputsMousEnter);
        accountInputField.addEventListener("mouseleave", validInputsMousEave);

    };

    if(passwordInputField.style.border != "none" && passwordInputField.children[1].value != "") { 
        passwordInputField.removeEventListener("mouseenter", invalidInputsMousEnter);
        passwordInputField.removeEventListener("mouseleave", invalidInputsMousEave);

        passwordInputField.style.backgroundColor = 'transparent';
        passwordInputField.style.transform = 'none';
        passwordInputField.style.transition = 'none';
        passwordInputField.style.boxShadow = 'none';

        passwordInputField.addEventListener("mouseenter", validInputsMousEnter);
        passwordInputField.addEventListener("mouseleave", validInputsMousEave);

    };

};

accountInputField.addEventListener("input", inputChange);
passwordInputField.addEventListener("input", inputChange);

    //  FUNCTION FOR SUBMITTING FORM.
async function submitButton() {
    const accountInput = accountInputField.children[1].value;
    const passwordInput = passwordInputField.children[1].value;

    const response = await fetch('https://dt-comia-realty-and-marketing-production.up.railway.app/log-in', {
        method: 'POST',
        headers: {                    
                    'User-Agent': 'undici-stream-example',
                    'Content-Type': 'application/json'
        },
        credentials: "include",
        body: JSON.stringify({accountInput, passwordInput})
    });
    const data = await response.json();

    if(data != "") {
        if(data.account != "ACCOUNT MATCHED!") {
            accountInputField.removeEventListener("mouseenter", validInputsMousEnter);
            accountInputField.removeEventListener("mouseleave", validInputsMousEave);
            passwordInputField.removeEventListener("mouseenter", validInputsMousEnter);
            passwordInputField.removeEventListener("mouseleave", validInputsMousEave);

            accountInputField.style.border = 'solid 1.25px red';
            accountInputField.style.boxShadow = '0px 0px 10px red';
            passwordInputField.style.border = 'solid 1.25px red';
            passwordInputField.style.boxShadow = '0px 0px 10px red';
                
            accountInputField.addEventListener("mouseenter", invalidInputsMousEnter);
            accountInputField.addEventListener("mouseleave", invalidInputsMousEave);
            passwordInputField.addEventListener("mouseenter", invalidInputsMousEnter);
            passwordInputField.addEventListener("mouseleave", invalidInputsMousEave);

        } else {            
            accountInputField.removeEventListener("mouseenter", invalidInputsMousEnter);
            accountInputField.removeEventListener("mouseleave", invalidInputsMousEave);
            passwordInputField.removeEventListener("mouseenter", invalidInputsMousEnter);
            passwordInputField.removeEventListener("mouseleave", invalidInputsMousEave);

            accountInputField.style.border = 'none';
            accountInputField.style.boxShadow = 'none';  
            passwordInputField.style.border = 'none';
            passwordInputField.style.boxShadow = 'none';  

            accountInputField.addEventListener("mouseenter", validInputsMousEnter);
            accountInputField.addEventListener("mouseleave", validInputsMousEave);
            passwordInputField.addEventListener("mouseenter", validInputsMousEnter);
            passwordInputField.addEventListener("mouseleave", validInputsMousEave);

        };

        if(data.account == "ACCOUNT MATCHED!") {
            accountInputField.children[1].value = '';
            passwordInputField.children[1].value = '';
        
            if(data.typeOfUser != "Customer") {
                window.location = "../agent/houseListingsPage.html";    

            } else {
                window.location = "./homePage.html";
            };

        };
        
    } else {
        const signUp = document.querySelector('.main-container:nth-child(1)');
        const accountLocked = document.querySelector('.main-container:nth-child(2)');

        signUp.style.display = 'none';
        accountLocked.style.display = 'block';
    }

};

document.querySelector('.main-container button').addEventListener("click", submitButton);

        //  RELOADS PAGE.
function backLogInFucntion() {
    location.reload();
};

backLogIn.addEventListener("click", backLogInFucntion);