
//  .
async function houseListings2() {    
    const response = await fetch('https://dt-comia-realty-and-marketing-production.up.railway.app/house-listings-2', {
        method: 'GET',
        credentials: "include",
    });
    const data = await response.json();

    const listings = document.querySelector('#houseListings2');

        //  CLEAR THE #listings BEFORE DISPLAYING THE UPDATED PROPERTY LISTINGS.
    listings.innerHTML = "";

        // INITIALLY ADDS 100% TRANSLATE TO ITS TRANSFORM.
    let translateCarousel = 0;

    for (let i = 0; i < data.houseListings.length; i++) {
        
            //  FUNCTION FOR PROPERTY mouseenter.
        function propertyMousEnter(e) {
            e.target.style.transform = 'scale(1.05)';
            e.target.style.transition = 'transform 0.25s';
            e.target.style.boxShadow = '0px 0px 10px #4e6e5d';
        };

            //  FUNCTION FOR PROPERTY mouseleave.
        function propertyMousEave(e) {
            e.target.style.transform = 'none';
            e.target.style.transition = 'none';
            e.target.style.boxShadow = 'none';
        };

            //  FUNCTION FOR AVAILABLE PROPERTY mouseenter.
        function availablePropertyMousEnter(e) {
            e.target.style.backgroundColor = '#4e6e5d';
            e.target.style.color = '#ffffff';
            e.target.style.transform = 'scale(1.05)';
            e.target.style.transition = 'transform 0.25s';
            e.target.style.boxShadow = '0px 0px 10px #4e6e5d';
        };

            //  FUNCTION FOR AVAILABLE PROPERTY mouseleave.
        function availablePropertyMousEave(e) {
            e.target.style.backgroundColor = 'transparent';
            e.target.style.color = '#4e6e5d';
            e.target.style.transform = 'none';
            e.target.style.transition = 'none';
            e.target.style.boxShadow = 'none';
        };
        
            //  FUNCTION FOR RESERVED PROPERTY mouseenter.
        function reservedPropertyMousEnter(e) {
            e.target.style.backgroundColor = 'red';
            e.target.style.color = '#ffffff';
            e.target.style.transform = 'scale(1.05)';
            e.target.style.transition = 'transform 0.25s';
            e.target.style.boxShadow = '0px 0px 10px red';
        };

            //  FUNCTION FOR RESERVED PROPERTY mouseleave.
        function reservedPropertyMousEave(e) {
            e.target.style.backgroundColor = 'transparent';
            e.target.style.color = 'red';
            e.target.style.transform = 'none';
            e.target.style.transition = 'none';
            e.target.style.boxShadow = 'none';
        };

        const property = document.createElement('div');
        const imageContainer = document.createElement('div');
        const propertyImage = document.createElement('img');
        const removeDelete = document.createElement('button');
        const price = document.createElement('p');
        const address = document.createElement('p');
        const bedIcon = document.createElement('img');
        const bedCount = document.createElement('p');
        const bathtubIcon = document.createElement('img');
        const bathtubCount = document.createElement('p');
        const viewDetail = document.createElement('button');
        const propertyId = document.createElement('input');

        property.classList.add('property');
        imageContainer.classList.add('imageContainer');

        for(let j = 0; j < data.imageListings.length; j++) {
            if(data.houseListings[i].property_id == data.imageListings[j].property_id) {
                if(data.imageListings[j].field_name == "Main_image") {
                    propertyImage.src = data.imageListings[j].path;
                    propertyImage.alt = data.imageListings[j].file_name;
                    propertyImage.type = data.imageListings[j].mime_type;

                    break;
                };
            };
        };

        removeDelete.innerHTML = "x";
        removeDelete.classList.add('removeDelete');
        price.innerHTML = "&#8369;" + data.houseListings[i].price;
        address.innerHTML = data.houseListings[i].address;
        bedIcon.src = "https://niwxujzmwpdhegjlmyfw.supabase.co/storage/v1/object/public/D.T.%20Comia%20Realty%20and%20Marketing/AGENT ICONS/bed.png";
        bedIcon.alt = "Bed icon";
        bedIcon.type = "";
        bedCount.innerHTML = data.houseListings[i].room_count;
        bathtubIcon.src = "https://niwxujzmwpdhegjlmyfw.supabase.co/storage/v1/object/public/D.T.%20Comia%20Realty%20and%20Marketing/AGENT ICONS/bathtub.png";
        bathtubIcon.alt = "Bathtub icon";
        bathtubIcon.type = "";
        bathtubCount.innerHTML = data.houseListings[i].bath_count;
        viewDetail.classList.add('viewDetails')
        viewDetail.innerHTML = "VIEW DETAILS";
        propertyId.type = "hidden";
        propertyId.name = "Property Id";
        propertyId.value = data.houseListings[i].property_id;

        listings.appendChild(property);
        property.appendChild(imageContainer);
        imageContainer.appendChild(propertyImage);
        imageContainer.appendChild(removeDelete);
        property.appendChild(price);
        property.appendChild(address);
        property.appendChild(bedIcon);
        property.appendChild(bedCount);
        property.appendChild(bathtubIcon);
        property.appendChild(bathtubCount);
        property.appendChild(viewDetail);
        property.appendChild(propertyId);
    
        property.addEventListener("mouseenter", propertyMousEnter);
        property.addEventListener("mouseleave", propertyMousEave);

            //  FUNCTION FOR deletePropery.
        async function deleteProperty() {
            const propertyIdInput = data.houseListings[i].property_id;
    
            const response = await fetch('https://dt-comia-realty-and-marketing-production.up.railway.app/delete-property', {
                method: 'POST',
                headers: {                    
                            'User-Agent': 'undici-stream-example',
                            'Content-Type': 'application/json'
                },
                credentials: "include",
                body: JSON.stringify({propertyIdInput}),
            });
        };

        function removeDeleteFunction() {
            deleteProperty().catch(console.error);

                // DELAY BY 10ms TO AVOID TRIGGERING houseListings2 IMMEDIATELY.
            setTimeout(() => {
                houseListings2().catch(console.error);
            }, 10);
        }

        removeDelete.addEventListener("click", removeDeleteFunction);

        if(data.houseListings[i].status != "AVAILABLE") {
           viewDetail.style.borderColor = "red";
           viewDetail.style.color = "red";
           viewDetail.addEventListener("mouseenter", reservedPropertyMousEnter);
           viewDetail.addEventListener("mouseleave", reservedPropertyMousEave);
        } else {
           viewDetail.style.borderColor = "#4e6e5d";
           viewDetail.style.color = "#4e6e5d";
           viewDetail.addEventListener("mouseenter", availablePropertyMousEnter);
           viewDetail.addEventListener("mouseleave", availablePropertyMousEave);
        };

        

            //  SHOWS PROPERTY DETAILS.
        function showModal() {            
            property.removeEventListener("mouseleave", propertyMousEave);

            propertyDetails.style.display = 'block';
        }

        viewDetail.addEventListener("click", showModal);



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
                    div.children[j].style.transform = 'none';
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

        for(let j = 0; j < data.imageListings.length; j++) {
            if(data.houseListings[i].property_id == data.imageListings[j].property_id) {
                if(data.imageListings[j].field_name == "Main_image") {
                    propertyMainImage.src = data.imageListings[j].path;
                    propertyMainImage.alt = data.imageListings[j].file_name;
                    propertyMainImage.type = data.imageListings[j].mime_type;

                    break;
                };
            };
        };
        
        propertyModal.appendChild(details);
        details.appendChild(imageContainerModal);
        imageContainerModal.appendChild(propertyMainImage);

        const status = document.createElement('p');

        status.classList.add('status');
        status.innerHTML = data.houseListings[i].status;

        if(data.houseListings[i].status == "RESERVED") {
            status.style.backgroundColor = 'red';
        } else if(data.houseListings[i].status == "SOLD") {
            status.style.backgroundColor = 'red';
        } else {
            status.style.backgroundColor = '#6ba460';
        };

        imageContainerModal.appendChild(status);
            
        const priceModal = document.createElement('p');
        priceModal.innerHTML = "&#8369;" + data.houseListings[i].price;
        details.appendChild(priceModal);
            
            

        const markAsSold = document.createElement('button');   
                    
                
        markAsSold.innerHTML = "MARK AS SOLD";
        markAsSold.classList.add('markAsSold');

        details.appendChild(markAsSold);
            
             //  FUNCTION FOR MARKING PROPERTY AS SOLD.
        async function markSoldunction() {
            const propertyIdInput = data.houseListings[i].property_id;

            const response = await fetch('https://dt-comia-realty-and-marketing-production.up.railway.app/mark-sold', {
                method: 'POST',
                headers: {                    
                            'User-Agent': 'undici-stream-example',
                            'Content-Type': 'application/json',
                },
                credentials: "include",
                 body: JSON.stringify({propertyIdInput})
            });

            houseListings2().catch(console.error);

        };
            
        markAsSold.addEventListener("click", markSoldunction);


        
        if(data.houseListings[i].status == "SOLD") {
            markAsSold.disabled = true;
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
        const div = document.createElement('div');
         
        propertyType.innerHTML = data.houseListings[i].property_type;
        locationModal.href = "../customer/gpsSystem.html?role=agent";
        locationModal.innerHTML = "View Location";
        bedRooms.innerHTML = "Bedrooms";
        bedRoomsCount.innerHTML = data.houseListings[i].room_count;
        bathRooms.innerHTML = "Bathrooms";
        bathrRoomsCount.innerHTML = data.houseListings[i].bath_count;
        area.innerHTML = "Area";
        measurments.classList.add('measurements');
        measurments.innerHTML = data.houseListings[i].area + "sq";
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
        images.appendChild(div);
        

        
            //  INITIALIZE THE VALUE FOR imageCount.
        let imageCount = 0;

        for(let j = 0; j < data.imageListings.length; j++) {
            if(data.houseListings[i].property_id == data.imageListings[j].property_id) {
                if(data.imageListings[j].field_name == "Additional_images") {
                    imageCount++;

                    const image = document.createElement('img');

                    image.src = data.imageListings[j].path;
                    image.alt = data.imageListings[j].file_name;
                    image.type = data.imageListings[j].mime_type;

                    div.appendChild(image);
                };
            };
        };

            // INITIALLY ADDS 100% TRANSLATE TO ITS TRANSFORM.
        let translateCarousel = 0;
                    
        if(div.children.length > 1) {
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

            div.appendChild(previousButton);
            previousButton.appendChild(previous);
            div.appendChild(nextButton);
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
                    div.children[j].style.transform = 'translate(' + translateValue * 100 + '%, 0)';
                }
            };     
        
        };



        const div2Modal = document.createElement('div');
        const Description = document.createElement('p');
        const description = document.createElement('p');
            
        div2Modal.classList.add('description');
        Description.innerHTML = "Description";
        description.innerHTML = data.houseListings[i].description;

        propertyDetails.appendChild(div2Modal);
        div2Modal.appendChild(Description);
        div2Modal.appendChild(description);

    };

};

houseListings2().catch(console.error);