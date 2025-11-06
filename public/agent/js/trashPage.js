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

            for(let j = 0; j < data.deletedImageListings.length; j++) {
                if(data.deletedPropertyListings[i].property_id == data.deletedImageListings[j].property_id) {
                    if(data.deletedImageListings[j].field_name == "Main_image") {
                        propertyImage.src = data.deletedImageListings[j].path;
                        propertyImage.alt = data.deletedImageListings[j].file_name;
                        propertyImage.type = data.deletedImageListings[j].mime_type.split('/')[1];

                        break;
                    };
                };
            };

            price.innerHTML = "&#8369;" + data.deletedPropertyListings[i].price;
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

            for(let j = 0; j < data.deletedImageListings.length; j++) {
                if(data.deletedPropertyListings[i].property_id == data.deletedImageListings[j].property_id) {
                    if(data.deletedImageListings[j].field_name == "Main_image") {
                        propertyMainImage.src = data.deletedImageListings[j].path;
                        propertyMainImage.alt = data.deletedImageListings[j].file_name;
                        propertyMainImage.type = data.deletedImageListings[j].mime_type.split('/')[1];

                        break;
                    };
                };
            };
            
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
            priceModal.innerHTML = "&#8369;" + data.deletedPropertyListings[i].price;
            details.appendChild(priceModal);



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
            
            propertyType.innerHTML = data.deletedPropertyListings[i].property_type;
            locationModal.href = "../customer/gpsSystem.html?role=agent";
            locationModal.innerHTML = "View Location";
            bedRooms.innerHTML = "Bedrooms";
            bedRoomsCount.innerHTML = data.deletedPropertyListings[i].room_count;
            bathRooms.innerHTML = "Bathrooms";
            bathrRoomsCount.innerHTML = data.deletedPropertyListings[i].bath_count;
            area.innerHTML = "Area";
            measurments.classList.add('measurements');
            measurments.innerHTML = data.deletedPropertyListings[i].area + "sq";
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

            for(let j = 0; j < data.imageListings.length; j++) {
                if(data.deletedPropertyListings[i].property_id == data.imageListings[j].property_id) {
                    if(data.imageListings[j].field_name == "Additional_images") {
                        imageCount++;

                        const div = document.createElement('div');
                        const image = document.createElement('img');

                        image.src = data.imageListings[j].path;
                        image.alt = data.imageListings[j].file_name;
                        image.type = data.imageListings[j].mime_type.split('/')[1];

                        images.appendChild(div);
                        div.appendChild(image);
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
                listings.children[i].querySelector('.imageContainer > .selectCheckbox').children[0].src = "https://niwxujzmwpdhegjlmyfw.supabase.co/storage/v1/object/public/D.T.%20Comia%20Realty%20and%20Marketing/AGENT ICONS/agent checkbox.png";
                listings.children[i].querySelector('.imageContainer > .selectCheckbox').children[0].alt = "Checked checkbox";
                listings.children[i].querySelector('.imageContainer > .selectCheckbox').children[0].type = "";
            } else {
                selectCount = 0;

                listings.children[i].querySelector('.imageContainer > input').checked = false;
                listings.children[i].querySelector('.imageContainer > .selectCheckbox').children[0].src = "https://niwxujzmwpdhegjlmyfw.supabase.co/storage/v1/object/public/D.T.%20Comia%20Realty%20and%20Marketing/AGENT ICONS/agent uncheckbox.png";
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