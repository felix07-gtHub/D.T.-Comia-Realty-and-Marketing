const recoveryEmailAddressInputField = document.querySelector('.input-field:nth-child(3)');
const text = document.querySelector('.main-containe p');

    //  FUNCTION FOR VALID INPUTS mouseenter.
function validInputsMousEnter(e) {
    e.target.style.backgroundColor = '#f5f2e8';
    e.target.style.transform = 'scale(1.05)';
    e.target.style.transition = 'transform 0.25s';
    e.target.style.boxShadow = '0px 0px 10px #f5f2e8';
};

recoveryEmailAddressInputField.addEventListener("mouseenter", validInputsMousEnter);

    //  FUNCTION FOR VALID INPUTS mouseleave.
function validInputsMousEave(e) {
    e.target.style.backgroundColor = 'transparent';
    e.target.style.transform = 'none';
    e.target.style.transition = 'none';
    e.target.style.boxShadow = 'none';
};

recoveryEmailAddressInputField.addEventListener("mouseleave", validInputsMousEave);

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

function inputChange() {
    if(recoveryEmailAddressInputField.style.border != "none" && recoveryEmailAddressInputField.children[1].value != "") {   
        recoveryEmailAddressInputField.removeEventListener("mouseenter", invalidInputsMousEnter);
        recoveryEmailAddressInputField.removeEventListener("mouseleave", invalidInputsMousEave);

        recoveryEmailAddressInputField.style.backgroundColor = 'transparent';
        recoveryEmailAddressInputField.style.transform = 'none';
        recoveryEmailAddressInputField.style.transition = 'none';
        recoveryEmailAddressInputField.style.boxShadow = 'none';

        recoveryEmailAddressInputField.addEventListener("mouseenter", validInputsMousEnter);
        recoveryEmailAddressInputField.addEventListener("mouseleave", validInputsMousEave);

    };

};

recoveryEmailAddressInputField.addEventListener("input", inputChange);

    //  FUNCTION FOR SUBMITTING FORM.
async function submitButton() {
    const recoveryEmailAddressInput = recoveryEmailAddressInputField.children[1].value;

    const response = await fetch('https://dt-comia-realty-and-marketing-production.up.railway.app/forgot-password', {
        method: 'POST',
        headers: {                    
                    'User-Agent': 'undici-stream-example',
                    'Content-Type': 'application/json'
        },
        body: JSON.stringify({recoveryEmailAddressInput})
    });
    const data = await response.json();

    if(data != "") {
        if(data.recoveryEmailAddress != "RECOVERY EMAIL ADDRESS FOUND!") {
            recoveryEmailAddressInputField.removeEventListener("mouseenter", validInputsMousEnter);
            recoveryEmailAddressInputField.removeEventListener("mouseleave", validInputsMousEave);

            recoveryEmailAddressInputField.style.border = 'solid 1.25px red';
            recoveryEmailAddressInputField.style.boxShadow = '0px 0px 10px red';
            recoveryEmailAddressInputField.style.border = 'solid 1.25px red';
            recoveryEmailAddressInputField.style.boxShadow = '0px 0px 10px red';
                
            recoveryEmailAddressInputField.addEventListener("mouseenter", invalidInputsMousEnter);
            recoveryEmailAddressInputField.addEventListener("mouseleave", invalidInputsMousEave);

        } else {            
            recoveryEmailAddressInputField.removeEventListener("mouseenter", invalidInputsMousEnter);
            recoveryEmailAddressInputField.removeEventListener("mouseleave", invalidInputsMousEave);

            recoveryEmailAddressInputField.style.border = 'none';
            recoveryEmailAddressInputField.style.boxShadow = 'none';  
            recoveryEmailAddressInputField.style.border = 'none';
            recoveryEmailAddressInputField.style.boxShadow = 'none';  

            recoveryEmailAddressInputField.addEventListener("mouseenter", validInputsMousEnter);
            recoveryEmailAddressInputField.addEventListener("mouseleave", validInputsMousEave);

        };

        if(data.recoveryEmailAddress != "RECOVERY EMAIL ADDRESS NOT FOUND!") {    
            recoveryEmailAddressInputField.children[1].value = '';

            window.location = "./emailSent.html";

        };

    } else {
        const dateAttempted = new Date(data.dateAttempted);
         
        function attemptCount() {
            if(dateAttempted < new Date()) {
                emailVerification().catch(console.error);

            };

            if(Math.floor((dateAttempted - new Date()) / 3600000) > 0) {
                text.innerHTML = "(Try again after " + Math.floor(((dateAttempted - new Date()) / 3600000)) + " hour)";

            } else if(Math.floor((dateAttempted - new Date()) / 60000) > 0) {
                if(Math.floor((dateAttempted - new Date()) / 60000) > 1) {
                    text.innerHTML = "(Try again after " + Math.floor(((dateAttempted - new Date()) / 60000)) + " minutes)";
                        
                } else {
                    text.innerHTML = "(Try again after " + Math.floor(((dateAttempted - new Date()) / 60000)) + " minute)";
                        
                }

            } else {
                if(Math.floor((dateAttempted - new Date()) / 1000) > 1) {
                    text.innerHTML = "(Try again after " + Math.floor(((dateAttempted - new Date()) / 1000)) + " seconds)";
                        
                } else if(Math.floor((dateAttempted - new Date()) / 1000) == 0) {
                    text.innerHTML = "(Try again after " + Math.floor(((dateAttempted - new Date()) / 1000)) + " second)";
                        
                }
            };

        };

        attemptCount();

        setInterval(attemptCount, 1000);
        
    }

};

document.querySelector('.main-container button').addEventListener("click", submitButton);