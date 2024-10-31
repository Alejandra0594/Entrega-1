function cargarCarrito() {
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    let contenedor = document.getElementById("carrito-container");
    let totalUSD = 0;
    let totalUYU = 0;

    // Limpiar el contenido del carrito
    contenedor.innerHTML = "";

    carrito.forEach(product => {
        let nombre = product.name || "Nombre no disponible";
        let precio = parseFloat(product.price) || 0;
        let moneda = product.currency || "USD";
        let imagen = product.image || "https://via.placeholder.com/50";
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
        row.classList.add("list-group-item", "d-flex", "align-items-center", "justify-content-between");

        row.innerHTML = `
            <img src="${imagen}" class="imgcarrito img-fluid" alt="Imagen del producto" width="300">
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

   // Mostrar los totales dinámicamente en función de las monedas
   const totalContainer = document.getElementById("total");
   totalContainer.innerHTML = ""; // Limpiar el contenido anterior

   if (totalUSD > 0) {
       totalContainer.innerHTML += `<p>Total en USD: ${totalUSD.toFixed(2)} USD</p>`;
   }
   if (totalUYU > 0) {
       totalContainer.innerHTML += `<p>Total en UYU: ${totalUYU.toFixed(2)} UYU</p>`;
   }
}

// Evento delegado para manejar los botones de +, -, y eliminar
document.getElementById('carrito-container').addEventListener('click', function (e) {
    let target = e.target;
    
    // Si se hace clic en el ícono de la papelera, subir al botón contenedor
    if (target.tagName === 'I' && target.parentElement.classList.contains('eliminar-producto')) {
        target = target.parentElement;
    }

    let id = parseInt(target.getAttribute('data-id'));
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    let producto = carrito.find(product => product.id === id);

    if (!producto) return; // Si no encuentra el producto, no hace nada

    // Incrementar cantidad
    if (target.classList.contains('incrementar')) {
        producto.quantity += 1;
    }

    // Decrementar cantidad (no permitir bajar de 1)
    if (target.classList.contains('decrementar') && producto.quantity > 1) {
        producto.quantity -= 1;
    }

    // Eliminar producto
    if (target.classList.contains('eliminar-producto')) {
        carrito = carrito.filter(product => product.id !== id);
    }

    // Guardar cambios en localStorage y recargar el carrito
    localStorage.setItem("carrito", JSON.stringify(carrito));
    cargarCarrito();
});

// Cargar el carrito al iniciar la página
cargarCarrito();


console.log(localStorage.getItem("carrito")); // Verifica el contenido del carrito






/* Para el boton Mi Carrito en el menu desplegable*/
const miCarritoBtn = document.getElementById('miCarrito');
//creo evento click
miCarritoBtn.addEventListener('click', function() {
  //lleva a pagina de carrito
  window.location.href = 'cart.html';
});

