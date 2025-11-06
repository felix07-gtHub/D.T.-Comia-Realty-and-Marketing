    //  GET EVERY FEATURED PROPERTY.
async function featuredProperty() { 
    const response = await fetch('https://dt-comia-realty-and-marketing-production.up.railway.app/featured-property', {
        method: "GET",
        credentials: "include"
    });
    const data = await response.json();

    const listings = document.querySelector('#featuredListings');

        //  CLEAR THE #listings BEFORE DISPLAYING THE UPDATED PROPERTY LISTINGS.
    listings.innerHTML = "";

    //  USE THIS FUNTION FOR "Show more"/"Show less"(showMoreLess) INSTEAD OF JUST HIDING THE OVERFLOW OF #listings
    //  AND SHOWS IT WHEN showMoreLess TOGGLES DUE TO INCONSISTENT OF THE HEIGHT OF THE .property DUE TO INCONSISTENT
    //  LENGTH OF THE address THAT CAUSING THE PROPERTY TO BE CUT OFF WHEN PROPERY DISPLAYS ONE LANE VERTICALLY.

        //  ADDS "Show more"(showMoreLess) IF data.length IS MORETHAN THE COUNT OF DISPLAYING PROPERTY WITHIN WINDOW WIDTH 1025
        //  AND 710 ELSE, IF data.length IS MORETHAN THE COUNT OF DISPLAYING PROPERTY NOT WITHIN WINDOW WIDTH 1025 AND 710 .
    if(
        window.innerWidth < 1025 &&
        window.innerWidth > 710 &&
        data.featuredPropertyListings.length > 4
    ) {
        
        const showMoreLess = document.createElement('p');

            //  DISPLAY showMoreLess AS "Show more" WHEN THE COUNT OF DISPLAYING PROPERTY
            //  WERE DEFAULT(FOUR) ELSE, DISPLAY showMoreLess AS "Show less".
         if(propertyCount == 4) {
             showMoreLess.innerHTML = "Show more";
        } else {
             showMoreLess.innerHTML = "Show less";
        };

        listings.appendChild(showMoreLess);

            //  FUNCTION FOR showMoreLess WHEN THE COUNT OF DISPLAYING PROPERTY  WERE FOUR.
        function showMoreLessFour() {
                
                //  IF showMoreLess AS "Show more" TOGGLED, DISPLAY ALL THE FEATURED PROPERTY ELSE, BACK TO DEFAULT(FOUR).
            if(showMoreLess.innerHTML == "Show more") {
                propertyCount = data.featuredPropertyListings.length;

                    //  RUNS featuredProperty AFTER SETTING propertyCount.
                featuredProperty().catch(console.error);
            } else {
                propertyCount = 4;

                    //  RUNS featuredProperty AFTER SETTING propertyCount.
                featuredProperty().catch(console.error);
                
                window.scrollTo(0, 725);
            };
        };

            //  REMOVE THE FUNCTION FOR showMoreLess WHEN THE COUNT OF DISPLAYING PROPERTY  WERE THREE
            //  AND ADDS THE FUNCTION FOR showMoreLess WHEN THE COUNT OF DISPLAYING PROPERTY  WERE FOUR.
        showMoreLess.removeEventListener("click", showMoreLessThree);
        showMoreLess.addEventListener("click", showMoreLessFour);
    } else if(data.featuredPropertyListings.length > 3) {
        
        const showMoreLess = document.createElement('p');

            //  DISPLAY showMoreLess AS "Show more" WHEN THE COUNT OF DISPLAYING PROPERTY
            //  WERE DEFAULT(THREE) ELSE, DISPLAY showMoreLess AS "Show less".
        if(propertyCount == 3) {
            showMoreLess.innerHTML = "Show more";
        } else {
            showMoreLess.innerHTML = "Show less";
        };

        listings.appendChild(showMoreLess);

            //  FUNCTION FOR showMoreLess WHEN THE COUNT OF DISPLAYING PROPERTY  WERE FOUR.
        function showMoreLessThree() {
                
               //  IF showMoreLess AS "Show more" TOGGLED, DISPLAY ALL THE FEATURED PROPERTY ELSE, BACK TO DEFAULT(THREE).
            if(showMoreLess.innerHTML == "Show more") {
                propertyCount = data.featuredPropertyListings.length;

                    //  RUNS featuredProperty AFTER SETTING propertyCount.
                featuredProperty().catch(console.error);
            } else {
                propertyCount = 3;

                    //  RUNS featuredProperty AFTER SETTING propertyCount.
                featuredProperty().catch(console.error);
                
                window.scrollTo(0, 775);
            };
        };

            //  REMOVE THE FUNCTION FOR showMoreLess WHEN THE COUNT OF DISPLAYING PROPERTY  WERE FOUR
            //  AND ADDS THE FUNCTION FOR showMoreLess WHEN THE COUNT OF DISPLAYING PROPERTY  WERE THREE.
        showMoreLess.removeEventListener("click", showMoreLessFour);
        showMoreLess.addEventListener("click", showMoreLessThree);
    }

    for (let i = 0; i < propertyCount; i++) {
        
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

            //  FUNCTION FOR AVAILABLE PROPERTY mouseenter.
        function availablePropertyMousEnter(e) {
            e.target.style.backgroundColor = '#faebcf';
            e.target.style.color = '#45703c';
            e.target.style.border = 'solid #f8ce7f';
            e.target.style.transform = 'scale(1.05)';
            e.target.style.transition = 'transform 0.25s';
            e.target.style.boxShadow = '0px 0px 10px #f8ce7f';
        };

            //  FUNCTION FOR AVAILABLE PROPERTY mouseleave.
        function availablePropertyMousEave(e) {
            e.target.style.backgroundColor = '#889063';
            e.target.style.color = '#354024';
            e.target.style.border = 'none';
            e.target.style.transform = 'none';
            e.target.style.transition = 'none';
            e.target.style.boxShadow = 'none';
        };
        
            //  FUNCTION FOR RESERVED PROPERTY mouseenter.
        function reservedPropertyMousEnter(e) {
            e.target.style.backgroundColor = '#faebcf';
            e.target.style.color = 'red';
            e.target.style.border = 'solid #f8ce7f';
            e.target.style.transform = 'scale(1.05)';
            e.target.style.transition = 'transform 0.25s';
            e.target.style.boxShadow = '0px 0px 10px #f8ce7f';
        };

            //  FUNCTION FOR RESERVED PROPERTY mouseleave.
        function reservedPropertyMousEave(e) {
            e.target.style.backgroundColor = '#dc4a4a';
            e.target.style.color = '#354024';
            e.target.style.border = 'none';
            e.target.style.transform = 'none';
            e.target.style.transition = 'none';
            e.target.style.boxShadow = 'none';
        };


        if(data != "") {
            const property = document.createElement('div');
            const imageContainer = document.createElement('div');
            const propertyImage = document.createElement('img');
            const price = document.createElement('p');
            const address = document.createElement('p');
            const bedIcon = document.createElement('img');
            const bedCount = document.createElement('p');
            const bathtubIcon = document.createElement('img');
            const bathtubCount = document.createElement('p');
            const viewDetail = document.createElement('button');

            property.classList.add('property');
            imageContainer.classList.add('imageContainer');

            for(let j = 0; j < data.featuredImageListings.length; j++) {
                if(data.featuredPropertyListings[i].property_id == data.featuredImageListings[j].property_id) {
                    if(data.featuredImageListings[j].field_name == "Main_image") {
                        propertyImage.src = data.featuredImageListings[j].path;
                        propertyImage.alt = data.featuredImageListings[j].file_name;
                        propertyImage.type = data.featuredImageListings[j].mime_type.split('/')[1];

                        break;
                    };
                };
            };

            price.innerHTML = "&#8369;" + data.featuredPropertyListings[i].price;
            address.innerHTML = data.featuredPropertyListings[i].address;
            bedIcon.src = "https://niwxujzmwpdhegjlmyfw.supabase.co/storage/v1/object/public/D.T.%20Comia%20Realty%20and%20Marketing/BUYER ICONS AND LOGOS/green bed.png";
            bedIcon.alt = "Bed icon";
            bedIcon.type = "";
            bedCount.innerHTML = data.featuredPropertyListings[i].room_count;
            bathtubIcon.src = "https://niwxujzmwpdhegjlmyfw.supabase.co/storage/v1/object/public/D.T.%20Comia%20Realty%20and%20Marketing/BUYER ICONS AND LOGOS/black bathtub.png";
            bathtubIcon.alt = "Bathtub icon";
            bathtubIcon.type = "";
            bathtubCount.innerHTML = data.featuredPropertyListings[i].bath_count;
            viewDetail.classList.add('viewDetails')
            viewDetail.innerHTML = "VIEW DETAILS";

            listings.appendChild(property);
            property.appendChild(imageContainer);
            imageContainer.appendChild(propertyImage);
            property.appendChild(price);
            property.appendChild(address);
            property.appendChild(bedIcon);
            property.appendChild(bedCount);
            property.appendChild(bathtubIcon);
            property.appendChild(bathtubCount);
            property.appendChild(viewDetail);

            property.addEventListener("mouseenter", propertyMousEnter);
            property.addEventListener("mouseleave", propertyMousEave);

            if(data.featuredPropertyListings[i].status != "AVAILABLE") {
                viewDetail.style.backgroundColor = "#dc4a4a";
                viewDetail.style.color = "#354024";
                viewDetail.style.border = "none"
                viewDetail.addEventListener("mouseenter", reservedPropertyMousEnter);
                viewDetail.addEventListener("mouseleave", reservedPropertyMousEave);
            } else {
                viewDetail.style.backgroundColor = "#889063";
                viewDetail.style.color = "#354024";
                viewDetail.style.border = "none"
                viewDetail.addEventListener("mouseenter", availablePropertyMousEnter);
                viewDetail.addEventListener("mouseleave", availablePropertyMousEave);
            };



            if(data.userId != '') {
                const savedInput = document.createElement('input');
                const savedLabel = document.createElement('label');
                const savedIcon = document.createElement('img');

                savedInput.type = "checkbox";
                savedInput.name = "Saved checkbox";
                savedInput.id = data.featuredPropertyListings[i].property_id;
                savedInput.value = data.featuredPropertyListings[i].property_id;
                savedLabel.htmlFor = data.featuredPropertyListings[i].property_id;
                savedIcon.classList.add('savedIcon');
                        
                property.appendChild(savedInput);
                property.appendChild(savedLabel);
                savedLabel.appendChild(savedIcon);

                if(data.savedPropertyListings.length > 0) {
                    for(let j = 0; j < data.savedPropertyListings.length; j++) {
                        if(data.featuredPropertyListings[i].property_id != data.savedPropertyListings[j].property_id) {
                            savedIcon.src = "https://niwxujzmwpdhegjlmyfw.supabase.co/storage/v1/object/public/D.T.%20Comia%20Realty%20and%20Marketing/BUYER ICONS AND LOGOS/emptyheart.png";
                            savedIcon.alt = "Heart icon empty";
                            savedIcon.type = "";
                        } else {
                            savedInput.checked = true;
                            savedIcon.src = "https://niwxujzmwpdhegjlmyfw.supabase.co/storage/v1/object/public/D.T.%20Comia%20Realty%20and%20Marketing/BUYER ICONS AND LOGOS/whole heart.png";
                            savedIcon.alt = "Heart icon filled";
                            savedIcon.type = "";

                            break;
                        };
                    };
                } else {
                    savedIcon.src = "https://niwxujzmwpdhegjlmyfw.supabase.co/storage/v1/object/public/D.T.%20Comia%20Realty%20and%20Marketing/BUYER ICONS AND LOGOS/emptyheart.png";
                    savedIcon.alt = "Heart icon empty";
                    savedIcon.type = "";
                };

                async function savedFunction(){
                    const propertyIdInput = savedInput.value;

                    await fetch('https://dt-comia-realty-and-marketing-production.up.railway.app/saved', {
                        method: 'POST',
                        headers: {
                                    'User-Agent': 'undici-stream-example',
                                    'Content-Type': 'application/json',
                        },
                        credentials: "include",
                        body: JSON.stringify({propertyIdInput})
                    });

                    if(savedInput.checked != true) {
                        savedIcon.src = "https://niwxujzmwpdhegjlmyfw.supabase.co/storage/v1/object/public/D.T.%20Comia%20Realty%20and%20Marketing/BUYER ICONS AND LOGOS/emptyheart.png";
                    } else {
                        savedIcon.src = "https://niwxujzmwpdhegjlmyfw.supabase.co/storage/v1/object/public/D.T.%20Comia%20Realty%20and%20Marketing/BUYER ICONS AND LOGOS/whole heart.png";
                    };

                };

                savedInput.addEventListener("click", savedFunction);

            } else {
        
                const savedIcon = document.createElement('img');
                const savedInput = document.createElement('input');
                const savedLabel = document.createElement('label');
                const savedLink = document.createElement('a');

                savedInput.type = "checkbox";
                savedInput.name = "Saved checkbox";
                savedInput.id = data.featuredPropertyListings[i].property_id;
                savedInput.value = data.featuredPropertyListings[i].property_id;
                savedInput.disabled = true;
                savedLabel.htmlFor = data.featuredPropertyListings[i].property_id;
                savedLink.href = "./signUp.html";
                savedIcon.src = "../resources/BUYER ICONS AND LOGOS/emptyheart.png";
                savedIcon.alt = "Heart icon empty";
                savedIcon.type = "";
                savedIcon.classList.add('savedIcon');
                    
                property.appendChild(savedInput);
                property.appendChild(savedLabel);
                savedLabel.appendChild(savedLink);
                savedLink.appendChild(savedIcon);
                
            };


            
            const moreIcon = document.createElement('button');

            moreIcon.classList.add('moreIcon');
            moreIcon.innerHTML = "●●●";

            property.appendChild(moreIcon);

            

                //  SHOWS PROPERTY DETAILS.
            async function showModal() {        
                const propertyIdInput = data.featuredPropertyListings[i].property_id;
            
                await fetch('https://dt-comia-realty-and-marketing-production.up.railway.app/history', {
                    method: 'POST',
                    headers: {
                                'User-Agent': 'undici-stream-example',
                                'Content-Type': 'application/json',
                    },
                    credentials: "include",
                    body: JSON.stringify({propertyIdInput})
                });
            
                property.removeEventListener("mouseleave", propertyMousEave);

                propertyDetails.style.display = 'block';
            }

            viewDetail.addEventListener("click", showModal);

            const more = document.createElement('div');
            const ul = document.createElement('ul');
            const ViewSimilarPropertiesLi = document.createElement('li');
            const ViewSimilarProperties = document.createElement('p');
            const scheduleTourLi = document.createElement('li');
            const scheduleTour = document.createElement('a');

            more.classList.add('more');
            ViewSimilarProperties.innerHTML = "View Similar Properties";
            scheduleTour.href = "./contactPage.html";
            scheduleTour.innerHTML = "Call for a Tour";

            property.appendChild(more);
            more.appendChild(ul);
            ul.appendChild(ViewSimilarPropertiesLi);
            ViewSimilarPropertiesLi.appendChild(ViewSimilarProperties);
            ul.appendChild(scheduleTourLi);
            scheduleTourLi.appendChild(scheduleTour);

                //  SHOWS && HIDES MORE.
            function showHideMore(e) {
                const nav = document.querySelector('nav');
                const gradientLayer = document.querySelector('#gradientLayer');
                const menuTab = document.querySelector('#menuTab');
                
                if(moreIcon.contains(e.target)) {
                    if(more.style.display == 'block') {
                        property.style.zIndex = 0;
                        more.style.display = 'none';
                    } else {
                        more.style.display = 'block';
                        property.style.zIndex = 1;
                    }
                } else if(!nav.contains(e.target) &&
                        !gradientLayer.contains(e.target) &&
                        !menuTab.contains(e.target)) {
                            
                    property.style.zIndex = 0;
                    more.style.display = 'none';

                };
            };       

            document.addEventListener("click", showHideMore);   

                //  FUNCTION FOR ViewSimilarProperties.
            async function viewSimilarPropertiesFunction(e) {            
                if(
                    data.featuredPropertyListings[i].property_type != "Bungalow" &&
                    data.featuredPropertyListings[i].property_type != "Two-Storey House" &&
                    data.featuredPropertyListings[i].property_type != "One-and-a-Half Storey House" &&
                    data.featuredPropertyListings[i].property_type != "Multi-Storey House" &&
                    data.featuredPropertyListings[i].property_type != "Split-Level House" &&
                    data.featuredPropertyListings[i].property_type != "Duplex" &&
                    data.featuredPropertyListings[i].property_type != "Triplex / Fourplex" &&
                    data.featuredPropertyListings[i].property_type != "Townhouse / Row House" &&
                    data.featuredPropertyListings[i].property_type != "Semi-Detached House" &&
                    data.featuredPropertyListings[i].property_type != "Single-Detached House" &&
                    data.featuredPropertyListings[i].property_type != "Modern House" &&
                    data.featuredPropertyListings[i].property_type != "Contemporary House" &&
                    data.featuredPropertyListings[i].property_type != "Villa" &&
                    data.featuredPropertyListings[i].property_type != "Cottage" &&
                    data.featuredPropertyListings[i].property_type != "Farmhouse" &&
                    data.featuredPropertyListings[i].property_type != "Beach House" &&
                    data.featuredPropertyListings[i].property_type != "Rest House / Vacation home"
                ) {
                    window.location = "http://127.0.0.1:3001/html/SE1/GROUP%202/customer/landListings.html?location=" + data.featuredPropertyListings[i].location;

                } else {
                    window.location = "http://127.0.0.1:3001/html/SE1/GROUP%202/customer/houseListings.html?location=" + data.featuredPropertyListings[i].location;

                };

            };

            ViewSimilarPropertiesLi.addEventListener("click", viewSimilarPropertiesFunction);



            const propertyDetails = document.createElement('div');
            const propertyModal = document.createElement('div');
            
            propertyDetails.classList.add('propertyDetails');
            propertyModal.classList.add('propertyModal');

            listings.appendChild(propertyDetails);
            propertyDetails.appendChild(propertyModal);


            
                //  HIDES PROPERTY DETIALS.
            function hideModal(e) {

                if(
                    propertyDetails.contains(e.target) &&
                    !propertyModal.contains(e.target)
                ) {
                    
                    propertyDetails.scrollTo(0, 0);

                    propertyDetails.style.display = 'none';

                        //  RESETS CAROUSEL TO ITS FIRST IMAGE.
                    translateCarousel = 0;

                    for(let j = 0; j < imageCount; j++) {
                        images.children[j].style.transform = 'none';
                    };

                    property.style.transform = 'none';
                    property.style.boxShadow = 'none';
                    
                    property.addEventListener("mouseleave", propertyMousEave);

                };
            };

            propertyDetails.addEventListener("click", hideModal);



            const details = document.createElement('div');
            const imageContainerModal = document.createElement('div');
            const propertyMainImage = document.createElement('img');

            details.classList.add('details');
            imageContainerModal.classList.add('imageContainer');

            for(let j = 0; j < data.featuredImageListings.length; j++) {
                if(data.featuredPropertyListings[i].property_id == data.featuredImageListings[j].property_id) {
                    if(data.featuredImageListings[j].field_name == "Main_image") {
                        propertyMainImage.src = data.featuredImageListings[j].path;
                        propertyMainImage.alt = data.featuredImageListings[j].file_name;
                        propertyMainImage.type = data.featuredImageListings[j].mime_type.split('/')[1];

                        break;
                    };
                };
            };
            
            propertyModal.appendChild(details);
            details.appendChild(imageContainerModal);
            imageContainerModal.appendChild(propertyMainImage);

            const status = document.createElement('p');

            status.classList.add('status');
            status.innerHTML = data.featuredPropertyListings[i].status;

            if(data.featuredPropertyListings[i].status == "RESERVED") {
                if(data.reservationListings.length > 0) {
                    for(let j = 0; j < data.reservationListings.length; j++) {
                        if(data.featuredPropertyListings[i].property_id == data.reservationListings[j].property_id) {
                            const reserved = document.createElement('div');
                            const reservedP = document.createElement('p');
                            const dateReserved = new Date(data.reservationListings[j].reservation_period_to);

                            reserved.classList.add('reserved');
                            reservedP.innerHTML = "This property is reserved until<br>" + dateReserved.toDateString() + ".<br>You may still tour this property"; 

                            imageContainerModal.appendChild(reserved);
                            reserved.appendChild(reservedP);

                            break;
                        };
                    };
                };

                status.style.backgroundColor = 'red';
            } else if(data.featuredPropertyListings[i].status == "SOLD") {
                status.style.backgroundColor = 'red';
            } else {
                status.style.backgroundColor = '#00bf63';
            };
            
            imageContainerModal.appendChild(status);
            
            const priceModal = document.createElement('p');
            priceModal.innerHTML = "&#8369;" + data.featuredPropertyListings[i].price;
            details.appendChild(priceModal);



            const reserve = document.createElement('button');
            reserve.innerHTML = 'Reserve this land';
            details.appendChild(reserve);

            if(data.featuredPropertyListings[i].status != "AVAILABLE") {  
                reserve.disabled = true;
                
            } else {           
                if(data.userId != '') {
                    const reserveModal = document.createElement('div');
                    const reserveH1 = document.createElement('h1');
                    const reserveCancel = document.createElement('button');
                    const reservelink = document.createElement('a');
            
                    reserveModal.classList.add('reserveModal');
                    reserveH1.innerHTML = 'You are about to reserve<br><span>' + data.featuredPropertyListings[i].address + '</span><br>During your reservation, this property will be held exclusively for you.';
                    reserveCancel.innerHTML = 'Cancel';
                    reservelink.href = "./landReservationForm.html?propertyId=" + data.featuredPropertyListings[i].property_id;
                    reservelink.innerHTML = 'RESERVE';
                
                    details.appendChild(reserveModal);
                    reserveModal.appendChild(reserveH1);
                    reserveModal.appendChild(reserveCancel);
                    reserveModal.appendChild(reservelink);
                
                        //  HIDES RESERVE MODAL.
                    function hideReserveModal(e) {
                        if(
                            !reserveModal.contains(e.target) ||
                            reserveCancel.contains(e.target)
                        ) {
                            reserveModal.style.display = 'none';
                            propertyDetails.removeEventListener("click", hideReserveModal);
                            reserve.addEventListener("click", showReserveModal);
                        };

                    };

                        //  SHOWS RESERVE MODAL.
                    function showReserveModal() {
                        reserveModal.style.display = 'block';

                            // DELAY LISTENER BY 10ms TO AVOID TRIGGERING hideReserveModal IMMEDIATELY.
                        setTimeout(function() {
                            propertyDetails.addEventListener("click", hideReserveModal);
                        }, 10);

                        reserve.removeEventListener("click", showReserveModal);
                    };

                    reserve.addEventListener("click", showReserveModal);
                
                } else {
                        //  DIRECT TO SIGN UP PAGE.
                    function directSignUpPage() {
                        window.location = "signUp.html";
                    };

                    reserve.addEventListener("click", directSignUpPage);

                };

            };


            
            const propertyType = document.createElement('p');
            const hr = document.createElement('hr');
            const locationModal = document.createElement('a');
            const bedRooms = document.createElement('p');
            const bedRoomsCount = document.createElement('p');
            const bathRooms = document.createElement('p');
            const bathrRoomsCount = document.createElement('p');
            const area = document.createElement('p');
            const measurments = document.createElement('p');
            const images = document.createElement('div');
         
            propertyType.innerHTML = data.featuredPropertyListings[i].property_type;
            locationModal.href = "./gpsSystem.html";
            locationModal.innerHTML = "View Location";
            bedRooms.innerHTML = "Bedrooms";
            bedRoomsCount.innerHTML = data.featuredPropertyListings[i].room_count;
            bathRooms.innerHTML = "Bathrooms";
            bathrRoomsCount.innerHTML = data.featuredPropertyListings[i].bath_count;
            area.innerHTML = "Area";
            measurments.classList.add('measurements');
            measurments.innerHTML = data.featuredPropertyListings[i].area + "sq";
            images.classList.add('images');

            details.appendChild(propertyType);
            details.appendChild(hr);
            details.appendChild(locationModal);
            details.appendChild(bedRooms);
            details.appendChild(bedRoomsCount);
            details.appendChild(bathRooms);
            details.appendChild(bathrRoomsCount);
            details.appendChild(area);
            details.appendChild(measurments);
            propertyModal.appendChild(images);

            

                //  INITIALIZE THE VALUE FOR imageCount.
            let imageCount = 0;

            for(let j = 0; j < data.featuredImageListings.length; j++) {
                if(data.featuredPropertyListings[i].property_id == data.featuredImageListings[j].property_id) {
                    if(data.featuredImageListings[j].field_name == "Additional_images") {
                        imageCount++;

                        const image = document.createElement('img');

                        image.src = data.featuredImageListings[j].path;
                        image.alt = data.featuredImageListings[j].file_name;
                        image.type = data.featuredImageListings[j].mime_type.split('/')[1];

                        images.appendChild(image);
                    };
                };
            };

                // INITIALLY ADDS 100% TRANSLATE TO ITS TRANSFORM.
            let translateCarousel = 0;
            
            if(images.children.length > 1) {
                const previousButton = document.createElement('button');
                const previous = document.createElement('img');
                const nextButton = document.createElement('button');
                const next = document.createElement('img');

                previousButton.classList.add('previousIcon');
                previous.src = "https://niwxujzmwpdhegjlmyfw.supabase.co/storage/v1/object/public/D.T.%20Comia%20Realty%20and%20Marketing/BUYER ICONS AND LOGOS/left arrow-white.png"
                previous.alt = "Previous icon";
                previous.type = "";
                nextButton.classList.add('nextIcon');
                next.src = "https://niwxujzmwpdhegjlmyfw.supabase.co/storage/v1/object/public/D.T.%20Comia%20Realty%20and%20Marketing/BUYER ICONS AND LOGOS/right arrow.png";
                next.alt = "Next icon";
                next.type = "";

                images.appendChild(previousButton);
                previousButton.appendChild(previous);
                images.appendChild(nextButton);
                nextButton.appendChild(next);

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
                    for(let j = 0; j < imageCount; j++) {
                        images.children[j].style.transform = 'translate(' + translateValue * 100 + '%, 0)';
                    };
                };  
            };



            const div2Modal = document.createElement('div');
            const Description = document.createElement('p');
            const description = document.createElement('p');
            
            div2Modal.classList.add('description');
            Description.innerHTML = "Description";
            description.innerHTML = data.featuredPropertyListings[i].description;

            propertyDetails.appendChild(div2Modal);
            div2Modal.appendChild(Description);
            div2Modal.appendChild(description);
        }

    };

};



    //  FUNCTION FOR PROPERTY COUNT.
function setPropertyCountAndRun() {
    //  SET propertyCount TO 4 IF THE WINDOW WIDTH WERE LESSTHAN 1025 AND GREATEDTHAN 710, ELSE propertyCount SETS TO 3.
    if(window.innerWidth < 1025 && window.innerWidth > 710) {
        propertyCount = 4;
    } else {
        propertyCount = 3;
    };

        //  RUNS featuredProperty AFTER SETTING propertyCount.
    featuredProperty().catch(console.error);

};

setPropertyCountAndRun();

    //  COMBINED THE FUNCTION FOR PROPERTY COUNT AND hideMenuTab BECAUSE ITS NOT ALLOWED TO BOUND TWO FUNCTION IN ONE ELEMENT(window).
window.onresize = function() {
    hideMenuTab();
    setPropertyCountAndRun();
};