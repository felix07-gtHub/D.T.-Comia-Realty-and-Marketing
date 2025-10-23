    //  FUNCTION FOR ADDING A FEATURED PROPERTY.
async function addFeaturedFunction(propertyIdInput) {
    const response = await fetch('https://dt-comia-realty-and-marketing-production.up.railway.app/add-featured', {
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
function featuredCheckedTrue() {      
    const landListings2 = document.querySelector('#landListings2');
    
        //  DECLARES propertyIdInput.
    const propertyIdInput = [];

    for(let i = 0; i < landListings2.children.length; i++) {
        if(landListings2.children[i].classList == 'property') {
            if(landListings2.children[i].querySelector('.imageContainer > input').checked == true) {
                propertyIdInput.push(landListings2.children[i].querySelector('.imageContainer > input').parentElement.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.value);
            };
        };
    };
            
    addFeaturedFunction(propertyIdInput).catch(console.error);

};
    
const addFeatured = document.querySelector('#featured');


    //  ENABLES FEATURED MODE.
function enableFeaturedFunction() {
    const landListings2 = document.querySelector('#landListings2');
    const featuredLandListings = document.querySelector('#featuredLandListings');

    for(let i = 0; i < featuredLandListings.children.length; i++) {
        const translucentLayer = document.createElement('div');
        translucentLayer.classList.add('translucentLayer');

        if(featuredLandListings.children[i].classList == 'property') {
            featuredLandListings.children[i].appendChild(translucentLayer);
        }
    };

    let featuredCheckBoxNumber = 0;

    for(let i = 0; i < landListings2.children.length; i++) {
        if(landListings2.children[i].classList == 'property') {
            const removeDelete = landListings2.children[i].children[0].querySelector('.removeDelete');
            removeDelete.remove();
            
            featuredCheckBoxNumber++;

            const featuredCheckbox = document.createElement('input');
            const featuredLabel = document.createElement('label');
            const featured = document.createElement('img');

            featuredCheckbox.type = "checkbox";
            featuredCheckbox.name = "Featured checkbox " + featuredCheckBoxNumber;
            featuredCheckbox.id = "featuredCheckBox" + featuredCheckBoxNumber;
            featuredLabel.htmlFor = "featuredCheckBox" + featuredCheckBoxNumber;
            featuredLabel.classList.add('featuredCheckbox');
            featured.src = "https://niwxujzmwpdhegjlmyfw.supabase.co/storage/v1/object/public/D.T.%20Comia%20Realty%20and%20Marketing/AGENT ICONS/agent uncheckbox.png";
            featured.alt = "Empty checkbox";
            featured.type = "";

            landListings2.children[i].querySelector('.imageContainer').appendChild(featuredCheckbox);
            landListings2.children[i].querySelector('.imageContainer').appendChild(featuredLabel);
            featuredLabel.appendChild(featured);

            function featuredCheckboxFunction() {
                if(featuredCheckbox.checked != true) {
                    featured.src = "https://niwxujzmwpdhegjlmyfw.supabase.co/storage/v1/object/public/D.T.%20Comia%20Realty%20and%20Marketing/AGENT ICONS/agent uncheckbox.png";
                    featured.alt = "Empty checkbox";
                    featured.type = "";

                } else {
                    featured.src = "https://niwxujzmwpdhegjlmyfw.supabase.co/storage/v1/object/public/D.T.%20Comia%20Realty%20and%20Marketing/AGENT ICONS/agent checkbox.png";
                    featured.alt = "Checked checkbox";
                    featured.type = "";

                };

            };

            featuredCheckbox.addEventListener("change", featuredCheckboxFunction);
            
        };

    };
    
};