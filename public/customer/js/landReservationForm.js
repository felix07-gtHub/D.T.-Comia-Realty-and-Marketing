const fullName = document.querySelector('#landReservationForm input[name="Full name"]');
const contactNumber = document.querySelector('#landReservationForm input[name="Contact number"]');
const emailAddress = document.querySelector('#landReservationForm input[name="Email address"]');

const propertyName = document.querySelector('#landReservationForm input[name="Property name"]');
const locationPropertyDetails = document.querySelector('#landReservationForm input[name="Location"]');
const lotArea = document.querySelector('#landReservationForm input[name="Lot area"]');
const totalPrice = document.querySelector('#landReservationForm input[name="Total price"]');

const reservataionPeriodFrom = document.querySelector('#landReservationForm input[name="Reservation period from"]');
const reservataionPeriodTo = document.querySelector('#landReservationForm input[name="Reservation period to"]');

const termsCondition = document.querySelector('#landReservationForm input[name="Terms and conditions"]');

const finishReservation = document.querySelector('#landReservationForm button');

let propertyId = '';

if(window.location.search != '') {
        // Get query params from URL
    const params = new URLSearchParams(window.location.search);
    propertyId = params.get("propertyId");
};

    //  FUNCTION FOR PROPERTY INFORMATION.
async function propertyInformation() {
    const response = await fetch('https://dt-comia-realty-and-marketing-production.up.railway.app/property-information', {
        method: 'POST',
        headers: {
                    'User-Agent': 'undici-stream-example',
                    'Content-Type': 'application/json',
        },
        credentials: "include",
        body: JSON.stringify({propertyId}),
    });
    const data = await response.json();  

    if(data != "") {
        if(data.propertyInformation.length > 0) {
            propertyName.value = data.propertyInformation[0].address;
            locationPropertyDetails.value = data.propertyInformation[0].location;
            lotArea.value = data.propertyInformation[0].area; + "sq";
            totalPrice.value = '₱' + data.propertyInformation[0].price;

            const d = new Date();
            const dateReserved = d.getFullYear().toString().padStart(4, "0")  + '-' +
                                (d.getMonth() + 1).toString().padStart(2, "0")  + '-' +
                                d.getDate().toString().padStart(2, "0");

            reservataionPeriodFrom.value = dateReserved;
        } else { 
            //--DIRECT TO PREVIOUS PAGE--.

        };
        
    } else { 
        window.location = "./homePage.html";

    };
    
};

propertyInformation().catch(console.error);

    //  .
function inputChange() {
    if(contactNumber.value.length > 50) {
        contactNumber.value = contactNumber.value.substring(0, 50);

    };

    if(
        fullName.value != "" &&
        contactNumber.value != "" &&
        emailAddress.value != "" &&
        propertyName.value != "" &&
        locationPropertyDetails.value != "" &&
        lotArea.value != "" &&
        totalPrice.value != "" &&
        reservataionPeriodFrom.value != "" &&
        (
            reservataionPeriodTo.value != "" &&
            reservataionPeriodTo.value > reservataionPeriodFrom.value
        ) &&
        termsCondition.checked == true
    ) {
        finishReservation.disabled = false;
    } else {
        finishReservation.disabled = true;
    };

};

fullName.addEventListener("input", inputChange);
contactNumber.addEventListener("input", inputChange);
emailAddress.addEventListener("input", inputChange);
reservataionPeriodTo.addEventListener("input", inputChange);
termsCondition.addEventListener("change", inputChange);



    //  UPLOAD THE RESERVATION IF THE INPUTS ARE VALID.
async function finishReservationFunction() {
    const fullNameInput = fullName.value;
    const contactNumberInput = contactNumber.value.substring(0, 50);
    const emailAddressInput = emailAddress.value;

    const reservataionPeriodFromInput = reservataionPeriodFrom.value;
    const reservataionPeriodToInput = reservataionPeriodTo.value;

    const response = await fetch('https://dt-comia-realty-and-marketing-production.up.railway.app/reservation', {
        method: 'POST',
        headers: {                    
                    'User-Agent': 'undici-stream-example',
                    'Content-Type': 'application/json',
        },
        credentials: "include",
        body: JSON.stringify({fullNameInput,
                              contactNumberInput,
                              emailAddressInput,
                              propertyId,
                              reservataionPeriodFromInput,
                              reservataionPeriodToInput
        }),
    });
    
    fullName.value = "";
    contactNumber.value = "";
    emailAddress.value = "";
    reservataionPeriodTo.value = "";
    termsCondition.checked = false;

    finishReservation.disabled = true;

};

finishReservation.addEventListener("click", finishReservationFunction);