    //  GET THE USERS.
async function user() {
    const response = await fetch('https://dt-comia-realty-and-marketing-production.up.railway.app/user', {
        method: "GET",
        credentials: "include"
    });
    const data = await response.json();

    if(data.user != undefined) {
        if(data.user[0].type_of_user != "Agent") {
            window.location = "../customer/logIn.html";
        };
    } else {
        window.location = "../customer/logIn.html";
    };

    const navProfilePicture = document.querySelector('nav > a > #profileIcon');
    const navUserName = document.querySelector('nav > #user > p:nth-child(1)');
        
    if(data.userImage.length > 0) {
        navProfilePicture.src = data.userImage[0].path;
        navProfilePicture.alt = data.userImage[0].file_name;
        navProfilePicture.type = data.userImage[0].mime_type;
    } else {
        navProfilePicture.src = "https://niwxujzmwpdhegjlmyfw.supabase.co/storage/v1/object/public/D.T.%20Comia%20Realty%20and%20Marketing/AGENT ICONS/prof.png";
        navProfilePicture.alt = "Profile icon";
        navProfilePicture.type = "";
    };

    navUserName.innerHTML = data.user[0].user_name;
};

user().catch(console.error);        
      

const profileMainDiv = document.querySelector('.profileMAIN-div');
const addPhoto = document.querySelector('.acc-management-div .add-photo');
const photo = document.querySelector('.acc-management-div #photo');
const profile = document.querySelector('.acc-management-div .add-photo img');
const uploadButton = document.querySelector('.upload-button');
const oldPassword = document.querySelector('#profile input[name="Old password"]');
const newPassword = document.querySelector('#profile input[name="New password"]');
const confirmPassword = document.querySelector('#profile input[name="Confirm password"]');
const updateButton = document.querySelector('.update-button');
const deleteButton = document.querySelector('.delete-button');
const termsCondition = document.querySelector('.checkbox input');
const deleteCancel = document.querySelector('.delete-acc-div .deleteModal >  button:nth-child(4)');
const deleteContinue = document.querySelector('.delete-acc-div .deleteModal >  button:nth-child(5)');
const deleteModal = document.querySelector('.delete-acc-div .deleteModal');
const userName = document.querySelector('#profile input[name="User name"]');
const firstName = document.querySelector('#profile input[name="First name"]');
const lastName = document.querySelector('#profile input[name="Last name"]');
const updateInfoButton = document.querySelector('.update-info-button');
const contactNumber = document.querySelector('#profile input[name="Contact number"]');
const telephoneNumber = document.querySelector('#profile input[name="Telephone number"]');
const emailAddress = document.querySelector('#profile input[name="Email address"]');
const recoveryEmailAddress = document.querySelector('#profile input[name="Recovery email address"]');

    //  FUNCTION FOR VALID INPUTS mouseenter.
function validInputsMousEnter(e) {
    e.target.style.backgroundColor = '#4e6e5d';
    e.target.style.borderColor = '#4e6e5d';
    e.target.style.transform = 'scale(1.025)';
    e.target.style.boxShadow = '0px 0px 10px #2f2f2f';
};

oldPassword.addEventListener("mouseenter", validInputsMousEnter);
newPassword.addEventListener("mouseenter", validInputsMousEnter);
confirmPassword.addEventListener("mouseenter", validInputsMousEnter);
userName.addEventListener("mouseenter", validInputsMousEnter);
firstName.addEventListener("mouseenter", validInputsMousEnter);
lastName.addEventListener("mouseenter", validInputsMousEnter);
contactNumber.addEventListener("mouseenter", validInputsMousEnter);
telephoneNumber.addEventListener("mouseenter", validInputsMousEnter);
emailAddress.addEventListener("mouseenter", validInputsMousEnter);
recoveryEmailAddress.addEventListener("mouseenter", validInputsMousEnter);

    //  FUNCTION FOR VALID INPUTS mouseleave.
function validInputsMousEave(e) {
    e.target.style.backgroundColor = 'transparent';
    e.target.style.borderColor = '#333333';
    e.target.style.transform = 'none';
    e.target.style.boxShadow = 'none';
};

oldPassword.addEventListener("mouseleave", validInputsMousEave);
newPassword.addEventListener("mouseleave", validInputsMousEave);
confirmPassword.addEventListener("mouseleave", validInputsMousEave);
userName.addEventListener("mouseleave", validInputsMousEave);
firstName.addEventListener("mouseleave", validInputsMousEave);
lastName.addEventListener("mouseleave", validInputsMousEave);
contactNumber.addEventListener("mouseleave", validInputsMousEave);
telephoneNumber.addEventListener("mouseleave", validInputsMousEave);
emailAddress.addEventListener("mouseleave", validInputsMousEave);
recoveryEmailAddress.addEventListener("mouseleave", validInputsMousEave);

    //  FUNCTION FOR INVALID INPUTS mouseenter.
