function showAlertSuccess() {
    document.getElementById("alert-success").classList.add("show");
    
}

function showAlertError() {
    document.getElementById("alert-danger").classList.add("show");

}

function iniciar(){
    const iniciar = document.getElementById ("botones");

    var nombre = document.getElementById("completar").value.trim();
    var contrseña = document.getElementById("completar2").value.trim();

    if(!nombre || !contrseña) {
        showAlertError();
        return;
    }

      showAlertSuccess();

}


document.getElementById("ingresar").addEventListener("click", iniciar); 