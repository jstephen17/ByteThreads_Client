
export class RouteHandler {
    static #main_containerID = "main-container";

    static #routes = {
        404: "/client/views/404.html",
        "/": "",
        "/login": "/client/views/login.html",
        "/resetpassword": "/client/views/password_reset.html"
    };

    static route(destination) {
        window.history.pushState({}, "", destination);
        this.#locationRouting();
    }

    static async #locationRouting() {
        const path = window.location.pathname;
        const route = this.#routes[path] || this.#routes[404];
        const container = document.getElementById(this.#main_containerID);

        if (typeof route === "function") {
        container.innerHTML = "";
        try {
            await route();
        } catch (e) {
            container.innerHTML = `<p>Error loading page: ${e.message}</p>`;
        }
        } else {
            window.location.href = route;
        }
    }
}