# Login Authentication System

## About the Project
A responsive, front-end login authentication demo created using HTML, CSS, and JavaScript. Users can register, log in, see a dashboard, and log out.

## Technologies Used
- HTML5
- CSS3
- JavaScript
- Browser Local Storage and Session Storage
- Web Crypto API (SHA-256 password hash for this demo)

## Features
- User registration with name, email, and password
- Email format and required-field validation
- Minimum password length validation
- Duplicate email checking
- Password hash stored instead of the original password
- Login with incorrect-credential messages
- Welcome dashboard after successful login
- Logout
- Responsive design for smaller screens

## Project Structure
```text
Web Development-Level 2-Login Authentication System/
├── index.html
├── style.css
├── script.js
└── README.md
```

## How to Run
1. Open the project folder in Visual Studio Code.
2. Open `index.html`.
3. Right-click inside the editor and choose **Open with Live Server**.
4. Register with a name, email address, and password of at least 8 characters.
5. Use the same email and password to log in.

You can also host the static files on GitHub Pages (HTTPS).

## Important Security Note
This is a learning/demo project only. Accounts are stored in the browser, and the login session is client-side. It is **not suitable for real accounts or sensitive data**. A production authentication system needs a server, a database, secure password hashing (such as Argon2id or bcrypt), server-side session handling, and appropriate protections.

## Author
Sushmitha
