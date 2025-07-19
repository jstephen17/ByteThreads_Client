const email_form = document.getElementById("emailPWreset_form");

const password_regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&._-])[A-Za-z\d@$!%*#?&._-]{8,32}$/;
const email_regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

email_form.addEventListener('submit', async function(event) {
    event.preventDefault();

    const user_email = document.getElementById("user_email").value;

    if(!email_regex.test(user_email)) return alert("Please enter a valid email."); 

    const res = await fetch(`http://localhost:5000/api/users?email=${user_email}`,{
    method: 'GET'});
});