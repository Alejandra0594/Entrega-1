function validar() {
    const nombre = document.getElementById('nombre');
    const segnombre = document.getElementById('segnombre');
    const apellido = document.getElementById('apellido');
    const segapellido = document.getElementById('segapellido');
    const email = document.getElementById('email');
    const contacto = document.getElementById('contacto');

    clearAlerts(); // Limpiar las alertas previas

    let formIsValid = true; // Bandera para saber si el formulario es válido

    // Validación de campos vacíos
    if (!nombre.value) {
        nombre.classList.add('is-invalid');
        formIsValid = false;
    } else {
        nombre.classList.remove('is-invalid');
        nombre.classList.add('is-valid');
    }

    if (!segnombre.value) {
        segnombre.classList.add('is-invalid');
        formIsValid = false;
    } else {
        segnombre.classList.remove('is-invalid');
        segnombre.classList.add('is-valid');
    }

    if (!apellido.value) {
        apellido.classList.add('is-invalid');
        formIsValid = false;
    } else {
        apellido.classList.remove('is-invalid');
        apellido.classList.add('is-valid');
    }

    if (!segapellido.value) {
        segapellido.classList.add('is-invalid');
        formIsValid = false;
    } else {
        segapellido.classList.remove('is-invalid');
        segapellido.classList.add('is-valid');
    }

    if (!contacto.value) {
        contacto.classList.add('is-invalid');
        formIsValid = false;
    } else {
        contacto.classList.remove('is-invalid');
        contacto.classList.add('is-valid');
    }

    if (!email.value) {
        email.classList.add('is-invalid');
        formIsValid = false;
    } else if (email.validity.typeMismatch) {
        email.classList.add('is-invalid');
        showAlertError('El correo no es válido.');
        formIsValid = false;
    } else {
        email.classList.remove('is-invalid');
        email.classList.add('is-valid');
    }

    // Si todo es válido, guardar los datos en localStorage y mostrar mensaje de éxito
    if (formIsValid) {
        if (nombre.value) localStorage.setItem('nombre', nombre.value);
        if (segnombre.value) localStorage.setItem('segnombre', segnombre.value);
        if (apellido.value) localStorage.setItem('apellido', apellido.value);
        if (segapellido.value) localStorage.setItem('segapellido', segapellido.value);
        if (email.value) localStorage.setItem('email', email.value);
        if (contacto.value) localStorage.setItem('contacto', contacto.value);

        // Limpiar formulario después del guardado
        document.getElementById("registerForm").reset();
        showAlertSuccess();
    }
}

document.getElementById("registerForm").addEventListener("submit", function(event) {
    event.preventDefault();
    validar();
});

function clearAlerts() {
    const alertSuccess = document.getElementById("alert-success");
    const alertError = document.getElementById("alert-danger");

    alertSuccess.classList.add("fade");
    alertSuccess.classList.remove("show");

    alertError.classList.add("fade");
    alertError.classList.remove("show");
}

function showAlertSuccess() {
    const alertSuccess = document.getElementById("alert-success");
    alertSuccess.classList.remove("fade");
    alertSuccess.classList.add("show");
    alertSuccess.querySelector('p').textContent = "Registro guardado correctamente.";
}

function showAlertError(message) {
    const alertError = document.getElementById("alert-danger");
    alertError.classList.remove("fade");
    alertError.classList.add("show");
    alertError.querySelector('p').textContent = message;
}

// Combinación de todas las funciones de `DOMContentLoaded`
document.addEventListener('DOMContentLoaded', function() {
    // Cargar valores del localStorage en el formulario
    if (localStorage.getItem('nombre')) {
        document.getElementById('nombre').value = localStorage.getItem('nombre');
    }
    if (localStorage.getItem('segnombre')) {
        document.getElementById('segnombre').value = localStorage.getItem('segnombre');
    }
    if (localStorage.getItem('apellido')) {
        document.getElementById('apellido').value = localStorage.getItem('apellido');
    }
    if (localStorage.getItem('segapellido')) {
        document.getElementById('segapellido').value = localStorage.getItem('segapellido');
    }
    if (localStorage.getItem('email')) {
        document.getElementById('email').value = localStorage.getItem('email');
    }
    if (localStorage.getItem('contacto')) {
        document.getElementById('contacto').value = localStorage.getItem('contacto');
    }
//modo claro y oscuro
    document.addEventListener('DOMContentLoaded', function () {
    // Referencias a los elementos del switch y del label
    let toggleModo = document.getElementById('toggleModo');
    let labelModo = document.getElementById('labelModo');

    // Verificar y aplicar el modo guardado en localStorage
    const modoActual = localStorage.getItem('theme');
    if (modoActual === 'dark') {
        activarModoNoche();
        toggleModo.checked = true;
    } else {
        activarModoDia();
    }

    // Alternar entre Modo Día y Modo Noche cuando se cambia el switch
    toggleModo.addEventListener('change', function () {
        if (this.checked) {
            activarModoNoche();
            localStorage.setItem('theme', 'dark'); // Guardar la preferencia en localStorage
        } else {
            activarModoDia();
            localStorage.setItem('theme', 'light');
        }
    });
});

// Función para activar el Modo Noche
function activarModoNoche() {
    document.body.classList.add('dark-mode'); //agrego una clase para fondo oscuro

    // Mostrar solo el icono del sol para el Modo Día
    document.getElementById('labelModo').innerHTML = '<i class="bi bi-sun"></i>';
}

// Función para activar el Modo Día
function activarModoDia() {
    document.body.classList.remove('dark-mode'); // Quitar clase de fondo oscuro

    // Mostrar solo el icono de la luna para el Modo Noche
    document.getElementById('labelModo').innerHTML = '<i class="bi bi-moon"></i>';
}
