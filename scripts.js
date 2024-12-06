document.addEventListener("DOMContentLoaded", function () {
    generateCaptcha();
    // Credenciales de prueba
const credentials = {
    administrador: "Admin2314.",
    usuario: "User2314."
};

// Función para iniciar sesión
function login() {
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();
    const messageDiv = document.getElementById("message");

    if (credentials[username] === password) {
        if (username === "adminadmin") {
            messageDiv.innerHTML = "Bienvenido, Administrador. Tienes acceso completo.";
            messageDiv.style.color = "green";
        } else if (username === "usuario") {
            messageDiv.innerHTML = "Bienvenido, Usuario. Tienes acceso limitado.";
            messageDiv.style.color = "blue";
        }
    } else {
        messageDiv.innerHTML = "Usuario o contraseña incorrectos.";
        messageDiv.style.color = "red";
    }
}

    // Event listeners para validación en tiempo real
    document.getElementById("username").addEventListener("input", validateUsername);
    document.getElementById("password").addEventListener("input", validatePassword);
    document.getElementById("confirmPassword").addEventListener("input", validateConfirmPassword);
    document.getElementById("captcha").addEventListener("input", validateCaptcha);

    const loginForm = document.getElementById("loginForm");
    loginForm.addEventListener("submit", function (event) {
        event.preventDefault(); // Prevenir el envío del formulario

        if (validateForm()) {
            login(); // Llamar a la función login si el formulario es válido
        } else {
            alert("Por favor, completa correctamente todos los campos.");
        }
    });
});

function togglePassword(fieldId) {
    const field = document.getElementById(fieldId);
    field.type = field.type === "password" ? "text" : "password";
}

function generateCaptcha() {
    const captchaText = document.getElementById("captchaText");
    const captcha = Math.floor(1000 + Math.random() * 9000);
    captchaText.textContent = captcha;
}

// Función de inicio de sesión actualizada
function login() {
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value;

    // Validar el captcha antes de proceder
    if (!validateCaptcha()) {
        alert("El captcha ingresado no es correcto.");
        return;
    }

    // Obtener usuarios de localStorage
    const users = JSON.parse(localStorage.getItem("users")) || [];

    // Verificar si el usuario existe y la contraseña coincide
    const user = users.find(user => user.username === username && user.password === password);

    if (user) {
        // Redirigir si la autenticación es correcta
        alert("Inicio de sesión exitoso.");
        window.location.href = "inicio.html"; // Página de usuarios registrados
    } else {
        alert("Usuario o contraseña incorrectos. Por favor, inténtalo de nuevo.");
    }
}

// Funciones de validación reutilizadas
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

function validateCaptcha() {
    const captcha = document.getElementById("captcha").value;
    const captchaText = document.getElementById("captchaText").textContent;
    const captchaError = document.getElementById("captchaError");

    if (captcha !== captchaText) {
        captchaError.textContent = "El captcha no es correcto.";
        return false;
    } else {
        captchaError.textContent = "";
        return true;
    }
}

function validateForm() {
    const isUsernameValid = validateUsername();
    const isPasswordValid = validatePassword();
    const isConfirmPasswordValid = validateConfirmPassword();
    const isCaptchaValid = validateCaptcha();

    return isUsernameValid && isPasswordValid && isConfirmPasswordValid && isCaptchaValid;
}
