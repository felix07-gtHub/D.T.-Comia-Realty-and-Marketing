    //-----------------------------------------------------------HOVER STYLE FOR LOCATION INTPUT-----------------------------------------------------------.
    // SEPARATED DUE TO DIFFERENCE IN STRUCTURE.
const locationInput = document.querySelector('#AddProperty input[name="Location"]');
const locationSuggestion= document.querySelector('#AddProperty > form > div:nth-child(4) > div');

    //  FUNCTION FOR VALID INPUTS mouseenter.
function validLocationInputsMousEnter(e) {
    e.target.style.backgroundColor = '#d8e3d0';
    e.target.style.color = 'black';
    e.target.style.boxShadow = '0px 0px 10px #4e6e5d';
    e.target.parentElement.style.transform = 'scale(1.01)';
    e.target.parentElement.style.transition = 'transform 0.25s';
    e.target.parentElement.style.boxShadow = '0px 0px 10px #4e6e5d';

    for(let i = 0; i < e.target.nextElementSibling.children.length; i++) {
        e.target.nextElementSibling.children[i].style.backgroundColor = '#d8e3d0';
        e.target.nextElementSibling.children[i].style.color = 'black';
    }
};

locationInput.addEventListener("mouseenter", validLocationInputsMousEnter);

    //  FUNCTION FOR VALID INPUTS mouseleave.
function validLocationInputsMousEave(e) {
    e.target.style.backgroundColor = '#4e6e5d';
    e.target.style.color = '#f5f8f6';
    e.target.style.boxShadow = 'none';
    e.target.parentElement.style.transform = 'none';
    e.target.parentElement.style.transition = 'none';
    e.target.parentElement.style.boxShadow = 'none';

    for(let i = 0; i < e.target.nextElementSibling.children.length; i++) {
        e.target.nextElementSibling.children[i].style.backgroundColor = '#4e6e5d';
        e.target.nextElementSibling.children[i].style.color = '#f5f8f6';
    }
};

locationInput.addEventListener("mouseleave", validLocationInputsMousEave);

    //  FUNCTION FOR INVALID INPUTS mouseenter.
function invalidLocationInputsMousEnter(e) {
    e.target.parentElement.style.transform = 'scale(1.01)';
    e.target.parentElement.style.transition = 'transform 0.25s';
};

    //  FUNCTION FOR INVALID INPUTS mouseleave.
function invalidLocationInputsMousEave(e) {
    e.target.parentElement.style.transform = 'none';
    e.target.parentElement.style.transition = 'none';
};
    //-----------------------------------------------------------------------------------------------------------------------------------------------------.
    
    //----------------------------------------------------------HOVER STYLE FOR THE REST OF INPUTS----------------------------------------------------------.
    //  SEPARATED DUE TO DIFFERENCE IN STRUCTURE.

const address = document.querySelector('#AddProperty input[name="Address"]');
const houseType = document.querySelector('#AddProperty select');
const price = document.querySelector('#AddProperty input[name="Price"]');
const area = document.querySelector('#AddProperty input[name="Area"]');
const roomCount = document.querySelector('#AddProperty input[name="Room_count"]');
const bathCount = document.querySelector('#AddProperty input[name="Bath_count"]');
const description = document.querySelector('#AddProperty input[name="Description"]');

    //  FUNCTION FOR VALID INPUTS mouseenter.
function validInputsMousEnter(e) {
    e.target.style.backgroundColor = '#d8e3d0';
    e.target.style.color = 'black';
    e.target.style.transform = 'scale(1.01)';
    e.target.style.transition = 'transform 0.25s';
    e.target.style.boxShadow = '0px 0px 10px #4e6e5d';
};

address.addEventListener("mouseenter", validInputsMousEnter);
houseType.addEventListener("mouseenter", validInputsMousEnter);
price.addEventListener("mouseenter", validInputsMousEnter);
area.addEventListener("mouseenter", validInputsMousEnter);
roomCount.addEventListener("mouseenter", validInputsMousEnter);
bathCount.addEventListener("mouseenter", validInputsMousEnter);
description.addEventListener("mouseenter", validInputsMousEnter);

    //  FUNCTION FOR VALID INPUTS mouseleave.
