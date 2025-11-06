    //  .
async function allReservationListings() {  
    const response = await fetch('https://dt-comia-realty-and-marketing-production.up.railway.app/all-reservation-listings', {
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
    const response = await fetch('https://dt-comia-realty-and-marketing-production.up.railway.app/on-going-reservation-listings', {
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
    const response = await fetch('https://dt-comia-realty-and-marketing-production.up.railway.app/completed-reservation-listings', {
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
    const response = await fetch('https://dt-comia-realty-and-marketing-production.up.railway.app/cancelled-reservation-listings', {
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
        reservationListings().catch(console.error);

    };

};

document.querySelector('#reservationPeriod > div:nth-child(3) > div:nth-child(2) > div:nth-child(3) > div:nth-child(2) > .reservation').addEventListener("click", orderByFunction);

    //  INITIALIZE VALUES.
let searchInput = "";

function searchInputFunction() {
    searchInput = document.querySelector('#reservationPeriod > div:nth-child(3) > div:nth-child(2) > div:nth-child(3) > div:nth-child(1) > div:hover > input[name="Search input"]').value;
    reservationListings().catch(console.error);

};

document.querySelector('#reservationPeriod > div:nth-child(3) > div:nth-child(2) > div:nth-child(3) > div:nth-child(1) > div > input[name="Search input"]').addEventListener("input", searchInputFunction);

    //  INITIALIZE VALUES.
let pageNumberInput = 0;

    //  .
async function reservationListings() {      
    const response = await fetch('https://dt-comia-realty-and-marketing-production.up.railway.app/reservation-listings', {
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

    const listings = document.querySelector('#reservationListings');

        //  CLEAR THE #listings BEFORE DISPLAYING THE UPDATED PROPERTY LISTINGS.
    listings.innerHTML = "";

    for (let i = 0; i < data.reservationListings.length; i++) {
        const reservation = document.createElement('div');
        const no = document.createElement('p');
        const name = document.createElement('textarea');
        const contactNo = document.createElement('textarea');
        const property = document.createElement('textarea');
        const reservedFrom = document.createElement('textarea');
        const reservedUntil = document.createElement('textarea');
        const status = document.createElement('p');
        const action = document.createElement('input');

        reservation.classList.add('reservation');
    
        if((i + 1) % 2 != 0) {
            reservation.style.backgroundColor = '#f2f2f2';

        };

        no.innerHTML = data.reservationListings[i].number;
        name.name = "Name";
        name.disabled = true;
        name.maxLength = "50";
        name.value = data.reservationListings[i].full_name;
        name.maxLength = "50";
        contactNo.name = "Contact no";
        contactNo.disabled = true;
        contactNo.maxLength = "50";
        contactNo.value = data.reservationListings[i].contact_number;
        property.name = "Property";
        property.disabled = true;
        property.value = data.reservationListings[i].property;

    

        reservedFrom.name = "Reserved from";
        reservedFrom.disabled = true;
        reservedFrom.placeholder = "[MNTH] [DAY], [YEAR]"
        reservedFrom.value = new Date(data.reservationListings[i].reservation_period_from).toDateString().split(" ")[1] + ' ' +
                             new Date(data.reservationListings[i].reservation_period_from).toDateString().split(" ")[2] + ", " +
                             new Date(data.reservationListings[i].reservation_period_from).toDateString().split(" ")[3];
        reservedUntil.name = "Reserved until";
        reservedUntil.disabled = true;
        reservedUntil.placeholder = "[MNTH] [DAY], [YEAR]"
        reservedUntil.value = new Date(data.reservationListings[i].reservation_period_to).toDateString().split(" ")[1] + ' ' +
                              new Date(data.reservationListings[i].reservation_period_to).toDateString().split(" ")[2] + ", " +
                              new Date(data.reservationListings[i].reservation_period_to).toDateString().split(" ")[3];

        
        status.innerHTML = data.reservationListings[i].status;

        if(
            data.reservationListings[i].status != "On Going" &&
            data.reservationListings[i].status != "Completed"
        ) {
            status.style.backgroundColor = '#ff7d7d';
            status.style.color = '#560216';

        } else {
            if(data.reservationListings[i].status != "On Going") {
                status.style.backgroundColor = '#bfecac';
                status.style.color = '#667538';

            } else {
                status.style.backgroundColor = '#fff27d';
                status.style.color = '#ab9047';

            };

        };

        action.type = "image";
        action.name = "Action";
        action.src = "https://niwxujzmwpdhegjlmyfw.supabase.co/storage/v1/object/public/D.T.%20Comia%20Realty%20and%20Marketing/AGENT ICONS/new action.png";
        action.alt = "Action icon";

        listings.appendChild(reservation)
        reservation.appendChild(no);
        reservation.appendChild(name);
        reservation.appendChild(contactNo);
        reservation.appendChild(property);
        reservation.appendChild(reservedFrom);
        reservation.appendChild(reservedUntil);
        reservation.appendChild(status);
        reservation.appendChild(action);
            
            //  FUNCTION FOR ACTION OPTION mouseenter.
        function actionOptionMousEnter(e) {
            e.target.style.backgroundColor = '#ffffff';
            e.target.style.color = '#000000';

        };

            //  FUNCTION FOR ACTION OPTION mouseleave.
        function actionOptionMousEave(e) {
            e.target.style.backgroundColor = 'transparent';
            e.target.style.color = '#2b2b2b';

        };
            
            //  FUNCTION FOR STATUS OPTION mouseenter.
        function statusOptionMousEnter(e) {
            e.target.style.backgroundColor = '#e5e5e5';

        };

            //  FUNCTION FOR STATUS OPTION mouseleave.
        function statusOptionMousEave(e) {
            e.target.style.backgroundColor = 'transparent';

        };

        const actionDropDown = document.createElement('div');
        const actionUl = document.createElement('ul');
        const actionEditInfo = document.createElement('li');
        const actionStatus = document.createElement('li');
        const statusDropDown = document.createElement('div');
        const statusUl = document.createElement('ul');
        const onGoing = document.createElement('li');
        const completed = document.createElement('li');
        const cancelled = document.createElement('li');
        const cancelTourDropDown = document.createElement('div');
        const cancelTourUl = document.createElement('ul');
        const cancelTourH4 = document.createElement('h4');
        const noResponseFromBuyer = document.createElement('label');
        const noResponseFromBuyerLi = document.createElement('li');
        const noResponseFromBuyerRadio = document.createElement('input');
        const noResponseFromBuyerP = document.createElement('p');
        const buyerBackedOff = document.createElement('label');
        const buyerBackedOffLi = document.createElement('li');
        const buyerBackedOffRadio = document.createElement('input');
        const buyerBackedOffP = document.createElement('p');
        const other = document.createElement('label');
        const otherLi = document.createElement('li');
        const otherRadio = document.createElement('input');
        const otherP = document.createElement('p');
        const otherText = document.createElement('input');
        const cancelTourCancel = document.createElement('button');
        const cancelTourConfirm = document.createElement('button');
        const actionArchiveFromList = document.createElement('li');
        const actionAddNote = document.createElement('li');
        const addNoteDropDown = document.createElement('div');
        const addNoteTextarea = document.createElement('textarea');
        const addNoteSave = document.createElement('button');

        actionDropDown.id = "action";
        actionEditInfo.innerHTML = "Edit Info";
        actionEditInfo.addEventListener("mouseenter", actionOptionMousEnter);
        actionEditInfo.addEventListener("mouseleave", actionOptionMousEave);
        actionStatus.innerHTML = "Status";
        actionStatus.addEventListener("mouseenter", actionOptionMousEnter);
        actionStatus.addEventListener("mouseleave", actionOptionMousEave);
        statusDropDown.classList.add('subDropDown');
        onGoing.innerHTML = "On Going";
        onGoing.addEventListener("mouseenter", statusOptionMousEnter);
        onGoing.addEventListener("mouseleave", statusOptionMousEave);
        completed.innerHTML = "Completed";
        completed.addEventListener("mouseenter", statusOptionMousEnter);
        completed.addEventListener("mouseleave", statusOptionMousEave);
        cancelled.innerHTML = "Cancelled";
        cancelled.addEventListener("mouseenter", statusOptionMousEnter);
        cancelled.addEventListener("mouseleave", statusOptionMousEave);
        cancelTourDropDown.classList.add('subDropDown');
        cancelTourH4.innerHTML = "Reason for canceling";
        noResponseFromBuyer.htmlFor = "noResponseFromBuyer";
        noResponseFromBuyerP.innerHTML = "No reponse from the buyer";
        noResponseFromBuyerRadio.type = "radio";
        noResponseFromBuyerRadio.name = "Cancel tour"
        noResponseFromBuyerRadio.id = "noResponseFromBuyer";
        noResponseFromBuyerRadio.value = "No response from buyer";        
        buyerBackedOff.htmlFor = "buyerBackedOff";
        buyerBackedOffP.innerHTML = "Buyer backed off"
        buyerBackedOffRadio.type = "radio";
        buyerBackedOffRadio.name = "Cancel tour"
        buyerBackedOffRadio.id = "buyerBackedOff";
        buyerBackedOffRadio.value = "Buyer backed off";        
        other.htmlFor = "other";
        otherP.innerHTML = "Other:";
        otherRadio.type = "radio";
        otherRadio.name = "Cancel tour"
        otherRadio.id = "other";
        otherRadio.value = "Other";
        otherText.type = "text";
        otherText.name = "other";
        otherText.disabled = true;

        if(
            data.reservationListings[i].status != "On Going" &&
            data.reservationListings[i].status != "Completed"
        ) {
           otherText.value = data.reservationListings[i].reason_for_cancelling;

        };

        cancelTourCancel.innerHTML = "Cancel";
        cancelTourConfirm.disabled = true;
        cancelTourConfirm.innerHTML = "Confirm";
        actionArchiveFromList.innerHTML = "Archive from List";
        actionArchiveFromList.addEventListener("mouseenter", actionOptionMousEnter);
        actionArchiveFromList.addEventListener("mouseleave", actionOptionMousEave);
        actionAddNote.innerHTML = "Add Note";
        actionAddNote.addEventListener("mouseenter", actionOptionMousEnter);
        actionAddNote.addEventListener("mouseleave", actionOptionMousEave);
        addNoteDropDown.classList.add('subDropDown');
        addNoteTextarea.name = "Add note";
        addNoteTextarea.placeholder = "Type something...";
        addNoteTextarea.value = data.reservationListings[i].note;
        addNoteSave.innerHTML = "Save";

        listings.appendChild(actionDropDown);
        actionDropDown.appendChild(actionUl);
        actionUl.appendChild(actionEditInfo);
        actionUl.appendChild(actionStatus);
        actionUl.appendChild(statusDropDown);
        statusDropDown.appendChild(statusUl);
        statusUl.appendChild(onGoing);
        statusUl.appendChild(completed);
        statusUl.appendChild(cancelled);
        statusUl.appendChild(cancelTourDropDown);
        cancelTourDropDown.appendChild(cancelTourUl);
        cancelTourUl.appendChild(cancelTourH4);
        cancelTourUl.appendChild(noResponseFromBuyer);
        noResponseFromBuyer.appendChild(noResponseFromBuyerLi);
        noResponseFromBuyerLi.appendChild(noResponseFromBuyerRadio);
        noResponseFromBuyerLi.appendChild(noResponseFromBuyerP);
        cancelTourUl.appendChild(buyerBackedOff);
        buyerBackedOff.appendChild(buyerBackedOffLi);
        buyerBackedOffLi.appendChild(buyerBackedOffRadio);
        buyerBackedOffLi.appendChild(buyerBackedOffP);
        cancelTourUl.appendChild(other);
        other.appendChild(otherLi);
        otherLi.appendChild(otherRadio);
        otherLi.appendChild(otherP);
        otherLi.appendChild(otherText);
        cancelTourDropDown.appendChild(cancelTourCancel);
        cancelTourDropDown.appendChild(cancelTourConfirm);
        actionUl.appendChild(actionArchiveFromList);
        actionUl.appendChild(actionAddNote);
        actionUl.appendChild(addNoteDropDown);
        addNoteDropDown.appendChild(addNoteTextarea);
        addNoteDropDown.appendChild(addNoteSave);

            //  HIDES ACTION DROP-DOWN.
        function hideActionDropDown(e) {        
            const titleBar = document.querySelector('#reservationPeriod > h1:nth-child(1)');
            const burgerBtn = document.querySelector('.burger-btn');
            const sidePanel = document.querySelector('.side-panel');
            
                //  HIDES THE ACTION CHOCIES UNLESS Action icon WERE CLICKED.
            if(!titleBar.contains(e.target) &&
               !burgerBtn.contains(e.target) &&
               !sidePanel.contains(e.target) &&
               !actionDropDown.contains(e.target)) {
                actionDropDown.style.display = 'none';

                actionStatus.addEventListener("mouseleave", actionOptionMousEave);
                actionStatus.style.backgroundColor = 'transparent';
                actionStatus.style.color = '#2b2b2b';
                statusDropDown.style.display = 'none';
                cancelled.addEventListener("mouseleave", statusOptionMousEave);
                cancelled.style.backgroundColor = 'transparent';
                cancelTourDropDown.style.display = 'none';
                noResponseFromBuyerRadio.checked = false;
                buyerBackedOffRadio.checked = false;
                otherRadio.checked = false;
                otherText.disabled = true;

                if(
                    data.reservationListings[i].status != "On Going" &&
                    data.reservationListings[i].status != "Completed"
                ) {
                    otherText.value = data.reservationListings[i].status;

                } else {
                    otherText.value = "";

                };
                
                cancelTourConfirm.disabled = true;
                actionAddNote.addEventListener("mouseleave", actionOptionMousEave);
                actionAddNote.style.backgroundColor = 'transparent';
                actionAddNote.style.color = '#2b2b2b';
                addNoteDropDown.style.display = 'none';
                
                document.body.removeEventListener("click", hideActionDropDown);
                action.addEventListener("click", showActionDropDown);
            
            };

        };

            //  SHOWS ACTION DROP-DOWN.
        function showActionDropDown() {
            actionDropDown.style.display = 'block';

                // DELAY LISTENER BY 10ms TO AVOID TRIGGERING hideActionDropDown IMMEDIATELY.
            setTimeout(function() {
                document.body.addEventListener("click", hideActionDropDown);

            }, 10);

            action.removeEventListener("click", showActionDropDown);

        };

        action.addEventListener("click", showActionDropDown);

            //  ENABLE EDIT INFO.
        async function enableEditInfo () {
            actionStatus.addEventListener("mouseleave", actionOptionMousEave);
            actionStatus.style.backgroundColor = 'transparent';
            actionStatus.style.color = '#2b2b2b';
            statusDropDown.style.display = 'none';
            cancelled.addEventListener("mouseleave", statusOptionMousEave);
            cancelled.style.backgroundColor = 'transparent';
            cancelTourDropDown.style.display = 'none';
            noResponseFromBuyerRadio.checked = false;
            buyerBackedOffRadio.checked = false;
            otherRadio.checked = false;
            otherText.disabled = true;

            if(
                data.reservationListings[i].status != "On Going" &&
                data.reservationListings[i].status != "Completed"
            ) {
                otherText.value = data.reservationListings[i].status;

            } else {
                otherText.value = "";

            };

            cancelTourConfirm.disabled = true;
            actionAddNote.addEventListener("mouseleave", actionOptionMousEave);
            actionAddNote.style.backgroundColor = 'transparent';
            actionAddNote.style.color = '#2b2b2b';
            addNoteDropDown.style.display = 'none';
            
            if(actionEditInfo.innerHTML != "Edit Info") { 
                if(new Date(reservedUntil.value) != "Invalid Date") {
                    const reservationIdInput = data.reservationListings[i].reservation_id;
                    const nameInput = name.value;
                    const contactNoInput = contactNo.value;
                    const reservedUntilInput = reservedUntil.value;

                    const response = await fetch('https://dt-comia-realty-and-marketing-production.up.railway.app/edit-info', {
                    method: 'POST',
                    headers: {                
                                'User-Agent': 'undici-stream-example',
                                'Content-Type': 'application/json'
                    },
                    credentials: "include",
                    body: JSON.stringify({reservationIdInput,
                                          nameInput,
                                          contactNoInput,
                                          reservedUntilInput
                                        }),
                    });

                };

                reservationListings().catch(console.error);

            } else {
                actionEditInfo.innerHTML = "Save";
                actionStatus.style.color = '#00000099';
                actionStatus.removeEventListener("mouseenter", actionOptionMousEnter);
                actionStatus.removeEventListener("mouseleave", actionOptionMousEave);
                actionStatus.removeEventListener("click", showStatusDropDown);
                actionArchiveFromList.style.color = '#00000099';
                actionArchiveFromList.removeEventListener("mouseenter", actionOptionMousEnter);
                actionArchiveFromList.removeEventListener("mouseleave", actionOptionMousEave);
                actionArchiveFromList.removeEventListener("click", addToArchiveList);
                actionAddNote.style.color = '#00000099';
                actionAddNote.removeEventListener("mouseenter", actionOptionMousEnter);
                actionAddNote.removeEventListener("mouseleave", actionOptionMousEave);
                actionAddNote.removeEventListener("click", showAddNoteDropDown);

                name.disabled = false;
                name.style.border = 'solid 2px';
                name.style.borderRadius = '2.5px';
                name.style.backgroundColor = '#ffffff';
                contactNo.disabled = false;
                contactNo.style.border = 'solid 2px';
                contactNo.style.borderRadius = '2.5px';
                contactNo.backgroundColor = '#ffffff';
                reservedUntil.disabled = false;
                reservedUntil.style.border = 'solid 2px';
                reservedUntil.style.borderRadius = '2.5px';
                reservedUntil.backgroundColor = '#ffffff';

                for(let j = 0; j < listings.children.length; j++) {
                    if(
                        listings.children[j].children[1].disabled == true ||
                        listings.children[j].children[2].disabled == true ||
                        listings.children[j].children[5].disabled == true
                    ) {
                        listings.children[j].children[7].disabled = true;

                    };

                    j += 1;

                };                
                
            };

            actionDropDown.style.display = 'none';

            document.body.removeEventListener("click", hideActionDropDown);
            action.addEventListener("click", showActionDropDown);

        };

        actionEditInfo.addEventListener("click", enableEditInfo);

            //  SHOWS STATUS DROP-DOWN.
        function showStatusDropDown() {
            actionEditInfo.addEventListener("mouseleave", actionOptionMousEave);
            actionEditInfo.style.backgroundColor = 'transparent';
            actionEditInfo.style.color = '#2b2b2b';
                
            actionAddNote.addEventListener("mouseleave", actionOptionMousEave);
            actionAddNote.style.backgroundColor = 'transparent';
            actionAddNote.style.color = '#2b2b2b';
            addNoteDropDown.style.display = 'none';
            
            actionStatus.removeEventListener("mouseleave", actionOptionMousEave);
            actionStatus.style.backgroundColor = '#ffffff';
            actionStatus.style.color = '#000000';
            statusDropDown.style.display = 'block';

        };

        actionStatus.addEventListener("click", showStatusDropDown);

            //  CHANGE STATUS.
        async function changeStatus (e) {
            const agentIdInput = data.reservationListings[i].agent_id;
            const propertyIdInput = data.reservationListings[i].property_id;
            const reservationIdInput = data.reservationListings[i].reservation_id;
            const statusInput = e.target.innerHTML;

            if(statusInput != "Cancelled") {
                const reasonCancellingInput = null;

                const response = await fetch('https://dt-comia-realty-and-marketing-production.up.railway.app/change-status', {
                    method: 'POST',
                    headers: {                
                                'User-Agent': 'undici-stream-example',
                                'Content-Type': 'application/json'
                    },
                    credentials: "include",
                    body: JSON.stringify({agentIdInput,
                                          propertyIdInput,
                                          reservationIdInput,
                                          statusInput,
                                          reasonCancellingInput
                                        }),
                });

                reservationListings().catch(console.error);

            } else {
                cancelled.removeEventListener("mouseleave", statusOptionMousEave);
                cancelled.style.backgroundColor = '#e5e5e5';
                cancelTourDropDown.style.display = 'block';

                    //  ENABLE CONFIRM.
                async function enableConfirm (e) {
                    if(e.target.parentElement.children.length != 3) {
                        otherText.disabled = true;
                        cancelTourConfirm.disabled = false;

                    } else {
                        otherText.disabled = false;
                    
                        if(e.target.parentElement.children[2].value != "") {
                            cancelTourConfirm.disabled = false;
                        
                        } else {
                            cancelTourConfirm.disabled = true;

                        };

                    };
                
                };

                noResponseFromBuyer.addEventListener("click", enableConfirm);
                buyerBackedOff.addEventListener("click", enableConfirm);
                other.addEventListener("click", enableConfirm);
                        
                    //  IF otherText INPUT ARE EMPTY THE cancelTourConfirm DISABLED.
                function inputChange() {
                    if(otherText.value != "") {
                        cancelTourConfirm.disabled = false;

                    } else {
                        cancelTourConfirm.disabled = true;

                    };

                };
            
                otherText.addEventListener("input", inputChange);

                    //  CANCEL CANCEL TOUR.
                async function cancelCancelTour (e) {
                    cancelTourDropDown.style.display = 'none';
                    cancelled.addEventListener("mouseleave", statusOptionMousEave);
                    cancelled.style.backgroundColor = 'transparent';
                    cancelTourDropDown.style.display = 'none';
                    noResponseFromBuyerRadio.checked = false;
                    buyerBackedOffRadio.checked = false;
                    otherRadio.checked = false;
                    otherText.disabled = true;

                    if(
                        data.reservationListings[i].status != "On Going" &&
                        data.reservationListings[i].status != "Completed"
                    ) {
                        otherText.value = data.reservationListings[i].status;

                    } else {
                        otherText.value = "";

                    };
            
                    cancelTourConfirm.disabled = true;

                };

                cancelTourCancel.addEventListener("click", cancelCancelTour);

                    //  CONFIRM TOUR.
                async function confirmTour() {
                        for(let j = 1; j < cancelTourUl.children.length; j++) {
                            if(cancelTourUl.children[j].children[0].children[0].checked == true) {
                                if(cancelTourUl.children[j].children[0].children[0].value != "Other") {
                                    const reasonCancellingInput = cancelTourUl.children[j].children[0].children[0].value;

                                    const response = await fetch('https://dt-comia-realty-and-marketing-production.up.railway.app/change-status', {
                                        method: 'POST',
                                        headers: {                
                                                    'User-Agent': 'undici-stream-example',
                                                    'Content-Type': 'application/json'
                                        },
                                        credentials: "include",
                                        body: JSON.stringify({agentIdInput,
                                                              propertyIdInput,
                                                              reservationIdInput,
                                                              statusInput,
                                                              reasonCancellingInput
                                                            }),
                                    });

                                    reservationListings().catch(console.error);

                                } else {
                                    const reasonCancellingInput = cancelTourUl.children[j].children[0].children[2].value;

                                    const response = await fetch('https://dt-comia-realty-and-marketing-production.up.railway.app/change-status', {
                                        method: 'POST',
                                        headers: {                
                                                    'User-Agent': 'undici-stream-example',
                                                    'Content-Type': 'application/json'
                                        },
                                        credentials: "include",
                                        body: JSON.stringify({agentIdInput,
                                                              propertyIdInput,
                                                              reservationIdInput,
                                                              statusInput,
                                                              reasonCancellingInput
                                                            }),
                                    });

                                    reservationListings().catch(console.error);

                                };

                            };

                        };

                };

                cancelTourConfirm.addEventListener("click", confirmTour);

            };

        };

        onGoing.addEventListener("click", changeStatus);
        completed.addEventListener("click", changeStatus);
        cancelled.addEventListener("click", changeStatus);

            //  ADD TO ARCHIVE LIST.
        async function addToArchiveList() {
            const reservationIdInput = data.reservationListings[i].reservation_id;

            const response = await fetch('https://dt-comia-realty-and-marketing-production.up.railway.app/reservation-archive', {
                method: 'POST',
                headers: {                
                            'User-Agent': 'undici-stream-example',
                            'Content-Type': 'application/json'
                },
                credentials: "include",
                body: JSON.stringify({reservationIdInput}),
            });

            reservationListings().catch(console.error);

        };

        actionArchiveFromList.addEventListener("click", addToArchiveList);

            //  SHOWS ADD NOTE DROP-DOWN.
        function showAddNoteDropDown() {
            actionStatus.addEventListener("mouseleave", actionOptionMousEave);
            actionStatus.style.backgroundColor = 'transparent';
            actionStatus.style.color = '#2b2b2b';
            statusDropDown.style.display = 'none';
            cancelled.addEventListener("mouseleave", statusOptionMousEave);
            cancelled.style.backgroundColor = 'transparent';
            cancelTourDropDown.style.display = 'none';
            noResponseFromBuyerRadio.checked = false;
            buyerBackedOffRadio.checked = false;
            otherRadio.checked = false;
            otherText.disabled = true;

            if(
                data.reservationListings[i].status != "On Going" &&
                data.reservationListings[i].status != "Completed"
            ) {
                otherText.value = data.reservationListings[i].status;

            } else {
                otherText.value = "";

            };
            
            cancelTourConfirm.disabled = true;
            
            actionAddNote.removeEventListener("mouseleave", actionOptionMousEave);
            actionAddNote.style.backgroundColor = '#ffffff';
            actionAddNote.style.color = '#000000';
            addNoteDropDown.style.display = 'flex';

        };

        actionAddNote.addEventListener("click", showAddNoteDropDown);

            //  ADD NOTE.
        async function addNote() {
            const reservationIdInput = data.reservationListings[i].reservation_id;
            const noteInput = addNoteTextarea.value;

            const response = await fetch('https://dt-comia-realty-and-marketing-production.up.railway.app/add-note', {
                method: 'POST',
                headers: {                
                            'User-Agent': 'undici-stream-example',
                            'Content-Type': 'application/json'
                },
                credentials: "include",
                body: JSON.stringify({reservationIdInput, noteInput}),
            });

            reservationListings().catch(console.error);

        };

        addNoteSave.addEventListener("click", addNote);

    };

};

reservationListings().catch(console.error);
            

            

    //  .
async function pageNumbers() {  
    const response = await fetch('https://dt-comia-realty-and-marketing-production.up.railway.app/all-reservation-listings', {
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
                reservationListings().catch(console.error);
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