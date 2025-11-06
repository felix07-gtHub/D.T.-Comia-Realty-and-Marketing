const listings = document.querySelector('#historyPropertiesListings');

    //  .
async function historyPropertiesListings() {    
    const response = await fetch('https://dt-comia-realty-and-marketing-production.up.railway.app/history-property', {
        method: 'GET',
        credentials: "include",
    });
    const data = await response.json();


        //  CLEAR THE #listings BEFORE DISPLAYING THE UPDATED PROPERTY LISTINGS.
    listings.innerHTML = "";

        // INITIALLY ADDS 100% TRANSLATE TO ITS TRANSFORM.
    let translateCarousel = 0;

    if(data.userId != undefined) {
        for (let i = 0; i < data.historyPropertyListings.length; i++) {
            for (let j = 0; j < data.propertyListings.length; j++) {  
                if(data.historyPropertyListings[i].property_id == data.propertyListings[j].property_id) {
            
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

                    for(let k = 0; k < data.imageListings.length; k++) {
                        if(data.propertyListings[j].property_id == data.imageListings[k].property_id) {
                            if(data.imageListings[k].field_name == "Main_image") {
                                propertyImage.src = data.imageListings[k].path;
                                propertyImage.alt = data.imageListings[k].file_name;
                                propertyImage.type = data.imageListings[k].mime_type.split('/')[1];

                                break;
                            };
                        };
                    };

                    price.innerHTML = "&#8369;" + data.propertyListings[j].price;
                    address.innerHTML = data.propertyListings[j].address;
                    bedIcon.src = "https://niwxujzmwpdhegjlmyfw.supabase.co/storage/v1/object/public/D.T.%20Comia%20Realty%20and%20Marketing/BUYER ICONS AND LOGOS/green bed.png";
                    bedIcon.alt = "Bed icon";
                    bedIcon.type = "";
                    bedCount.innerHTML = data.propertyListings[j].room_count;
                    bathtubIcon.src = "https://niwxujzmwpdhegjlmyfw.supabase.co/storage/v1/object/public/D.T.%20Comia%20Realty%20and%20Marketing/BUYER ICONS AND LOGOS/black bathtub.png";
                    bathtubIcon.alt = "Bathtub icon";
                    bathtubIcon.type = "";
                    bathtubCount.innerHTML = data.propertyListings[j].bath_count;
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

                    if(data.propertyListings[j].status != "AVAILABLE") {
                        viewDetail.style.backgroundColor = "#dc4a4a";
                        viewDetail.style.color = "#354024";
                        viewDetail.addEventListener("mouseenter", reservedPropertyMousEnter);
                        viewDetail.addEventListener("mouseleave", reservedPropertyMousEave);
                    } else {
                        viewDetail.style.backgroundColor = "#889063";
                        viewDetail.style.color = "#354024";
                        viewDetail.addEventListener("mouseenter", availablePropertyMousEnter);
                        viewDetail.addEventListener("mouseleave", availablePropertyMousEave);
                    };



                    const savedInput = document.createElement('input');
                    const savedLabel = document.createElement('label');
                    const savedIcon = document.createElement('img');

                    savedInput.type = "checkbox";
                    savedInput.name = "Saved checkbox";
                    savedInput.id = data.propertyListings[j].property_id;
                    savedInput.value = data.propertyListings[j].property_id;
                    savedLabel.htmlFor = data.propertyListings[j].property_id;
                    savedIcon.classList.add('savedIcon');
                            
                    property.appendChild(savedInput);
                    property.appendChild(savedLabel);
                    savedLabel.appendChild(savedIcon);
        
                    if(data.savedPropertyListings.length > 0) {
                        for(let k = 0; k < data.savedPropertyListings.length; k++) {
                            if(data.propertyListings[j].property_id != data.savedPropertyListings[k].property_id) {
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


                    
                    const moreIcon = document.createElement('button');

                    moreIcon.classList.add('moreIcon');
                    moreIcon.innerHTML = "●●●";

                    property.appendChild(moreIcon);

                    

                        //  SHOWS PROPERTY DETAILS.
                    async function showModal() {     
                        const propertyIdInput = data.propertyListings[j].property_id;

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
                        window.location = "http://127.0.0.1:3001/html/SE1/GROUP%202/customer/propertyListings.html?location=" + data.propertyListings[j].location;

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

                    for(let k = 0; k < data.imageListings.length; k++) {
                        if(data.propertyListings[j].property_id == data.imageListings[k].property_id) {
                            if(data.imageListings[k].field_name == "Main_image") {
                                propertyMainImage.src = data.imageListings[k].path;
                                propertyMainImage.alt = data.imageListings[k].file_name;
                                propertyMainImage.type = data.imageListings[k].mime_type.split('/')[1];

                                break;
                            };
                        };
                    };
                    
                    propertyModal.appendChild(details);
                    details.appendChild(imageContainerModal);
                    imageContainerModal.appendChild(propertyMainImage);

                    const status = document.createElement('p');

                    status.classList.add('status');
                    status.innerHTML = data.propertyListings[i].status;

                    if(data.propertyListings[i].status == "RESERVED") {
                        if(data.propertyListings.length > 0) {
                            for(let j = 0; j < data.propertyListings.length; j++) {
                                if(data.propertyListings[i].property_id == data.propertyListings[j].property_id) {
                                    const reserved = document.createElement('div');
                                    const reservedP = document.createElement('p');
                                    const dateReserved = new Date(data.propertyListings[j].reservation_period_to);

                                    reserved.classList.add('reserved');
                                    reservedP.innerHTML = "This property is reserved until<br>" + dateReserved.toDateString() + ".<br>You may still tour this property"; 

                                    imageContainerModal.appendChild(reserved);
                                    reserved.appendChild(reservedP);

                                    break;
                                };
                            };
                        };

                        status.style.backgroundColor = 'red';
                    } else if(data.propertyListings[i].status == "SOLD") {
                        status.style.backgroundColor = 'red';
                    } else {
                        status.style.backgroundColor = '#00bf63';
                    };
                    
                    imageContainerModal.appendChild(status);
            
                    const priceModal = document.createElement('p');
                    priceModal.innerHTML = "&#8369;" + data.propertyListings[i].price;
                    details.appendChild(priceModal);



                    const reserve = document.createElement('button');
                    reserve.innerHTML = 'RESERVE THIS LAND?';
                    details.appendChild(reserve);

                    if(data.propertyListings[i].status != "AVAILABLE") {  
                        reserve.disabled = true;
                        
                    } else {           
                        if(data.userId != '') {
                            const reserveModal = document.createElement('div');
                            const reserveH1 = document.createElement('h1');
                            const reserveCancel = document.createElement('button');
                            const reservelink = document.createElement('a');
                    
                            reserveModal.classList.add('reserveModal');
                            reserveH1.innerHTML = 'You are about to reserve<br><span>' + data.propertyListings[i].address + '</span><br>During your reservation, this property will be held exclusively for you.';
                            reserveCancel.innerHTML = 'Cancel';
                            reservelink.href = "./landReservationForm.html?propertyId=" + data.propertyListings[i].property_id;
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
                
                    propertyType.innerHTML = data.propertyListings[i].property_type;
                    locationModal.href = "./gpsSystem.html";
                    locationModal.innerHTML = "View Location";
                    bedRooms.innerHTML = "Bedrooms";
                    bedRoomsCount.innerHTML = data.propertyListings[i].room_count;
                    bathRooms.innerHTML = "Bathrooms";
                    bathrRoomsCount.innerHTML = data.propertyListings[i].bath_count;
                    area.innerHTML = "Area";
                    measurments.classList.add('measurements');
                    measurments.innerHTML = data.propertyListings[i].area + "sq";
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
                        if(data.propertyListings[i].property_id == data.featuredImageListings[j].property_id) {
                            if(data.featuredImageListings[j].field_name == "Additional_images") {
                                imageCount++;

                                const div = document.createElement('div');
                                const image = document.createElement('img');

                                image.src = data.featuredImageListings[j].path;
                                image.alt = data.featuredImageListings[j].file_name;
                                image.type = data.featuredImageListings[j].mime_type.split('/')[1];

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
                            };
                        };  
                    };



                    const div2Modal = document.createElement('div');
                    const Description = document.createElement('p');
                    const description = document.createElement('p');
                    
                    div2Modal.classList.add('description');
                    Description.innerHTML = "Description";
                    description.innerHTML = data.propertyListings[j].description;

                    propertyDetails.appendChild(div2Modal);
                    div2Modal.appendChild(Description);
                    div2Modal.appendChild(description);

                };

            };

        };

    } else {
        window.location = "./homePage.html";

    };

};

historyPropertiesListings().catch(console.error);

const addSelected = document.querySelector('#select');
const selectAll = document.querySelector('#historyProperties > div:nth-child(2) > div > input');
let selectCount = 0;
const selectP = document.querySelector('#historyProperties > div:nth-child(2) > p');

    //  ENABLES SELECT MODE.
function toggleSelectFunction() {
    const imageContainerPorperty1 = document.querySelector('#historyPropertiesListings > .property:nth-child(1) > .imageContainer');
    const restoreDelete = document.querySelector('body > div:nth-child(4) > div:nth-child(4)');

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

        restoreDelete.style.display = "none";

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
                select.src = "https://niwxujzmwpdhegjlmyfw.supabase.co/storage/v1/object/public/D.T.%20Comia%20Realty%20and%20Marketing/BUYER ICONS AND LOGOS/empty checkbox.png";
                select.alt = "Empty checkbox";
                select.type = "";

                listings.children[i].querySelector('.imageContainer').appendChild(selectCheckbox);
                listings.children[i].querySelector('.imageContainer').appendChild(selectLabel);
                selectLabel.appendChild(select);

                    //  COUNTS EVERY CHECKED selectCheckbox.
                function selectCheckboxFunction() {
                    if(selectCheckbox.checked != true) {
                        select.src = "https://niwxujzmwpdhegjlmyfw.supabase.co/storage/v1/object/public/D.T.%20Comia%20Realty%20and%20Marketing/BUYER ICONS AND LOGOS/empty checkbox.png";
                        select.alt = "Empty checkbox";
                        select.type = "";

                        selectCount -= 1;
                        selectP.innerHTML = selectCount + " selected";
                    } else {
                        select.src = "https://niwxujzmwpdhegjlmyfw.supabase.co/storage/v1/object/public/D.T.%20Comia%20Realty%20and%20Marketing/BUYER ICONS AND LOGOS/checkbox with check.png";
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

        
        restoreDelete.style.display = "flex";
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



    //  FUNCTION FOR DELETING HISTORY.
async function deleteAll(propertyIdInput) {
    const response = await fetch('https://dt-comia-realty-and-marketing-production.up.railway.app/delete-all-history', {
        method: 'POST',
        headers: {                    
                    'User-Agent': 'undici-stream-example',
                    'Content-Type': 'application/json',
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

    //  RUNS deleteAllFunction AND UPDATES historyPropertiesListings.
function deleteAllFunction() {
    const restoreDelete = document.querySelector('body > div:nth-child(4) > div:nth-child(4)');

    deleteCheckedTrue();

        // DELAY BY 10ms TO AVOID TRIGGERING historyPropertiesListings IMMEDIATELY.
    setTimeout(() => {
        historyPropertiesListings().catch(console.error);
    }, 10);

    selectCount = 0;
    selectP.innerHTML = selectCount + " selected";
    
    restoreDelete.style.display = "none";

    toggleSelectFunction();

};

document.querySelector('#deleteAll').addEventListener("click", deleteAllFunction);