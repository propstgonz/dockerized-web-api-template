import { API_BASE_URL } from "./config.js";

const tbody = document.getElementById("users-table-body");

// Función para obtener usuarios
async function fetchUsers() {
  try {
    const res = await fetch(`${API_BASE_URL}/items`);
    const users = await res.json();

    tbody.innerHTML = ""; // limpiar la tabla
    users.forEach(user => {
      const tr = document.createElement("tr");

      tr.innerHTML = `
        <td>${user.id}</td>
        <td>${user.username}</td>
        <td>${user.email}</td>
        <td>
          <button onclick="deleteUser(${user.id})">Eliminar</button>
        </td>
      `;

      tbody.appendChild(tr);
    });
  } catch (err) {
    console.error("Error cargando usuarios:", err);
  }
}

// Función para eliminar usuario
window.deleteUser = async function(id) {
  if (!confirm("¿Seguro que quieres eliminar este usuario?")) return;

  try {
    const res = await fetch(`${API_BASE_URL}/delete/${id}`, {
      method: "DELETE"
    });

    const result = await res.json();
    alert(result.message);
    fetchUsers(); // recargar lista
  } catch (err) {
    console.error("Error eliminando usuario:", err);
  }
};

// Cargar usuarios al iniciar
fetchUsers();