function validInputsMousEave(e) {
    e.target.style.backgroundColor = '#4e6e5d';
    e.target.style.color = '#f5f8f6';
    e.target.style.transform = 'none';
    e.target.style.transition = 'none';
    e.target.style.boxShadow = 'none';
};

address.addEventListener("mouseleave", validInputsMousEave);
houseType.addEventListener("mouseleave", validInputsMousEave);
price.addEventListener("mouseleave", validInputsMousEave);
area.addEventListener("mouseleave", validInputsMousEave);
roomCount.addEventListener("mouseleave", validInputsMousEave);
bathCount.addEventListener("mouseleave", validInputsMousEave);
description.addEventListener("mouseleave", validInputsMousEave);

    //  FUNCTION FOR INVALID INPUTS mouseenter.
function invalidInputsMousEnter(e) {
    e.target.style.backgroundColor = '#f5f8f6';
    e.target.style.color = '#000000';
    e.target.style.border = 'solid red';
    e.target.style.transform = 'scale(1.01)';
    e.target.style.transition = 'transform 0.25s';
    e.target.style.boxShadow = '0px 0px 10px red';
};

    //  FUNCTION FOR INVALID INPUTS mouseleave.
function invalidInputsMousEave(e) {
    e.target.style.backgroundColor = '#f5f8f6';
    e.target.style.color = '#000000';
    e.target.style.border = 'solid red';
    e.target.style.transform = 'none';
    e.target.style.transition = 'none';
    e.target.style.boxShadow = '0px 0px 10px red';
};
    //------------------------------------------------------------------------------------------------------------------------------------------------------.

    //----------------------------------------------------------HOVER STYLE FOR FILES----------------------------------------------------------.
    //  SEPARATED DUE TO DIFFERENCE IN STRUCTURE.

const mainImage = document.querySelector('.Main-Image');
const additionalImages = document.querySelector('.Additional-Images');

    //  FUNCTION FOR VALID FILES mouseenter.
function validFilesMousEnter(e) {
    e.target.style.transform = 'scale(1.01)';
    e.target.style.transition = 'transform 0.25s';
    e.target.style.boxShadow = '0px 0px 10px #4e6e5d';
};

mainImage.addEventListener("mouseenter", validFilesMousEnter);
additionalImages.addEventListener("mouseenter", validFilesMousEnter);

    //  FUNCTION FOR VALID FILES mouseleave.
function validFilesMousEave(e) {
    e.target.style.transform = 'none';
    e.target.style.transition = 'none';
    e.target.style.boxShadow = 'none';
};

mainImage.addEventListener("mouseleave", validFilesMousEave);
additionalImages.addEventListener("mouseleave", validFilesMousEave);

const mainImageButton = document.querySelector('.Main-Image label');
const additionalImagesButton = document.querySelector('.Additional-Images label');

    //  FUNCTION FOR VALID BUTTON mouseenter.
function validButtonsMousEnter(e) {
    e.target.style.backgroundColor = '#d8e3d0';
    e.target.style.color = 'black';
    e.target.nextElementSibling.style.color = '#000000';
    e.target.parentElement.style.borderColor = '#d8e3d0';
};

mainImageButton.addEventListener("mouseenter", validButtonsMousEnter);
additionalImagesButton.addEventListener("mouseenter", validButtonsMousEnter);

    //  FUNCTION FOR VALID BUTTON mouseleave.
function validButtonsMousEave(e) {
    e.target.style.backgroundColor = '#4e6e5d';
    e.target.style.color = '#f5f8f6';
    e.target.nextElementSibling.style.color = '#4e6e5d';
    e.target.parentElement.style.borderColor = '#4e6e5d';
};

