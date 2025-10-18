const listings = document.querySelector('#deletedListings');

    //  .
async function deletedListings() {    
    const response = await fetch('https://dt-comia-realty-and-marketing-production.up.railway.app/deleted-listings', {
        method: 'GET',
        credentials: "include",
    });
    const data = await response.json();

    
        //  CLEAR THE #listings BEFORE DISPLAYING THE UPDATED PROPERTY LISTINGS.
    listings.innerHTML = "";

        // INITIALLY ADDS 100% TRANSLATE TO ITS TRANSFORM.
    let translateCarousel = 0;

    if(data.deletedPropertyListings.length > 0) {
        for (let i = 0; i < data.deletedPropertyListings.length; i++) {  
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
            propertyImage.src = 'https://niwxujzmwpdhegjlmyfw.supabase.co/storage/v1/object/public/D.T.%20Comia%20Realty%20and%20Marketing/PROPERTY/' + data.deletedPropertyListings[i].user_id + '/' + data.deletedPropertyListings[i].property_id + '/' + data.deletedPropertyListings[i].main_image;          
            propertyImage.alt =  data.deletedPropertyListings[i].main_image;
            propertyImage.type = "";
            price.innerHTML = "&#8369;" + data.deletedPropertyListings[i].price_formatted;
            address.innerHTML = data.deletedPropertyListings[i].address;
            bedIcon.src = "https://niwxujzmwpdhegjlmyfw.supabase.co/storage/v1/object/public/D.T.%20Comia%20Realty%20and%20Marketing/AGENT ICONS/bed.png";
            bedIcon.alt = "Bed icon";
            bedIcon.type = "";
            bedCount.innerHTML = data.deletedPropertyListings[i].room_count;
            bathtubIcon.src = "https://niwxujzmwpdhegjlmyfw.supabase.co/storage/v1/object/public/D.T.%20Comia%20Realty%20and%20Marketing/AGENT ICONS/bathtub.png";
            bathtubIcon.alt = "Bathtub icon";
            bathtubIcon.type = "";
            bathtubCount.innerHTML = data.deletedPropertyListings[i].bath_count;
            viewDetail.classList.add('viewDetails')
            viewDetail.innerHTML = "VIEW DETAILS";
            propertyId.type = "hidden";
            propertyId.name = "Property Id";
            propertyId.value = data.deletedPropertyListings[i].property_id;

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
            property.appendChild(propertyId);

            property.addEventListener("mouseenter", propertyMousEnter);
            property.addEventListener("mouseleave", propertyMousEave);

            if(data.deletedPropertyListings[i].status != "AVAILABLE") {
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
            propertyMainImage.src = 'https://niwxujzmwpdhegjlmyfw.supabase.co/storage/v1/object/public/D.T.%20Comia%20Realty%20and%20Marketing/PROPERTY/' + data.deletedPropertyListings[i].user_id + '/' + data.deletedPropertyListings[i].property_id + '/' + data.deletedPropertyListings[i].main_image;
            propertyMainImage.alt = data.deletedPropertyListings[i].main_image;
            propertyImage.type = "";
            
            propertyModal.appendChild(details);
            details.appendChild(imageContainerModal);
            imageContainerModal.appendChild(propertyMainImage);
        
            const status = document.createElement('p');

            status.classList.add('status');
            status.innerHTML = data.deletedPropertyListings[i].status;

            if(data.deletedPropertyListings[i].status == "RESERVED") {
                status.style.backgroundColor = 'red';
            } else if(data.deletedPropertyListings[i].status == "SOLD") {
                status.style.backgroundColor = 'red';
            } else {
                status.style.backgroundColor = '#6ba460';
            };

            imageContainerModal.appendChild(status);
            
            const priceModal = document.createElement('p');
            priceModal.innerHTML = "&#8369;" + data.deletedPropertyListings[i].price_formated;
            details.appendChild(priceModal);



            const propertyType = document.createElement('p');
            const hr = document.createElement('hr');
            const bedRooms = document.createElement('p');
            const bedRoomsCount = document.createElement('p');
            const bathRooms = document.createElement('p');
            const bathrRoomsCount = document.createElement('p');
            const area = document.createElement('p');
            const measurments = document.createElement('p');
            const images = document.createElement('div');
            const div = document.createElement('div');
            
            propertyType.innerHTML = data.deletedPropertyListings[i].property_type;
            bedRooms.innerHTML = "Bedrooms";
            bedRoomsCount.innerHTML = data.deletedPropertyListings[i].room_count;
            bathRooms.innerHTML = "Bathrooms";
            bathrRoomsCount.innerHTML = data.deletedPropertyListings[i].bath_count;
            area.innerHTML = "Area";
            measurments.classList.add('measurements');
            measurments.innerHTML = data.deletedPropertyListings[i].area_formatted + "sq";
            images.classList.add('images');

            details.appendChild(propertyType);
            details.appendChild(hr);
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
            if(data.deletedPropertyListings[i].image_1 != null) {
                imageCount++;

                const image1 = document.createElement('img');

                image1.src = 'https://niwxujzmwpdhegjlmyfw.supabase.co/storage/v1/object/public/D.T.%20Comia%20Realty%20and%20Marketing/PROPERTY/' + data.deletedPropertyListings[i].user_id + '/' + data.deletedPropertyListings[i].property_id + '/' + data.deletedPropertyListings[i].image_1;
                image1.alt =  data.deletedPropertyListings[i].image_1;
                image1.type = "";
                
                div.appendChild(image1);
            };

            if(data.deletedPropertyListings[i].image_2 != null) {
                imageCount++;

                const image2 = document.createElement('img');

                image2.src = 'https://niwxujzmwpdhegjlmyfw.supabase.co/storage/v1/object/public/D.T.%20Comia%20Realty%20and%20Marketing/PROPERTY/' + data.deletedPropertyListings[i].user_id + '/' + data.deletedPropertyListings[i].property_id + '/' + data.deletedPropertyListings[i].image_2;
                image2.alt =  data.deletedPropertyListings[i].image_2;
                image2.type = "";
                
                div.appendChild(image2);
            };

            if(data.deletedPropertyListings[i].image_3 != null) {
                imageCount++;

                const image3 = document.createElement('img');

                image3.src = 'https://niwxujzmwpdhegjlmyfw.supabase.co/storage/v1/object/public/D.T.%20Comia%20Realty%20and%20Marketing/PROPERTY/' + data.deletedPropertyListings[i].user_id + '/' + data.deletedPropertyListings[i].property_id + '/' + data.deletedPropertyListings[i].image_3;
                image3.alt =  data.deletedPropertyListings[i].image_3;
                image3.type = "";
                
                div.appendChild(image3);
            };

            if(data.deletedPropertyListings[i].image_4 != null) {
                imageCount++;

                const image4 = document.createElement('img');

                image4.src = 'https://niwxujzmwpdhegjlmyfw.supabase.co/storage/v1/object/public/D.T.%20Comia%20Realty%20and%20Marketing/PROPERTY/' + data.deletedPropertyListings[i].user_id + '/' + data.deletedPropertyListings[i].property_id + '/' + data.deletedPropertyListings[i].image_4;
                image4.alt =  data.deletedPropertyListings[i].image_4;
                image4.type = "";
                
                div.appendChild(image4);
            };

            if(data.deletedPropertyListings[i].image_5 != null) {
                imageCount++;

                const image5 = document.createElement('img');

                image5.src = 'https://niwxujzmwpdhegjlmyfw.supabase.co/storage/v1/object/public/D.T.%20Comia%20Realty%20and%20Marketing/PROPERTY/' + data.deletedPropertyListings[i].user_id + '/' + data.deletedPropertyListings[i].property_id + '/' + data.deletedPropertyListings[i].image_5;
                image5.alt =  data.deletedPropertyListings[i].image_5;
                image5.type = "";
                
                div.appendChild(image5);
            };

            if(data.deletedPropertyListings[i].image_6 != null) {
                imageCount++;

                const image6 = document.createElement('img');

                image6.src = 'https://niwxujzmwpdhegjlmyfw.supabase.co/storage/v1/object/public/D.T.%20Comia%20Realty%20and%20Marketing/PROPERTY/' + data.deletedPropertyListings[i].user_id + '/' + data.deletedPropertyListings[i].property_id + '/' + data.deletedPropertyListings[i].image_6;
                image6.alt =  data.deletedPropertyListings[i].image_6;
                image6.type = "";
                
                div.appendChild(image6);
            };

            if(data.deletedPropertyListings[i].image_7 != null) {
                imageCount++;

                const image7 = document.createElement('img');

                image7.src = 'https://niwxujzmwpdhegjlmyfw.supabase.co/storage/v1/object/public/D.T.%20Comia%20Realty%20and%20Marketing/PROPERTY/' + data.deletedPropertyListings[i].user_id + '/' + data.deletedPropertyListings[i].property_id + '/' + data.deletedPropertyListings[i].image_7;
                image7.alt =  data.deletedPropertyListings[i].image_7;
                image7.type = "";
                
                div.appendChild(image7);
            };

            if(data.deletedPropertyListings[i].image_8 != null) {
                imageCount++;

                const image8 = document.createElement('img');

                image8.src = 'https://niwxujzmwpdhegjlmyfw.supabase.co/storage/v1/object/public/D.T.%20Comia%20Realty%20and%20Marketing/PROPERTY/' + data.deletedPropertyListings[i].user_id + '/' + data.deletedPropertyListings[i].property_id + '/' + data.deletedPropertyListings[i].image_8;
                image8.alt =  data.deletedPropertyListings[i].image_8;
                image8.type = "";
                
                div.appendChild(image8);
            };

            if(data.deletedPropertyListings[i].image_9 != null) {
                imageCount++;

                const image9 = document.createElement('img');

                image9.src = 'https://niwxujzmwpdhegjlmyfw.supabase.co/storage/v1/object/public/D.T.%20Comia%20Realty%20and%20Marketing/PROPERTY/' + data.deletedPropertyListings[i].user_id + '/' + data.deletedPropertyListings[i].property_id + '/' + data.deletedPropertyListings[i].image_9;
                image9.alt =  data.deletedPropertyListings[i].image_9;
                image9.type = "";
                
                div.appendChild(image9);
            };

            if(data.deletedPropertyListings[i].image_10 != null) {
                imageCount++;

                const image10 = document.createElement('img');

                image10.src = 'https://niwxujzmwpdhegjlmyfw.supabase.co/storage/v1/object/public/D.T.%20Comia%20Realty%20and%20Marketing/PROPERTY/' + data.deletedPropertyListings[i].user_id + '/' + data.deletedPropertyListings[i].property_id + '/' + data.deletedPropertyListings[i].image_10;
                image10.alt =  data.deletedPropertyListings[i].image_1;
                image10.type = "";
                
                div.appendChild(image10);
            };



                // INITIALLY ADDS 100% TRANSLATE TO ITS TRANSFORM.
            let translateCarousel = 0;

            if(data.deletedPropertyListings[i].image_2 != null) {
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
                        div.children[j].style.transform = `translate(${translateValue * 100}%, 0)`;
                    }
                };     
            
            };



            const div2Modal = document.createElement('div');
            const Description = document.createElement('p');
            const description = document.createElement('p');
                
            div2Modal.classList.add('description');
            Description.innerHTML = "Description";
            description.innerHTML = data.deletedPropertyListings[i].description;

            propertyDetails.appendChild(div2Modal);
            div2Modal.appendChild(Description);
            div2Modal.appendChild(description);

            };

        };
    } else {
        const select = document.querySelector('#RecycleBin > div:nth-child(2)');
        const restoreDelete = document.querySelector('#RecycleBin > div:nth-child(3)');

        select.style.display = "none";
        restoreDelete.style.display = "none";
        
        const h2 = document.createElement('h2');
        const p = document.createElement('p');

        h2.innerHTML = "Trash is empty.";
        p.innerHTML = "Any listings you delete will be stay in the recycle bin for 30 days before they're deleted forever.";

        listings.appendChild(h2);
        listings.appendChild(p);
    }

};

