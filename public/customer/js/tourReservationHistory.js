const listings = document.querySelector('#historyListings');
const sortDiv = document.querySelector('#toursReservations > div:nth-child(4) > div:nth-child(2)');
const p = document.querySelector('#toursReservations > div:nth-child(4) > div:nth-child(2) > p')    
const arrow2 = document.querySelector('#toursReservations > div:nth-child(4) > div > #arrowIcon');
const sort = document.querySelector('#toursReservations > div:nth-child(4) > #sort');
const ul = document.querySelector('#toursReservations > div:nth-child(4) > #sort > ul');
const all = document.querySelector('#toursReservations > div:nth-child(4) > #sort > ul > li:nth-child(1)');
const reservations = document.querySelector('#toursReservations > div:nth-child(4) > #sort > ul > li:nth-child(2)');
const tours = document.querySelector('#toursReservations > div:nth-child(4) > #sort > ul > li:nth-child(3)'); 

    //  INITIALIZE THE SORT FUNCTION.
let sortInput = "All";
            
    //  FUNCTION FOR ACTION mouseenter.
function actionMousEnter(e) {
    e.target.style.color = '#45703c';
};

all.addEventListener("mouseenter", actionMousEnter);
reservations.addEventListener("mouseenter", actionMousEnter);
tours.addEventListener("mouseenter", actionMousEnter);

    //  FUNCTION FOR ACTION mouseleave.
function actionMousEave(e) {
    e.target.style.color = '#000000';
};

reservations.addEventListener("mouseleave", actionMousEave);
tours.addEventListener("mouseleave", actionMousEave);

    //  HIDES ACTION DROP-DOWN.
function hideActionDropDown(e) {        
    const titleBar = document.querySelector('#toursReservations > div:nth-child(1)');
    const navBar = document.querySelector('nav');
    const menuIcon = document.getElementById('menuIcon');
    const menuTab = document.getElementById('menuTab');
    const profileIcon = document.getElementById('profileIcon');
            
        //  HIDES THE ACTION CHOCIES UNLESS Action icon WERE CLICKED.
    if(
        !titleBar.contains(e.target) &&
        (
            !navBar.contains(e.target) ||
            menuIcon.contains(e.target) ||
            profileIcon.contains(e.target)
        ) &&
       !menuTab.contains(e.target) &&
        (
            !sortDiv.contains(e.target) ||
            arrow2.contains(e.target)
        )
    ) {
        sort.style.display = 'none';
                
        document.body.removeEventListener("click", hideActionDropDown);
        arrow2.addEventListener("click", showActionDropDown);
    
    };

};

    //  SHOWS ACTION DROP-DOWN.
function showActionDropDown() {
    sort.style.display = 'block';

        // DELAY LISTENER BY 10ms TO AVOID TRIGGERING hideActionDropDown IMMEDIATELY.
    setTimeout(function() {
        document.body.addEventListener("click", hideActionDropDown);

    }, 10);

    arrow2.removeEventListener("click", showActionDropDown);

};

arrow2.addEventListener("click", showActionDropDown);

    //  SETS THE SORT INPUT VALUE TO WHENEVER SORT VALUE(ul > li) WERE CLICKED.
