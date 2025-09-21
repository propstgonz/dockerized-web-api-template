import { API_BASE_URL } from "./config.js";

const form = document.querySelector('#login-form');

form.addEventListener('submit', async function(event) {
    event.preventDefault();

    const identifier = document.getElementById('identifier').value; // username o email
    const user_password = document.getElementById('user_password').value;

    if (!identifier || !user_password) {
        alert('Por favor, complete todos los campos.');
        return;
    }

    try {
        // Suponiendo que tu API tiene un endpoint POST /api/login
        const response = await fetch(`${API_BASE_URL}/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ identifier, user_password })
        });

        let result;
        try {
            result = await response.json();
        } catch {
            alert("El servidor no devolvió JSON válido");
            return;
        }

        if (response.ok) {
            alert('Login exitoso!');
            // Aquí puedes guardar un token o redirigir al usuario
            window.location.href = "/dashboard.html"; // ejemplo
        } else {
            alert(result.message || `Error ${response.status}: ${response.statusText}`);
        }

    } catch (error) {
        console.error('Error:', error);
        alert('Error al intentar iniciar sesión.');
    }
});
