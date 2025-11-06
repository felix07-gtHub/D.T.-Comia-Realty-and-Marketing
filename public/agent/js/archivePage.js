    //  .
async function allReservationListings() {  
    const response = await fetch('http://https://dt-comia-realty-and-marketing-production.up.railway.app.0.0.1:3000/all-reservation-listings', {
        method: 'GET',
        credentials: "include",
    });
    const data = await response.json();

    const listings = document.querySelector('#reservationPeriod > div:nth-child(3) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div > h3');

        //  CLEAR THE #listings BEFORE DISPLAYING THE UPDATED PROPERTY LISTINGS.
    listings.innerHTML = data.allReservationListings.length;

};

allReservationListings().catch(console.error);

    //  .
async function onGoingReservationListings() {  
    const response = await fetch('http://https://dt-comia-realty-and-marketing-production.up.railway.app.0.0.1:3000/on-going-reservation-listings', {
        method: 'GET',
        credentials: "include",
    });
    const data = await response.json();

    const listings = document.querySelector('#reservationPeriod > div:nth-child(3) > div:nth-child(2) > div:nth-child(1) > div:nth-child(2) > div > h3');

        //  CLEAR THE #listings BEFORE DISPLAYING THE UPDATED PROPERTY LISTINGS.
    listings.innerHTML = data.onGoingReservationListings.length;

};

onGoingReservationListings().catch(console.error);

    //  .
async function completedReservationListings() {  
    const response = await fetch('http://https://dt-comia-realty-and-marketing-production.up.railway.app.0.0.1:3000/completed-reservation-listings', {
        method: 'GET',
        credentials: "include",
    });
    const data = await response.json();

    const listings = document.querySelector('#reservationPeriod > div:nth-child(3) > div:nth-child(2) > div:nth-child(1) > div:nth-child(3) > div > h3');

        //  CLEAR THE #listings BEFORE DISPLAYING THE UPDATED PROPERTY LISTINGS.
    listings.innerHTML = data.completedReservationListings.length;

};

completedReservationListings().catch(console.error);

    //  .
async function cancelledReservationListings() {  
    const response = await fetch('http://https://dt-comia-realty-and-marketing-production.up.railway.app.0.0.1:3000/cancelled-reservation-listings', {
        method: 'GET',
        credentials: "include",
    });
    const data = await response.json();

    const listings = document.querySelector('#reservationPeriod > div:nth-child(3) > div:nth-child(2) > div:nth-child(1) > div:nth-child(4) > div > h3');

        //  CLEAR THE #listings BEFORE DISPLAYING THE UPDATED PROPERTY LISTINGS.
    listings.innerHTML = data.cancelledReservationListings.length;

};

cancelledReservationListings().catch(console.error);

    //  INITIALIZE VALUES.
let orderByInput = "number";
let orderInput = "ASC"

function orderByFunction(e) {
    if(e.target.value != "") {
        if(orderByInput != e.target.value) {
            orderInput = "ASC";
        } else {
            if(orderInput == "ASC") {
                orderInput = "DESC";
            } else {
                orderInput = "ASC";
            };
        };

        orderByInput = e.target.value;
        archiveListings().catch(console.error);

    };

};

document.querySelector('#reservationPeriod > div:nth-child(3) > div:nth-child(2) > div:nth-child(3) > div:nth-child(2) > .reservation').addEventListener("click", orderByFunction);

    //  INITIALIZE VALUES.
let searchInput = "";

function searchInputFunction() {
    searchInput = document.querySelector('#reservationPeriod > div:nth-child(3) > div:nth-child(2) > div:nth-child(3) > div:nth-child(1) > div:hover > input[name="Search input"]').value;
    archiveListings().catch(console.error);

};

document.querySelector('#reservationPeriod > div:nth-child(3) > div:nth-child(2) > div:nth-child(3) > div:nth-child(1) > div > input[name="Search input"]').addEventListener("input", searchInputFunction);

    //  INITIALIZE VALUES.
let pageNumberInput = 0;

    //  .
