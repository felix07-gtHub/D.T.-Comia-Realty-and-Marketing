    //  INITIALIZE THE SORT FUNCTION.
let sortInput = ": Default";

    //  RESETS THE WHOLE FILTER.
function reset() {
    const landTypeField = document.querySelector('select[name="Land type"]');
    const selectLocationField = document.querySelector('select[name="Select location"]');
    const minRangeField = document.querySelector('#filter > div > select + div > #priceRange > input');
    const maxRangeField = document.querySelector('#filter > div > select + div > #priceRange > input + input');
    const pElement = document.querySelector('#sortIcon + label > p + p')    
    const ulElement = document.querySelector('#sortIcon + label + div > ul');

    landTypeField.value = "Any";
    selectLocationField.value = "Any";
    minRangeField.value = 0;
    maxRangeField.value = 54;
    sortInput = ": Default";
    pElement.innerHTML = ": " + ulElement.children[0].innerHTML;
    ulElement.children[1].innerHTML = "Price ↑";
    ulElement.children[2].innerHTML = "Date ↑";

        //  UPDATE THE selectQuery ONCE THE WHOLE FILTER RESETS.
    if(window.location.search != '') {
        window.location.replace(window.location.pathname);
    } else {
        landListings().catch(console.error);
    };

};

    //  BOUND THE reset FUNCTION TO RESET BUTTON.
document.querySelector('#filter > div button').addEventListener("click", reset);

let locationLink = "Any";

if(window.location.search != '') {
        // Get query params from URL
    const params = new URLSearchParams(window.location.search);
    locationLink = params.get("location");
};



    //  ADDS THE NEW LOCATION TO SELECT OPTION.
async function selectFunction() {        
    const response = await fetch('https://dt-comia-realty-and-marketing-production.up.railway.app/land-location', {
        method: 'POST',
        headers: {                    
                    'User-Agent': 'undici-stream-example',
                    'Content-Type': 'application/json'
        }
    });
    const data = await response.json();

     const select = document.querySelector('select[name="Select location"]');

    for (let i = 0; i <= data.distinctLocation.length - 1; i++) {
        const option = document.createElement('option');

        option.value = data.distinctLocation[i].location;
        option.innerHTML = data.distinctLocation[i].location;

        select.appendChild(option);
    };

    select.value = locationLink;

        //  UPDATE THE selectQuery ONCE Select location UPDATES.
    landListings().catch(console.error);

};

    //  UPDATES THE Select location ONCE THE PAGE LOADS.
selectFunction().catch(console.error);

    //  FUNCTION FOR CUSTOM RANGE FIELD.
