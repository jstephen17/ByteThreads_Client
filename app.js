import { RouteHandler } from "/client/handlers/router.js";
import { Api } from "/client/handlers/api.js";

class App{

    #user = null;
    constructor(user_ID = null){
        this.init();
        if(user_ID){
            this.setUser(user_ID);
        }
    }

    init(){
        this.#setupNavEvents();
    }

    async setUser(user_ID){
        this.#user = await Api.userByID(user_ID);
        console.log(this.#user);
        
    }

    getUser() {
        return this.#user;
    }

    checkToken(){
        return sessionStorage.getItem('authToken');
    }

    #setupNavEvents() {
        document.querySelectorAll('.nav_button').forEach(btn => {
        btn.addEventListener('click', (e) => {
                e.preventDefault();
                const destination = e.currentTarget.dataset.dest;
                RouteHandler.route(destination);
            });
        });
    }

    #setupPopState() {
        window.addEventListener('popstate', () => {
        RouteHandler.route("/");
        });
    }
}

// if(sessionStorage.getItem('authToken')){
//     const app = new App(sessionStorage.getItem('userID'));
// } else {
//     window.location.href = "/client/views/login.html";
// }