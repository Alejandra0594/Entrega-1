console.log(JSON.parse(localStorage.getItem("carrito")));

// Variable global para almacenar el producto actual
let productoActual = {};

// Función para mostrar la información del producto en la página
function mostrarInfoProduct(product) {
    if (!product) {
        console.error("No se ha podido cargar el producto.");
        return;
    }
    document.querySelector(".product-title").textContent = product.name;
    document.querySelector(".category-name").textContent = `Categoría: ${product.category}`;
    document.querySelector(".sold-count").textContent = `${product.soldCount} vendidos`;
    document.querySelector(".product-price").textContent = `${product.currency} ${product.cost}`;
    document.querySelector(".product-description").textContent = product.description;
    document.querySelector(".main-image").src = product.images[0];

    let thumbnailsContainer = document.querySelector(".product-thumbnails");
    thumbnailsContainer.innerHTML = "";  // Limpiar las miniaturas anteriores
    for (let image of product.images) {
        let thumbDiv = document.createElement("div");
        thumbDiv.className = "col-2";

        let thumbnail = document.createElement("img");
        thumbnail.src = image;
        thumbnail.className = "img-thumbnail";
        thumbnail.alt = "Miniatura del producto";

        thumbDiv.appendChild(thumbnail);
        thumbnailsContainer.appendChild(thumbDiv);
    }
}

// Función para obtener información del producto desde la API
/* function fetchProductInfo(productId) {
    const url = `https://japceibal.github.io/emercado-api/products/${productId}.json`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            productoActual = data;  // Guardar el producto cargado
            mostrarInfoProduct(productoActual); // Mostrar el producto
        })
        .catch(error => console.error("Error al obtener los datos del producto:", error));
} */



// Función para actualizar el contador del carrito
function actualizarContadorCarrito() {
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    document.getElementById("cart-count").textContent = carrito.length;
}

// Función para cargar los productos en el carrito
function cargarCarrito() {
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    let contenedor = document.getElementById("carrito-container");
    let totalUSD = 0;
    let totalUYU = 0;

    contenedor.innerHTML = "";  // Limpiar el contenido del carrito

    carrito.forEach(product => {
        // Asignación con valores correctos para cada propiedad
        let nombre = product.name || "Nombre no disponible";
        let precio = parseFloat(product.cost) || 0;  // Cambiado a 'cost'
        let moneda = product.currency || "USD";
        let imagen = product.images && product.images.length > 0 ? product.images[0] : "https://via.placeholder.com/50";  // Cambiado a 'images'
        let cantidad = parseInt(product.quantity) || 1;
        let subtotal = precio * cantidad;

        // Acumular el total por moneda
        if (moneda === "USD") {
            totalUSD += subtotal;
        } else if (moneda === "UYU") {
            totalUYU += subtotal;
        }

        // Crear la fila del producto
        let row = document.createElement("div");
        row.classList.add( "d-flex", "align-items-center", "justify-content-between");

        row.innerHTML = `
                
                <img src="${imagen}" class="imgcarrito img-fluid" alt="Imagen del producto" width="100" >
                <div class="producto-info flex-grow-1 ms-3">
                <h3>${nombre}</h3>
                <p>Precio: ${moneda} ${precio.toFixed(2)}</p>
    

                <div class="cantidad-control d-flex align-items-center">
                <button class="btn btn-light btn-sm decrementar" data-id="${product.id}">-</button>
                <span class="mx-2 cantidad-texto">${cantidad}</span>
                <button class="btn btn-light btn-sm incrementar" data-id="${product.id}">+</button>
                </div>
            
        <div>Subtotal: ${moneda} ${subtotal.toFixed(2)}</div>

        <button class="btn btn-sm btn-light eliminar-producto" data-id="${product.id}">
            <i class="bi bi-trash-fill" style="color: black;"></i>
        </button>
    </div>
`;
contenedor.appendChild(row);
});

    // Mostrar los totales
    const totalContainer = document.getElementById("total");
    totalContainer.innerHTML = ""; // Limpiar el contenido anterior
    if (totalUSD > 0) {
        totalContainer.innerHTML += `<p>Total: USD$ ${totalUSD.toFixed(2)} </p>`;
    }
    if (totalUYU > 0) {
        totalContainer.innerHTML += `<p>Total: $U ${totalUYU.toFixed(2)} </p>`;
    }
}


// Evento delegado para manejar los botones de incrementar, decrementar y eliminar
document.getElementById('carrito-container').addEventListener('click', function (e) {
    let target = e.target;
    if (target.tagName === 'I' && target.parentElement.classList.contains('eliminar-producto')) {
        target = target.parentElement;
    }

    let id = parseInt(target.getAttribute('data-id'));
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    let producto = carrito.find(product => product.id === id);

    if (!producto) return;  // Si no encuentra el producto, no hace nada

    if (target.classList.contains('incrementar')) {
        producto.quantity += 1;
    }
    if (target.classList.contains('decrementar') && producto.quantity > 1) {
        producto.quantity -= 1;
    }
    if (target.classList.contains('eliminar-producto')) {
        carrito = carrito.filter(product => product.id !== id);
    }

    localStorage.setItem("carrito", JSON.stringify(carrito));
    cargarCarrito();  // Recargar el carrito
});

// Lógica principal cuando la página esté lista
document.addEventListener("DOMContentLoaded", () => {
    const productId = 1;  // Cambia según corresponda
   /*  fetchProductInfo(productId); */
    cargarCarrito();
    actualizarContadorCarrito();

    
});
// Función para actualizar el contador del carrito
function actualizarContadorCarrito() {
    // Obtener el carrito desde el localStorage (o un array vacío si no hay nada guardado)
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  
    // Calcular la cantidad total de productos en el carrito
    let totalCantidad = carrito.reduce((acc, producto) => acc + (producto.quantity || 1), 0);
  
    // Actualizar el badge con la cantidad total de productos
    document.getElementById("cart-count").textContent = totalCantidad;
  }

// Función para agregar un producto al carrito
function agregarAlCarrito(producto) {
    // Obtener el carrito actual del localStorage
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  
    // Verificar si el producto ya está en el carrito
    let productoExistente = carrito.find(item => item.id === producto.id);
  
    if (productoExistente) {
        // Si el producto ya existe, sumar la cantidad
        productoExistente.quantity += producto.quantity || 1;
    } else {
        // Si el producto no existe, agregarlo al carrito con la cantidad proporcionada
        producto.quantity = producto.quantity || 1; // Asegurar que tenga una cantidad
        carrito.push(producto);
    }
  
    // Guardar el carrito actualizado en localStorage
    localStorage.setItem("carrito", JSON.stringify(carrito));
  
    // Actualizar el contador
    actualizarContadorCarrito();
  }
  
  // Al cargar la página, actualizar el contador con los productos ya guardados
  document.addEventListener("DOMContentLoaded", actualizarContadorCarrito);

//que "bienvenido, miPerfil" sea un enlace a my-profile.html
const miPerfilBtn = document.getElementById('miPerfil');

//creo evento click
miPerfilBtn.addEventListener('click', function() {
  //lleva a pagina de tu perfil
  window.location.href = 'my-profile.html';
});
  