function slide() {
    const minRange = document.getElementById('minRange');
    const maxRange = document.getElementById('maxRange');
    const div = document.querySelector('#filter > div > select + div > div > input + div > div');
    
        //  CONVERTS THE RANGE VALUE TO PERCENTAGE AND SET AS LEFT AND WIDTH OF THE RANGE TRACK.
    div.style.left = ((minRange.value / minRange.max) * 100) + '%';
    div.style.width = (((maxRange.value / maxRange.max) * 100) - ((minRange.value / minRange.max) * 100)) + '%';

        //  KEEPS 1 PRECENT GAP BETWEEN MIN AND MAX THUMB TO AVOID PASSING TO EACH OTHER.
    if((parseInt(minRange.value) + 1) > parseInt(maxRange.value)) {
        minRange.value = parseInt(minRange.value) - 1;
        maxRange.value = parseInt(maxRange.value) + 1;
    }

    const minPrice = document.getElementById('minPrice');
    const maxPrice = document.getElementById('maxPrice');

        // SKIPS THE VALUE OF MIN RANGE BY .5 UNTIL VALUE REACHES 10 AND DISPLAY AS P1M...P10M EQUIVALENT TO P1,000,000.00...P10,000,000,000.00.
    if(parseInt(minRange.value) < 19) {
        minPrice.innerHTML = ': &#8369;' + (parseFloat((minRange.value) / 2) + 1) + 'M';
        
        // SETS THE VALUE BACK TO 1 AND SKIPS MIN RANGE BY 5 UNTIL VALUE REACHES 100 AND DISPLAY AS P15M...P100M EQUIVALENT TO P15,000,000.00...P100,000,000,000.00.
    } else if(parseInt(minRange.value) >= 19 && parseInt(minRange.value) < 37) {
        minPrice.innerHTML = ': &#8369;' + (parseFloat(((minRange.value) - 18) * 5) + 10) + 'M';

        // SETS THE VALUE BACK TO 1 AND SKIPS MIN RANGE BY 50 UNTIL VALUE REACHES 950 AND DISPLAY AS P150M...P950M EQUIVALENT TO P150,000,000.00...P950,000,000,000.00.
    } else if(parseInt(minRange.value) >= 37 && parseInt(minRange.value) < 54) {
        minPrice.innerHTML = ': &#8369;' + (parseInt(((minRange.value) - 36) * 50) + 100) + 'M';

        // SET VALUE OF MIN RANGE TO 1 WHEN VALUE REACHES ABOVE 950.
    } else if(parseInt(minRange.value) == 54) {
        minPrice.innerHTML = ': &#8369;' + parseInt((minRange.value) - 53) + 'B';
    };

        // SKIPS THE VALUE OF MAX RANGE BY .5 UNTIL VALUE REACHES 10 P1M...P10M EQUIVALENT TO P1,000,000.00...P10,000,000,000.00.
    if(parseInt(maxRange.value) < 19) {
        maxPrice.innerHTML = ': &#8369;' + (parseFloat(maxRange.value / 2) + 1) + 'M';

        // SETS THE VALUE BACK TO 1 AND SKIPS MAX RANGE BY 5 UNTIL VALUE REACHES 100 AND DISPLAY AS P15M...P100M EQUIVALENT TO P15,000,000.00...P100,000,000,000.00.
    } else if(parseInt(maxRange.value) >= 19 && parseInt(maxRange.value) < 37) {
        maxPrice.innerHTML = ': &#8369;' + (parseFloat(((maxRange.value) - 18) * 5) + 10) + 'M';

        // SETS THE VALUE BACK TO 1 AND SKIPS MAX RANGE BY 50 UNTIL VALUE REACHES 950 AND DISPLAY AS P150M...P950M EQUIVALENT TO P150,000,000.00...P950,000,000,000.00.
    } else if(parseInt(maxRange.value) >= 37 && parseInt(maxRange.value) < 54) {
        maxPrice.innerHTML = ': &#8369;' + ((parseFloat((maxRange.value) - 36) * 50) + 100) + 'M';

        // SET VALUE OF MAX RANGE TO 1 WHEN VALUE REACHES ABOVE 950 AND DISPLAY AS P1B EQUIVALENT TO P1,000,000,000,000.00.
    } else if(parseInt(maxRange.value) == 54) {     
        maxPrice.innerHTML = ': &#8369;' + parseInt((maxRange.value) - 53) + 'B';
    };
}

    //  UPDATES THE RANGE TRACK EVERY MILLISECONDS.
setInterval(slide);

    //  TOGGLES THE Sort icon INPUT.
function sortToggle(e) {
    const nav = document.querySelector('nav');
    const gradientLayer = document.querySelector('#gradientLayer');
    const menuTab = document.querySelector('#menuTab');
    const sort = document.querySelector('#sortIcon');

    const sortLabel = document.querySelector('#sortIcon + label');
    const div = document.querySelector('#sortIcon + label + div');

        //  HIDES THE SORT CHOCIES UNLESS Sort icon WERE CLICKED.
    if(!nav.contains(e.target) &&
       !gradientLayer.contains(e.target) &&
       !menuTab.contains(e.target) &&
       !sort.contains(e.target)) {
        
        sortLabel.style.backgroundColor = 'transparent';
        sortLabel.style.boxShadow = 'none';
        sortLabel.style.borderColor = '#faf2e9';

        div.style.display = 'none';
    } else if(sort.contains(e.target)) {
        sortLabel.style.backgroundColor = '#faebcf';
        sortLabel.style.boxShadow = '0px 0px 10px #faebcf';
        sortLabel.style.borderColor = '#32402f' ;
        
        div.style.display = 'block';

    };
};

    //  BOUND THE sortToggle FUNCTION TO THE DOCUMENT.