function sortFunction(e) {
    const p = document.querySelector('#toursReservations > div:nth-child(4) > div:nth-child(2) > p')    
    const ul = document.querySelector('#toursReservations > div:nth-child(4) > #sort > ul');

        //  IF THE FIRST VALUE(ul.children[0] > li) WERE CLICKED,
        // SETS THE SORT INPUT VALUE TO FIRST VALUE(ul.children[0] > li),
        // RESETS THE OTHERS.
        // AND ADD CHECK MARK TO THE FIRST VALUE(ul.children[0] > li).
    
    if(ul.children[0].contains(e.target)) {
        sortInput = "All";
        p.innerHTML = "All";

        const checkMark = document.createElement('img');

        ul.children[0].innerHTML = "All";
        ul.children[0].style.color = '#45703c';
        ul.children[0].removeEventListener("mouseleave", actionMousEave);
        checkMark.src = "";
        checkMark.alt = "Check mark";
        checkMark.type = "";

        ul.children[0].appendChild(checkMark);

        if (ul.children[1].children.length > 0) {
            ul.children[1].innerHTML = "Completed";
            ul.children[1].style.color = '#000000';
            ul.children[1].addEventListener("mouseleave", actionMousEave);

        };

        if (ul.children[2].children.length > 0) {
            ul.children[2].innerHTML = "Cancelled";
            ul.children[2].style.color = '#000000';
            ul.children[2].addEventListener("mouseleave", actionMousEave);

        };

        //  IF THE SECOND VALUE(ul.children[1] > li) WERE CLICKED,
        // SETS THE SORT INPUT VALUE TO SECOND VALUE(ul.children[1] > li),
        // RESETS THE OTHERS
        // AND ADD CHECK MARK TO THE SECOND VALUE(ul.children[1] > li).
    } else if(ul.children[1].contains(e.target)) {
        sortInput = "Completed";
        p.innerHTML = "Completed";

        if (ul.children[0].children.length > 0) {
            ul.children[0].innerHTML = "All";
            ul.children[0].style.color = '#000000';
            ul.children[0].addEventListener("mouseleave", actionMousEave);

        };

        const checkMark = document.createElement('img');

        ul.children[1].innerHTML = "Completed";
        ul.children[1].style.color = '#45703c';
        ul.children[1].removeEventListener("mouseleave", actionMousEave);
        checkMark.src = "";
        checkMark.alt = "Check mark";
        checkMark.type = "";

        ul.children[1].appendChild(checkMark);

        if (ul.children[2].children.length > 0) {
            ul.children[2].innerHTML = "Cancelled";
            ul.children[2].style.color = '#000000';
            ul.children[2].addEventListener("mouseleave", actionMousEave);

        };
        //  IF THE THIRD VALUE(ul.children[2] > li) WERE CLICKED,
        // SETS THE SORT INPUT VALUE TO THIRD VALUE(ul.children[2] > li),
        // RESETS THE OTHERS
        // AND ADD CHECK MARK TO THE THIRD VALUE(ul.children[2] > li).
    } else if(ul.children[2].contains(e.target)) {
        sortInput = "Cancelled";
        p.innerHTML = "Cancelled";

        if (ul.children[0].children.length > 0) {
            ul.children[0].innerHTML = "All";
            ul.children[0].style.color = '#000000';
            ul.children[0].addEventListener("mouseleave", actionMousEave);

        }

        if (ul.children[1].children.length > 0) {
            ul.children[1].innerHTML = "Completed";
            ul.children[1].style.color = '#000000';
            ul.children[1].addEventListener("mouseleave", actionMousEave);

        }

        const checkMark = document.createElement('img');

        ul.children[2].innerHTML = "Cancelled";
        ul.children[2].style.color = '#45703c';
        ul.children[2].removeEventListener("mouseleave", actionMousEave);
        checkMark.src = "";
        checkMark.alt = "Check mark";
        checkMark.type = "";

        ul.children[2].appendChild(checkMark);
    };

        //  UPDATES THE JSON ONCE THE SORT INPUT VALUE CHANGED.
    historyListings().catch(console.error);

};

    //  BOUND THE sortFunction FUNCTION TO SORT VALUE CONTAINER(ul).
document.querySelector('#toursReservations > div:nth-child(4) > #sort > ul').addEventListener("click", sortFunction);

    //  .