deletedListings().catch(console.error);

const addSelected = document.querySelector('#select');
const selectAll = document.querySelector('#RecycleBin > div:nth-child(2) > div > input');
let selectCount = 0;
const selectP = document.querySelector('#RecycleBin > div:nth-child(2) > p');

    //  ENABLES SELECT MODE.
function toggleSelectFunction() {

    const imageContainerPorperty1 = document.querySelector('#deletedListings > .property:nth-child(1) > .imageContainer');
    const restoreAll = document.querySelector('#restoreAll');
    const deleteAll = document.querySelector('#deleteAll');

    if (imageContainerPorperty1.children.length > 1) {
        addSelected.innerHTML = "Select";

        selectAll.checked = false;
        selectAll.disabled = true;
        selectCount = 0;
        selectP.innerHTML = selectCount + " selected";

        for(let i = 0; i < listings.children.length; i++) {
            if(listings.children[i].classList == 'property') {
                listings.children[i].querySelector('.imageContainer > input').remove();
                listings.children[i].querySelector('.imageContainer > .selectCheckbox > img').remove();
                listings.children[i].querySelector('.imageContainer > .selectCheckbox').remove();

            };

        };

        restoreAll.disabled = true;
        deleteAll.disabled = true;

    } else {

        let selectCheckBoxNumber = 0;
        selectAll.disabled = false;
        
        addSelected.innerHTML = "Cancel";

            //  .
        for(let i = 0; i < listings.children.length; i++) {
            if(listings.children[i].classList == 'property') {
                selectCheckBoxNumber++;

                const selectCheckbox = document.createElement('input');
                const selectLabel = document.createElement('label');
                const select = document.createElement('img');

                selectCheckbox.type = "checkbox";
                selectCheckbox.name = "Select checkbox " + selectCheckBoxNumber;
                selectCheckbox.id = "selectCheckBox" + selectCheckBoxNumber;
                selectLabel.htmlFor = "selectCheckBox" + selectCheckBoxNumber;
                selectLabel.classList.add('selectCheckbox');
                select.src = "https://niwxujzmwpdhegjlmyfw.supabase.co/storage/v1/object/public/D.T.%20Comia%20Realty%20and%20Marketing/AGENT ICONS/agent uncheckbox.png";
                select.alt = "Empty checkbox";
                select.type = "";

                listings.children[i].querySelector('.imageContainer').appendChild(selectCheckbox);
                listings.children[i].querySelector('.imageContainer').appendChild(selectLabel);
                selectLabel.appendChild(select);

                    //  COUNTS EVERY CHECKED selectCheckbox.
                function selectCheckboxFunction() {
                    if(selectCheckbox.checked != true) {
                        select.src = "https://niwxujzmwpdhegjlmyfw.supabase.co/storage/v1/object/public/D.T.%20Comia%20Realty%20and%20Marketing/AGENT ICONS/agent uncheckbox.png";
                        select.alt = "Empty checkbox";
                        select.type = "";

                        selectCount -= 1;
                        selectP.innerHTML = selectCount + " selected";
                    } else {
                        select.src = "https://niwxujzmwpdhegjlmyfw.supabase.co/storage/v1/object/public/D.T.%20Comia%20Realty%20and%20Marketing/AGENT ICONS/agent checkbox.png";
                        select.alt = "Checked checkbox";
                        select.type = "";

                        selectCount += 1;
                        selectP.innerHTML = selectCount + " selected";
                    }

                    if(listings.children.length / 2 == selectCount) {
                        selectAll.checked = true;
                    } else {
                        selectAll.checked = false;
                    };
                };

                selectCheckbox.addEventListener("change", selectCheckboxFunction);

            };

        };

        restoreAll.disabled = false;
        deleteAll.disabled = false;
    };
};

