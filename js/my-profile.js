function validar() {
    const nombre = document.getElementById('nombre');
    const segnombre = document.getElementById('segnombre')
    const apellido = document.getElementById('apellido');
    const segapellido = document.getElementById('segapellido')
    const email = document.getElementById('email'); // No extraemos el valor aquí, ya que verificaremos la validez del input.
    const contacto = document.getElementById('contacto');
    

    clearAlerts(); // Limpiar las alertas previas

    let formIsValid = true; // Bandera para saber si el formulario es válido

    // Validación de campos vacíos

   /*  nombre */
    if (!nombre.value) {
        nombre.classList.add('is-invalid');
        formIsValid = false;
    } else {
        nombre.classList.remove('is-invalid');
        nombre.classList.add('is-valid');
    }
     /* segundo nombre */

    if (!segnombre.value) {
        segnombre.classList.add('is-invalid');
        formIsValid = false;
    } else {
        segnombre.classList.remove('is-invalid');
        segnombre.classList.add('is-valid');
    }
   /*  apellido */

    if (!apellido.value) {
        apellido.classList.add('is-invalid');
        formIsValid = false;
    } else {
        apellido.classList.remove('is-invalid');
        apellido.classList.add('is-valid');
    }

  /*   segundo apellido */

    if (!segapellido.value) {
        segapellido.classList.add('is-invalid');
        formIsValid = false;
    } else {
        segapellido.classList.remove('is-invalid');
        segapellido.classList.add('is-valid');
    }

   /*  contacto */
    if (!contacto.value) {
        contacto.classList.add('is-invalid');
        formIsValid = false;
    } else {
        contacto.classList.remove('is-invalid');
        contacto.classList.add('is-valid');
    }

   /*  email */
    if (!email.value) {
        email.classList.add('is-invalid');
        formIsValid = false;
    } else if (email.validity.typeMismatch) { // Validación del email
        email.classList.add('is-invalid');
        showAlertError('El correo no es válido.');
        formIsValid = false;
    } else {
        email.classList.remove('is-invalid');
        email.classList.add('is-valid');
    }

    // Si todo es válido, mostrar mensaje de éxito
    if (formIsValid) {
        showAlertSuccess();
    }
}

document.getElementById("registerForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevenir que el formulario se envíe automáticamente
    validar(); // Llamar a la función validar cuando se envíe el formulario
});

function showAlertSuccess() {
    const alertSuccess = document.getElementById("alert-success");
    alertSuccess.classList.remove("fade");
    alertSuccess.classList.add("show");
    alertSuccess.querySelector('p').textContent = "Registro enviado correctamente"; // Mensaje de éxito
}

function showAlertError(message) {
    const alertError = document.getElementById("alert-danger");
    alertError.classList.remove("fade"); 
    alertError.classList.add("show");
    alertError.querySelector('p').textContent = message; 
}

function clearAlerts() {
    const alertSuccess = document.getElementById("alert-success");
    const alertError = document.getElementById("alert-danger");

    alertSuccess.classList.add("fade"); 
    alertSuccess.classList.remove("show");

    alertError.classList.add("fade"); 
    alertError.classList.remove("show");
}