document.body.addEventListener("click", sortToggle);

    //  SETS THE SORT INPUT VALUE TO WHENEVER SORT VALUE(ul > li) WERE CLICKED.
function sortFunction(e) {
    const p = document.querySelector('#sortIcon + label > p + p')    
    const ul = document.querySelector('#sortIcon + label + div > ul');

        //  IF THE FIRST VALUE(ul.children[0] > li) WERE CLICKED,
        // SETS THE SORT INPUT VALUE TO FIRST VALUE(ul.children[0] > li),
        // RESETS THE OTHERS.
     if(ul.children[0].contains(e.target)) {
        sortInput = ": " + ul.children[0].innerHTML;

        p.innerHTML = ": " + ul.children[0].innerHTML;
        ul.children[1].innerHTML = "Price ↑";
        ul.children[2].innerHTML = "Date ↑";

        //  IF THE SECOND VALUE(ul.children[1] > li) WERE CLICKED,
        // SETS THE SORT INPUT VALUE TO SECOND VALUE(ul.children[1] > li),
        // RESETS THE OTHERS
        // AND UPDATES THE SECOND VALUE(ul.children[1] > li) TO "Price ↓".
    } else if(ul.children[1].contains(e.target)) {
        sortInput = ": " + ul.children[1].innerHTML;

        p.innerHTML = ": " + ul.children[1].innerHTML;
                
        if(ul.children[1].innerHTML == "Price ↓") {
            ul.children[1].innerHTML = "Price ↑";     
        } else {
            ul.children[1].innerHTML = "Price ↓";
        }

        ul.children[2].innerHTML = "Date ↑";

        //  IF THE THIRD VALUE(ul.children[2] > li) WERE CLICKED,
        // SETS THE SORT INPUT VALUE TO THIRD VALUE(ul.children[2] > li),
        // RESETS THE OTHERS
        // AND UPDATES THE THIRD VALUE(ul.children[3] > li) TO "Date ↓".
    } else if(ul.children[2].contains(e.target)) {
        sortInput = ": " + ul.children[2].innerHTML;

        p.innerHTML = ": " + ul.children[2].innerHTML;
        ul.children[1].innerHTML = "Price ↑";

        if(ul.children[2].innerHTML == "Date ↓") {
            ul.children[2].innerHTML = "Date ↑";     
        } else {
            ul.children[2].innerHTML = "Date ↓";
        }
    };

        //  UPDATES THE selectQuery ONCE THE SORT INPUT VALUE CHANGED.
    landListings().catch(console.error);
};

    //  BOUND THE sortFunction FUNCTION TO SORT VALUE CONTAINER(ul).
document.querySelector('#sortIcon + label + div > ul').addEventListener("click", sortFunction);

    //  INITIALIZE THE VALUE FOR min AND maxRangeValue.
let minRangeInput = 0;
let maxRangeInput = 0;
let propertyTypeInput = "";

