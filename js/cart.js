
function cargarCarrito() {
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    let contenedor = document.getElementById("carrito-container");
    let totalUSD = 0;
    let totalUYU = 0;

    contenedor.innerHTML = ""; // Limpiar el contenido del carrito

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
        let row = document.createElement("tr");
        row.innerHTML = `
            <td>${nombre}</td>
            <td><img src="${imagen}" alt="Imagen del producto" width="50"></td>
            <td>${moneda} ${precio}</td>
            <td><input type="number" value="${cantidad}" min="1" class="cantidad" data-id="${product.id}"></td>
            <td>${moneda} ${subtotal.toFixed(2)}</td>
            <td>
                <button class="btn btn-danger btn-sm" onclick="eliminarProducto(${product.id})">
                    <i class="bi bi-trash"></i> <!-- Icono de papelera -->
                </button>
            </td>
        `;
        contenedor.appendChild(row);
    });

    // Mostrar los totales por separado en el DOM
    document.getElementById("total").innerHTML = `
        <p>Total en USD: ${totalUSD.toFixed(2)} USD</p>
        <p>Total en UYU: ${totalUYU.toFixed(2)} UYU</p>
    `;
}
function eliminarProducto(id) {
    // Obtener el carrito del localStorage
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    // Filtrar el producto que queremos eliminar
    carrito = carrito.filter(product => product.id !== id);

    // Actualizar el localStorage
    localStorage.setItem("carrito", JSON.stringify(carrito));

    // Volver a cargar el carrito en la página
    cargarCarrito();
}

// Llamar a la función al cargar la página
cargarCarrito();

console.log(localStorage.getItem("carrito")); // Verifica el contenido del carrito

/* Para Mi Carrito */
const miCarritoBtn = document.getElementById('miCarrito');

//creo evento click
miCarritoBtn.addEventListener('click', function() {
  //lleva a pagina de carrito
  window.location.href = 'cart.html';
});