addSelected.addEventListener("click", toggleSelectFunction);

    //  FUNCTION FOR GRABBING ALL THE CHECKED featuredCheckbox.
function selectAllFunction() {  
    selectCount = 0;

    for(let i = 0; i < listings.children.length; i++) {
        if(listings.children[i].classList == 'property') {
            if(selectAll.checked == true) {
                selectCount += 1;

                listings.children[i].querySelector('.imageContainer > input').checked = true;
                listings.children[i].querySelector('.imageContainer > .selectCheckbox').children[0].src = "";
                listings.children[i].querySelector('.imageContainer > .selectCheckbox').children[0].alt = "Checked checkbox";
                listings.children[i].querySelector('.imageContainer > .selectCheckbox').children[0].type = "";
            } else {
                selectCount = 0;

                listings.children[i].querySelector('.imageContainer > input').checked = false;
                listings.children[i].querySelector('.imageContainer > .selectCheckbox').children[0].src = "";
                listings.children[i].querySelector('.imageContainer > .selectCheckbox').children[0].alt = "Empty checkbox";
                listings.children[i].querySelector('.imageContainer > .selectCheckbox').children[0].type = "";
            }
        };
    };
    
    selectP.innerHTML = selectCount + " selected";

};

selectAll.addEventListener("click", selectAllFunction);

    //  FUNCTION FOR RESTORING PROPERTY.
