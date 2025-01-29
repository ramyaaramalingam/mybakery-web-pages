document.addEventListener("DOMContentLoaded", function() {
    console.log("DOM fully loaded and parsed");

    // Menu toggle code
    const menuToggle = document.getElementById('menu-toggle');
    if (menuToggle) {
        console.log("Menu toggle found");
        const menu = document.querySelector('.menu');
        menuToggle.addEventListener('change', function() {
            if (menuToggle.checked) {
                menu.style.display = 'block';
            } else {
                menu.style.display = 'none';
            }
        });
    }

    // Login form code
    const signinForm = document.getElementById('signin-form');
    const errorMessage = document.getElementById('error-message');

    if (signinForm) {
        console.log("Sign-in form found");

        // Make sure the error message element is initially hidden
        errorMessage.style.display = 'none';

        signinForm.addEventListener('submit', function(event) {
            event.preventDefault();
            console.log("Form submit event triggered");

            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;

            console.log("Attempting login with Username: " + username + " and Password: " + password);

            // Fetch user credentials from JSON file
            fetch('users.json')
                .then(response => {
                    console.log("Fetch response status: " + response.status);
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then(users => {
                    console.log("Fetched users: ", users);
                    const user = users.find(user => user.username === username && user.password === password);
                    console.log("Matching user:", user);
                    if (user) {
                        console.log("User found, redirecting to menu.html");
                        window.location.href = 'menu.html';
                    } else {
                        console.log("User not found");
                        errorMessage.textContent = 'Invalid username or password.';
                        errorMessage.style.display = 'block'; // Ensure error message is visible
                    }
                })
                .catch(error => {
                    console.error('Error fetching user data:', error);
                    errorMessage.textContent = 'Error processing login. Please try again.';
                    errorMessage.style.display = 'block'; // Ensure error message is visible
                });
        });
    } else {
        console.log("Sign-in form not found");
    }
});