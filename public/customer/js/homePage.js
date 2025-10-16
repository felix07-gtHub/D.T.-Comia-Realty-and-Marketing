    //  GET THE USER.
async function user() {
    const response = await fetch('https://dt-comia-realty-and-marketing-production.up.railway.app/user', {
        method: "GET",
        credentials: "include"
    });
    const data = await response.json();

    const hero = document.querySelector('.hero .content');

    const h1 = document.createElement('h1');
    h1.innerHTML = "FIND YOUR <br> DREAM HOME";
    hero.appendChild(h1);
    
    const btn = document.createElement('a');
    btn.classList.add('btn');
    btn.innerHTML = "CALL FOR A TOUR";
    hero.appendChild(btn);

    if(data.user != undefined) {
        if(data.user[0].type_of_user != "Customer") {
            btn.href = "./signUp.html";
        } else {
            btn.href = "./contactPage.html";
        };
    } else {
        btn.href = "./signUp.html";
    };

    const h2 = document.createElement('h2');
    const p = document.createElement('p');

    h2.innerHTML = "20+ YEARS OF EXPERIENCE";
    p.innerHTML = "<strong>FIND YOUR LAND. RESERVE EASILY. BUY WITH CONFIDENCE.</strong><br>EXPLORE LISTINGS, VIEW LAND ON AN INTERACTIVE MAP, AND CONNECTWITH TRUSTED AGENTS — ALL IN ONE PLACE.";

    hero.appendChild(h2);
    hero.appendChild(p);
};

user().catch(console.error);