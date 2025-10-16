const gradientLayer = document.getElementById("gradientLayer");

    // TOGGLE MENU ICON FUNCTION.
function toggleMenu() {
    const menuIcon = document.getElementById('menuIcon');
    const menuTab = document.getElementById('menuTab');
    const user = document.getElementById('user');
    const dropDown = document.getElementById('dropDown');

    if(menuTab.style.width == '100%') {
        menuIcon.innerHTML = '&#9776;';
        menuTab.style.width = '0px';
    } else {
        menuIcon.innerHTML = '&#10005;';
        menuTab.style.width = '100%';
    };

        // HIDES THE DROP-DOWN WHEN TOGGLE MENU BUTTON.
    user.style.width = '0px';
    dropDown.style.height = '0px';
    gradientLayer.style.display = 'none';
};

    //  HIDES THE DROP-DOWN WHEN CLICK THE GRADIENT LAYER.
function hideDropDown(e){
    const div = document.getElementById("user");
    const dropDown = document.getElementById("dropDown");
    const gradientLayer = document.getElementById("gradientLayer");

        // HIDES THE DROP-DOWN WHEN TOGGLE OUTSIDE THE dropDown.
    if(
        gradientLayer.contains(e.target) ||
        (
            dropDown.contains(e.target) &&
            !dropDown.children[0].contains(e.target)
        )        
    ) {
        div.style.width = '0px';
        dropDown.style.height = '0px';
        gradientLayer.style.display = 'none';
    };
};

document.body.addEventListener("click", hideDropDown);



const nav = document.querySelector('nav');

    //  GET THE USER.