async function landListings() {    
        //  GRABS THE VALUE FROM FILTER.
    if(document.querySelector('select[name="Land type"]').value != "Any") {
        propertyTypeInput = 'property_type = "' + document.querySelector('select[name="Land type"]').value + '"';
    } else {
        propertyTypeInput = '(property_type = "residential lot" OR property_type = "commercial lot" OR property_type = "industrial lot" OR property_type = "agricultural / farm land" OR property_type = "subdivision lot" OR property_type = "beachfront lot" OR property_type = "mountain / hillside lot" OR property_type = "mixed-use lot" OR property_type = "vacant lot" OR property_type = "raw land" OR property_type = "investment lot")';
    };

    const locationInput = document.querySelector('select[name="Select location"]').value;


    const minRange = document.getElementById('minRange');
    const maxRange = document.getElementById('maxRange');

        // STARTS THE VALUE BY 1,000,000 AND SKIPS THE VALUE OF MIN RANGE BY 500,000 UNTIL VALUE REACHES 10,000,000.
    if(parseInt(minRange.value) < 19) {
        minRangeInput = (parseInt(minRange.value) * 500000) + 1000000;

        // SKIPS THE VALUE OF MIN RANGE BY 5,000,000 UNTIL VALUE REACHES 100,000,000.
    } else if(parseInt(minRange.value) >= 19 && parseInt(minRange.value) < 37) {
        minRangeInput = (parseInt((minRange.value) - 18) * 5000000) + 10000000;
        
        // SKIPS THE VALUE OF MIN RANGE BY 50,000,000 UNTIL VALUE REACHES 950,000,000.
    } else if(parseInt(minRange.value) >= 37 && parseInt(minRange.value) < 54) {
        minRangeInput = (parseInt((minRange.value) - 36) * 50000000) + 100000000;

        // SETS THE VALUE OF MIN RANGE TO 1,000,000,000 WHEN REACHES ABOVE 950,000,000.
    } else if(parseInt(minRange.value) == 54) {
        minRangeInput = parseInt((minRange.value) - 53) * 1000000000;
    };

    if(parseInt(maxRange.value) < 19) {
        maxRangeInput = (parseInt(maxRange.value) * 500000) + 1000000;
    } else if(parseInt(maxRange.value) >= 19 && parseInt(maxRange.value) < 37) {
        maxRangeInput = (parseInt((maxRange.value) - 18) * 5000000) + 10000000;
    } else if(parseInt(maxRange.value) >= 37 && parseInt(maxRange.value) < 54) {
        maxRangeInput = ((parseInt(maxRange.value) - 36) * 50000000) + 100000000;
    } else if(parseInt(maxRange.value) == 54) {     
        maxRangeInput = parseInt((maxRange.value) - 53) * 1000000000;
    };
    
    const response = await fetch('https://dt-comia-realty-and-marketing-production.up.railway.app/land-listings', {
        method: 'POST',
        headers: {                    
                    'User-Agent': 'undici-stream-example',
                    'Content-Type': 'application/json',
        },
        credentials: "include",
        body: JSON.stringify({propertyTypeInput,
                              locationInput,
                              minRangeInput,
                              maxRangeInput,
                              sortInput
                            })
    });
    const data = await response.json();

    const listings = document.querySelector('#landListings');

        //  CLEAR THE #listings BEFORE DISPLAYING THE UPDATED PROPERTY LISTINGS.
    listings.innerHTML = "";

        // INITIALLY ADDS 100% TRANSLATE TO ITS TRANSFORM.
    let translateCarousel = 0;

    for (let i = 0; i < data.landListings.length; i++) {
        
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
            propertyImage.src = 'https://niwxujzmwpdhegjlmyfw.supabase.co/storage/v1/object/public/D.T.%20Comia%20Realty%20and%20Marketing/PROPERTY/' + data.landListings[i].user_id + '/' + data.landListings[i].property_id + '/' + data.landListings[i].main_image;
            propertyImage.alt =  data.landListings[i].main_image;
            propertyImage.type = "";
            price.innerHTML = "&#8369;" + data.landListings[i].price_formatted;
            address.innerHTML = data.landListings[i].address;
            bedIcon.src = "https://niwxujzmwpdhegjlmyfw.supabase.co/storage/v1/object/public/D.T.%20Comia%20Realty%20and%20Marketing/BUYER ICONS AND LOGOS/green bed.png";
            bedIcon.alt = "Bed icon";
            bedIcon.type = "";
            bedCount.innerHTML = data.landListings[i].room_count;
            bathtubIcon.src = "https://niwxujzmwpdhegjlmyfw.supabase.co/storage/v1/object/public/D.T.%20Comia%20Realty%20and%20Marketing/BUYER ICONS AND LOGOS/black bathtub.png";
            bathtubIcon.alt = "Bathtub icon";
            bathtubIcon.type = "";
            bathtubCount.innerHTML = data.landListings[i].bath_count;
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

            if(data.landListings[i].status != "AVAILABLE") {
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
                savedInput.id = data.landListings[i].property_id;
                savedInput.value = data.landListings[i].property_id;
                savedLabel.htmlFor = data.landListings[i].property_id;
                savedIcon.classList.add('savedIcon');
                        
                property.appendChild(savedInput);
                property.appendChild(savedLabel);
                savedLabel.appendChild(savedIcon);

                if(data.savedLandListings.length > 0) {
                    for(let j = 0; j < data.savedLandListings.length; j++) {
                        if(data.landListings[i].property_id != data.savedLandListings[j].property_id) {
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
                savedInput.id = data.landListings[i].property_id;
                savedInput.value = data.landListings[i].property_id;
                savedInput.disabled = true;
                savedLabel.htmlFor = data.landListings[i].property_id;
                savedLink.href = "./signUp.html";
                savedIcon.src = "https://niwxujzmwpdhegjlmyfw.supabase.co/storage/v1/object/public/D.T.%20Comia%20Realty%20and%20Marketing/BUYER ICONS AND LOGOS/emptyheart.png";
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
                const propertyIdInput = data.landListings[i].property_id;

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
                        property.style.zIndex = 1;
                        more.style.display = 'block';
                    }
                } else if(!nav.contains(e.target) &&
                        !gradientLayer.contains(e.target) &&
                        !menuTab.contains(e.target)) {
                            
                    property.style.zIndex = 0;
                    more.style.display = 'none';

                };
            };       

            document.addEventListener("click", showHideMore);

                //  FUNCTION FOR View Similar Properties
            function viewSimilarPropertiesFunction() {
                const select = document.querySelector('select[name="Select location"]')

                    //  SET THE VALUE OF select WITH THE LOCATION THAT COMES ALONG WITH THE vieswSimilarProperties ELEMENT WHEN CREATED.
                select.value = data.landListings[i].location;

                    //  UPDATE THE selectQuery.
                landListings().catch(console.error);

                    //  SCROLLS TO THE TOP MOST(DEFAULT) AFTER UPDATING THE selectQuery.                
                window.scrollTo(0, 150);
            }

            ViewSimilarProperties.addEventListener("click", viewSimilarPropertiesFunction);



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
            propertyMainImage.src = 'https://niwxujzmwpdhegjlmyfw.supabase.co/storage/v1/object/public/D.T.%20Comia%20Realty%20and%20Marketing/PROPERTY/' + data.landListings[i].user_id + '/' + data.landListings[i].property_id + '/' + data.landListings[i].main_image;
            propertyMainImage.alt = data.landListings[i].main_image;
            propertyMainImage.type = "";
            
            propertyModal.appendChild(details);
            details.appendChild(imageContainerModal);
            imageContainerModal.appendChild(propertyMainImage);

            const status = document.createElement('p');

            status.classList.add('status');
            status.innerHTML = data.landListings[i].status;

            if(data.landListings[i].status == "RESERVED") {
                if(data.landListings.length > 0) {
                    for(let j = 0; j < data.landListings.length; j++) {
                        if(data.landListings[i].property_id == data.landListings[j].property_id) {
                            const reserved = document.createElement('div');
                            const reservedP = document.createElement('p');
                            const dateReserved = new Date(data.landListings[j].reservation_period_to);

                            reserved.classList.add('reserved');
                            reservedP.innerHTML = "This property is reserved until<br>" + dateReserved.toDateString() + ".<br>You may still tour this property"; 

                            imageContainerModal.appendChild(reserved);
                            reserved.appendChild(reservedP);

                            break;
                        };
                    };
                };

                status.style.backgroundColor = 'red';
            } else if(data.landListings[i].status == "SOLD") {
                status.style.backgroundColor = 'red';
            } else {
                status.style.backgroundColor = '#00bf63';
            };
            
            imageContainerModal.appendChild(status);
            
            const priceModal = document.createElement('p');
            priceModal.innerHTML = "&#8369;" + data.landListings[i].price_formatted;
            details.appendChild(priceModal);



            const reserve = document.createElement('button');
            reserve.innerHTML = 'Reserve this land';
            details.appendChild(reserve);

            if(data.landListings[i].status != "AVAILABLE") {  
                reserve.disabled = true;
                
            } else {           
                if(data.userId != '') {
                    const reserveModal = document.createElement('div');
                    const reserveH1 = document.createElement('h1');
                    const reserveCancel = document.createElement('button');
                    const reservelink = document.createElement('a');
            
                    reserveModal.classList.add('reserveModal');
                    reserveH1.innerHTML = 'You are about to reserve<br><span>' + data.landListings[i].address + '</span><br>During your reservation, this property will be held exclusively for you.';
                    reserveCancel.innerHTML = 'Cancel';
                    reservelink.href = "./landReservationForm.html?propertyId=" + data.landListings[i].property_id;
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
            const div = document.createElement('div');
         
            propertyType.innerHTML = data.landListings[i].property_type;
            locationModal.href = "./gpsSystem.html";
            locationModal.innerHTML = "View Location";
            bedRooms.innerHTML = "Bedrooms";
            bedRoomsCount.innerHTML = data.landListings[i].room_count;
            bathRooms.innerHTML = "Bathrooms";
            bathrRoomsCount.innerHTML = data.landListings[i].bath_count;
            area.innerHTML = "Area";
            measurments.classList.add('measurements');
            measurments.innerHTML = data.landListings[i].area_formatted + "sq";
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
            if(data.landListings[i].image_1 != null) {
                imageCount++;

                const image1 = document.createElement('img');

                image1.src = 'https://niwxujzmwpdhegjlmyfw.supabase.co/storage/v1/object/public/D.T.%20Comia%20Realty%20and%20Marketing/PROPERTY/' + data.landListings[i].user_id + '/' + data.landListings[i].property_id + '/' + data.landListings[i].image_1;
                image1.alt =  data.landListings[i].image_1;
                image1.type = "";
                
                div.appendChild(image1);
            };

            if(data.landListings[i].image_2 != null) {
                imageCount++;

                const image2 = document.createElement('img');

                image2.src = 'https://niwxujzmwpdhegjlmyfw.supabase.co/storage/v1/object/public/D.T.%20Comia%20Realty%20and%20Marketing/PROPERTY/' + data.landListings[i].user_id + '/' + data.landListings[i].property_id + '/' + data.landListings[i].image_2;
                image2.alt =  data.landListings[i].image_2;
                image2.type = "";
                
                div.appendChild(image2);
            };

            if(data.landListings[i].image_3 != null) {
                imageCount++;

                const image3 = document.createElement('img');

                image3.src = 'https://niwxujzmwpdhegjlmyfw.supabase.co/storage/v1/object/public/D.T.%20Comia%20Realty%20and%20Marketing/PROPERTY/' + data.landListings[i].user_id + '/' + data.landListings[i].property_id + '/' + data.landListings[i].image_3;
                image3.alt =  data.landListings[i].image_3;
                image3.type = "";
                
                div.appendChild(image3);
            };

            if(data.landListings[i].image_4 != null) {
                imageCount++;

                const image4 = document.createElement('img');

                image4.src = 'https://niwxujzmwpdhegjlmyfw.supabase.co/storage/v1/object/public/D.T.%20Comia%20Realty%20and%20Marketing/PROPERTY/' + data.landListings[i].user_id + '/' + data.landListings[i].property_id + '/' + data.landListings[i].image_4;
                image4.alt =  data.landListings[i].image_4;
                image4.type = "";
                
                div.appendChild(image4);
            };

            if(data.landListings[i].image_5 != null) {
                imageCount++;

                const image5 = document.createElement('img');

                image5.src = 'https://niwxujzmwpdhegjlmyfw.supabase.co/storage/v1/object/public/D.T.%20Comia%20Realty%20and%20Marketing/PROPERTY/' + data.landListings[i].user_id + '/' + data.landListings[i].property_id + '/' + data.landListings[i].image_5;
                image5.alt =  data.landListings[i].image_5;
                image5.type = "";
                
                div.appendChild(image5);
            };

            if(data.landListings[i].image_6 != null) {
                imageCount++;

                const image6 = document.createElement('img');

                image6.src = 'https://niwxujzmwpdhegjlmyfw.supabase.co/storage/v1/object/public/D.T.%20Comia%20Realty%20and%20Marketing/PROPERTY/' + data.landListings[i].user_id + '/' + data.landListings[i].property_id + '/' + data.landListings[i].image_6;
                image6.alt =  data.landListings[i].image_6;
                image6.type = "";
                
                div.appendChild(image6);
            };

            if(data.landListings[i].image_7 != null) {
                imageCount++;

                const image7 = document.createElement('img');

                image7.src = 'https://niwxujzmwpdhegjlmyfw.supabase.co/storage/v1/object/public/D.T.%20Comia%20Realty%20and%20Marketing/PROPERTY/' + data.landListings[i].user_id + '/' + data.landListings[i].property_id + '/' + data.landListings[i].image_7;
                image7.alt =  data.landListings[i].image_7;
                image7.type = "";
                
                div.appendChild(image7);
            };

            if(data.landListings[i].image_8 != null) {
                imageCount++;

                const image8 = document.createElement('img');

                image8.src = 'https://niwxujzmwpdhegjlmyfw.supabase.co/storage/v1/object/public/D.T.%20Comia%20Realty%20and%20Marketing/PROPERTY/' + data.landListings[i].user_id + '/' + data.landListings[i].property_id + '/' + data.landListings[i].image_8;
                image8.alt =  data.landListings[i].image_8;
                image8.type = "";
                
                div.appendChild(image8);
            };

            if(data.landListings[i].image_9 != null) {
                imageCount++;

                const image9 = document.createElement('img');

                image9.src = 'https://niwxujzmwpdhegjlmyfw.supabase.co/storage/v1/object/public/D.T.%20Comia%20Realty%20and%20Marketing/PROPERTY/' + data.landListings[i].user_id + '/' + data.landListings[i].property_id + '/' + data.landListings[i].image_9;
                image9.alt =  data.landListings[i].image_9;
                image9.type = "";
                
                div.appendChild(image9);
            };

            if(data.landListings[i].image_10 != null) {
                imageCount++;

                const image10 = document.createElement('img');

                image10.src = 'https://niwxujzmwpdhegjlmyfw.supabase.co/storage/v1/object/public/D.T.%20Comia%20Realty%20and%20Marketing/PROPERTY/' + data.landListings[i].user_id + '/' + data.landListings[i].property_id + '/' + data.landListings[i].image_10;
                image10.alt =  data.landListings[i].image_1;
                image10.type = "";
                
                div.appendChild(image10);
            };



                // INITIALLY ADDS 100% TRANSLATE TO ITS TRANSFORM.
            let translateCarousel = 0;

            if(data.landListings[i].image_2 != null) {
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
            description.innerHTML = data.landListings[i].description;

            propertyDetails.appendChild(div2Modal);
            div2Modal.appendChild(Description);
            div2Modal.appendChild(description);
        }

    };
    
};

landListings().catch(console.error);

document.querySelector('select[name="Land type"]').addEventListener("change", landListings);

    //  UPDATE THE selectQuery ONCE THE WHOLE FILTER RESETS.
function selectLocation() {
    if(window.location.search != '') {
        window.location.replace(window.location.pathname);
    } else {
        landListings().catch(console.error);
    };
};

document.querySelector('select[name="Select location"]').addEventListener("change", selectLocation);

 document.getElementById('minRange').addEventListener("input", landListings);
 document.getElementById('maxRange').addEventListener("input", landListings);