// Registration Logic
function registerUser(event) {
  event.preventDefault();
  //   default prevented

  const username = document.getElementById("username").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirm-password").value;

  // no registratio can be done if all input fields arent filled
  if (!username || !email || !password || !confirmPassword) {
    alert("All fields are required.");
    return;
  }

  if (password !== confirmPassword) {
    alert("Passwords do not match.");
    return;
  }

  // if the  email exists..details on the local storage is check...if
  // the details alredy exist user is alerted.. multiplt users can register as all details are store in []

  const users = JSON.parse(localStorage.getItem("users")) || [];
  const emailExists = users.some(function (user) {
    return user.email === email;
  });

  if (emailExists) {
    alert("Email is already registered.");
    return;
  }

  //  all data for  new registrant  is collected and stored in the local storage which will be used for login later on
  const newUser = {
    username: username,
    email: email,
    password: password,
  };

  users.push(newUser);
  localStorage.setItem("users", JSON.stringify(users));

  alert("Registration successful! You can now login.");
  window.location.href = "login.html";
}

// LOGIN STARTS HERE

function loginUser(event) {
  event.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  // when E/P is! entered they are alerted to enter both
  if (!email || !password) {
    alert("Please enter both email and password.");
    return;
  }

  // Retrieve users from localStorage..detils is retrieved and validated...// confirms login and gives access
  const users = JSON.parse(localStorage.getItem("users")) || [];

  const user = users.find(function (user) {
    return user.email === email && user.password === password;
  });

  if (user) {
    localStorage.setItem("loggedInEmail", email);
    alert("Login successful! Enjoy your chats.");
    window.location.href = "chat.html";
  } else {
    alert("Invalid email or password. Please recheck.");
  }
}

document.addEventListener("DOMContentLoaded", function () {
  // For registration page
  if (document.getElementById("register-btn")) {
    document
      .getElementById("register-btn")
      .addEventListener("click", registerUser);
  }

  // For login page
  if (document.getElementById("login-btn")) {
    document.getElementById("login-btn").addEventListener("click", loginUser);
  }

  // For chat page
  if (document.getElementById("send-btn")) {
    document.getElementById("send-btn").addEventListener("click", sendMessage);
  }
});

/// Function to get the current user from localStorage
function getCurrentUser() {
  const users = JSON.parse(localStorage.getItem("users")) || [];
  const email = localStorage.getItem("loggedInEmail");
  return users.find((user) => user.email === email); // Find the user by email
}

// using append function
function displayMessage(username, message, isCurrentUser = false) {
  const chatContainer = document.getElementById("chat-container");

  //chats comes with time
  const timestamp = new Date().toLocaleTimeString();

  const messageElement = document.createElement("div");
  messageElement.classList.add("flex", "items-start", "space-x-2");

  messageElement.innerHTML = `
    <div class="flex items-center space-x-2">
      ${
        !isCurrentUser
          ? `<img class="w-8 h-8 rounded-full" src="https://scontent-los2-1.xx.fbcdn.net/v/t39.30808-6/482121554_9576987949059970_6623856274047078716_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeEOFBhSSbr6ov79_gQVlgBpsJdtoOJkD2Wwl22g4mQPZTC5R3WntfCmIvziwZOrYPoeh8FVyoJAk15HjCdiJ30R&_nc_ohc=0OgQ_OzzhzMQ7kNvgF0JVga&_nc_oc=AdnwyJzj3Cvbicaz7l96KDVMGVQ5euFIom4JYnHicPuiyaBrRRWo3bYMsLhxc0eUQHY&_nc_zt=23&_nc_ht=scontent-los2-1.xx&_nc_gid=INvWlfbl_zbbFaM_xGr1rg&oh=00_AYFx56LYulqJQeQA7WPmup7nUYw173Pv9J9vYINdTnZsSw&oe=67E31777" alt="User profile">`
          : ""
      }
      <div>
        <div class="text-sm font-medium ${
          isCurrentUser ? "text-blue-500" : "text-purple-500"
        }">${username}</div>
        <div class="bg-gray-200 p-2 rounded-lg max-w-md">${message}</div>
        <div class="text-xs text-gray-500 ml-2">${timestamp}</div>
      </div>
    </div>
  `;

  chatContainer.appendChild(messageElement);
  chatContainer.scrollTop = chatContainer.scrollHeight;
}