async function archiveListings() {      
    const response = await fetch('http://https://dt-comia-realty-and-marketing-production.up.railway.app.0.0.1:3000/archive-listings', {
        method: 'POST',
        headers: {                    
                    'User-Agent': 'undici-stream-example',
                    'Content-Type': 'application/json',
        },
        credentials: "include",
        body: JSON.stringify({orderByInput,
                              orderInput,
                              searchInput,
                              pageNumberInput
        }),
    });
    const data = await response.json();

    const listings = document.querySelector('#archiveListings');

        //  CLEAR THE #listings BEFORE DISPLAYING THE UPDATED PROPERTY LISTINGS.
    listings.innerHTML = "";

    for (let i = 0; i < data.archiveListings.length; i++) {
        const reservation = document.createElement('div');
        const no = document.createElement('p');
        const name = document.createElement('textarea');
        const contactNo = document.createElement('textarea');
        const property = document.createElement('textarea');
        const reservedFrom = document.createElement('textarea');
        const reservedUntil = document.createElement('textarea');
        const status = document.createElement('p');
        const unarchive = document.createElement('input');

        reservation.classList.add('reservation');
    
        if((i + 1) % 2 != 0) {
            reservation.style.backgroundColor = '#f2f2f2';

        };

        no.innerHTML = data.archiveListings[i].number;
        name.name = "Name";
        name.disabled = true;
        name.maxLength = "50";
        name.value = data.archiveListings[i].full_name;
        name.maxLength = "50";
        contactNo.name = "Contact no";
        contactNo.disabled = true;
        contactNo.maxLength = "50";
        contactNo.value = data.archiveListings[i].contact_number;
        property.name = "Property";
        property.disabled = true;
        property.value = data.archiveListings[i].property;

    

        reservedFrom.name = "Reserved from";
        reservedFrom.disabled = true;
        reservedFrom.placeholder = "[MNTH] [DAY], [YEAR]"
        reservedFrom.value = new Date(data.archiveListings[i].reservation_period_from).toDateString().split(" ")[1] + ' ' +
                             new Date(data.archiveListings[i].reservation_period_from).toDateString().split(" ")[2] + ", " +
                             new Date(data.archiveListings[i].reservation_period_from).toDateString().split(" ")[3];
        reservedUntil.name = "Reserved until";
        reservedUntil.disabled = true;
        reservedUntil.placeholder = "[MNTH] [DAY], [YEAR]"
        reservedUntil.value = new Date(data.archiveListings[i].reservation_period_to).toDateString().split(" ")[1] + ' ' +
                              new Date(data.archiveListings[i].reservation_period_to).toDateString().split(" ")[2] + ", " +
                              new Date(data.archiveListings[i].reservation_period_to).toDateString().split(" ")[3];

        
        status.innerHTML = data.archiveListings[i].status;

        if(
            data.archiveListings[i].status != "On Going" &&
            data.archiveListings[i].status != "Completed"
        ) {
            status.style.backgroundColor = '#ff7d7d';
            status.style.color = '#560216';

        } else {
            if(data.archiveListings[i].status != "On Going") {
                status.style.backgroundColor = '#bfecac';
                status.style.color = '#667538';

            } else {
                status.style.backgroundColor = '#fff27d';
                status.style.color = '#ab9047';

            };

        };

        unarchive.type = "image";
        unarchive.name = "Unarchive";
        unarchive.src = "https://niwxujzmwpdhegjlmyfw.supabase.co/storage/v1/object/public/D.T.%20Comia%20Realty%20and%20Marketing/AGENT ICONS/unarchive.png";
        unarchive.alt = "Unarchive icon";

        listings.appendChild(reservation)
        reservation.appendChild(no);
        reservation.appendChild(name);
        reservation.appendChild(contactNo);
        reservation.appendChild(property);
        reservation.appendChild(reservedFrom);
        reservation.appendChild(reservedUntil);
        reservation.appendChild(status);
        reservation.appendChild(unarchive);

            //  REMOVE FROM ARCHIVE LIST.
        async function removeFromArchiveList() {
            const reservationIdInput = data.archiveListings[i].reservation_id;

            const response = await fetch('http://https://dt-comia-realty-and-marketing-production.up.railway.app.0.0.1:3000/reservation-unarchive', {
                method: 'POST',
                headers: {                
                            'User-Agent': 'undici-stream-example',
                            'Content-Type': 'application/json'
                },
                credentials: "include",
                body: JSON.stringify({reservationIdInput}),
            });

            archiveListings().catch(console.error);

        };

        unarchive.addEventListener("click", removeFromArchiveList);

    };

};

