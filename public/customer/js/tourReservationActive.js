const listings = document.querySelector('#activeListings');

    //  INITIALIZE THE SORT FUNCTION.
let sortInput = "All";

    //  .
async function activeListings() {    
    const response = await fetch('https://dt-comia-realty-and-marketing-production.up.railway.app/tour-reservation-active', {
        method: 'POST',
        headers: {                    
                    'User-Agent': 'undici-stream-example',
                    'Content-Type': 'application/json'
        },
        credentials: "include",
        body: JSON.stringify({sortInput})
    });
    const data = await response.json();

    const listings = document.querySelector('#activeListings');

        //  CLEAR THE #listings BEFORE DISPLAYING THE UPDATED PROPERTY LISTINGS.
    listings.innerHTML = "";

        // INITIALLY ADDS 100% TRANSLATE TO ITS TRANSFORM.
    let translateCarousel = 0;

    if(data.userId != undefined) {
        for (let i = 0; i < data.propertyListings.length; i++) {
            if (data.reservationListings != undefined) {
                for (let j = 0; j < data.reservationListings.length; j++) {  
                    if(data.propertyListings[i].property_id == data.reservationListings[j].property_id) {
                
                            //  FUNCTION FOR PROPERTY mouseenter.
                        function propertyMousEnter(e) {
                            e.target.style.transform = 'scale(1.05)';
                            e.target.style.transition = 'transform 0.25s';
                            e.target.style.boxShadow = '0px 0px 10px #f8ce7f';
                        };

                            //  FUNCTION FOR PROPERTY mouseleave.
                        function propertyMousEave(e) {
                            e.target.style.transform = 'none';
                            e.target.style.transition = 'none';
                            e.target.style.boxShadow = 'none';
                        };

                        
                        const toursReservations = document.createElement('div');
                        const imageContainer = document.createElement('div');
                        const propertyImage = document.createElement('img');
                        const details = document.createElement('div');
                        const divServiceStatus = document.createElement('div');
                        const service = document.createElement('h1');
                        const status = document.createElement('h1');
                        const divPropertyName = document.createElement('div');
                        const labelPropertyName = document.createElement('p');
                        const valuePropertyName = document.createElement('p');
                        const divReservationPeriod = document.createElement('div');
                        const labelReservationPeriod = document.createElement('p');
                        const valueReservationPeriod = document.createElement('p');
                        const divLocation = document.createElement('div');
                        const labelLocation = document.createElement('p');
                        const valueLocation = document.createElement('p');
                        const divAgentContactNo = document.createElement('div');
                        const labelAgentContactNo = document.createElement('p');
                        const valueAgentContactNo = document.createElement('p');

                        toursReservations.classList.add('toursReservations');
                        imageContainer.classList.add('imageContainer');

                        for(let k = 0; k < data.imageListings.length; k++) {
                            if(data.propertyListings[i].property_id == data.imageListings[k].property_id) {
                                if(data.imageListings[k].field_name == "Main_image") {
                                    propertyImage.src = data.imageListings[k].path;
                                    propertyImage.alt = data.imageListings[k].file_name;
                                    propertyImage.type = data.imageListings[k].mime_type.split('/')[1];

                                    break;
                                };
                            };
                        };

                        details.classList.add('details');
                        service.innerHTML = "RESERVATION";
                        service.style.color = '#354024';
                        status.innerHTML = "ON GOING";
                        status.style.color = '#354024';
                        labelPropertyName.innerHTML = "Property Name:";
                        valuePropertyName.innerHTML = data.propertyListings[i].address;
                        labelReservationPeriod.innerHTML = "Reservation Period:";
                        valueReservationPeriod.innerHTML = new Date(data.reservationListings[j].reservation_period_from).toDateString().split(" ")[1] + ' ' +
                                                           new Date(data.reservationListings[j].reservation_period_from).toDateString().split(" ")[2] + ", " +
                                                           new Date(data.reservationListings[j].reservation_period_from).toDateString().split(" ")[3] + ' - ' +
                                                           new Date(data.reservationListings[j].reservation_period_to).toDateString().split(" ")[1] + ' ' +
                                                           new Date(data.reservationListings[j].reservation_period_to).toDateString().split(" ")[2] + ", " +
                                                           new Date(data.reservationListings[j].reservation_period_to).toDateString().split(" ")[3];
                        labelLocation.innerHTML = "Location:";
                        valueLocation.innerHTML = data.propertyListings[i].location;
                        labelAgentContactNo.innerHTML = "Agent & Contact No.:";

                        if(data.userListings.length > 0) {
                            for(let k = 0; k < data.userListings.length; k++) {
                                if(data.propertyListings[i].user_id == data.userListings[k].user_id) {
                                    valueAgentContactNo.innerHTML = data.userListings[k].user_name + " | " + data.userListings[k].contact_number;

                                    break;
                                };
                            };
                        };

                        listings.appendChild(toursReservations);
                        toursReservations.appendChild(imageContainer);
                        imageContainer.appendChild(propertyImage);
                        toursReservations.appendChild(details);
                        details.appendChild(divServiceStatus);
                        divServiceStatus.appendChild(service);
                        divServiceStatus.appendChild(status);
                        details.appendChild(divPropertyName);
                        divPropertyName.appendChild(labelPropertyName);
                        divPropertyName.appendChild(valuePropertyName);
                        details.appendChild(divReservationPeriod);
                        divReservationPeriod.appendChild(labelReservationPeriod);
                        divReservationPeriod.appendChild(valueReservationPeriod);
                        details.appendChild(divLocation);
                        divLocation.appendChild(labelLocation);
                        divLocation.appendChild(valueLocation);
                        details.appendChild(divAgentContactNo);
                        divAgentContactNo.appendChild(labelAgentContactNo);
                        divAgentContactNo.appendChild(valueAgentContactNo);

                        toursReservations.addEventListener("mouseenter", propertyMousEnter);
                        toursReservations.addEventListener("mouseleave", propertyMousEave);

                        

                            //  SHOWS TOUR AND RESERVATION DETAILS.
                        function showModal() {     
                            toursReservations.removeEventListener("mouseleave", propertyMousEave);
                            toursReservationsDetails.style.display = 'block';
                            
                        }

                        toursReservations.addEventListener("click", showModal);
                    


                        const toursReservationsDetails = document.createElement('div');
                        const toursReservationsModal = document.createElement('div');
                        
                        toursReservationsDetails.classList.add('toursReservationsDetails');
                        toursReservationsModal.classList.add('toursReservationsModal');

                        listings.appendChild(toursReservationsDetails);
                        toursReservationsDetails.appendChild(toursReservationsModal);



                            //  HIDES RESERVATION DETIALS.
                        function hideModal(e) {

                            if(!toursReservationsModal.contains(e.target)) {
                                
                                toursReservationsDetails.scrollTo(0, 0);

                                toursReservationsDetails.style.display = 'none';

                                //  RESETS CAROUSEL TO ITS FIRST IMAGE.
                                translateCarousel = 0;

                                for(let k = 0; k < imageCount; k++) {
                                    images.children[k].style.transform = 'none';
                                };

                                toursReservations.style.transform = 'none';
                                toursReservations.style.boxShadow = 'none';
                                
                                toursReservations.addEventListener("mouseleave", propertyMousEave);

                            };
                        };

                        toursReservationsDetails.addEventListener("click", hideModal);



                        const images = document.createElement('div');
                        images.classList.add('images');
                        toursReservationsModal.appendChild(images);

                        

                            //  INITIALIZE THE VALUE FOR imageCount.
                        let imageCount = 0;

                        for(let k = 0; k < data.imageListings.length; k++) {
                            if(data.propertyListings[i].property_id == data.imageListings[k].property_id) {
                                if(data.imageListings[k].field_name == "Additional_images") {
                                    imageCount++;

                                    const image = document.createElement('img');

                                    image.src = data.imageListings[k].path;
                                    image.alt = data.imageListings[k].file_name;
                                    image.type = data.imageListings[k].mime_type.split('/')[1];

                                    images.appendChild(image);
                                };
                            };
                        };

                            // INITIALLY ADDS 100% TRANSLATE TO ITS TRANSFORM.
                        let translateCarousel = 0;
                                
                        if(images.children.length > 1) {
                            const previousButton = document.createElement('input');
                            const nextButton = document.createElement('input');

                            previousButton.type = "image";
                            previousButton.src = "https://niwxujzmwpdhegjlmyfw.supabase.co/storage/v1/object/public/D.T.%20Comia%20Realty%20and%20Marketing/BUYER ICONS AND LOGOS/left arrow-white.png";
                            previousButton.name = "Previous button";
                            previousButton.alt = "Previous icon";
                            previousButton.classList.add('previousIcon');
                            nextButton.type = "image";
                            nextButton.src = "https://niwxujzmwpdhegjlmyfw.supabase.co/storage/v1/object/public/D.T.%20Comia%20Realty%20and%20Marketing/BUYER ICONS AND LOGOS/right arrow.png";
                            nextButton.name = "Next button";
                            nextButton.alt = "Next icon";
                            nextButton.classList.add('nextIcon');

                            images.appendChild(previousButton);
                            images.appendChild(nextButton);

                                // IMAGE CAROUSEL FUNCTION.
                            function previousCarousel() {
                                translateCarousel++;
                                
                                if(translateCarousel > 0) {
                                    translateCarousel = -(imageCount - 1);
                                };
                                
                                carousel(translateCarousel);
                            };

                            previousButton.addEventListener("click", previousCarousel);

                            function nextCarousel() {
                                translateCarousel--;
                                
                                if(translateCarousel < -(imageCount - 1)) {
                                    translateCarousel = 0;
                                };
                                
                                carousel(translateCarousel);
                            };

                            nextButton.addEventListener("click", nextCarousel);

                            function carousel(translateValue) {            
                                // EVERY RUN ADDS A 100% TRANSLATE TO ITS TRANSFORM TO MOVE IT MORE TO THE LEFT SHOWING ANOTHER IMAGE.
                                // VALUE OF TRANSLATE EQAUL TO INDEX OF IMAGE SHOWING.
                                for(let k = 0; k < imageCount; k++) {
                                    images.children[k].style.transform = 'translate(' + translateValue * 100 + '%, 0)';
                                }
                            };  

                        };


                        
                        const detailsModal = document.createElement('div');
                        const serviceModal = document.createElement('h1');
                        const labelValueModal = document.createElement('div');
                        const labelPropertyNameModal = document.createElement('p');
                        const valuePropertyNameModal = document.createElement('p');
                        const labelReservationPeriodModal = document.createElement('p');
                        const valueReservationPeriodModal = document.createElement('p');
                        const labelLocationModal = document.createElement('p');
                        const valueLocationModal = document.createElement('p');
                        const labelAgentContactNoModal = document.createElement('p');
                        const valueAgentContactNoModal = document.createElement('p');
                        const labelStatusModal = document.createElement('p');
                        const valueStatusModal = document.createElement('p');

                        detailsModal.classList.add('detailsModal');
                        serviceModal.innerHTML = "RESERVATION";
                        serviceModal.style.color = '#38b6ff';
                        labelPropertyNameModal.innerHTML = "Property Name:";
                        valuePropertyNameModal.innerHTML = data.propertyListings[i].address;
                        labelReservationPeriodModal.innerHTML = "Reservation Period:";
                        valueReservationPeriodModal.innerHTML = new Date(data.reservationListings[j].reservation_period_from).toDateString().split(" ")[1] + ' ' +
                                                                new Date(data.reservationListings[j].reservation_period_from).toDateString().split(" ")[2] + ", " +
                                                                new Date(data.reservationListings[j].reservation_period_from).toDateString().split(" ")[3] + ' - ' +
                                                                new Date(data.reservationListings[j].reservation_period_to).toDateString().split(" ")[1] + ' ' +
                                                                new Date(data.reservationListings[j].reservation_period_to).toDateString().split(" ")[2] + ", " +
                                                                new Date(data.reservationListings[j].reservation_period_to).toDateString().split(" ")[3];
                        labelLocationModal.innerHTML = "Location:";
                        valueLocationModal.innerHTML = data.propertyListings[i].location;
                        labelAgentContactNoModal.innerHTML = "Agent & Contact No.:";

                        if(data.userListings.length > 0) {
                            for(let k = 0; k < data.userListings.length; k++) {
                                if(data.propertyListings[i].user_id == data.userListings[k].user_id) {
                                    valueAgentContactNoModal.innerHTML = data.userListings[k].user_name + " | " + data.userListings[k].contact_number;

                                    break;
                                };
                            };
                        };
                        
                        labelStatusModal.innerHTML = "Status:";
                        valueStatusModal.innerHTML = "On going";
                        
                        toursReservationsModal.appendChild(detailsModal);
                        detailsModal.appendChild(serviceModal);
                        detailsModal.appendChild(labelValueModal);
                        labelValueModal.appendChild(labelPropertyNameModal);
                        labelValueModal.appendChild(valuePropertyNameModal);
                        labelValueModal.appendChild(labelReservationPeriodModal);
                        labelValueModal.appendChild(valueReservationPeriodModal);
                        labelValueModal.appendChild(labelLocationModal);
                        labelValueModal.appendChild(valueLocationModal);
                        labelValueModal.appendChild(labelAgentContactNoModal);
                        labelValueModal.appendChild(valueAgentContactNoModal);
                        labelValueModal.appendChild(labelStatusModal);
                        labelValueModal.appendChild(valueStatusModal);


                        
                        const cancel = document.createElement('button');
                        const translucentLayer = document.createElement('div');
                        const cancelDiv = document.createElement('div');
                        const cancelModal = document.createElement('div');
                        const cancelP = document.createElement('p');
                        const cancelNo = document.createElement('button');
                        const cancelYes = document.createElement('button');
                        translucentLayer.classList.add('translucentLayer');
                        cancelModal.classList.add('cancelModal');

                        cancel.innerHTML = 'CANCEL';
                        cancelP.innerHTML = 'Are you sure you want to cancel this reservation?';
                        cancelNo.innerHTML = 'NO';
                        cancelYes.innerHTML = 'YES';

                        detailsModal.appendChild(cancel);
                        detailsModal.appendChild(translucentLayer);
                        translucentLayer.appendChild(cancelDiv);
                        cancelDiv.appendChild(cancelModal);
                        cancelModal.appendChild(cancelP);
                        cancelModal.appendChild(cancelNo);
                        cancelModal.appendChild(cancelYes);

                            //  HIDES RESERVE MODAL.
                        function hideReserveModal(e) {
                            if(
                                !cancelModal.contains(e.target) ||
                                cancelNo.contains(e.target)
                            ) {
                                translucentLayer.style.display = 'none';
                                toursReservationsDetails.removeEventListener("click", hideReserveModal);
                                cancel.addEventListener("click", showReserveModal);
                            };

                        };

                            //  SHOWS RESERVE MODAL.
                        function showReserveModal() {
                            translucentLayer.style.display = 'block';

                                // DELAY LISTENER BY 10ms TO AVOID TRIGGERING hideReserveModal IMMEDIATELY.
                            setTimeout(function() {
                                toursReservationsDetails.addEventListener("click", hideReserveModal);
                            }, 10);

                            cancel.removeEventListener("click", showReserveModal);
                        };

                        cancel.addEventListener("click", showReserveModal);

                            // CANCEL SERVICE.
                        async function cancelService (e) {
                            const agentIdInput = data.reservationListings[j].agent_id;
                            const propertyIdInput = data.reservationListings[j].property_id;
                            const reservationIdInput = data.reservationListings[j].reservation_id;

                            const response = await fetch('https://dt-comia-realty-and-marketing-production.up.railway.app/cancel-reservation', {
                                method: 'POST',
                                headers: {                
                                            'User-Agent': 'undici-stream-example',
                                            'Content-Type': 'application/json'
                                },
                                credentials: "include",
                                body: JSON.stringify({agentIdInput,
                                                      propertyIdInput,  
                                                      reservationIdInput
                                }),
                            });

                            activeListings().catch(console.error);

                        };

                        cancelYes.addEventListener("click", cancelService);

                    };

                };
                
            };

            if (data.tourListings != undefined) {
                //--TOUR LISTINGS--.
            };

        };

    } else {
        window.location = "./homePage.html";

    };

};

activeListings().catch(console.error);