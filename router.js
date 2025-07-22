

const routes = {
    404: "/client/views/404.html",
    "/": "/client/views/home.html",
    "/login": "/client/views/login.html",
    "/resetpassword": "/client/views/password_reset.html"
};

function route(destination){
    window.history.pushState({}, "", destination);
    locationRouting();
};

function routehref(event){
    event = event || window.event();
    event.preventDefault();
    window.history.pushState({}, "", event.target.href);
    locationRouting();
};

async function locationRouting(){
    const path = window.location.pathname;
    console.log(path);
    const route = routes[path] || routes[404];
    const html = await fetch(route).then((data) => data.text());
    if(path === '/login' || path === '/resetpassword'){
        window.location.href=route;
    } else {
        document.getElementById("main-section").innerHTML = html;
    }
}

window.onpopstate = locationRouting;
window.route = route;

locationRouting();