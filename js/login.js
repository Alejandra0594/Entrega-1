function iniciar() {
    // Captura los valores de los campos de nombre de usuario y contraseña
    const username = document.getElementById('nombre_usuario').value;
    const password = document.getElementById('contraseña_usuario').value;

    // Verifica si ambos campos están llenos
    if (username && password) {
        // Guarda el estado de sesión y el nombre de usuario en sessionStorage
        sessionStorage.setItem('sesion', 'true');  // Guarda que el usuario inició sesión
        sessionStorage.setItem('nombreUsuario', username);  // Guarda el nombre de usuario

        // Redirige al usuario a la página principal (index.html)
        window.location.href = 'index.html';
    } else {
        // Muestra una alerta de error si faltan campos por llenar
        showAlertError();
    }
}

// Añade un evento de click al botón de "Ingresar" para que llame a la función iniciar
document.getElementById("ingresar").addEventListener("click", iniciar);