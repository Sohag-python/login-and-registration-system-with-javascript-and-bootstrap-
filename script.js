document.addEventListener("DOMContentLoaded", function () {
    const registerForm = document.getElementById("register-form");
    const loginForm = document.getElementById("login-form");
    const toggleFormBtn = document.getElementById("toggle-form");
    const formTitle = document.getElementById("form-title");
    const alertBox = document.getElementById("alert");
    
    toggleFormBtn.addEventListener("click", () => {
        registerForm.classList.toggle("d-none");
        loginForm.classList.toggle("d-none");
        formTitle.innerText = registerForm.classList.contains("d-none") ? "Login" : "Register";
        toggleFormBtn.innerText = registerForm.classList.contains("d-none") ? "Switch to Register" : "Switch to Login";
        console.log("Form toggled to: " + formTitle.innerText);
    });
    
    registerForm.addEventListener("submit", function (e) {
        e.preventDefault();
        const fullname = document.getElementById("fullname").value;
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;
        
        if (localStorage.getItem(email)) {
            showAlert("Email already registered!", "danger");
            console.log("Registration failed: Email already exists");
            return;
        }
        
        localStorage.setItem(email, JSON.stringify({ fullname, email, password }));
        showAlert("Registration successful!", "success");
        registerForm.reset();
        console.log("User registered: ", { fullname, email });
    });
    
    loginForm.addEventListener("submit", function (e) {
        e.preventDefault();
        const email = document.getElementById("login-email").value;
        const password = document.getElementById("login-password").value;
        
        const userData = JSON.parse(localStorage.getItem(email));
        
        if (userData && userData.password === password) {
            showAlert("Login successful!", "success");
            console.log("User logged in: ", email);
        } else {
            showAlert("Invalid email or password!", "danger");
            console.log("Login failed: Incorrect credentials");
        }
    });
    
    function showAlert(message, type) {
        alertBox.className = `alert alert-${type}`;
        alertBox.innerText = message;
        alertBox.classList.remove("d-none");
        console.log("Alert shown: ", message);
        setTimeout(() => alertBox.classList.add("d-none"), 3000);
    }
});
