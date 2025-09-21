// Import the base URL of the API from a configuration file
import { API_BASE_URL } from "./config.js";

// Select the signup form element from the DOM
const form = document.querySelector('#signup-form');

// Add an event listener to handle form submission
form.addEventListener('submit', async function(event) {
    // Prevent the default behavior of the form (page reload)
    event.preventDefault();

    // Get the values entered by the user in the form fields
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const user_password = document.getElementById('user_password').value;

    // Validate required fields: if any field is empty, show an alert and stop execution
    if (!username || !email || !user_password) {
        alert('Please fill out all required fields.');
        return; // Stop execution if validation fails
    }

    // Create a data object to send to the API
    const data = { username, email, user_password };

    try {
        // Make a POST request to the API to create a new user
        const response = await fetch(`${API_BASE_URL}/create`, {
            method: 'POST', // HTTP method
            headers: { 'Content-Type': 'application/json' }, // Set content type to JSON
            body: JSON.stringify(data) // Convert data object to JSON string
        });

        let result;
        try {
            // Try to parse the JSON response from the server
            result = await response.json();
        } catch (e) {
            // If the response is not valid JSON, alert the user
            alert("The server did not return valid JSON");
            return; // Stop execution
        }

        // Check if the request was successful
        if (response.ok) {
            // If successful, show a success message and redirect to login page
            alert('You have successfully registered!');
            window.location.href = "https://baronette.es/login";
        } else {
            // If there was an error, show the error message from the server
            alert(result.message || `Error ${response.status}: ${response.statusText}`);
        }

    } catch (error) {
        // Catch network or other unexpected errors
        console.error('Error:', error);
        alert('Error trying to register the user.');
    }
});
