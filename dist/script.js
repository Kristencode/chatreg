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
  let sendBtn = document.getElementById("send-btn");
  if (sendBtn) {
    sendBtn.addEventListener("click", sendMessage);
  }
});

document.addEventListener("DOMContentLoaded", function () {
  let sendBtn = document.getElementById("send-btn");
  let messageInput = document.getElementById("message-input");
  let chatContainer = document.getElementById("chat-container");

  if (sendBtn) {
    sendBtn.addEventListener("click", sendMessage);
  }

  if (messageInput) {
    messageInput.addEventListener("keypress", function (event) {
      if (event.key === "Enter") {
        sendMessage();
      }
    });
  }
});

// to send a message
function sendMessage() {
  let messageInput = document.getElementById("message-input");
  let chatContainer = document.getElementById("chat-container");

  let message = messageInput.value.trim();
  if (message === "") return; // Prevent sending empty messages

  let currentUser = getCurrentUser();
  let username = currentUser ? currentUser.username : "You";

  displayMessage(username, message, true);
  messageInput.value = ""; // Clear input field
}

// Function to display messages
function displayMessage(username, message, isCurrentUser) {
  let chatContainer = document.getElementById("chat-container");
  let timestamp = new Date().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  let messageElement = document.createElement("div");
  messageElement.classList.add(
    "flex",
    isCurrentUser ? "justify-end" : "justify-start"
  );

  messageElement.innerHTML = `
    <div class="max-w-xs p-3 rounded-lg ${
      isCurrentUser ? "bg-gray-300 text-purple-500" : "bg-gray-300 text-black"
    }">
      <p class="font-semibold">${username}</p>
      <p>${message}</p>
      <p class="text-xs text-gray-200 text-right">${timestamp}</p>
    </div>
  `;

  chatContainer.appendChild(messageElement);
  chatContainer.scrollTop = chatContainer.scrollHeight;
}

//  logged-in current user from localStorage
function getCurrentUser() {
  let users = JSON.parse(localStorage.getItem("users")) || [];
  let email = localStorage.getItem("loggedInEmail");
  return users.find(function (user) {
    return user.email === email;
  });
}
