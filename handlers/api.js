export class Api{
    static #url = "http://localhost:5000/api/";
    static #defaultHeader = {'Content-Type': 'application/json'};

    static async login({email=null, username=null, password}){

        const res = await fetch(`${this.#url}users/login`,{
            method: 'POST',
            headers: this.#defaultHeader,
            body: JSON.stringify({email, username, password})
        });

        const data = await res.json();

        if (!res.ok) {
            throw new Error(data.message || "Login failed");
        }

        if (data.success) {
            sessionStorage.setItem('authToken', data.token);
            sessionStorage.setItem('userID', data.user_id);
            console.log(data.user_id);
        } else {

        }

        return data;
    }

    static async register({ name, email, password, display_pic=null}){
        if(!display_pic) display_pic = "unknown.png";
        const res = await fetch(`${this.#url}users/register`,{
            method: 'POST',
            headers: this.#defaultHeader,
            body: JSON.stringify({ name, email, password, display_pic})

        });

        const data = await res.json();

        if (!res.ok) {
            throw new Error(data.message || "Registration failed");
        }

        return data;
    }

    static async userByID(userID){
        if (!userID) throw new Error("User ID is required");
        const res = await fetch(`${this.#url}users?id=${encodeURIComponent(userID)}`,{
            method: 'GET',
            headers: this.#defaultHeader
        });

        const data = await res.json();

        if (!res.ok) {
            throw new Error(data.message || "Failed to Get User by ID");
        }

        return data;
    }

}