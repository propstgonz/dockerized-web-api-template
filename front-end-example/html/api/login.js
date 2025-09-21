import { API_BASE_URL } from "./config.js";

const form = document.querySelector('#login-form');

// Listen for form submission
form.addEventListener('submit', async function(event) {
    event.preventDefault(); // Prevent default page reload

    // Read input values (username/email and password)
    const identifier = document.getElementById('identifier').value; 
    const user_password = document.getElementById('user_password').value;

    // Check if inputs are filled
    if (!identifier || !user_password) {
        alert('Please fill in all fields.');
        return;
    }

    try {
        // Send POST request to /api/login with credentials
        const response = await fetch(`${API_BASE_URL}/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ identifier, user_password })
        });

        let result;
        try {
            // Parse JSON response from server
            result = await response.json();
        } catch {
            alert("The server did not return valid JSON");
            return;
        }

        if (response.ok) {
            // Login successful
            alert('Login successful!');
            
            // Example: redirect to dashboard
            // You could also save a JWT token here for authentication
            window.location.href = "/dashboard.html"; 
        } else {
            // Show error message from server or default error
            alert(result.message || `Error ${response.status}: ${response.statusText}`);
        }

    } catch (error) {
        // Handle network or unexpected errors
        console.error('Error:', error);
        alert('An error occurred while trying to log in.');
    }
});