async function historyListings() {    
    const response = await fetch('https://dt-comia-realty-and-marketing-production.up.railway.app/tour-reservation-history', {
        method: 'POST',
        headers: {                    
                    'User-Agent': 'undici-stream-example',
                    'Content-Type': 'application/json'
        },
        credentials: "include",
        body: JSON.stringify({sortInput})
    });
    const data = await response.json();

    const listings = document.querySelector('#historyListings');

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
                        propertyImage.src = 'https://niwxujzmwpdhegjlmyfw.supabase.co/storage/v1/object/public/D.T.%20Comia%20Realty%20and%20Marketing/PROPERTY/' + data.propertyListings[i].user_id + '/' + data.propertyListings[i].property_id + '/' + data.propertyListings[i].main_image;
                        propertyImage.alt =  data.propertyListings[i].main_image;
                        propertyImage.type = "";
                        details.classList.add('details');
                        service.innerHTML = "RESERVATION";

                        if(data.reservationListings[j].status != "Completed") {
                            service.style.color = '#c92a2a';
                            status.innerHTML = data.reservationListings[j].status.toUpperCase();
                            status.style.color = '#c92a2a';

                        } else {
                            service.style.color = '#00bf63';
                            status.innerHTML = data.reservationListings[j].status.toUpperCase();
                            status.style.color = '#00bf63';

                        };
                        
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
                                    div.children[k].style.transform = 'none';
                                };

                                toursReservations.style.transform = 'none';
                                toursReservations.style.boxShadow = 'none';
                                
                                toursReservations.addEventListener("mouseleave", propertyMousEave);

                            };
                        };

                        toursReservationsDetails.addEventListener("click", hideModal);



                        const images = document.createElement('div');
                        const div = document.createElement('div');

                        images.classList.add('images');

                        toursReservationsModal.appendChild(images);
                        images.appendChild(div);

                        

                            //  INITIALIZE THE VALUE FOR imageCount.
                        let imageCount = 0;

                            //  IF EITHER OF IMAGE_1... AREN'T EMPTY,
                            //  UPADTES THE imageCount VALUE,
                            //  CREATES IMAGE ELEMENTS,
                            //  DISPLAYS FETCHED IMAGE FROM DATABASE
                            //  AND ADDS TO DIV ELEMENT.
                        if(data.propertyListings[i].image_1 != null) {
                            imageCount++;

                            const image1 = document.createElement('img');

                            image1.src = 'https://niwxujzmwpdhegjlmyfw.supabase.co/storage/v1/object/public/D.T.%20Comia%20Realty%20and%20Marketing/PROPERTY/' + data.propertyListings[i].user_id + '/' + data.propertyListings[i].property_id + '/' + data.propertyListings[i].image_1;
                            image1.alt =  data.propertyListings[i].image_1;
                            image1.type = "";
                            
                            div.appendChild(image1);
                        };

                        if(data.propertyListings[i].image_2 != null) {
                            imageCount++;

                            const image2 = document.createElement('img');

                            image2.src = 'https://niwxujzmwpdhegjlmyfw.supabase.co/storage/v1/object/public/D.T.%20Comia%20Realty%20and%20Marketing/PROPERTY/' + data.propertyListings[i].user_id + '/' + data.propertyListings[i].property_id + '/' + data.propertyListings[i].image_2;
                            image2.alt =  data.propertyListings[i].image_2;
                            image2.type = "";
                            
                            div.appendChild(image2);
                        };

                        if(data.propertyListings[i].image_3 != null) {
                            imageCount++;

                            const image3 = document.createElement('img');

                            image3.src = 'https://niwxujzmwpdhegjlmyfw.supabase.co/storage/v1/object/public/D.T.%20Comia%20Realty%20and%20Marketing/PROPERTY/' + data.propertyListings[i].user_id + '/' + data.propertyListings[i].property_id + '/' + data.propertyListings[i].image_3;
                            image3.alt =  data.propertyListings[i].image_3;
                            image3.type = "";
                            
                            div.appendChild(image3);
                        };

                        if(data.propertyListings[i].image_4 != null) {
                            imageCount++;

                            const image4 = document.createElement('img');

                            image4.src = 'https://niwxujzmwpdhegjlmyfw.supabase.co/storage/v1/object/public/D.T.%20Comia%20Realty%20and%20Marketing/PROPERTY/' + data.propertyListings[i].user_id + '/' + data.propertyListings[i].property_id + '/' + data.propertyListings[i].image_4;
                            image4.alt =  data.propertyListings[i].image_4;
                            image4.type = "";
                            
                            div.appendChild(image4);
                        };

                        if(data.propertyListings[i].image_5 != null) {
                            imageCount++;

                            const image5 = document.createElement('img');

                            image5.src = 'https://niwxujzmwpdhegjlmyfw.supabase.co/storage/v1/object/public/D.T.%20Comia%20Realty%20and%20Marketing/PROPERTY/' + data.propertyListings[i].user_id + '/' + data.propertyListings[i].property_id + '/' + data.propertyListings[i].image_5;
                            image5.alt =  data.propertyListings[i].image_5;
                            image5.type = "";
                            
                            div.appendChild(image5);
                        };

                        if(data.propertyListings[i].image_6 != null) {
                            imageCount++;

                            const image6 = document.createElement('img');

                            image6.src = 'https://niwxujzmwpdhegjlmyfw.supabase.co/storage/v1/object/public/D.T.%20Comia%20Realty%20and%20Marketing/PROPERTY/' + data.propertyListings[i].user_id + '/' + data.propertyListings[i].property_id + '/' + data.propertyListings[i].image_6;
                            image6.alt =  data.propertyListings[i].image_6;
                            image6.type = "";
                            
                            div.appendChild(image6);
                        };

                        if(data.propertyListings[i].image_7 != null) {
                            imageCount++;

                            const image7 = document.createElement('img');

                            image7.src = 'https://niwxujzmwpdhegjlmyfw.supabase.co/storage/v1/object/public/D.T.%20Comia%20Realty%20and%20Marketing/PROPERTY/' + data.propertyListings[i].user_id + '/' + data.propertyListings[i].property_id + '/' + data.propertyListings[i].image_7;
                            image7.alt =  data.propertyListings[i].image_7;
                            image7.type = "";
                            
                            div.appendChild(image7);
                        };

                        if(data.propertyListings[i].image_8 != null) {
                            imageCount++;

                            const image8 = document.createElement('img');

                            image8.src = 'https://niwxujzmwpdhegjlmyfw.supabase.co/storage/v1/object/public/D.T.%20Comia%20Realty%20and%20Marketing/PROPERTY/' + data.propertyListings[i].user_id + '/' + data.propertyListings[i].property_id + '/' + data.propertyListings[i].image_8;
                            image8.alt =  data.propertyListings[i].image_8;
                            image8.type = "";
                            
                            div.appendChild(image8);
                        };

                        if(data.propertyListings[i].image_9 != null) {
                            imageCount++;

                            const image9 = document.createElement('img');

                            image9.src = 'https://niwxujzmwpdhegjlmyfw.supabase.co/storage/v1/object/public/D.T.%20Comia%20Realty%20and%20Marketing/PROPERTY/' + data.propertyListings[i].user_id + '/' + data.propertyListings[i].property_id + '/' + data.propertyListings[i].image_9;
                            image9.alt =  data.propertyListings[i].image_9;
                            image9.type = "";
                            
                            div.appendChild(image9);
                        };

                        if(data.propertyListings[i].image_10 != null) {
                            imageCount++;

                            const image10 = document.createElement('img');

                            image10.src = 'https://niwxujzmwpdhegjlmyfw.supabase.co/storage/v1/object/public/D.T.%20Comia%20Realty%20and%20Marketing/PROPERTY/' + data.propertyListings[i].user_id + '/' + data.propertyListings[i].property_id + '/' + data.propertyListings[i].image_10;
                            image10.alt =  data.propertyListings[i].image_1;
                            image10.type = "";
                            
                            div.appendChild(image10);
                        };



                            // INITIALLY ADDS 100% TRANSLATE TO ITS TRANSFORM.
                        let translateCarousel = 0;
                        
                        if(data.propertyListings[i].image_2 != null) {
                            const previousButton = document.createElement('input');
                            const nextButton = document.createElement('input');

                            previousButton.type = "image";
                            previousButton.src = "https://niwxujzmwpdhegjlmyfw.supabase.co/storage/v1/object/public/D.T.%20Comia%20Realty%20and%20Marketing/BUYER ICONS ADN LOGOS/left arrow-wh";
                            previousButton.name = "Previous button";
                            previousButton.alt = "Previous icon";
                            previousButton.classList.add('previousIcon');
                            nextButton.type = "image";
                            nextButton.name = "Next button";
                            nextButton.alt = "Next icon";
                            nextButton.classList.add('nextIcon');

                            div.appendChild(previousButton);
                            div.appendChild(nextButton);

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
                                    div.children[k].style.transform = 'translate(' + translateValue * 100 + '%, 0)';
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

                        valueStatusModal.innerHTML = data.reservationListings[j].status.charAt(0).toUpperCase() + data.reservationListings[j].status.substring(1, data.reservationListings[j].status.length).toLowerCase();
                        
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

historyListings().catch(console.error);