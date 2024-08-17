function showAlertSuccess() {
    document.getElementById("alert-success").classList.add("show");
    
}

function showAlertError() {
    document.getElementById("alert-danger").classList.add("show");

}

function iniciar(){
    const iniciar = document.getElementById ("iniciar");
    iniciar.innerHTML = '';


    var nombre = document.getElementById("nombre").value.trim();
    var contrseña = document.getElementById("contraseña").value.trim();

    if(!nombre || !contrseña) {
        showAlertError();
        return;
    }

}

document.getElementById("login").addEventListener("click", iniciar); 