mainImageButton.addEventListener("mouseleave", validButtonsMousEave);
additionalImagesButton.addEventListener("mouseleave", validButtonsMousEave);
    //------------------------------------------------------------------------------------------------------------------------------------------------------.


    
const discard = document.querySelector('#AddProperty > div:nth-child(5) > button:nth-child(1)');
const save = document.querySelector('#AddProperty > div:nth-child(5) > button:nth-child(2)');

    /*
        IF INPUTS ARE INVALID AND THE USER INPUTS A VALUE INPUTS RESETS.
        IF USER INPUTS A VALUE IT ENABLES DISCARD BUTTON 
        IF THE USER DELETE THE VALUE OF THE ENTIRE INPUTS IT DISABLES THE DISCARD BUTTON
        UNLESS THE INPUTS SHOWS ERROR EVEN WITHOUT VALUE
        THIS HAPPENS WHEN THE USER INPUTS A VALUE IN A NON-REQUIRED FIELD AND SAVES IT.
    */
function inputChange() {
    if(locationInput.style.border != "none" && locationInput.value != "") {
        locationInput.removeEventListener("mouseenter", invalidLocationInputsMousEnter);
        locationInput.removeEventListener("mouseleave", invalidLocationInputsMousEave);

        locationInput.style.backgroundColor = '#4e6e5d';
        locationInput.style.color = '#f5f8f6';
        locationInput.style.border = 'none';
        locationInput.style.boxShadow = 'none';  

        locationInput.addEventListener("mouseenter", validLocationInputsMousEnter);
        locationInput.addEventListener("mouseleave", validLocationInputsMousEave);

    };

    if(address.style.border != "none" && address.value != "") {
        address.removeEventListener("mouseenter", invalidInputsMousEnter);
        address.removeEventListener("mouseleave", invalidInputsMousEave);

        address.style.backgroundColor = '#4e6e5d';
        address.style.color = '#f5f8f6';
        address.style.border = 'none';
        address.style.boxShadow = 'none';  

        address.addEventListener("mouseenter", validInputsMousEnter);
        address.addEventListener("mouseleave", validInputsMousEave);

    };

    if(mainImage.style.border != "none" && mainImage.children[1].value != "") {
        mainImage.removeEventListener("mouseenter", invalidInputsMousEnter);
        mainImage.removeEventListener("mouseleave", invalidInputsMousEave);

        mainImage.style.boxShadow = 'none';
        mainImageButton.style.backgroundColor = '#4e6e5d';
        mainImageButton.style.color = '#f5f8f6';
        mainImage.style.color = '#4e6e5d';
        mainImage.style.borderColor = '#4e6e5d'; 

        mainImage.addEventListener("mouseenter", validFilesMousEnter);
        mainImage.addEventListener("mouseleave", validFilesMousEave);
        mainImageButton.addEventListener("mouseenter", validButtonsMousEnter);
        mainImageButton.addEventListener("mouseleave", validButtonsMousEave);

    };

    if(houseType.style.border != "none" && houseType.value != "Any") {
        houseType.removeEventListener("mouseenter", invalidInputsMousEnter);
        houseType.removeEventListener("mouseleave", invalidInputsMousEave);

        houseType.style.backgroundColor = '#4e6e5d';
        houseType.style.color = '#f5f8f6';
        houseType.style.border = 'none';
        houseType.style.boxShadow = 'none';  

        houseType.addEventListener("mouseenter", validInputsMousEnter);
        houseType.addEventListener("mouseleave", validInputsMousEave);

    };

    if(price.style.border != "none" && price.value != "") {
        price.removeEventListener("mouseenter", invalidInputsMousEnter);
        price.removeEventListener("mouseleave", invalidInputsMousEave);

        price.style.backgroundColor = '#4e6e5d';
        price.style.color = '#f5f8f6';
        price.style.border = 'none';
        price.style.boxShadow = 'none';  

        price.addEventListener("mouseenter", validInputsMousEnter);
        price.addEventListener("mouseleave", validInputsMousEave);

    };

    if(price.value.match(/\./) != null) {
        const priceValue = price.value.split('.');

        if(priceValue[0] > 999999999999) {
            priceValue[0] = 999999999999;

        } else if(priceValue[0] < -999999999999) {
            priceValue[0] = -999999999999;
            
        };

        if(priceValue[1] > 99) {
            priceValue[1] = 99;
            
        } else if(priceValue[1] < -99) {
            priceValue[1] = -99;
            
        };

        price.value = priceValue[0] + '.' + priceValue[1];
    } else {
        if(parseInt(price.value) > 999999999999) {
            price.value = 999999999999;

        } else if(parseInt(price.value) < 0) {
            price.value = 0;
            
        };
    };

    if(parseInt(area.value) > 2147483647) {
        area.value = 2147483647;

    } else if(parseInt(area.value) < 0) {
            area.value = 0;
            
    };

    if(parseInt(roomCount.value) > 2147483647) {
        roomCount.value = 2147483647;

    } else if(parseInt(roomCount.value) < 0) {
            roomCount.value = 0;
            
    };

    if(parseInt(bathCount.value) > 2147483647) {
        bathCount.value = 2147483647;

    } else if(parseInt(bathCount.value) < 0) {
            bathCount.value = 0;
            
    };

    if(
        (locationInput.value != "" || locationInput.style.border != "none") ||
        (address.value != "" || address.style.border != "none") ||
        (mainImage.children[1].value != "" || mainImage.style.border != "none") ||
        additionalImages.children[1].value != "" ||
        houseType.value != "Any" ||
        (price.value != "" || price.style.border != "none") ||
        area.value != "" ||
        roomCount.value != "" ||
        bathCount.value != "" ||
        description.value != ""
    ) {
        discard.disabled = false;
    } else {
        discard.disabled = true;
    };

    if(
        locationInput.value != "" ||
        address.value != "" ||
        mainImage.children[1].value != "" ||
        additionalImages.children[1].value != "" ||
        houseType.value != "Any" ||
        price.value != "" ||
        area.value != "" ||
        roomCount.value != "" ||
        bathCount.value != "" ||
        description.value != ""
    ) {
        save.disabled = false;
    } else {
        save.disabled = true;
    };
};

