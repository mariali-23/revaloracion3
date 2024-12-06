document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("registerForm").addEventListener("submit", function (event) {
        event.preventDefault();

        // Validar el formulario
        if (validateForm()) {
            const username = document.getElementById("username").value.trim();
            const password = document.getElementById("password").value;

            // Recuperar usuarios existentes del localStorage
            const users = JSON.parse(localStorage.getItem("users")) || [];

            // Verificar si el usuario ya existe
            const userExists = users.some(user => user.username === username);
            if (userExists) {
                alert("El usuario ya está registrado. Intente con otro nombre de usuario.");
                return;
            }

            // Agregar el nuevo usuario
            users.push({ username, password });
            localStorage.setItem("users", JSON.stringify(users));

            alert("Usuario registrado con éxito.");
            window.location.href = "index.html"; // Redirige al login
        }
    });
});

// Validaciones reutilizadas del archivo original
function validateForm() {
    const isUsernameValid = validateUsername();
    const isPasswordValid = validatePassword();
    const isConfirmPasswordValid = validateConfirmPassword();

    return isUsernameValid && isPasswordValid && isConfirmPasswordValid;
}

function validateUsername() {
    const username = document.getElementById("username").value.trim();
    const usernameError = document.getElementById("usernameError");

    if (username.length < 4 || username.length > 12) {
        usernameError.textContent = "El usuario debe tener entre 4 y 12 caracteres.";
        return false;
    } else {
        usernameError.textContent = "";
        return true;
    }
}

function validatePassword() {
    const password = document.getElementById("password").value;
    const passwordError = document.getElementById("passwordError");

    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    if (!passwordRegex.test(password)) {
        passwordError.textContent = "La contraseña debe tener al menos 8 caracteres, una letra mayúscula, una letra minúscula y un número.";
        return false;
    } else {
        passwordError.textContent = "";
        return true;
    }
}

function validateConfirmPassword() {
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;
    const confirmPasswordError = document.getElementById("confirmPasswordError");

    if (confirmPassword !== password) {
        confirmPasswordError.textContent = "Las contraseñas no coinciden.";
        return false;
    } else {
        confirmPasswordError.textContent = "";
        return true;
    }
}
