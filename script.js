
function signup(event) {
    event.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirm-password").value;
    const errorMessage = document.getElementById("error-message");


    //Validate inputs

    if (name.trim() === "") {
        errorMessage.innerText = "Please enter your name.";
        return;
    }
    if (email.trim() === "" || !isValidEmail(email)) {
        errorMessage.innerText = "Please enter a valid email address.";
        return;
    }
    if (password !== confirmPassword) {
        errorMessage.innerText = "Passwords do not match.";
        return;
    }
    if (password.length < 8) {
        errorMessage.innerText = "Password must be at least 8 characters long.";
        return;
    }

    //Create user
    const user = {
        email: email,
        password: password,
        name: name
    };

    //Get users from local storage or create empty array
    let users = JSON.parse(localStorage.getItem("users")) || [];

    //Check if user with the same email aready exists
    if (users.some(u => u.email === email)) {
        errorMessage.innerText = "User with this email already exists.";
        return;
    }

    //Add new user to array
    users.push(user);

    //Save updated users to local storage
    localStorage.setItem("users", JSON.stringify(users));

    //Redirect to login page
    window.location.href = "./login.html";
}

function isValidEmail(email) {
    // Basic email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}


function login(event) {
    event.preventDefault();

    const name = document.getElementById("name").value;
    const password = document.getElementById("password").value;
    const errMessage = document.getElementById("errMessage");

    //Validate inputs
    if (name.trim() === "") {
        errMessage.innerText = "Please enter your name.";
        return;
    }

    if (password.length < 8) {
        errMessage.innerText = "Password must be at least 8 characters long.";
        return;
    }

    const users = JSON.parse(localStorage.getItem('users')) || [];

    const currentUser = users.find(user => user.name === name && user.password === password);

    if (!currentUser) {
        errMessage.innerText = "User doesn't exist";
        return;
    }
    else {
        localStorage.setItem("currentUser",currentUser.email);
        next(event);
    }

};


function next(event) {
    event.preventDefault();

    window.location.href = "./Dashboard.html";

    const users = JSON.parse(localStorage.getItem('users')) || [];

    const nameElement = document.getElementById("userName");
    const emailElement = document.getElementById("userEmail");
    const message = document.getElementById("message");

    nameElement.innerText = "Welcome Back : " + users.name;
    emailElement.innerText = "Your Email id : " + users.email;

    const form = document.querySelector('form');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const oldPassword = document.getElementById("password").value;
        const newPassword = document.getElementById("newPassword").value;
        const confirmNewPassword = document.getElementById("confirm-newPassword").value;

        if (newPassword !== confirmNewPassword) {
            message.innerText = "Password must be same";
            return;
        }

        if (oldPassword !== users.password) {
            message.innerText = "Enter correct old password";
            return;
        }

        if (newPassword.length < 8) {
            message.innerText = "Password must be at least 8 characters long.";
            return;
        }

        users.password = newPassword;
        localStorage.setItem('users', JSON.stringify(users));
        message.innerText = "Password changed successfully. ";
        
    });

    const logoutButton = document.getElementById("logout");
    logoutButton.addEventListener('click', (e) => {
        e.preventDefault();
        localStorage.removeItem('users');
        window.location.href = "./login.html";
    });
};
    