function invalidInputsMousEnter(e) {
    e.target.style.backgroundColor = '#faebcf';
    e.target.style.border = 'solid red';
    e.target.style.transform = 'scale(1.025)';
    e.target.style.boxShadow = '0px 0px 10px red';
};

    //  FUNCTION FOR INVALID INPUTS mouseleave.
function invalidInputsMousEave(e) {
    e.target.style.backgroundColor = '#faebcf';
    e.target.style.border = 'solid red';
    e.target.style.transform = 'none';
    e.target.style.boxShadow = '0px 0px 10px red';
};

    //  GET THE USER INFORMATION.
async function userInformation() {
    const response = await fetch('https://dt-comia-realty-and-marketing-production.up.railway.app/user-information', {
        method: "GET",
        credentials: "include"
    });
    const userData = await response.json();

    if(userData.userInformation != undefined) {
        if(userData.userInformation[0].type_of_user != "Agent") {
            window.location = "../customer/logIn.html";
        } else {
            if(userData.userImage.length > 0) {
                const removeButton = document.createElement('input');

                profile.src = userData.userImage[0].path;
                profile.alt = userData.userImage[0].file_name;
                profile.type = userData.userImage[0].mime_type;
                removeButton.type = "button";
                removeButton.name = "Remove button";
                removeButton.value = "x";
                removeButton.addEventListener("click", removeFunction);

                addPhoto.appendChild(removeButton);
            } else {
                profile.src = "https://niwxujzmwpdhegjlmyfw.supabase.co/storage/v1/object/public/D.T.%20Comia%20Realty%20and%20Marketing/BUYER ICONS AND LOGOS/profile.png";
                profile.alt = "profile";
                profile.type = "";
            };

            if(userData.userReservation.length > 0) {
                deleteButton.disabled = true;
            } else {
                deleteButton.disabled = false;
            };

            userName.value = userData.userInformation[0].user_name;
            firstName.value = userData.userInformation[0].first_name;
            lastName.value = userData.userInformation[0].last_name;
            contactNumber.value = userData.userInformation[0].contact_number;

            if(userData.userInformation[0].contact_number != null) {
                const verified = document.createElement('p');
                verified.innerHTML = "Verified.";
                contactNumber.parentElement.appendChild(verified);
            } else {
                const verifyButton = document.createElement('button');
                verifyButton.classList.add('verify-button');
                verifyButton.innerHTML = "Verify";
                verifyButton.disabled = true;
                contactNumber.parentElement.appendChild(verifyButton);
            };
            
            telephoneNumber.value = userData.userInformation[0].telephone_number;

            if(userData.userInformation[0].telephone_number != null) {
                const verified = document.createElement('p');
                verified.innerHTML = "Verified.";
                telephoneNumber.parentElement.appendChild(verified);
            } else {
                const verifyButton = document.createElement('button');
                verifyButton.classList.add('verify-button');
                verifyButton.innerHTML = "Verify";
                verifyButton.disabled = true;
                telephoneNumber.parentElement.appendChild(verifyButton);
            };

            if(userData.emailAddress.length > 0) {
                for(let i = 0; i < userData.emailAddress.length; i++) {
                    if(userData.emailAddress[i].type_of_email_address != "Main") {
                        if(userData.userInformation[0].email_address != null) {
                            const verified = document.createElement('p');   
                            emailAddress.value = userData.userInformation[0].email_address;
                            verified.innerHTML = "Verified.";
                            emailAddress.parentElement.appendChild(verified);
                        } else {
                            const verifyButton = document.createElement('button');
                            emailAddress.value = "";
                            verifyButton.classList.add('verify-button');
                            verifyButton.innerHTML = "Verify";
                            verifyButton.disabled = true;
                            emailAddress.parentElement.appendChild(verifyButton);

                            emailAddress.nextElementSibling.addEventListener("click", emailAddressVerify);
                        };
                    } else {
                        emailAddress.value = userData.emailAddress[i].new_email_address;
                        
                        if(parseInt(userData.emailAddress[i].attempt_count) < 5) {
                            const resendButton = document.createElement('button');
                            resendButton.classList.add('resend-button');
                            resendButton.innerHTML = "Resend";
                            emailAddress.parentElement.appendChild(resendButton); 

                            emailAddress.nextElementSibling.addEventListener("click", emailAddressVerify);                   
                        } else {
                            const timer = document.createElement('p');
                            timer.innerHTML = "5 hours.";
                            emailAddress.parentElement.appendChild(timer);
                        };

                        break;
                    };
                };
            } else {
                if(userData.userInformation[0].email_address != null) {
                    const verified = document.createElement('p');   
                    emailAddress.value = userData.userInformation[0].email_address;
                    verified.innerHTML = "Verified.";
                    emailAddress.parentElement.appendChild(verified);
                } else {
                    const verifyButton = document.createElement('button');
                    emailAddress.value = "";
                    verifyButton.classList.add('verify-button');
                    verifyButton.innerHTML = "Verify";
                    verifyButton.disabled = true;
                    emailAddress.parentElement.appendChild(verifyButton);

                    emailAddress.nextElementSibling.addEventListener("click", emailAddressVerify);
                };
            };

            if(userData.emailAddress.length > 0) {
                for(let i = 0; i < userData.emailAddress.length; i++) {
                    if(userData.emailAddress[i].type_of_email_address == "Recovery") {
                        if(userData.userInformation[0].recovery_email_address != null) {
                            const verified = document.createElement('p');   
                            recoveryEmailAddress.value = userData.userInformation[0].recovery_email_address;
                            verified.innerHTML = "Verified.";
                            recoveryEmailAddress.parentElement.appendChild(verified);
                        } else {
                            const verifyButton = document.createElement('button');
                            recoveryEmailAddress.value = "";
                            verifyButton.classList.add('verify-button');
                            verifyButton.innerHTML = "Verify";
                            verifyButton.disabled = true;
                            recoveryEmailAddress.parentElement.appendChild(verifyButton);

                            recoveryEmailAddress.nextElementSibling.addEventListener("click", emailAddressVerify);    
                        };
                    } else {
                        recoveryEmailAddress.value = userData.emailAddress[i].new_email_address;
                        
                        if(parseInt(userData.emailAddress[i].attempt_count) < 5) {
                            const resendButton = document.createElement('button');
                            resendButton.classList.add('resend-button');
                            resendButton.innerHTML = "Resend";
                            recoveryEmailAddress.parentElement.appendChild(resendButton);  

                            recoveryEmailAddress.nextElementSibling.addEventListener("click", emailAddressVerify);                  
                        } else {
                            const timer = document.createElement('p');
                            timer.innerHTML = "5 hours.";
                            recoveryEmailAddress.parentElement.appendChild(timer);
                        };

                        break;
                    };
                };
            } else {
                if(userData.userInformation[0].recovery_email_address != null) {
                    const verified = document.createElement('p');   
                    recoveryEmailAddress.value = userData.userInformation[0].recovery_email_address;
                    verified.innerHTML = "Verified.";
                    recoveryEmailAddress.parentElement.appendChild(verified);
                } else {
                    const verifyButton = document.createElement('button');
                    recoveryEmailAddress.value = "";
                    verifyButton.classList.add('verify-button');
                    verifyButton.innerHTML = "Verify";
                    verifyButton.disabled = true;
                    recoveryEmailAddress.parentElement.appendChild(verifyButton);

                    recoveryEmailAddress.nextElementSibling.addEventListener("click", emailAddressVerify);    
                };
            };
            
        };
    } else {
        window.location = "../customer/logIn.html";
    };

        //  .
    async function photoChange() {
        if(photo.value != "") {
            const removeButton = document.createElement('input');

            removeButton.type = "button";
            removeButton.name = "Remove button";
            removeButton.value = "x";
            removeButton.addEventListener("click", removeFunction);
            uploadButton.disabled = false;

            addPhoto.appendChild(removeButton);

            const formData = new FormData(addPhoto);

            const response = await fetch('https://dt-comia-realty-and-marketing-production.up.railway.app/preview-photo', {
                method: 'POST',
                headers: {                    
                            'User-Agent': 'undici-stream-example',
                },
                credentials: "include",
                body: formData,
            });
            const previewData = await response.json();

            profile.src = "data:" + previewData.mimetype + ";base64," + previewData.buffer;
            profile.alt = previewData.fileName;
            profile.type = previewData.mimetype;
        };    
    };

    photo.addEventListener("change", photoChange);

        //  REMOVE PROFILE.
    async function removeFunction() {
        if(userData.userImage.length > 0) {
            if(profile.src != userData.userImage[0].path) {
                photo.value = "";
                profile.src = userData.userImage[0].path;
                profile.alt = userData.userImage[0].fileName;
                profile.type = userData.userImage[0].mimetype;
                uploadButton.disabled = true;
            } else {
                const response = await fetch('https://dt-comia-realty-and-marketing-production.up.railway.app/delete-photo', {
                    method: "GET",
                    credentials: "include"
                });

                photo.value = "";
                profile.src = "https://niwxujzmwpdhegjlmyfw.supabase.co/storage/v1/object/public/D.T.%20Comia%20Realty%20and%20Marketing/BUYER ICONS AND LOGOS/profile.png";
                profile.alt = "profile";
                profile.type = "";
                addPhoto.children[2].remove();
                uploadButton.disabled = true;
            };
        } else {
            photo.value = "";
            profile.src = "https://niwxujzmwpdhegjlmyfw.supabase.co/storage/v1/object/public/D.T.%20Comia%20Realty%20and%20Marketing/BUYER ICONS AND LOGOS/profile.png";
            profile.alt = "profile";
            profile.type = "";
            addPhoto.children[2].remove();
            uploadButton.disabled = true;
        };
    };

        //  .
    async function uploadPhoto() {
        const formData = new FormData(addPhoto);

        const response = await fetch('https://dt-comia-realty-and-marketing-production.up.railway.app/upload-photo', {
            method: 'POST',
            headers: {                    
                        'User-Agent': 'undici-stream-example',
            },
            credentials: "include",
            body: formData,
        });
        const uploadData = await response.json();

        photo.value = "";
        profile.src = uploadData.path;
        profile.alt = uploadData.fileName;
        profile.type = uploadData.mimetype;
        uploadButton.disabled = true;
    }

    uploadButton.addEventListener("click", uploadPhoto);

        //  .
    function infoChange() {
        userName.removeEventListener("mouseenter", invalidInputsMousEnter);
        userName.removeEventListener("mouseleave", invalidInputsMousEave);

        userName.style.backgroundColor = 'transparent';
        userName.style.borderColor = '#333333';
        userName.style.transform = 'none';
        userName.style.boxShadow = 'none';  
            
        userName.addEventListener("mouseenter", validInputsMousEnter);
        userName.addEventListener("mouseleave", validInputsMousEave);

        if(
            userName.value != "" &&
            firstName.value != "" &&
            lastName.value != ""
        ) {
            if(
                userName.value != userData.userInformation[0].user_name ||
                firstName.value != userData.userInformation[0].first_name ||
                lastName.value != userData.userInformation[0].last_name
            ) {
                updateInfoButton.disabled = false;
            } else {
                updateInfoButton.disabled = true;
            };
        } else {
            updateInfoButton.disabled = true;
        };
    };

    userName.addEventListener("input", infoChange);
    firstName.addEventListener("input", infoChange);
    lastName.addEventListener("input", infoChange);

        //  .
    function contactNumberChange() {        
        if(contactNumber.value.length > 50) {
            contactNumber.value = contactNumber.value.substring(0, 50);

        };

        if(contactNumber.value != "") {
            if(contactNumber.value != userData.userInformation[0].contact_number) {
                if(contactNumber.parentElement.children.length > 1) {
                    contactNumber.nextElementSibling.remove();
                };

                const verifyButton = document.createElement('button');
                verifyButton.classList.add('verify-button');
                verifyButton.innerHTML = "Verify";
                verifyButton.disabled = false;
                contactNumber.parentElement.appendChild(verifyButton);

                contactNumber.nextElementSibling.addEventListener("click", contactNumberVerify);
            } else {
                if(contactNumber.parentElement.children.length > 1) {
                    contactNumber.nextElementSibling.remove();
                };

                const verified = document.createElement('p');
                verified.innerHTML = "Verified.";
                contactNumber.parentElement.appendChild(verified);

                contactNumber.nextElementSibling.removeEventListener("click", contactNumberVerify);
            };
        } else {
            if(contactNumber.parentElement.children.length > 1) {
                contactNumber.nextElementSibling.remove();
            };

            const verifyButton = document.createElement('button');
            verifyButton.classList.add('verify-button');
            verifyButton.innerHTML = "Verify";
            verifyButton.disabled = true;
            contactNumber.parentElement.appendChild(verifyButton);
            
            contactNumber.nextElementSibling.addEventListener("click", contactNumberVerify);
        };
    };

    contactNumber.addEventListener("input", contactNumberChange);

        //  .
    async function contactNumberVerify() {
        const contactNumberInput = contactNumber.value;

        const response = await fetch('https://dt-comia-realty-and-marketing-production.up.railway.app/verify-contact-number', {
            method: 'POST',
            headers: {                    
                        'User-Agent': 'undici-stream-example',
                        'Content-Type': 'application/json',
            },
            credentials: "include",
            body: JSON.stringify({contactNumberInput}),
        });
        const contactNumberData = await response.json();

        contactNumber.nextElementSibling.remove();

        const verified = document.createElement('p');
        verified.innerHTML = "Verified.";
        contactNumber.parentElement.appendChild(verified);
    };

        //  .
    function telephoneNumberChange() {
        if(telephoneNumber.value.length > 50) {
            telephoneNumber.value = telephoneNumber.value.substring(0, 50);

        };

        if(telephoneNumber.value != "") {
            if(telephoneNumber.value != userData.userInformation[0].telephone_number) {
                if(telephoneNumber.parentElement.children.length > 1) {
                    telephoneNumber.nextElementSibling.remove();
                };

                const verifyButton = document.createElement('button');
                verifyButton.classList.add('verify-button');
                verifyButton.innerHTML = "Verify";
                verifyButton.disabled = false;
                telephoneNumber.parentElement.appendChild(verifyButton);

                telephoneNumber.nextElementSibling.addEventListener("click", telephoneNumberVerify);
            } else {
                if(telephoneNumber.parentElement.children.length > 1) {
                    telephoneNumber.nextElementSibling.remove();
                };

                const verified = document.createElement('p');
                verified.innerHTML = "Verified.";
                telephoneNumber.parentElement.appendChild(verified);

                telephoneNumber.nextElementSibling.removeEventListener("click", telephoneNumberVerify);
            };
        } else {
            if(telephoneNumber.parentElement.children.length > 1) {
                telephoneNumber.nextElementSibling.remove();
            };

            const verifyButton = document.createElement('button');
            verifyButton.classList.add('verify-button');
            verifyButton.innerHTML = "Verify";
            verifyButton.disabled = true;
            telephoneNumber.parentElement.appendChild(verifyButton);

            telephoneNumber.nextElementSibling.addEventListener("click", telephoneNumberVerify);
        };
    };

    telephoneNumber.addEventListener("input", telephoneNumberChange);

        //  .
    async function telephoneNumberVerify() {
        const telephoneNumberInput = telephoneNumber.value;

        const response = await fetch('https://dt-comia-realty-and-marketing-production.up.railway.app/verify-telephone-number', {
            method: 'POST',
            headers: {                    
                        'User-Agent': 'undici-stream-example',
                        'Content-Type': 'application/json',
            },
            credentials: "include",
            body: JSON.stringify({telephoneNumberInput}),
        });
        const telephoneNumberData = await response.json();

        telephoneNumber.nextElementSibling.remove();

        const verified = document.createElement('p');
        verified.innerHTML = "Verified.";
        telephoneNumber.parentElement.appendChild(verified);
    };    

        //  .
    function emailAddressChange() {
        if(emailAddress.value != "") {
            emailAddress.removeEventListener("mouseenter", invalidInputsMousEnter);
            emailAddress.removeEventListener("mouseleave", invalidInputsMousEave);

            emailAddress.style.backgroundColor = 'transparent';
            emailAddress.style.borderColor = '#333333';
            emailAddress.style.transform = 'none';
            emailAddress.style.boxShadow = 'none';  
            
            emailAddress.addEventListener("mouseenter", validInputsMousEnter);
            emailAddress.addEventListener("mouseleave", validInputsMousEave);

            if(emailAddress.value != userData.userInformation[0].email_address) {
                if(emailAddress.parentElement.children.length > 1) {
                    emailAddress.nextElementSibling.remove();
                };

                const verifyButton = document.createElement('button');
                verifyButton.classList.add('verify-button');
                verifyButton.innerHTML = "Verify";
                verifyButton.disabled = false;
                emailAddress.parentElement.appendChild(verifyButton);

                emailAddress.nextElementSibling.addEventListener("click", emailAddressVerify);
            } else {
                if(emailAddress.parentElement.children.length > 1) {
                    emailAddress.nextElementSibling.remove();
                };

                const verified = document.createElement('p');
                verified.innerHTML = "Verified.";
                emailAddress.parentElement.appendChild(verified);

                emailAddress.nextElementSibling.removeEventListener("click", emailAddressVerify);
            };
        } else {
            if(emailAddress.parentElement.children.length > 1) {
                emailAddress.nextElementSibling.remove();
            };

            const verifyButton = document.createElement('button');
            verifyButton.classList.add('verify-button');
            verifyButton.innerHTML = "Verify";
            verifyButton.disabled = true;
            emailAddress.parentElement.appendChild(verifyButton);

            emailAddress.nextElementSibling.addEventListener("click", emailAddressVerify);
        };
    };

    emailAddress.addEventListener("input", emailAddressChange);

        //  .
    async function emailAddressVerify() {
        const typeEmailAddress = "Main";
        const oldEmailAddressInput = userData.userInformation[0].email_address;
        const newEmailAddressInput = emailAddress.value;

        const response = await fetch('https://dt-comia-realty-and-marketing-production.up.railway.app/verify-new-email-address', {
            method: 'POST',
            headers: {                    
                        'User-Agent': 'undici-stream-example',
                        'Content-Type': 'application/json',
            },
            credentials: "include",
            body: JSON.stringify({typeEmailAddress,
                                  oldEmailAddressInput,
                                  newEmailAddressInput
                                }),
        });
        const emailAddressData = await response.json();

        if(emailAddressData.emailAddress != "EMAIL ADDRESS FOUND!") {
            emailAddress.removeEventListener("mouseenter", validInputsMousEnter);
            emailAddress.removeEventListener("mouseleave", validInputsMousEave);

            emailAddress.style.backgroundColor = '#faebcf';
            emailAddress.style.color = 'black';
            emailAddress.style.border = 'solid red';
            emailAddress.style.boxShadow = '0px 0px 10px red';
                    
            emailAddress.addEventListener("mouseenter", invalidInputsMousEnter);
            emailAddress.addEventListener("mouseleave", invalidInputsMousEave);

        };
        
        if(emailAddressData.dateAttempted != undefined) {
            emailAddress.nextElementSibling.remove();

            const timer = document.createElement('p');
            timer.innerHTML = "5 hours.";
            emailAddress.parentElement.appendChild(timer);
        } else {
            emailAddress.nextElementSibling.classList.remove('verify-button');
            emailAddress.nextElementSibling.classList.add('resend-button');
            emailAddress.nextElementSibling.innerHTML = "Resend";
        };
    };

        //  .
    function recoveryEmailAddressChange() {
        if(recoveryEmailAddress.value != "") {
            recoveryEmailAddress.removeEventListener("mouseenter", invalidInputsMousEnter);
            recoveryEmailAddress.removeEventListener("mouseleave", invalidInputsMousEave);

            recoveryEmailAddress.style.backgroundColor = 'transparent';
            recoveryEmailAddress.style.borderColor = '#333333';
            recoveryEmailAddress.style.transform = 'none';
            recoveryEmailAddress.style.boxShadow = 'none';  
            
            recoveryEmailAddress.addEventListener("mouseenter", validInputsMousEnter);
            recoveryEmailAddress.addEventListener("mouseleave", validInputsMousEave);

            if(recoveryEmailAddress.value != userData.userInformation[0].recovery_email_address) {
                if(recoveryEmailAddress.parentElement.children.length > 1) {
                    recoveryEmailAddress.nextElementSibling.remove();
                };

                const verifyButton = document.createElement('button');
                verifyButton.classList.add('verify-button');
                verifyButton.innerHTML = "Verify";
                verifyButton.disabled = false;
                recoveryEmailAddress.parentElement.appendChild(verifyButton);

                recoveryEmailAddress.nextElementSibling.addEventListener("click", recoveryEmailAddressVerify);
            } else {
                if(recoveryEmailAddress.parentElement.children.length > 1) {
                    recoveryEmailAddress.nextElementSibling.remove();
                };

                const verified = document.createElement('p');
                verified.innerHTML = "Verified.";
                recoveryEmailAddress.parentElement.appendChild(verified);

                recoveryEmailAddress.nextElementSibling.removeEventListener("click", recoveryEmailAddressVerify);
            };
        } else {
            if(recoveryEmailAddress.parentElement.children.length > 1) {
                recoveryEmailAddress.nextElementSibling.remove();
            };

            const verifyButton = document.createElement('button');
            verifyButton.classList.add('verify-button');
            verifyButton.innerHTML = "Verify";
            verifyButton.disabled = true;
            recoveryEmailAddress.parentElement.appendChild(verifyButton);

            recoveryEmailAddress.nextElementSibling.addEventListener("click", recoveryEmailAddressVerify);
        };
    
    };

    recoveryEmailAddress.addEventListener("input", recoveryEmailAddressChange);

        //  .
    async function recoveryEmailAddressVerify() {
        const typeEmailAddress = "Recovery";
        const oldEmailAddressInput = userData.userInformation[0].recovery_email_address;
        const newEmailAddressInput = recoveryEmailAddress.value;
    
        const response = await fetch('https://dt-comia-realty-and-marketing-production.up.railway.app/verify-new-email-address', {
            method: 'POST',
            headers: {                    
                        'User-Agent': 'undici-stream-example',
                        'Content-Type': 'application/json',
            },
            credentials: "include",
            body: JSON.stringify({typeEmailAddress,
                                  oldEmailAddressInput,
                                  newEmailAddressInput
                                }),
        });
        const recoveryEmailAddressData = await response.json();

        if(recoveryEmailAddressData.emailAddress != "EMAIL ADDRESS FOUND!") {
            recoveryEmailAddress.removeEventListener("mouseenter", validInputsMousEnter);
            recoveryEmailAddress.removeEventListener("mouseleave", validInputsMousEave);

            recoveryEmailAddress.style.backgroundColor = '#faebcf';
            recoveryEmailAddress.style.color = 'black';
            recoveryEmailAddress.style.border = 'solid red';
            recoveryEmailAddress.style.boxShadow = '0px 0px 10px red';
                    
            recoveryEmailAddress.addEventListener("mouseenter", invalidInputsMousEnter);
            recoveryEmailAddress.addEventListener("mouseleave", invalidInputsMousEave);

        };
        
        if(recoveryEmailAddressData.dateAttempted != undefined) {
            recoveryEmailAddress.nextElementSibling.remove();

            const timer = document.createElement('p');
            timer.innerHTML = "5 hours.";
            recoveryEmailAddress.parentElement.appendChild(timer);
        } else {
            recoveryEmailAddress.nextElementSibling.classList.remove('verify-button');
            recoveryEmailAddress.nextElementSibling.classList.add('resend-button');
            recoveryEmailAddress.nextElementSibling.innerHTML = "Resend";
        };
    };
};

