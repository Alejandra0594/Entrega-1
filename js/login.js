function showAlertSuccess() {
    document.getElementById("alert-success").classList.add("show");
    
}

function showAlertError() {
    document.getElementById("alert-danger").classList.add("show");

}

function iniciar(){
    const username = document.getElementById('nombre_usuario').value;
    const password = document.getElementById('contraseña_usuario').value;

    if (username && password) {
        // Si inició sesión
        sessionStorage.setItem('sesion', 'true');
        // lo mando al index.html
        window.location.href = 'index.html';
    } else  {
        showAlertError();
        return;
    }
        
    

}


document.getElementById("ingresar").addEventListener("click", iniciar); 