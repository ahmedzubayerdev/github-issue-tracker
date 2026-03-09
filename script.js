// login functionality
const form = document.getElementById("login-form");

form.addEventListener("submit", (event)=>{
    event.preventDefault();

    const userName = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const demoUsername = "admin";
    const demoPassword = "admin123"

    if(userName === demoUsername && password === demoPassword){
        window.location.href = "issues.html"
    }else{
        window.alert(`Username or Password is incorrect`)
    }
})