archiveListings().catch(console.error);
            

            

    //  .
async function pageNumbers() {  
    const response = await fetch('http://https://dt-comia-realty-and-marketing-production.up.railway.app.0.0.1:3000/all-reservation-listings', {
        method: 'GET',
        credentials: "include",
    });
    const data = await response.json();

    const listings = document.querySelector('#pages');

        //  CLEAR THE #listings BEFORE DISPLAYING THE UPDATED PROPERTY LISTINGS.
    listings.innerHTML = "";

        //  INITIALIZE THE VALUE FOR pageNumberCount.
    let pageNumberCount = 0;

    for (let i = 0; i < data.allReservationListings.length; i++) {

            //  IF EITHER OF IMAGE_1... AREN'T EMPTY,
            //  UPADTES THE pageNumberCount VALUE,
            //  CREATES IMAGE ELEMENTS,
            //  DISPLAYS FETCHED IMAGE FROM DATABASE
            //  AND ADDS TO DIV ELEMENT.
        if(i % 10 == 0) {
            pageNumberCount++;

            const pageNumberDiv = document.createElement('div');
            const pageNumber = document.createElement('button');

            pageNumber.innerHTML = pageNumberCount;
            
            listings.appendChild(pageNumberDiv);
            pageNumberDiv.appendChild(pageNumber);

                //  PAGE NUMBER FUNCTION.
            function pageNumberFunction() {
                pageNumberInput = (parseInt(pageNumber.innerHTML) - 1) * 10;
                archiveListings().catch(console.error);
            }

            pageNumber.addEventListener("click", pageNumberFunction);   

        };

    };



        // INITIALLY ADDS 100% TRANSLATE TO ITS TRANSFORM.
    let translateCarousel = 0;

    if(pageNumberCount > 3) {
        const backButton = document.querySelector('#backIcon');
        const nextButton = document.querySelector('#nextIcon');

        nextButton.style.display = 'block';


            // BACK BUTTON FUNCTION.
        function previousPage() {
            translateCarousel++;
                    
            if(translateCarousel <= 0) { 
                carousel(translateCarousel);
            } else {
                translateCarousel--;
            };
        };

        backButton.addEventListener("click", previousPage);

            // NEXT BUTTON FUNCTION.
        function nextPage() {
            translateCarousel--;
                    
            if(translateCarousel >= - (Math.trunc(pageNumberCount / 3))) {   
                carousel(translateCarousel);
            } else {
                translateCarousel++;
            };
        };

        nextButton.addEventListener("click", nextPage);

        function carousel(translateValue) {                
                // EVERY RUN ADDS A 100% TRANSLATE TO ITS TRANSFORM TO MOVE IT MORE TO THE LEFT SHOWING ANOTHER IMAGE.
                // VALUE OF TRANSLATE EQAUL TO INDEX OF IMAGE SHOWING.
            for(let j = 0; j < pageNumberCount; j++) {
                listings.children[j].style.transform = 'translate(' + translateValue * 100 + '%, 0)';
            };

            if(translateValue < 0) {
                backButton.style.display = 'block';
            } else {
                backButton.style.display = 'none';
            }

            if(translateValue > - (Math.trunc(pageNumberCount / 3))) {   
                nextButton.style.display = 'block';
            } else {
                nextButton.style.display = 'none';
            };
        };     
        
    };

};

pageNumbers().catch(console.error);