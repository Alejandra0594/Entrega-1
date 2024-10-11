document.addEventListener("DOMContentLoaded", function(){
    document.getElementById("autos").addEventListener("click", function() {
        localStorage.setItem("catID", 101);
        window.location = "products.html"
    });
    document.getElementById("juguetes").addEventListener("click", function() {
        localStorage.setItem("catID", 102);
        window.location = "products.html"
    });
    document.getElementById("muebles").addEventListener("click", function() {
        localStorage.setItem("catID", 103);
        window.location = "products.html"
    });
});

//que "bienvenido, nombreUsuario" sea un enlace a my-profile.html
const nombreUsuarioBtn = document.getElementById('nombreUsuario');

//creo evento click
nombreUsuarioBtn.addEventListener('click', function() {
  //lleva a pagina de tu perfil
  window.location.href = 'my-profile.html';
});
