const usernameInput = document.getElementById("username");
const passwordInput = document.getElementById("password");
const submitBtn = document.getElementById("submitBtn");
const formTitle = document.getElementById("formTitle");
const formSubtitle = document.getElementById("formSubtitle");
const switchForm = document.getElementById("switchForm");
const switchHint = document.getElementById("switchHint");
const msg = document.getElementById("msg");

let isLogin = true;

switchForm.addEventListener("click", () => {
    isLogin = !isLogin;
    
    // Smooth transition for text
    if (isLogin) {
        formTitle.textContent = "Welcome back";
        formSubtitle.textContent = "Enter your details to access your dashboard.";
        submitBtn.textContent = "Sign In";
        switchHint.textContent = "Don't have an account?";
        switchForm.textContent = "Create one";
    } else {
        formTitle.textContent = "Create an account";
        formSubtitle.textContent = "Start organizing your studies today.";
        submitBtn.textContent = "Register";
        switchHint.textContent = "Already have an account?";
        switchForm.textContent = "Sign in";
    }
    msg.textContent = "";
});

submitBtn.addEventListener("click", () => {
    const user = usernameInput.value.trim();
    const pass = passwordInput.value.trim();

    if (!user || !pass) {
        msg.style.color = "#e11d48"; // Professional red
        msg.textContent = "Please fill in all fields";
        return;
    }

    let users = JSON.parse(localStorage.getItem("users") || "[]");

    if (isLogin) {
        const foundUser = users.find(u => u.username === user && u.password === pass);

        if (foundUser) {
            msg.style.color = "#059669"; // Professional green
            msg.textContent = "Login successful! Redirecting...";
            localStorage.setItem("loggedUser", user);
            setTimeout(() => { window.location.href = "Home.html"; }, 1000);
        } else {
            msg.style.color = "#e11d48";
            msg.textContent = "Invalid credentials. Try again.";
        }
    } else {
        // Check if user already exists
        if (users.some(u => u.username === user)) {
            msg.style.color = "#e11d48";
            msg.textContent = "Username already taken";
            return;
        }

        users.push({ username: user, password: pass });
        localStorage.setItem("users", JSON.stringify(users));

        msg.style.color = "#059669";
        msg.textContent = "Account created! You can now sign in.";
        
        // Clear inputs
        usernameInput.value = "";
        passwordInput.value = "";
    }
});