userInformation().catch(console.error);

    //  .
function passwordChange() {
    if(oldPassword.value != "") { 
        oldPassword.removeEventListener("mouseenter", invalidInputsMousEnter);
        oldPassword.removeEventListener("mouseleave", invalidInputsMousEave);

        oldPassword.style.backgroundColor = 'transparent';
        oldPassword.style.borderColor = '#333333';
        oldPassword.style.transform = 'none';
        oldPassword.style.boxShadow = 'none';  
            
        oldPassword.addEventListener("mouseenter", validInputsMousEnter);
        oldPassword.addEventListener("mouseleave", validInputsMousEave);
    };

    if(newPassword.value != "") { 
        newPassword.removeEventListener("mouseenter", invalidInputsMousEnter);
        newPassword.removeEventListener("mouseleave", invalidInputsMousEave);

        newPassword.style.backgroundColor = 'transparent';
        newPassword.style.borderColor = '#333333';
        newPassword.style.transform = 'none';
        newPassword.style.boxShadow = 'none';  
            
        newPassword.addEventListener("mouseenter", validInputsMousEnter);
        newPassword.addEventListener("mouseleave", validInputsMousEave);
    };

    if(confirmPassword.value != "") { 
        confirmPassword.removeEventListener("mouseenter", invalidInputsMousEnter);
        confirmPassword.removeEventListener("mouseleave", invalidInputsMousEave);

        confirmPassword.style.backgroundColor = 'transparent';
        confirmPassword.style.borderColor = '#333333';
        confirmPassword.style.transform = 'none';
        confirmPassword.style.boxShadow = 'none';  
            
        confirmPassword.addEventListener("mouseenter", validInputsMousEnter);
        confirmPassword.addEventListener("mouseleave", validInputsMousEave);
    };

    if( 
        oldPassword.value != "" &&
        newPassword.value != "" &&
        confirmPassword.value != "") {
        updateButton.disabled = false;
    } else {
        updateButton.disabled = true;
    };
};

