const text = document.querySelector('.main-container p');
const link = document.querySelector('.main-container a');
let recoveryEmailAddressInput = '';
let token = '';

if(window.location.search != '') {
        // Get query params from URL
    const params = new URLSearchParams(window.location.search);
    recoveryEmailAddressInput = params.get("recoveryEmailAddress");
    tokenInput = params.get("token");
};

    //  FUNCTION FOR VERIFYING PASSWORD FORGET TOKEN.
async function passwordForgetToken() {
    const response = await fetch('https://dt-comia-realty-and-marketing-production.up.railway.app/password-verification', {
        method: 'POST',
        headers: {
        'User-Agent': 'undici-stream-example',
        'Content-Type': 'application/json',
        },
        credentials: "include",
        body: JSON.stringify({recoveryEmailAddressInput, tokenInput}),
    });
    const data = await response.json();  
    
    console.log(data)

    text.innerHTML = data.text;

    if(data.text != "Link expired.") {
        window.location = data.link;

    } else { 
        if(new Date(data.link) != "Invalid Date")  {
            const dateAttempted = new Date(data.link);
            const d = new Date();

            if(dateAttempted < d) { 
                    //  FUNCTION FOR SENDING EMAIL.
                async function emailSender() {
                    const response = await fetch('https://dt-comia-realty-and-marketing-production.up.railway.app/password-change-link', {
                        method: 'POST',
                        headers: {
                                    'User-Agent': 'undici-stream-example',
                                    'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({recoveryEmailAddressInput, tokenInput}),
                    }); 

                };

                link.addEventListener("click", emailSender);


                link.href = data.link;
                link.innerHTML = "(Resend link)";
                
            } else {                 
                function attemptCount() {
                    if(dateAttempted < new Date()) {
                        emailVerification().catch(console.error);

                    };

                    if(Math.floor((dateAttempted - new Date()) / 3600000) > 0) {
                        link.innerHTML = "(Too much attempt, try again after " + Math.floor(((dateAttempted - new Date()) / 3600000)) + " hour)";

                    } else if(Math.floor((dateAttempted - new Date()) / 60000) > 0) {
                        if(Math.floor((dateAttempted - new Date()) / 60000) > 1) {
                            link.innerHTML = "(Too much attempt, try again after " + Math.floor(((dateAttempted - new Date()) / 60000)) + " minutes)";
                        
                        } else {
                            link.innerHTML = "(Too much attempt, try again after " + Math.floor(((dateAttempted - new Date()) / 60000)) + " minute)";
                        
                        }

                    } else {
                        if(Math.floor((dateAttempted - new Date()) / 1000) > 1) {
                            link.innerHTML = "(Too much attempt, try again after " + Math.floor(((dateAttempted - new Date()) / 1000)) + " seconds)";
                        
                        } else if(Math.floor((dateAttempted - new Date()) / 1000) == 0) {
                            link.innerHTML = "(Too much attempt, try again after " + Math.floor(((dateAttempted - new Date()) / 1000)) + " second)";
                        
                        }
                    };

                };

                attemptCount();

                setInterval(attemptCount, 1000);

            };

        } else {
                //  FUNCTION FOR SENDING EMAIL.
            async function emailSender() {
                const response = await fetch('https://dt-comia-realty-and-marketing-production.up.railway.app/password-change-link', {
                    method: 'POST',
                    headers: {
                                'User-Agent': 'undici-stream-example',
                                'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({recoveryEmailAddressInput, tokenInput}),
                }); 

            };

            link.addEventListener("click", emailSender);

            link.href = data.link;
            link.innerHTML = "(Resend link)";
        
        };

    };
    
};

passwordForgetToken().catch(console.error);