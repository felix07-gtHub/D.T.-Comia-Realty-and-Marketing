const yourName = document.querySelector('div > .message > .right input[name="Name"]');
const emailAddress = document.querySelector('div > .message > .right input[name="Email address"]');
const message = document.querySelector('div > .message > .right textarea[name="Message"]');

    //  FUNCTION FOR VALID INPUTS mouseenter.
function validInputsMousEnter(e) {
    e.target.style.backgroundColor = '#dbbf7d';
    e.target.style.color = '#263831';
    e.target.style.transform = 'scale(1.1)';
};

yourName.addEventListener("mouseenter", validInputsMousEnter);
emailAddress.addEventListener("mouseenter", validInputsMousEnter);
message.addEventListener("mouseenter", validInputsMousEnter);

    //  FUNCTION FOR VALID INPUTS mouseleave.
function validInputsMousEave(e) {
    e.target.style.backgroundColor = '#354024';
    e.target.style.color = 'black';
    e.target.style.transform = 'none';
};

yourName.addEventListener("mouseleave", validInputsMousEave);
emailAddress.addEventListener("mouseleave", validInputsMousEave);
message.addEventListener("mouseleave", validInputsMousEave);

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
    if(yourName.value != "") {
        yourName.removeEventListener("mouseenter", invalidInputsMousEnter);
        yourName.removeEventListener("mouseleave", invalidInputsMousEave);

        yourName.style.backgroundColor = '#354024';
        yourName.style.color = 'black';
        yourName.style.border = 'solid 1px #e5d7c4';
        yourName.style.transform = 'none';
        yourName.style.boxShadow = 'none'

        yourName.addEventListener("mouseenter", validInputsMousEnter);
        yourName.addEventListener("mouseleave", validInputsMousEave);

    };

    if(emailAddress.value != "") {
        emailAddress.removeEventListener("mouseenter", invalidInputsMousEnter);
        emailAddress.removeEventListener("mouseleave", invalidInputsMousEave);

        emailAddress.style.backgroundColor = '#354024';
        emailAddress.style.color = 'black';
        emailAddress.style.border = 'solid 1px #e5d7c4';
        emailAddress.style.transform = 'none';
        emailAddress.style.boxShadow = 'none'

        emailAddress.addEventListener("mouseenter", validInputsMousEnter);
        emailAddress.addEventListener("mouseleave", validInputsMousEave);

    };

    if(message.value != "") {
        message.removeEventListener("mouseenter", invalidInputsMousEnter);
        message.removeEventListener("mouseleave", invalidInputsMousEave);

        message.style.backgroundColor = '#354024';
        message.style.color = 'black';
        message.style.border = 'solid 1px #e5d7c4';
        message.style.transform = 'none';
        message.style.boxShadow = 'none'

        message.addEventListener("mouseenter", validInputsMousEnter);
        message.addEventListener("mouseleave", validInputsMousEave);

    };

};

yourName.addEventListener("input", inputChange);
emailAddress.addEventListener("input", inputChange);
message.addEventListener("input", inputChange);

    //  FUNCTION FOR SUBMITTING FORM.
async function submitButton() {
    const nameInput = yourName.value;
    const emailAddressInput = emailAddress.value;
    const messageInput = message.value;

    const response = await fetch('http://https://dt-comia-realty-and-marketing-production.up.railway.app.0.0.1:3000/message', {
        method: 'POST',
        headers: {                    
                    'User-Agent': 'undici-stream-example',
                    'Content-Type': 'application/json'
        },
        body: JSON.stringify({
                              nameInput,
                              emailAddressInput,
                              messageInput
                            })
    });
    const data = await response.json();

    if(data.name != "NAME FOUND!") {
        yourName.removeEventListener("mouseenter", validInputsMousEnter);
        yourName.removeEventListener("mouseleave", validInputsMousEave);

        yourName.style.backgroundColor = '#faebcf';
        yourName.style.color = 'black';
        yourName.style.border = 'solid red';
        yourName.style.boxShadow = '0px 0px 10px red';
                    
        yourName.addEventListener("mouseenter", invalidInputsMousEnter);
        yourName.addEventListener("mouseleave", invalidInputsMousEave);

    };

    if(data.emailAddress != "EMAIL ADDRESS IS AN EMAIL!") {
        emailAddress.removeEventListener("mouseenter", validInputsMousEnter);
        emailAddress.removeEventListener("mouseleave", validInputsMousEave);

        emailAddress.style.backgroundColor = '#faebcf';
        emailAddress.style.color = 'black';
        emailAddress.style.border = 'solid red';
        emailAddress.style.boxShadow = '0px 0px 10px red';
                    
        emailAddress.addEventListener("mouseenter", invalidInputsMousEnter);
        emailAddress.addEventListener("mouseleave", invalidInputsMousEave);

    };

    if(data.message != "MESSAGE FOUND!") {
        message.removeEventListener("mouseenter", validInputsMousEnter);
        message.removeEventListener("mouseleave", validInputsMousEave);

        message.style.backgroundColor = '#faebcf';
        message.style.color = 'black';
        message.style.border = 'solid red';
        message.style.boxShadow = '0px 0px 10px red';
                    
        message.addEventListener("mouseenter", invalidInputsMousEnter);
        message.addEventListener("mouseleave", invalidInputsMousEave);

    };

    if(
        data.name != "NAME NOT FOUND!" &&
        data.emailAddress != "EMAIL ADDRESS IS NOT AN EMAIL!" &&
        data.password != "MESSAGE NOT FOUND!"
    ) {
        yourName.value = '';
        emailAddress.value = '';
        message.value = '';

    };
    
};

document.querySelector('div > .message > .right #submit').addEventListener("click", submitButton);