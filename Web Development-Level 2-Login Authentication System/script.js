const registerBox = document.getElementById("registerBox");
const loginBox = document.getElementById("loginBox");
const dashboardBox = document.getElementById("dashboardBox");

const registerForm = document.getElementById("registerForm");
const loginForm = document.getElementById("loginForm");

const registerMessage = document.getElementById("registerMessage");
const loginMessage = document.getElementById("loginMessage");
const welcomeMessage = document.getElementById("welcomeMessage");

const USERS_KEY = "oibsip_demo_users";
const SESSION_KEY = "oibsip_demo_session";

// Read registered demo users from this browser.
function getUsers() {
    try {
        return JSON.parse(localStorage.getItem(USERS_KEY)) || [];
    } catch {
        return [];
    }
}

function showMessage(element, message, type) {
    element.textContent = message;
    element.className = "message " + type;
}

function clearMessage(element) {
    element.textContent = "";
    element.className = "message";
}

function showView(view) {
    registerBox.classList.add("hidden");
    loginBox.classList.add("hidden");
    dashboardBox.classList.add("hidden");
    view.classList.remove("hidden");
}

function goToLogin(message = "") {
    showView(loginBox);
    clearMessage(registerMessage);
    clearMessage(loginMessage);
    if (message) showMessage(loginMessage, message, "success");
}

function goToRegister() {
    showView(registerBox);
    clearMessage(registerMessage);
    clearMessage(loginMessage);
}

// Hash the password with Web Crypto. Use this project via Live Server
// or a hosted HTTPS page so the browser's crypto API is available.
async function hashPassword(password) {
    if (!window.crypto || !window.crypto.subtle) {
        throw new Error("Secure password hashing is unavailable. Open this project with Live Server or on an HTTPS website.");
    }

    const bytes = new TextEncoder().encode(password);
    const digest = await window.crypto.subtle.digest("SHA-256", bytes);
    return Array.from(new Uint8Array(digest))
        .map(byte => byte.toString(16).padStart(2, "0"))
        .join("");
}

document.getElementById("showLogin").addEventListener("click", () => goToLogin());
document.getElementById("showRegister").addEventListener("click", goToRegister);

registerForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    clearMessage(registerMessage);

    const name = document.getElementById("registerName").value.trim();
    const email = document.getElementById("registerEmail").value.trim().toLowerCase();
    const password = document.getElementById("registerPassword").value;

    if (!name || !email || !password) {
        showMessage(registerMessage, "Please fill in all fields.", "error");
        return;
    }

    if (password.length < 8) {
        showMessage(registerMessage, "Password must contain at least 8 characters.", "error");
        return;
    }

    const users = getUsers();

    if (users.some(user => user.email === email)) {
        showMessage(registerMessage, "An account with this email already exists. Please log in.", "error");
        return;
    }

    try {
        const passwordHash = await hashPassword(password);
        users.push({ name, email, passwordHash });
        localStorage.setItem(USERS_KEY, JSON.stringify(users));

        registerForm.reset();
        showMessage(registerMessage, "Registration successful! You can now log in.", "success");
    } catch (error) {
        showMessage(registerMessage, error.message || "Registration failed. Please try again.", "error");
    }
});

loginForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    clearMessage(loginMessage);

    const email = document.getElementById("loginEmail").value.trim().toLowerCase();
    const password = document.getElementById("loginPassword").value;

    if (!email || !password) {
        showMessage(loginMessage, "Please enter your email and password.", "error");
        return;
    }

    const user = getUsers().find(item => item.email === email);

    if (!user) {
        showMessage(loginMessage, "No account found for this email. Please register first.", "error");
        return;
    }

    try {
        const passwordHash = await hashPassword(password);

        if (passwordHash !== user.passwordHash) {
            showMessage(loginMessage, "Incorrect email or password.", "error");
            return;
        }

        // Demo-only session state; not secure server-side authentication.
        sessionStorage.setItem(SESSION_KEY, user.email);
        loginForm.reset();
        welcomeMessage.textContent = "Hello, " + user.name + "!";
        showView(dashboardBox);
    } catch (error) {
        showMessage(loginMessage, error.message || "Login failed. Please try again.", "error");
    }
});

document.getElementById("logoutBtn").addEventListener("click", () => {
    sessionStorage.removeItem(SESSION_KEY);
    goToLogin("You have been logged out.");
});

// Keep the dashboard visible after refresh only if this tab has a demo session.
function restoreDemoSession() {
    const email = sessionStorage.getItem(SESSION_KEY);
    const user = getUsers().find(item => item.email === email);

    if (email && user) {
        welcomeMessage.textContent = "Hello, " + user.name + "!";
        showView(dashboardBox);
    } else {
        sessionStorage.removeItem(SESSION_KEY);
        showView(registerBox);
    }
}

restoreDemoSession();
