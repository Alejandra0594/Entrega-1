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

//que "bienvenido, miPerfil" sea un enlace a my-profile.html
const miPerfilBtn = document.getElementById('miPerfil');

//creo evento click
miPerfilBtn.addEventListener('click', function() {
  //lleva a pagina de tu perfil
  window.location.href = 'my-profile.html';
});

//desde el menu de cerrar sesión, crea un enlace a login.html
const cerrarSesion = document.getElementById('cerrarSesion');

//creo un evento click


/* Aca hay problema, porque ya no tenemos un boton cerrar sesion */
/* cerrarSesionBtn.addEventListener('click', function()

{
    window.location.href = 'login.html';
}); */


/* Para Mi Carrito */
const miCarritoBtn = document.getElementById('miCarrito');

//creo evento click
miCarritoBtn.addEventListener('click', function() {
  //lleva a pagina de carrito
  window.location.href = 'cart.html';
});

// Función para actualizar el contador del carrito
function actualizarContadorCarrito() {
    // Obtener el carrito desde el localStorage (o un array vacío si no hay nada guardado)
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  
    // Actualizar el badge con la cantidad de productos
    document.getElementById("cart-count").textContent = carrito.length;
  }
  
  // Función para agregar un producto al carrito
  function agregarAlCarrito(producto) {
    // Obtener el carrito actual, añadir el nuevo producto y guardarlo de nuevo
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    carrito.push(producto);
    localStorage.setItem("carrito", JSON.stringify(carrito));
  
    // Actualizar el contador
    actualizarContadorCarrito();
  }
  
  // Al cargar la página, actualizar el contador con los productos ya guardados
  document.addEventListener("DOMContentLoaded", actualizarContadorCarrito);