locationInput.addEventListener("input", inputChange);
address.addEventListener("input", inputChange);
mainImage.children[1].addEventListener("input", inputChange);
additionalImages.children[1].addEventListener("input", inputChange);
houseType.addEventListener("change", inputChange);
price.addEventListener("input", inputChange);
area.addEventListener("input", inputChange);
roomCount.addEventListener("input", inputChange);
bathCount.addEventListener("input", inputChange);
description.addEventListener("input", inputChange);



    //  HIDES THE locationSuggestion IF CLICKED OUTSIDE THE locationInput.
function showHideSearchSuggestion(e) {
    if(!locationInput.contains(e.target)) {
        locationSuggestion.style.height = "0px";
    } else {
        locationSuggestion.style.height = "auto";
    }
}

document.body.addEventListener("click", showHideSearchSuggestion);

    //  FUNCTION FOR SEARCHING LOCATION.
async function searchLocation() {
    const locationValue = locationInput.value;

    const response = await fetch('http://127.0.0.1:3000/search-location', {
        method: 'POST',
        headers: {                    
                    'User-Agent': 'undici-stream-example',
                    'Content-Type': 'application/json'
        },
        body: JSON.stringify({locationValue})
    });
    const data = await response.json();

        //  RESETS locationSuggestion EVERYTIME USER SEARCHES LOCATION TO AVOID FLOODING
        //  THE locationSuggestions WITH UNRELATED SUGGESTIONS TO THE SEARCHED LOCATION.
    locationSuggestion.innerHTML = "";

    for(let i = 0; i < data.location.length; i++) {
        const location = document.createElement('input');

        location.type = "button";
        location.name = data.location[i];
        location.value = data.location[i];

        locationSuggestion.appendChild(location);

            //  FUNCTION FOR VALID INPUTS mouseenter.
        function suggestedLocationInputsMousEnter(e) {
            e.target.style.backgroundColor = '#252525';
            e.target.style.color = 'white';
        };

        location.addEventListener("mouseenter", suggestedLocationInputsMousEnter);

            //  FUNCTION FOR VALID INPUTS mouseleave.
        function suggestedLocationInputsMousEave(e) {
            e.target.style.backgroundColor = '#4e6e5d';
            e.target.style.color = '#f5f8f6';
        };

        location.addEventListener("mouseleave", suggestedLocationInputsMousEave);

        function selectSuggestedLocation() {
            locationInput.value = location.value;

            // store coords for saving later
            locationInput.dataset.lat = data.lat[i];
            locationInput.dataset.lng = data.lon[i];

            searchLocation().catch(console.error);
   
}

        location.addEventListener("click", selectSuggestedLocation);
    }
};  