oldPassword.addEventListener("input", passwordChange);
newPassword.addEventListener("input", passwordChange);
confirmPassword.addEventListener("input", passwordChange);

    //  .
async function updateFunction() {
    const oldPasswordInput = oldPassword.value;
    const newPasswordInput = newPassword.value;
    const confirmPasswordInput = confirmPassword.value;

    const response = await fetch('https://dt-comia-realty-and-marketing-production.up.railway.app/profile-password-change', {
        method: 'POST',
        headers: {                    
                    'User-Agent': 'undici-stream-example',
                    'Content-Type': 'application/json',
        },
        credentials: "include",
        body: JSON.stringify({oldPasswordInput,
                              newPasswordInput,
                              confirmPasswordInput
                            }),
    });
    const data = await response.json();

    if(data.oldPassword != "OLD PASSWORD MATCHED!") {
        oldPassword.removeEventListener("mouseenter", validInputsMousEnter);
        oldPassword.removeEventListener("mouseleave", validInputsMousEave);

        oldPassword.style.backgroundColor = '#faebcf';
        oldPassword.style.color = 'black';
        oldPassword.style.border = 'solid red';
        oldPassword.style.boxShadow = '0px 0px 10px red';
                    
        oldPassword.addEventListener("mouseenter", invalidInputsMousEnter);
        oldPassword.addEventListener("mouseleave", invalidInputsMousEave);

    };

    if(data.newPassword != "NEW PASSWORD FOUND!") {
        newPassword.removeEventListener("mouseenter", validInputsMousEnter);
        newPassword.removeEventListener("mouseleave", validInputsMousEave);

        newPassword.style.backgroundColor = '#faebcf';
        newPassword.style.color = 'black';
        newPassword.style.border = 'solid red';
        newPassword.style.boxShadow = '0px 0px 10px red';
                    
        newPassword.addEventListener("mouseenter", invalidInputsMousEnter);
        newPassword.addEventListener("mouseleave", invalidInputsMousEave);

    };

    if(data.confirmPassword != "CONFIRM PASSWORD MATCHED!") {
        confirmPassword.removeEventListener("mouseenter", validInputsMousEnter);
        confirmPassword.removeEventListener("mouseleave", validInputsMousEave);

        confirmPassword.style.backgroundColor = '#faebcf';
        confirmPassword.style.color = 'black';
        confirmPassword.style.border = 'solid red';
        confirmPassword.style.boxShadow = '0px 0px 10px red';
                    
        confirmPassword.addEventListener("mouseenter", invalidInputsMousEnter);
        confirmPassword.addEventListener("mouseleave", invalidInputsMousEave);

    };
};

