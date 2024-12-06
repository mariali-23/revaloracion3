document.getElementById("generateCaptcha").addEventListener("click", generateCaptcha);

function generateCaptcha() {
    const captchaText = document.getElementById("captchaText");
    const captcha = Math.floor(1000 + Math.random() * 9000);
    captchaText.textContent = captcha;
}

document.getElementById("passwordRecoveryForm").addEventListener("submit", function (event) {
    event.preventDefault();

    const username = document.getElementById("username").value.trim();
    const captcha = document.getElementById("captcha").value;
    const captchaText = document.getElementById("captchaText").textContent;
    const newPassword = document.getElementById("newPassword").value;

    if (captcha !== captchaText) {
        alert("Captcha incorrecto.");
        return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find(user => user.username === username);

    if (user) {
        user.password = newPassword;
        localStorage.setItem("users", JSON.stringify(users));
        alert("Contraseña actualizada con éxito.");
        window.location.href = "index.html";
    } else {
        alert("Usuario no encontrado.");
    }
});