locationInput.addEventListener("input", searchLocation);



    //  RESETS THE INPUTS.
function discardFunction() {
    if(locationInput.style.border != "none") {
        locationInput.value = "";

        locationInput.removeEventListener("mouseenter", invalidLocationInputsMousEnter);
        locationInput.removeEventListener("mouseleave", invalidLocationInputsMousEave);

        locationInput.style.backgroundColor = '#4e6e5d';
        locationInput.style.color = '#f5f8f6';
        locationInput.style.border = 'none';
        locationInput.style.boxShadow = 'none';   

        locationInput.addEventListener("mouseenter", validLocationInputsMousEnter);
        locationInput.addEventListener("mouseleave", validLocationInputsMousEave);

    } else {            
        locationInput.value = "";
    };

    if(address.style.border != "none") {
        address.value = "";

        address.removeEventListener("mouseenter", invalidInputsMousEnter);
        address.removeEventListener("mouseleave", invalidInputsMousEave);

        address.style.backgroundColor = '#4e6e5d';
        address.style.color = '#f5f8f6';
        address.style.border = 'none';
        address.style.boxShadow = 'none';  

        address.addEventListener("mouseenter", validInputsMousEnter);
        address.addEventListener("mouseleave", validInputsMousEave);

    } else {            
        address.value = "";
    };

    if(mainImage.style.border != "none") {
        mainImage.children[1].value = "";
        
        mainImage.removeEventListener("mouseenter", invalidInputsMousEnter);
        mainImage.removeEventListener("mouseleave", invalidInputsMousEave);

        mainImage.style.boxShadow = 'none';
        mainImageButton.style.backgroundColor = '#4e6e5d';
        mainImageButton.style.color = '#f5f8f6';
        mainImage.style.color = '#4e6e5d';
        mainImage.style.borderColor = '#4e6e5d'; 

        mainImage.addEventListener("mouseenter", validFilesMousEnter);
        mainImage.addEventListener("mouseleave", validFilesMousEave);
        mainImageButton.addEventListener("mouseenter", validButtonsMousEnter);
        mainImageButton.addEventListener("mouseleave", validButtonsMousEave);

    } else {            
        mainImage.children[1].value = "";
    };

    additionalImages.children[1].value = "";

    if(houseType.style.border != "none") {
        houseType.value = "Any";

        houseType.removeEventListener("mouseenter", invalidInputsMousEnter);
        houseType.removeEventListener("mouseleave", invalidInputsMousEave);

        houseType.style.backgroundColor = '#4e6e5d';
        houseType.style.color = '#f5f8f6';
        houseType.style.border = 'none';
        houseType.style.boxShadow = 'none'; 

        houseType.addEventListener("mouseenter", validInputsMousEnter);
        houseType.addEventListener("mouseleave", validInputsMousEave);

    } else {            
        houseType.value = "Any";
    };

    if(price.style.border != "none") {
        price.value = "";

        price.removeEventListener("mouseenter", invalidInputsMousEnter);
        price.removeEventListener("mouseleave", invalidInputsMousEave);

        price.style.backgroundColor = '#4e6e5d';
        price.style.color = '#f5f8f6';
        price.style.border = 'none';
        price.style.boxShadow = 'none';   

        price.addEventListener("mouseenter", validInputsMousEnter);
        price.addEventListener("mouseleave", validInputsMousEave);

    } else {            
        price.value = "";
    };

    area.value = "";
    roomCount.value = "";
    bathCount.value = "";
    description.value = "";

    discard.disabled = true;
    save.disabled = true;
};

