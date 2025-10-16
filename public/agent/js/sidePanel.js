  //  GET THE USERS.
async function user() {
  const response = await fetch('https://dt-comia-realty-and-marketing-production.up.railway.app/user', {
      method: "GET",
      credentials: "include"
  });
  const data = await response.json();

  if(data.user != undefined) {
    if(data.user[0].type_of_user != "Agent") {
      window.location = "../customer/logIn.html";
    };
  } else {
    window.location = "../customer/logIn.html";
  };

  const navProfilePicture = document.querySelector('nav > a > #profileIcon');
  const navUserName = document.querySelector('nav > #user > p:nth-child(1)');
  const sidepanelProfilePicture = document.querySelector('.side-panel img');
  const sidepaneluserName = document.querySelector('.profile-div p');

  
    navProfilePicture.src = 'https://niwxujzmwpdhegjlmyfw.supabase.co/storage/v1/object/public/D.T.%20Comia%20Realty%20and%20Marketing/AGENT ICONS/prof.png';
    navProfilePicture.alt = "Profile icon";
    navProfilePicture.type = "";
    
    sidepanelProfilePicture.src = 'https://niwxujzmwpdhegjlmyfw.supabase.co/storage/v1/object/public/D.T.%20Comia%20Realty%20and%20Marketing/AGENT ICONS/prof.png';
    sidepanelProfilePicture.alt = "Profile icon";
    sidepanelProfilePicture.type = "";

  navUserName.innerHTML = data.user[0].user_name;

  sidepaneluserName.innerHTML = data.user[0].user_name;
};

user().catch(console.error);

        
    //  SHOW THE side-panel AND SHIFT titleBar TO THE RIGHT..
function toggleSidebarOnTablet() {
  const burgerBtn = document.querySelector('.burger-btn');
  const sidePanel = document.querySelector('.side-panel');

  if(sidePanel.style.minWidth == '0px') {
    burgerBtn.innerHTML = '&#10005;';
    sidePanel.style.marginLeft = '45px';
    sidePanel.style.minWidth = '280px';
  } else {
    burgerBtn.innerHTML = '&#9776;';
    sidePanel.style.marginLeft = '0px';
    sidePanel.style.minWidth = '0px';
  };
};
        
  //  SHOW side-panel.
function toggleSidebarOnPhone() {
  const burgerBtn = document.querySelector('.burger-btn');
  const sidePanel = document.querySelector('.side-panel');

  if(sidePanel.style.minWidth == '0px') {
    burgerBtn.innerHTML = '&#10005;';
    sidePanel.style.minWidth = '280px';
  } else {
    burgerBtn.innerHTML = '&#9776;';
    sidePanel.style.minWidth = '0px';
  };
};

    //  FUNCTION FOR showHideSidebar.
function showHideSideBar() {
    const nav = document.querySelector('nav');
    const burgerBtn = document.querySelector('.burger-btn');
    const sidePanel = document.querySelector('.side-panel');

    if(window.innerWidth > 1024) {
      burgerBtn.innerHTML = '&#9776;';
      burgerBtn.style.display = 'none';
      sidePanel.style.height = 'auto';
      sidePanel.style.position = 'static';
      sidePanel.style.marginLeft = '45px';
      sidePanel.style.minWidth = '280px';
      sidePanel.style.paddingTop = '0px';
      
      burgerBtn.removeEventListener("click", toggleSidebarOnPhone);
      burgerBtn.removeEventListener("click", toggleSidebarOnTablet);
    } else if(window.innerWidth > 576) {
      burgerBtn.innerHTML = '&#9776;';
      burgerBtn.style.display = 'block';
      sidePanel.style.height = 'auto';
      sidePanel.style.position = 'static';
      sidePanel.style.marginLeft = '0px';
      sidePanel.style.minWidth = '0px';
      sidePanel.style.paddingTop = '0px';
      
      burgerBtn.removeEventListener("click", toggleSidebarOnPhone);
      burgerBtn.addEventListener("click", toggleSidebarOnTablet);
    } else {
      burgerBtn.innerHTML = '&#9776;';
      burgerBtn.style.display = 'block';
      sidePanel.style.height = '100%';
      sidePanel.style.position = 'fixed';
      sidePanel.style.marginLeft = '0px';
      sidePanel.style.minWidth = '0px';
      sidePanel.style.paddingTop = '92px';

      burgerBtn.removeEventListener("click", toggleSidebarOnTablet);
      burgerBtn.addEventListener("click", toggleSidebarOnPhone);
    };

};

window.addEventListener("resize", showHideSideBar);
showHideSideBar();

  //  DELETE THE USER SESSION.
async function logOutFunction(e) {
  const response = await fetch('https://dt-comia-realty-and-marketing-production.up.railway.app/log-out', {
    method: "GET",
    credentials: "include"
  });
  const data = await response.json();
};

document.querySelector('.logout > a').addEventListener("click", logOutFunction);