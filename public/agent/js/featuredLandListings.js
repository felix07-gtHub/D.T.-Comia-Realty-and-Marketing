    //  .
async function featuredLandListings() {    
    const response = await fetch('https://dt-comia-realty-and-marketing-production.up.railway.app/featured-land-listings', {
        method: 'GET',
        credentials: "include",
    });
    const data = await response.json();

    const listings = document.querySelector('#featuredLandListings');

        //  CLEAR THE #listings BEFORE DISPLAYING THE UPDATED PROPERTY LISTINGS.
    listings.innerHTML = "";

        // INITIALLY ADDS 100% TRANSLATE TO ITS TRANSFORM.
    let translateCarousel = 0;

    for (let i = 0; i < data.featuredLandListings.length; i++) {
        
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

        property.classList.add('property');
        imageContainer.classList.add('imageContainer');
        propertyImage.src = 'https://niwxujzmwpdhegjlmyfw.supabase.co/storage/v1/object/public/D.T.%20Comia%20Realty%20and%20Marketing/PROPERTY/' + data.featuredLandListings[i].user_id + '/' + data.featuredLandListings[i].property_id + '/' + data.featuredLandListings[i].main_image;
        propertyImage.alt =  data.featuredLandListings[i].main_image;
        propertyImage.type = "";
        removeDelete.innerHTML = "x";
        removeDelete.classList.add('removeDelete');
        price.innerHTML = "&#8369;" + data.featuredLandListings[i].price_formatted;
        address.innerHTML = data.featuredLandListings[i].address;
        bedIcon.src = "https://niwxujzmwpdhegjlmyfw.supabase.co/storage/v1/object/public/D.T.%20Comia%20Realty%20and%20Marketing/AGENT ICONS/bed.png";
        bedIcon.alt = "Bed icon";
        bedIcon.type = "";
        bedCount.innerHTML = data.featuredLandListings[i].room_count;
        bathtubIcon.src = "https://niwxujzmwpdhegjlmyfw.supabase.co/storage/v1/object/public/D.T.%20Comia%20Realty%20and%20Marketing/AGENT ICONS/bathtub.png";
        bathtubIcon.alt = "Bathtub icon";
        bathtubIcon.type = "";
        bathtubCount.innerHTML = data.featuredLandListings[i].bath_count;
        viewDetail.classList.add('viewDetails')
        viewDetail.innerHTML = "VIEW DETAILS";

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

        property.addEventListener("mouseenter", propertyMousEnter);
        property.addEventListener("mouseleave", propertyMousEave);

            //  FUNCTION FOR removeFeatured.
        async function removeFeatured() {
            const propertyIdInput = data.featuredLandListings[i].property_id;
    
            const response = await fetch('https://dt-comia-realty-and-marketing-production.up.railway.app/remove-featured', {
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
            removeFeatured().catch(console.error);

                // DELAY BY 10ms TO AVOID TRIGGERING propertylistings2 AND featuredLandListings IMMEDIATELY.
            setTimeout(() => {
                propertylistings2().catch(console.error);
                featuredLandListings().catch(console.error);
            }, 10);
        }

        removeDelete.addEventListener("click", removeDeleteFunction);

        if(data.featuredLandListings[i].status != "AVAILABLE") {
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
        propertyMainImage.src = 'https://niwxujzmwpdhegjlmyfw.supabase.co/storage/v1/object/public/D.T.%20Comia%20Realty%20and%20Marketing/PROPERTY/' + data.featuredLandListings[i].user_id + '/' + data.featuredLandListings[i].property_id + '/' + data.featuredLandListings[i].main_image;
        propertyMainImage.alt = data.featuredLandListings[i].main_image;
        propertyMainImage.type = "";
        
        propertyModal.appendChild(details);
        details.appendChild(imageContainerModal);
        imageContainerModal.appendChild(propertyMainImage);
        
        const status = document.createElement('p');

        status.classList.add('status');
        status.innerHTML = data.featuredLandListings[i].status;

        if(data.featuredLandListings[i].status == "RESERVED") {
            status.style.backgroundColor = 'red';
        } else if(data.featuredLandListings[i].status == "SOLD") {
            status.style.backgroundColor = 'red';
        } else {
            status.style.backgroundColor = '#6ba460';
        };

        imageContainerModal.appendChild(status);
            
        const priceModal = document.createElement('p');
        priceModal.innerHTML = "&#8369;" + data.featuredLandListings[i].price_formatted;
        details.appendChild(priceModal);
          
            
        
        const markAsSold = document.createElement('button');   
                    
        markAsSold.innerHTML = "MARK AS SOLD";
        markAsSold.classList.add('markAsSold');

        details.appendChild(markAsSold);
            
             //  FUNCTION FOR MARKING PROPERTY AS SOLD.
        async function markSoldunction() {
            const propertyIdInput = data.featuredLandListings[i].property_id;

            const response = await fetch('https://dt-comia-realty-and-marketing-production.up.railway.app/mark-sold', {
                method: 'POST',
                headers: {                    
                            'User-Agent': 'undici-stream-example',
                            'Content-Type': 'application/json',
                },
                credentials: "include",
                 body: JSON.stringify({propertyIdInput})
            });

            featuredLandListings().catch(console.error);

        };
            
        markAsSold.addEventListener("click", markSoldunction);


        
        if(data.featuredLandListings[i].status == "sold") {
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
         
        propertyType.innerHTML = data.featuredLandListings[i].property_type;
        locationModal.href = "";
        locationModal.innerHTML = "View Location";
        bedRooms.innerHTML = "Bedrooms";
        bedRoomsCount.innerHTML = data.featuredLandListings[i].room_count;
        bathRooms.innerHTML = "Bathrooms";
        bathrRoomsCount.innerHTML = data.featuredLandListings[i].bath_count;
        area.innerHTML = "Area";
        measurments.classList.add('measurements');
        measurments.innerHTML = data.featuredLandListings[i].area_formatted + "sq";
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

            //  IF EITHER OF IMAGE_1... AREN'T EMPTY,
            //  UPADTES THE imageCount VALUE,
            //  CREATES IMAGE ELEMENTS,
            //  DISPLAYS FETCHED IMAGE FROM DATABASE
            //  AND ADDS TO DIV ELEMENT.
        if(data.featuredLandListings[i].image_1 != null) {
            imageCount++;

            const imageDiv = document.createElement('div');
            const image1 = document.createElement('img');

            image1.src = 'https://niwxujzmwpdhegjlmyfw.supabase.co/storage/v1/object/public/D.T.%20Comia%20Realty%20and%20Marketing/PROPERTY/' + data.featuredLandListings[i].user_id + '/' + data.featuredLandListings[i].property_id + '/' + data.featuredLandListings[i].image_1;
            image1.alt =  data.featuredLandListings[i].image_1;
            image1.type = "";
            
            div.appendChild(imageDiv);
            imageDiv.appendChild(image1);
        };

        if(data.featuredLandListings[i].image_2 != null) {
            imageCount++;

            const imageDiv = document.createElement('div');
            const image2 = document.createElement('img');

            image2.src = 'https://niwxujzmwpdhegjlmyfw.supabase.co/storage/v1/object/public/D.T.%20Comia%20Realty%20and%20Marketing/PROPERTY/' + data.featuredLandListings[i].user_id + '/' + data.featuredLandListings[i].property_id + '/' + data.featuredLandListings[i].image_2;
            image2.alt =  data.featuredLandListings[i].image_2;
            image2.type = "";
            
            div.appendChild(imageDiv);
            imageDiv.appendChild(image2);
        }

        if(data.featuredLandListings[i].image_3 != null) {
            imageCount++;

            const imageDiv = document.createElement('div');
            const image3 = document.createElement('img');

            image3.src = 'https://niwxujzmwpdhegjlmyfw.supabase.co/storage/v1/object/public/D.T.%20Comia%20Realty%20and%20Marketing/PROPERTY/' + data.featuredLandListings[i].user_id + '/' + data.featuredLandListings[i].property_id + '/' + data.featuredLandListings[i].image_3;
            image3.alt =  data.featuredLandListings[i].image_3;
            image3.type = "";
            
            div.appendChild(imageDiv);
            imageDiv.appendChild(image3);
        };

        if(data.featuredLandListings[i].image_4 != null) {
            imageCount++;

            const imageDiv = document.createElement('div');
            const image4 = document.createElement('img');

            image4.src = 'https://niwxujzmwpdhegjlmyfw.supabase.co/storage/v1/object/public/D.T.%20Comia%20Realty%20and%20Marketing/PROPERTY/' + data.featuredLandListings[i].user_id + '/' + data.featuredLandListings[i].property_id + '/' + data.featuredLandListings[i].image_4;
            image4.alt =  data.featuredLandListings[i].image_4;
            image4.type = "";
            
            div.appendChild(imageDiv);
            imageDiv.appendChild(image4);
        };

        if(data.featuredLandListings[i].image_5 != null) {
            imageCount++;

            const imageDiv = document.createElement('div');
            const image5 = document.createElement('img');

            image5.src = 'https://niwxujzmwpdhegjlmyfw.supabase.co/storage/v1/object/public/D.T.%20Comia%20Realty%20and%20Marketing/PROPERTY/' + data.featuredLandListings[i].user_id + '/' + data.featuredLandListings[i].property_id + '/' + data.featuredLandListings[i].image_5;
            image5.alt =  data.featuredLandListings[i].image_5;
            image5.type = "";
            
            div.appendChild(imageDiv);
            imageDiv.appendChild(image5);
        };

        if(data.featuredLandListings[i].image_6 != null) {
            imageCount++;

            const imageDiv = document.createElement('div');
            const image6 = document.createElement('img');

            image6.src = 'https://niwxujzmwpdhegjlmyfw.supabase.co/storage/v1/object/public/D.T.%20Comia%20Realty%20and%20Marketing/PROPERTY/' + data.featuredLandListings[i].user_id + '/' + data.featuredLandListings[i].property_id + '/' + data.featuredLandListings[i].image_6;
            image6.alt =  data.featuredLandListings[i].image_6;
            image6.type = "";

            div.appendChild(imageDiv);
            imageDiv.appendChild(image6);
        };

        if(data.featuredLandListings[i].image_7 != null) {
            imageCount++;

            const imageDiv = document.createElement('div');
            const image7 = document.createElement('img');

            image7.src = 'https://niwxujzmwpdhegjlmyfw.supabase.co/storage/v1/object/public/D.T.%20Comia%20Realty%20and%20Marketing/PROPERTY/' + data.featuredLandListings[i].user_id + '/' + data.featuredLandListings[i].property_id + '/' + data.featuredLandListings[i].image_7;
            image7.alt =  data.featuredLandListings[i].image_7;
            image7.type = "";
            
            div.appendChild(imageDiv);
            imageDiv.appendChild(image7);
        };

        if(data.featuredLandListings[i].image_8 != null) {
            imageCount++;

            const imageDiv = document.createElement('div');
            const image8 = document.createElement('img');

            image8.src = 'https://niwxujzmwpdhegjlmyfw.supabase.co/storage/v1/object/public/D.T.%20Comia%20Realty%20and%20Marketing/PROPERTY/' + data.featuredLandListings[i].user_id + '/' + data.featuredLandListings[i].property_id + '/' + data.featuredLandListings[i].image_8;
            image8.alt =  data.featuredLandListings[i].image_8;
            image8.type = "";
            
            div.appendChild(imageDiv);
            imageDiv.appendChild(image8);
        };

        if(data.featuredLandListings[i].image_9 != null) {
            imageCount++;

            const imageDiv = document.createElement('div');
            const image9 = document.createElement('img');

            image9.src = 'https://niwxujzmwpdhegjlmyfw.supabase.co/storage/v1/object/public/D.T.%20Comia%20Realty%20and%20Marketing/PROPERTY/' + data.featuredLandListings[i].user_id + '/' + data.featuredLandListings[i].property_id + '/' + data.featuredLandListings[i].image_9;
            image9.alt =  data.featuredLandListings[i].image_9;
            image9.type = "";
            
            div.appendChild(imageDiv);
            imageDiv.appendChild(image9);
        };

        if(data.featuredLandListings[i].image_10 != null) {
            imageCount++;

            const imageDiv = document.createElement('div');
            const image10 = document.createElement('img');

            image10.src = 'https://niwxujzmwpdhegjlmyfw.supabase.co/storage/v1/object/public/D.T.%20Comia%20Realty%20and%20Marketing/PROPERTY/' + data.featuredLandListings[i].user_id + '/' + data.featuredLandListings[i].property_id + '/' + data.featuredLandListings[i].image_10;
            image10.alt =  data.featuredLandListings[i].image_1;
            image10.type = "";
            
            div.appendChild(imageDiv);
            imageDiv.appendChild(image10);
        };



            // INITIALLY ADDS 100% TRANSLATE TO ITS TRANSFORM.
        let translateCarousel = 0;

        if(data.featuredLandListings[i].image_2 != null) {
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
        description.innerHTML = data.featuredLandListings[i].description;

        propertyDetails.appendChild(div2Modal);
        div2Modal.appendChild(Description);
        div2Modal.appendChild(description);

    };

    const featured = document.createElement('button');
    featured.id = "featured";
    featured.innerHTML= "+";
    listings.appendChild(featured);

        //  RUNS featuredCheckedTrue AND UPDATES THE FUNCTION FOR featured.
    function toggleFeaturedFunction() {

        enableFeaturedFunction();

        featured.removeEventListener("click", toggleFeaturedFunction);
        featured.addEventListener("click", featuredFunction);

    };

    featured.addEventListener("click", toggleFeaturedFunction);
    
        //  RUNS featuredCheckedTrue, UPDATES BOTH propertylistings2 AND featuredLandListings FINALLY, UPDATES THE FUNCTION FOR featured.
    function featuredFunction() {

        featuredCheckedTrue();

            // DELAY BY 10ms TO AVOID TRIGGERING propertylistings2 AND featuredLandListings IMMEDIATELY.
        setTimeout(() => {
            landListings2().catch(console.error);
            featuredLandListings().catch(console.error);
        }, 10);

        featured.removeEventListener("click", featuredFunction);
        featured.addEventListener("click", toggleFeaturedFunction);

    };

};

featuredLandListings().catch(console.error);