discard.addEventListener("click", discardFunction);

    //  UPLOAD THE PROPERTY IF THE INPUTS ARE VALID.
async function saveFunction() {
        /*
            IF THE THERES ONLY ONE IN THE locationSuggestion ITS MEANS
            THAT THE USER SELECTS LOCATION FROM locationSuggestion.
            ONLY VALID WHEN THE USER SELECT LOCATION FROM THE locationSuggestion.
        */
    if(locationInput.value != "" && locationSuggestion.children.length == 1) {
        locationInput.removeEventListener("mouseenter", invalidLocationInputsMousEnter);
        locationInput.removeEventListener("mouseleave", invalidLocationInputsMousEave);

        locationInput.style.backgroundColor = '#4e6e5d';
        locationInput.style.color = '#f5f8f6';
        locationInput.style.border = 'none';
        locationInput.style.boxShadow = 'none';  

        locationInput.addEventListener("mouseenter", validLocationInputsMousEnter);
        locationInput.addEventListener("mouseleave", validLocationInputsMousEave);

    } else {            
        locationInput.removeEventListener("mouseenter", validLocationInputsMousEnter);
        locationInput.removeEventListener("mouseleave", validLocationInputsMousEave);

        locationInput.style.backgroundColor = '#f5f8f6';
        locationInput.style.color = '#000000';
        locationInput.style.border = 'solid red';
        locationInput.style.boxShadow = '0px 0px 10px red';
            
        locationInput.addEventListener("mouseenter", invalidLocationInputsMousEnter);
        locationInput.addEventListener("mouseleave", invalidLocationInputsMousEave);

    };

    if(address.value != "") {
        address.removeEventListener("mouseenter", invalidInputsMousEnter);
        address.removeEventListener("mouseleave", invalidInputsMousEave);

        address.style.backgroundColor = '#4e6e5d';
        address.style.color = '#f5f8f6';
        address.style.border = 'none';
        address.style.boxShadow = 'none';  

        address.addEventListener("mouseenter", validInputsMousEnter);
        address.addEventListener("mouseleave", validInputsMousEave);

    } else {            
        address.removeEventListener("mouseenter", validInputsMousEnter);
        address.removeEventListener("mouseleave", validInputsMousEave);

        address.style.backgroundColor = '#f5f8f6';
        address.style.color = '#000000';
        address.style.border = 'solid red';
        address.style.boxShadow = '0px 0px 10px red';
            
        address.addEventListener("mouseenter", invalidInputsMousEnter);
        address.addEventListener("mouseleave", invalidInputsMousEave);

    };

    if(mainImage.children[1].value != "") {
        mainImage.removeEventListener("mouseenter", invalidInputsMousEnter);
        mainImage.removeEventListener("mouseleave", invalidInputsMousEave);

        mainImage.style.boxShadow = 'none';
        mainImageButton.style.backgroundColor = '#4e6e5d';
        mainImageButton.style.color = '#f5f8f6';
        mainImage.style.color = '#4e6e5d';
        mainImage.style.borderColor = '#4e6e5d';   

        mainImage.addEventListener("mouseenter", validFilesMousEnter);
        mainImage.addEventListener("mouseleave", validFilesMousEave);
        mainImageButton.addEventListener("mouseenter", validButtonsMousEnter);
        mainImageButton.addEventListener("mouseleave", validButtonsMousEave);

    } else {                      
        mainImage.removeEventListener("mouseenter", validFilesMousEnter);
        mainImage.removeEventListener("mouseleave", validFilesMousEave);
        mainImageButton.removeEventListener("mouseenter", validButtonsMousEnter);
        mainImageButton.removeEventListener("mouseleave", validButtonsMousEave);

        mainImage.style.boxShadow = '0px 0px 10px red';
        mainImageButton.style.backgroundColor = 'red';
        mainImageButton.style.color = '#f5f8f6';
        mainImage.style.color = 'red';
        mainImage.style.borderColor = 'red';
            
        mainImage.addEventListener("mouseenter", invalidInputsMousEnter);
        mainImage.addEventListener("mouseleave", invalidInputsMousEave);

    };
    
    if(houseType.value != "Any") {
        houseType.removeEventListener("mouseenter", invalidInputsMousEnter);
        houseType.removeEventListener("mouseleave", invalidInputsMousEave);

        houseType.style.backgroundColor = '#4e6e5d';
        houseType.style.color = '#f5f8f6';
        houseType.style.border = 'none';
        houseType.style.boxShadow = 'none';  

        houseType.addEventListener("mouseenter", validInputsMousEnter);
        houseType.addEventListener("mouseleave", validInputsMousEave);

    } else {          
        houseType.removeEventListener("mouseenter", validInputsMousEnter);
        houseType.removeEventListener("mouseleave", validInputsMousEave);

        houseType.style.backgroundColor = '#f5f8f6';
        houseType.style.color = '#000000';
        houseType.style.border = 'solid red';
        houseType.style.boxShadow = '0px 0px 10px red';
            
        houseType.addEventListener("mouseenter", invalidInputsMousEnter);
        houseType.addEventListener("mouseleave", invalidInputsMousEave);

    };

    if(price.value != "") {
        price.removeEventListener("mouseenter", invalidInputsMousEnter);
        price.removeEventListener("mouseleave", invalidInputsMousEave);

        price.style.backgroundColor = '#4e6e5d';
        price.style.color = '#f5f8f6';
        price.style.border = 'none';
        price.style.boxShadow = 'none';  

        price.addEventListener("mouseenter", validInputsMousEnter);
        price.addEventListener("mouseleave", validInputsMousEave);

    } else {          
        price.removeEventListener("mouseenter", validInputsMousEnter);
        price.removeEventListener("mouseleave", validInputsMousEave);

        price.style.backgroundColor = '#f5f8f6';
        price.style.color = '#000000';
        price.style.border = 'solid red';
        price.style.boxShadow = '0px 0px 10px red';
            
        price.addEventListener("mouseenter", invalidInputsMousEnter);
        price.addEventListener("mouseleave", invalidInputsMousEave);

    };

    const form = document.getElementById("form");
    const formData = new FormData(form);
    // attach lat/lon from the selected location

        /*
            IF THE THERES ONLY ONE IN THE locationSuggestion ITS MEANS
            THAT THE USER SELECTS LOCATION FROM locationSuggestion.
            ONLY UPLOADS WHEN REQUIRED FIELD ARE PROVIDED.
        */
    if(
        (
            locationInput.value != "" &&
            locationSuggestion.children.length == 1
        ) &&

        mainImage.children[1].value != "" &&
        address.value != "" &&
        houseType.value != "Any" &&
        price.value != ""
    ) {
            /*
                SINCE FormData AUTOMATICALLY STORING THE INPUTS TO ITSELF
                THERE'S NO NEED TO DECLARE EACH OF ITS INPUTS VALUE ONE-BY-ONE
                SINCE IT WAS STORED AS JSON LIKE STRUCTURE
                THERE'S NO NEED TO CONVERT IT INTO JSON FILE.
            */
        const response = await fetch('https://dt-comia-realty-and-marketing-production.up.railway.app/add-house', {
            method: 'POST',
            headers: {                    
                        'User-Agent': 'undici-stream-example'
            },
            credentials: "include",
            body: formData,
        });
    
        discardFunction();

        discard.disabled = true;
        save.disabled = true;
    };

};

save.addEventListener("click", saveFunction);