updateButton.addEventListener("click", updateFunction);
                
    //  HIDES DELETE MODAL.
function hideDeleteModal(e) {
    if(
        !deleteModal.contains(e.target) ||
        deleteCancel.contains(e.target)
    ) {
        deleteModal.style.display = 'none';
        termsCondition.checked = false;
        profileMainDiv.removeEventListener("click", hideDeleteModal);
        deleteButton.addEventListener("click", showDeleteModal);
    };

};

    //  SHOWS DELETE MODAL.
function showDeleteModal() {
    deleteModal.style.display = 'block';

        // DELAY LISTENER BY 10ms TO AVOID TRIGGERING hideDeleteModal IMMEDIATELY.
    setTimeout(function() {
        profileMainDiv.addEventListener("click", hideDeleteModal);
    }, 10);

    deleteButton.removeEventListener("click", showDeleteModal);
};

deleteButton.addEventListener("click", showDeleteModal);

    //  .
function termsConditionChange() {        
    if(
        termsCondition.checked == true
    ) {
        deleteContinue.disabled = false;
    } else {
        deleteContinue.disabled = true;
    };    
};

termsCondition.addEventListener("change", termsConditionChange);

    //  DELETE THE USER ACCOUNT.
async function deleteContinueFunction() {
    const response = await fetch('https://dt-comia-realty-and-marketing-production.up.railway.app/delete-account', {
        method: "GET",
        credentials: "include"
    });

    window.location = "./homePage.html";
};

deleteContinue.addEventListener("click", deleteContinueFunction);

    //  .
async function updateInfoFunction() {
    const userNameInput = userName.value;
    const firstNameInput = firstName.value;
    const lastNameInput = lastName.value;

    const response = await fetch('https://dt-comia-realty-and-marketing-production.up.railway.app/update-info', {
        method: 'POST',
        headers: {                    
                    'User-Agent': 'undici-stream-example',
                    'Content-Type': 'application/json',
        },
        credentials: "include",
        body: JSON.stringify({userNameInput,
                              firstNameInput,
                              lastNameInput
                            }),
    });
    const data = await response.json();

    if(data.userName != "USER NAME IS NOT IN USE!") {
        userName.removeEventListener("mouseenter", validInputsMousEnter);
        userName.removeEventListener("mouseleave", validInputsMousEave);

        userName.style.backgroundColor = '#faebcf';
        userName.style.color = 'black';
        userName.style.border = 'solid red';
        userName.style.boxShadow = '0px 0px 10px red';
                    
        userName.addEventListener("mouseenter", invalidInputsMousEnter);
        userName.addEventListener("mouseleave", invalidInputsMousEave);

    };
};

updateInfoButton.addEventListener("click", updateInfoFunction);