const text = document.querySelector('.main-container p');
const link = document.querySelector('.main-container a');

let newEmailAddressInput = '';
let token = '';

if(window.location.search != '') {
        // Get query params from URL
    const params = new URLSearchParams(window.location.search);
    newEmailAddressInput = params.get("newEmailAddress");
    tokenInput = params.get("token");
};

    //  FUNCTION FOR VERIFYING EMAIL.
async function emailVerification() {
    const response = await fetch('https://dt-comia-realty-and-marketing-production.up.railway.app/new-email-verification', {
        method: 'POST',
        headers: {
        'User-Agent': 'undici-stream-example',
        'Content-Type': 'application/json',
        },
        credentials: "include",
        body: JSON.stringify({newEmailAddressInput, tokenInput}),
    });
    const data = await response.json();  

    text.innerHTML = data.text;

    if(data.text != "Link expired.") {
        link.href = data.link;
        link.innerHTML = "BACK TO LOGIN";

    } else { 
        if(data.dateAttempted != undefined) {
            alert("Too much attempt, try again after 5 hours.");

        } else {
                //  FUNCTION FOR SENDING EMAIL.
            async function emailSender() {
                const response = await fetch('https://dt-comia-realty-and-marketing-production.up.railway.app/new-email-verification-link', {
                    method: 'POST',
                    headers: {
                                'User-Agent': 'undici-stream-example',
                                'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({emailAddressInput, tokenInput}),
                }); 

            };

            link.addEventListener("click", emailSender);

            link.href = data.link;
            link.innerHTML = "(Resend link)";

        };

    };
    
};

emailVerification().catch(console.error);