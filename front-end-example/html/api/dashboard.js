import { API_BASE_URL } from "./config.js";

const tbody = document.getElementById("users-table-body");

// Function to fetch and display all users
async function fetchUsers() {
  try {
    // Send GET request to the API endpoint /items
    const res = await fetch(`${API_BASE_URL}/items`);
    const users = await res.json();

    // Clear any existing rows in the table body
    tbody.innerHTML = ""; 

    // Loop through each user and create a row
    users.forEach(user => {
      const tr = document.createElement("tr");

      // Insert user data and a delete button into the row
      tr.innerHTML = `
        <td>${user.id}</td>
        <td>${user.username}</td>
        <td>${user.email}</td>
        <td>
          <button onclick="deleteUser(${user.id})">Delete</button>
        </td>
      `;

      // Add the row to the table body
      tbody.appendChild(tr);
    });
  } catch (err) {
    console.error("Error loading users:", err);
  }
}

// Function to delete a user by ID
window.deleteUser = async function(id) {
  // Confirm before deleting
  if (!confirm("Are you sure you want to delete this user?")) return;

  try {
    // Send DELETE request to /delete/:id
    const res = await fetch(`${API_BASE_URL}/delete/${id}`, {
      method: "DELETE"
    });

    const result = await res.json();

    // Show confirmation message from server
    alert(result.message);

    // Reload the user list
    fetchUsers(); 
  } catch (err) {
    console.error("Error deleting user:", err);
  }
};

// Load users automatically when the page is opened
fetchUsers();
