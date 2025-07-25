const form_signUp = document.getElementById("signUp_Form");
const form_logIn = document.getElementById("logIn_Form");

const name_regex = /^[a-zA-Z0-9_-]{3,16}$/;
const password_regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&._-])[A-Za-z\d@$!%*#?&._-]{8,32}$/;
const email_regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

document.querySelectorAll('.username_field').forEach(
    input => {
        input.addEventListener('input', () =>{
            input.value = input.value.replace(/[^a-zA-Z0-9_-]/g, '');
    });
});

document.querySelectorAll('.password_field').forEach(
    input => {
        input.addEventListener('input', ()=>{
            input.value =  input.value.replace(/[^A-Za-z0-9@$!%*#?&._-]/g, '');
        });
});

form_signUp.addEventListener('submit', async function(event){
    event.preventDefault();

    const user_email = document.getElementById("email_signUp").value;
    const user_name = document.getElementById("username_signUp").value;
    const user_password = document.getElementById("password_signUp").value;
    const repeatpassword = document.getElementById("repeatpassword_signUp").value;
    

    if(user_email.length === 0 || user_name.length === 0 || user_password.length === 0 || repeatpassword.length === 0){alert("Please fill out all the fields."); return;}

    if(!email_regex.test(user_email)){ 
        alert("Please enter a valid email."); 
        return;
    }

    if(!password_regex.test(user_password)){ 
        alert("Password must be 8-32 characters, with at least one uppercase letter, one lowercase letter, one number, and one special character."); 
        return;
    }

    if(user_password !== repeatpassword){ alert("Passwords do not match."); return; }

    const res = await fetch("http://localhost:5000/api/users/register",{
    method: 'POST',
    headers: {
        'Content-Type': 'application/json' 
    },
    body: JSON.stringify({ name: user_name, email: user_email, password: user_password, display_pic: 'idk'})

    });

    const result = await res.json();
    console.log(result);

});

form_logIn.addEventListener('submit', async function(event){
    event.preventDefault();

    const user = document.getElementById("user_login").value;
    const password = document.getElementById("password_login").value;

    let res;

    if(!password){alert("Please enter your password.");}

    if(email_regex.test(user)){ 
        
        res = await fetch(`http://localhost:5000/api/users/login`,{
        method: 'POST',
        headers: {
        'Content-Type': 'application/json' 
        },
        body: JSON.stringify({email: user, password: password})
    });

    }else{

        res = await fetch(`http://localhost:5000/api/users/login`,{
        method: 'POST',
        headers: {
        'Content-Type': 'application/json' 
        },
        body: JSON.stringify({username: user, password: password})
    });

    }

    const result = await res.json();
    if(result.success){
        console.log(result.message);
        sessionStorage.setItem('authToken', result.token);
        window.location.href = "/client/index.html"
    }

});

function setupPasswordToggle(toggleBtnId, inputId, imgId) {
    const input = document.getElementById(inputId);
    const toggleBtn = document.getElementById(toggleBtnId);
    const img = document.getElementById(imgId);

    toggleBtn.addEventListener('click', () => {
        const isPassword = input.type === 'password';
        input.type = isPassword ? 'text' : 'password';
        img.src = isPassword ? '/client/res/eye_icon.png' : '/client/res/blind_icon.png';
    });
}

// Set up toggles for both password fields
setupPasswordToggle("signup-pwtoggle", "password_signUp", "showPW-signup");
setupPasswordToggle("repeatpw-toggle", "repeatpassword_signUp", "showPW-repeat");
setupPasswordToggle("login-pwtoggle", "password_login", "showPW-login");


function toggle(button) {
    console.log("Button clicked:", button);
    var label = button.textContent;
    const login = document.getElementById("login-section");
    const signup = document.getElementById("signup-section");
    switch(label){
        case "LOG IN":
            login.style.display ="flex";
            signup.style.display ="none";
        break;
        case "SIGN UP":
            signup.style.display ="flex";
            login.style.display ="none";
        break;
    }
}

window.history.pushState({}, "", "/login");