async function restoreAll(propertyIdInput) {
    const response = await fetch('https://dt-comia-realty-and-marketing-production.up.railway.app/restore-all-property', {
        method: 'POST',
        headers: {                    
                    'User-Agent': 'undici-stream-example',
                    'Content-Type': 'application/json'
        },
        credentials: "include",
        body: JSON.stringify({propertyIdInput})
    });
    const data = await response.json();

    console.log(data);

};

    //  FUNCTION FOR GRABBING ALL THE CHECKED featuredCheckbox.
function restoreCheckedTrue() {          
        //  DECLARES propertyIdInput.
    const propertyIdInput = [];

    selectAll.checked = false;
    selectAll.disabled = true;

    for(let i = 0; i < listings.children.length; i++) {
        if(listings.children[i].classList == 'property') {
            if(listings.children[i].querySelector('.imageContainer > input').checked == true) {
                propertyIdInput.push(listings.children[i].querySelector('.imageContainer > input').parentElement.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.value);
            };
        };
    };
            
    restoreAll(propertyIdInput).catch(console.error);

};

    //  RUNS restoreAllFunction AND UPDATES deletedListings.
function restoreAllFunction() {

    restoreCheckedTrue();

        // DELAY BY 10ms TO AVOID TRIGGERING deletedListings IMMEDIATELY.
    setTimeout(() => {
        deletedListings().catch(console.error);
    }, 10);

    selectCount = 0;
    selectP.innerHTML = selectCount + " selected";

    toggleSelectFunction();

};

