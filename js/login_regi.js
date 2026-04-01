// Get elements from the page
const username = document.getElementById("username");
const password = document.getElementById("password");
const submitBtn = document.getElementById("submitBtn");
const formTitle = document.getElementById("formTitle");
const switchForm = document.getElementById("switchForm");
const msg = document.getElementById("msg");

let isLogin = true;

switchForm.addEventListener("click", () => {

  isLogin = !isLogin;

  if (isLogin) {
    formTitle.textContent = "Login";
    submitBtn.textContent = "Login";
    switchForm.textContent = "Register";
  } 
  else {
    formTitle.textContent = "Register";
    submitBtn.textContent = "Register";
    switchForm.textContent = "Login";
  }

  msg.textContent = ""; 
});

submitBtn.addEventListener("click", () => {
  const user = username.value.trim();
  const pass = password.value.trim();

  if (!user || !pass) {
    msg.textContent = "Please enter username & password";
    return;
  }

  let users = JSON.parse(localStorage.getItem("users") || "[]");
  if (isLogin) {

    const foundUser = users.find(u=> u.username === user && u.password === pass);

    if (foundUser) {
      msg.style.color = "green";
      msg.textContent = "Login successful! Redirecting...";

      localStorage.setItem("loggedUser", user);
      
      setTimeout(() => {
        window.location.href = "Home.html";
      }, 1000);
    } 
    else {
      msg.style.color = "red";
      msg.textContent = "Invalid username or password";
    }
  }

  else {
    users.push({ username: user, password: pass });

    localStorage.setItem("users", JSON.stringify(users));

    msg.style.color = "green";
    msg.textContent = "Registration successful! Please Login.";

    username.value = "";
    password.value = "";
  }
});
