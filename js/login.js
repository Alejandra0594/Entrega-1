// Escucha el evento 'submit' del formulario para evitar envío automático si hay errores
document.getElementById("formLogin").addEventListener("submit", function (event) {
    event.preventDefault();  // Evita que el formulario se envíe automáticamente

    // Captura los valores de los campos de email y contraseña
    const email = document.getElementById('nombre_usuario').value;
    const password = document.getElementById('contraseña_usuario').value;

    // Verifica si ambos campos están llenos
    if (email && password) {
        // Verifica si el email tiene un formato válido usando una expresión regular
        if (validarEmail(email)) {
            // Guarda el estado de sesión y el email del usuario en sessionStorage
            sessionStorage.setItem('sesion', 'true');  // Guarda que el usuario inició sesión
            sessionStorage.setItem('nombreUsuario', email);  // Guarda el email del usuario

//Aca va el fetch
 fetch('http://localhost:3001/login', {
    method: 'POST',
    headers: {
    'Content-Type': 'application/json'
    },
    body: JSON.stringify({ username:email, password })
    }).then(response => {
        if (response.ok){
          return response.json(); 
        }
        else {
            console.log("algo fallo");
        }
    }).then(response=> {
        localStorage.setItem("token", response.token);
        window.location.href = 'my-profile.html';
    });

        } else {
            // Muestra una alerta de error si el email no tiene un formato válido
            showAlertEmail();
        }
    } else {
        // Muestra una alerta de error si faltan campos por llenar
        showAlertError();
    }
});



// Función para validar el formato del email
function validarEmail(email) {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
}

// Función para mostrar la alerta de error de campos vacíos
function showAlertError() {
    const alertDanger = document.getElementById('alert-danger');
    alertDanger.classList.add('show');
    setTimeout(() => {
        alertDanger.classList.remove('show');
    }, 3000); // Oculta la alerta después de 3 segundos
}

// Función para mostrar la alerta de error de email inválido
function showAlertEmail() {
    const alertEmail = document.getElementById('alert-email');
    alertEmail.classList.add('show');
    setTimeout(() => {
        alertEmail.classList.remove('show');
    }, 3000); // Oculta la alerta después de 3 segundos
}