async function user() {
    const response = await fetch('https://dt-comia-realty-and-marketing-production.up.railway.app/user', {
        method: "GET",
        credentials: "include"
    });
    const data = await response.json();

    if(data.user != undefined) {
        if(data.user[0].type_of_user != "Customer") {
            const profileButton = document.createElement('input');
            const div = document.createElement('div');
            const user = document.createElement('p');
            const dropDown = document.createElement('div');
            const ul = document.createElement('ul');

            profileButton.type = "image";
            profileButton.name = "Profile button";
            profileButton.src = "https://niwxujzmwpdhegjlmyfw.supabase.co/storage/v1/object/public/D.T.%20Comia%20Realty%20and%20Marketing/BUYER ICONS AND LOGOS/profile.png";
            profileButton.alt = "Profile icon";
            profileButton.id = "profileIcon";
            div.id = "user";
            user.innerHTML = '';
            dropDown.id = "dropDown";

            nav.appendChild(profileButton);
            nav.appendChild(div);
            div.appendChild(user);
            nav.appendChild(dropDown);
            dropDown.appendChild(ul);   

                //  TOGGLE PROFILE ICON FUNCTION.
            function toggleProfile() {
                if(div.style.width == '100%' && dropDown.style.height == '100vh' && gradientLayer.style.display == 'block') {        
                    div.style.width = '0px';
                    dropDown.style.height = '0px';
                    gradientLayer.style.display = 'none';
                    
                } else {
                    div.style.width = '100%';
                    dropDown.style.height = '100vh';
                    gradientLayer.style.display = 'block';
                };
            };

            profileButton.addEventListener("click", toggleProfile);



            const signUpLi = document.createElement('li');
            const signUp = document.createElement('a');
            const logInLi = document.createElement('li');
            const logIn = document.createElement('a');

            signUp.href = "./signUp.html";
            signUp.innerHTML = "SIGN UP"
            logIn.href = "./logIn.html";
            logIn.innerHTML = "LOG IN";

            ul.appendChild(signUpLi)
            signUpLi.appendChild(signUp);
            ul.appendChild(logInLi);
            logInLi.appendChild(logIn);
        } else {
            const profileButton = document.createElement('input');
            const div = document.createElement('div');
            const user = document.createElement('p');
            const dropDown = document.createElement('div');
            const ul = document.createElement('ul');

            
                profileButton.type = "image";
                profileButton.name = "Profile button";
                profileButton.src = 'https://niwxujzmwpdhegjlmyfw.supabase.co/storage/v1/object/public/D.T.%20Comia%20Realty%20and%20Marketing/BUYER ICONS AND LOGOS/profile.png';
                profileButton.alt = "Profile icon";
                profileButton.id = "profileIcon";
           

            div.id = "user";
            user.innerHTML = data.user[0].user_name;
            dropDown.id = "dropDown";

            nav.appendChild(profileButton);
            nav.appendChild(div);
            div.appendChild(user);
            nav.appendChild(dropDown);
            dropDown.appendChild(ul);

                //  TOGGLE PROFILE ICON FUNCTION.
            function toggleProfile() {
                if(div.style.width == '100%' && dropDown.style.height == '100vh' && gradientLayer.style.display == 'block') {        
                    div.style.width = '0px';
                    dropDown.style.height = '0px';
                    gradientLayer.style.display = 'none';
                    
                } else {
                    div.style.width = '100%';
                    dropDown.style.height = '100vh';
                    gradientLayer.style.display = 'block';
                };
            };

            profileButton.addEventListener("click", toggleProfile);



            const savedPropertiesLi = document.createElement('li');
            const savedProperties = document.createElement('a');
            const savedPropertiesIcon = document.createElement('img');
            const toursReservationsLi = document.createElement('li');
            const toursReservations = document.createElement('a');
            const toursReservationsIcon = document.createElement('img');
            const logOutLi = document.createElement('li');
            const logOutIcon = document.createElement('img');
            const logOut = document.createElement('p');

            savedProperties.href = "./savedPropertiesPage.html";
            savedProperties.innerHTML = "SAVED PROPERTIES";
            savedPropertiesIcon.src = "https://niwxujzmwpdhegjlmyfw.supabase.co/storage/v1/object/public/D.T.%20Comia%20Realty%20and%20Marketing/BUYER ICONS AND LOGOS/brown full heart.png";
            savedPropertiesIcon.alt = "Saved properties Icon";
            savedPropertiesIcon.type = "";
            toursReservations.href = "./tourReservationActive.html";
            toursReservations.innerHTML = "MY TOURS & RESERVATIONS";
            toursReservationsIcon.src = "https://niwxujzmwpdhegjlmyfw.supabase.co/storage/v1/object/public/D.T.%20Comia%20Realty%20and%20Marketing/BUYER ICONS AND LOGOS/my reservations.png";
            toursReservationsIcon.alt = "My tours and reservations Icon";
            toursReservationsIcon.type = "";
            logOutIcon.src = "https://niwxujzmwpdhegjlmyfw.supabase.co/storage/v1/object/public/D.T.%20Comia%20Realty%20and%20Marketing/BUYER ICONS AND LOGOS/logout.png";
            logOutIcon.alt = "Log out Icon";
            logOutIcon.type = "";
            logOut.innerHTML = "LOG OUT";

                //  DELETE THE USER SESSION.
            async function logOutFunction(e) {
                const response = await fetch('https://dt-comia-realty-and-marketing-production.up.railway.app/log-out', {
                    method: "GET",
                    credentials: "include"
                });
                const data = await response.json();

                    //  RELOADS PAGE.
                location.reload();
            };

            logOutLi.addEventListener("click", logOutFunction);

            

            ul.appendChild(savedPropertiesLi);
            savedPropertiesLi.appendChild(savedProperties);
            savedProperties.appendChild(savedPropertiesIcon);
            ul.appendChild(toursReservationsLi);
            toursReservationsLi.appendChild(toursReservations);
            toursReservations.appendChild(toursReservationsIcon);
            ul.appendChild(logOutLi);
            logOutLi.appendChild(logOutIcon);
            logOutLi.appendChild(logOut);
        };
    } else {
        const profileButton = document.createElement('input');
        const div = document.createElement('div');
        const user = document.createElement('p');
        const dropDown = document.createElement('div');
        const ul = document.createElement('ul');

        profileButton.type = "image";
        profileButton.name = "Profile button";
        profileButton.src = "https://niwxujzmwpdhegjlmyfw.supabase.co/storage/v1/object/public/D.T.%20Comia%20Realty%20and%20Marketing/BUYER ICONS AND LOGOS/profile.png";
        profileButton.alt = "Profile icon";
        profileButton.id = "profileIcon";
        div.id = "user";
        user.innerHTML = '';
        dropDown.id = "dropDown";

        nav.appendChild(profileButton);
        nav.appendChild(div);
        div.appendChild(user);
        nav.appendChild(dropDown);
        dropDown.appendChild(ul);   

            //  TOGGLE PROFILE ICON FUNCTION.
        function toggleProfile() {
            if(div.style.width == '100%' && dropDown.style.height == '100vh' && gradientLayer.style.display == 'block') {        
                div.style.width = '0px';
                dropDown.style.height = '0px';
                gradientLayer.style.display = 'none';
                
            } else {
                div.style.width = '100%';
                dropDown.style.height = '100vh';
                gradientLayer.style.display = 'block';
            };
        };

        profileButton.addEventListener("click", toggleProfile);



        const signUpLi = document.createElement('li');
        const signUp = document.createElement('a');
        const logInLi = document.createElement('li');
        const logIn = document.createElement('a');

        signUp.href = "./signUp.html";
        signUp.innerHTML = "SIGN UP"
        logIn.href = "./logIn.html";
        logIn.innerHTML = "LOG IN";

        ul.appendChild(signUpLi)
        signUpLi.appendChild(signUp);
        ul.appendChild(logInLi);
        logInLi.appendChild(logIn);
    };
};

user().catch(console.error);



    //  FUNCTION FOR hideMenuTab.
function hideMenuTab() {
    const menuIcon = document.getElementById('menuIcon');
    const menuTab = document.getElementById('menuTab');

    if(window.innerWidth > 767) {
        menuIcon.innerHTML = '&#9776;';
        menuTab.style.width = '0px';
        menuTab.style.padding = '128px 0px 25px 0px';
    };

};

window.onresize = hideMenuTab;