document.querySelector('#restoreAll').addEventListener("click", restoreAllFunction);



    //  FUNCTION FOR DELETING PROPERTY.
async function deleteAll(propertyIdInput) {
    const response = await fetch('https://dt-comia-realty-and-marketing-production.up.railway.app/delete-all-property', {
        method: 'POST',
        headers: {                    
                    'User-Agent': 'undici-stream-example',
                    'Content-Type': 'application/json'
        },
        credentials: "include",
        body: JSON.stringify({propertyIdInput})
    });

};

    //  FUNCTION FOR GRABBING ALL THE CHECKED featuredCheckbox.
function deleteCheckedTrue() {          
        //  DECLARES propertyIdInput.
    const propertyIdInput = [];
    
    selectAll.checked = false;
    selectAll.disabled = true;

    for(let i = 0; i < listings.children.length; i++) {
        if(listings.children[i].classList == 'property') {
            if(listings.children[i].querySelector('.imageContainer > input').checked == true) {
                propertyIdInput.push(listings.children[i].querySelector('.imageContainer > input').parentElement.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.value);
            };
        };
    };

    deleteAll(propertyIdInput).catch(console.error);

};

    //  RUNS deleteAllFunction AND UPDATES deletedListings.
function deleteAllFunction() {

    deleteCheckedTrue();

        // DELAY BY 10ms TO AVOID TRIGGERING deletedListings IMMEDIATELY.
    setTimeout(() => {
        deletedListings().catch(console.error);
    }, 10);

    selectCount = 0;
    selectP.innerHTML = selectCount + " selected";

    toggleSelectFunction();

};


document.querySelector('#deleteAll').addEventListener("click", deleteAllFunction);