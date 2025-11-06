const newPasswordInputField = document.querySelector('.input-field:nth-child(2)');
const confirmPasswordInputField = document.querySelector('.input-field:nth-child(3)');

let recoveryEmailAddressInput = '';
let token = '';

if(window.location.search != '') {
        // Get query params from URL
    const params = new URLSearchParams(window.location.search);
    recoveryEmailAddressInput = params.get("recoveryEmailAddress");
    tokenInput = params.get("token");
};

    //  FUNCTION FOR VALID INPUTS mouseenter.
function validInputsMousEnter(e) {
    e.target.style.backgroundColor = '#f5f2e8';
    e.target.style.transform = 'scale(1.05)';
    e.target.style.transition = 'transform 0.25s';
    e.target.style.boxShadow = '0px 0px 10px #f5f2e8';
};

newPasswordInputField.addEventListener("mouseenter", validInputsMousEnter);
confirmPasswordInputField.addEventListener("mouseenter", validInputsMousEnter);

    //  FUNCTION FOR VALID INPUTS mouseleave.
function validInputsMousEave(e) {
    e.target.style.backgroundColor = 'transparent';
    e.target.style.transform = 'none';
    e.target.style.transition = 'none';
    e.target.style.boxShadow = 'none';
};

newPasswordInputField.addEventListener("mouseleave", validInputsMousEave);
confirmPasswordInputField.addEventListener("mouseleave", validInputsMousEave);

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

    //  .
function inputChange() {
    if(newPasswordInputField.style.border != "none" && newPasswordInputField.children[1].value != "") { 
        newPasswordInputField.removeEventListener("mouseenter", invalidInputsMousEnter);
        newPasswordInputField.removeEventListener("mouseleave", invalidInputsMousEave);

        newPasswordInputField.style.backgroundColor = 'transparent';
        newPasswordInputField.style.transform = 'none';
        newPasswordInputField.style.transition = 'none';
        newPasswordInputField.style.boxShadow = 'none';

        newPasswordInputField.addEventListener("mouseenter", validInputsMousEnter);
        newPasswordInputField.addEventListener("mouseleave", validInputsMousEave);

    };

    if(confirmPasswordInputField.style.border != "none" && confirmPasswordInputField.children[1].value != "") { 
        confirmPasswordInputField.removeEventListener("mouseenter", invalidInputsMousEnter);
        confirmPasswordInputField.removeEventListener("mouseleave", invalidInputsMousEave);

        confirmPasswordInputField.style.backgroundColor = 'transparent';
        confirmPasswordInputField.style.transform = 'none';
        confirmPasswordInputField.style.transition = 'none';
        confirmPasswordInputField.style.boxShadow = 'none';

        confirmPasswordInputField.addEventListener("mouseenter", validInputsMousEnter);
        confirmPasswordInputField.addEventListener("mouseleave", validInputsMousEave);

    };

};

newPasswordInputField.addEventListener("input", inputChange);
confirmPasswordInputField.addEventListener("input", inputChange);

    //  FUNCTION FOR SUBMITTING FORM.
async function submitButton() {
    const newPasswordInput = newPasswordInputField.children[1].value;
    const confirmPasswordInput = confirmPasswordInputField.children[1].value;

    const response = await fetch('https://dt-comia-realty-and-marketing-production.up.railway.app/forgot-password-change', {
        method: 'POST',
        headers: {                    
                    'User-Agent': 'undici-stream-example',
                    'Content-Type': 'application/json'
        },
        credentials: "include",
        body: JSON.stringify({
                              recoveryEmailAddressInput,
                              tokenInput,
                              newPasswordInput,
                              confirmPasswordInput
                            })
    });
    const data = await response.json();

    if(data != "") {
        if(data.newPassword != "NEW PASSWORD FOUND!") {
            newPasswordInputField.removeEventListener("mouseenter", validInputsMousEnter);
            newPasswordInputField.removeEventListener("mouseleave", validInputsMousEave);

            newPasswordInputField.style.border = 'solid 1.25px red';
            newPasswordInputField.style.boxShadow = '0px 0px 10px red';
            newPasswordInputField.style.border = 'solid 1.25px red';
            newPasswordInputField.style.boxShadow = '0px 0px 10px red';
            newPasswordInputField.style.border = 'solid 1.25px #f5f2e8';
                
            newPasswordInputField.addEventListener("mouseenter", invalidInputsMousEnter);
            newPasswordInputField.addEventListener("mouseleave", invalidInputsMousEave);

        };

        if(data.confirmPassword != "CONFIRM PASSWORD MATCHED!") {
            confirmPasswordInputField.removeEventListener("mouseenter", validInputsMousEnter);
            confirmPasswordInputField.removeEventListener("mouseleave", validInputsMousEave);

            confirmPasswordInputField.style.border = 'solid 1.25px red';
            confirmPasswordInputField.style.boxShadow = '0px 0px 10px red';
            confirmPasswordInputField.style.border = 'solid 1.25px red';
            confirmPasswordInputField.style.boxShadow = '0px 0px 10px red';
            confirmPasswordInputField.style.border = 'solid 1.25px #f5f2e8';
                
            confirmPasswordInputField.addEventListener("mouseenter", invalidInputsMousEnter);
            confirmPasswordInputField.addEventListener("mouseleave", invalidInputsMousEave);

        };

        if(data.newPassword != "NEW PASSWORD NOT FOUND!" && data.confirmPassword != "CONFIRM PASSWORD  NOT MATCH!") {
            window.location = "./passwordUpdated.html";

        };

    } else {
        window.location = "./passwordVerification.html?recoveryEmailAddress=" + recoveryEmailAddressInput + "&token=" + tokenInput;
    }
    
};

document.querySelector('.main-container button').addEventListener("click", submitButton);