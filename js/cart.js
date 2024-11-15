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





// Función para actualizar el contador del carrito
function actualizarContadorCarrito() {
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    document.getElementById("cart-count").textContent = carrito.length;
}

// Cambios para parte 3
// Función para cargar los productos en el carrito y calcular los totales
function cargarCarrito() {
  let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  let contenedor = document.getElementById("carrito-container");

  contenedor.innerHTML = ""; // Limpiar el contenido del carrito

  // Inicializar los subtotales 
  let subtotalUSD = 0;
  let subtotalUYU = 0;
//Hasta acá cambios para parte 3


    carrito.forEach(product => {
        // Asignación con valores para cada propiedad
        let nombre = product.name || "Nombre no disponible";
        let precio = parseFloat(product.cost) || 0;  // Cambiado a 'cost'
        let moneda = product.currency || "USD";
        let imagen = product.images && product.images.length > 0 ? product.images[0] : "https://via.placeholder.com/50";  // Cambiado a 'images'
        let cantidad = parseInt(product.quantity) || 1;
        let subtotal = precio * cantidad;


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

//Parte 3 
document.getElementById("subtotalUSD").textContent = `Subtotal (USD): $${subtotalUSD.toFixed(2)}`;


if (product.currency === "USD") {
  subtotalUSD += product.cost * product.quantity;
} else if (product.currency === "UYU") {
  subtotalUYU += product.cost * product.quantity;
} else {
  console.error("Moneda no válida para el producto:", product);
}
});

// Calcular totales y mostrarlos Parte 3
const totalUSD = subtotalUSD; 
const totalUYU = subtotalUYU;
document.getElementById("subtotalUSD").textContent = `Subtotal (USD): $${subtotalUSD.toFixed(2)}`;
document.getElementById("subtotalUYU").textContent = `Subtotal (UYU): $${subtotalUYU.toFixed(2)}`;
document.getElementById("totalUSD").textContent = `Total (USD): $${totalUSD.toFixed(2)}`;
document.getElementById("totalUYU").textContent = `Total (UYU): $${totalUYU.toFixed(2)}`;

calcularCostos();
}

//Calcular subtotal, envio y total, Parte 3
function calcularCostos() {
  const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  const tipoEnvio = document.getElementById("select-delivery").value;
  const porcentajesEnvio = {
      Standard: 0.05,
      Express: 0.07,
      Premium: 0.15
  };
  const tipoCambio = 40; // Tipo de cambio de USD a UYU

  // Inicializar los subtotales
  let subtotalUSD = 0;
  let subtotalUYU = 0;

  // Calcular subtotales
  carrito.forEach(producto => {
      if (producto.currency === "USD") {
          subtotalUSD += producto.cost * producto.quantity;
      } else if (producto.currency === "UYU") {
          subtotalUYU += producto.cost * producto.quantity;
      } else {
          console.error("Moneda no válida para el producto:", producto);
      }
  });

  // Calcular el costo de envío en USD y UYU
  const costoEnvioUSD = subtotalUSD * porcentajesEnvio[tipoEnvio];
  const costoEnvioUYU = subtotalUYU * porcentajesEnvio[tipoEnvio];

  // Calcular los totales finales
  const totalUSD = subtotalUSD + costoEnvioUSD;
  const totalUYU = subtotalUYU + costoEnvioUYU;

  // Mostrar los resultados en la interfaz
  document.getElementById("subtotalUSD").textContent = `Subtotal (USD): $${subtotalUSD.toFixed(2)}`;
  document.getElementById("subtotalUYU").textContent = `Subtotal (UYU): $${subtotalUYU.toFixed(2)}`;
  document.getElementById("costoEnvioUSD").textContent = `Costo de envío (USD): $${costoEnvioUSD.toFixed(2)}`;
  document.getElementById("costoEnvioUYU").textContent = `Costo de envío (UYU): $${costoEnvioUYU.toFixed(2)}`;
  document.getElementById("totalUSD").textContent = `Total (USD): $${totalUSD.toFixed(2)}`;
  document.getElementById("totalUYU").textContent = `Total (UYU): $${totalUYU.toFixed(2)}`;

  // Mostrar los resultados en la interfaz
  const subtotalUSDDisplay = document.getElementById("subtotalUSD");
  const subtotalUYUDisplay = document.getElementById("subtotalUYU");
  const costoEnvioUSDDisplay = document.getElementById("costoEnvioUSD");
  const costoEnvioUYUDisplay = document.getElementById("costoEnvioUYU");
  const totalUSDDisplay = document.getElementById("totalUSD");
  const totalUYUDisplay = document.getElementById("totalUYU");

  subtotalUSDDisplay.textContent = subtotalUSD > 0 ? `Subtotal (USD): $${subtotalUSD.toFixed(2)}` : "";
  subtotalUYUDisplay.textContent = subtotalUYU > 0 ? `Subtotal (UYU): $${subtotalUYU.toFixed(2)}` : "";
  costoEnvioUSDDisplay.textContent = costoEnvioUSD > 0 ? `Costo de envío (USD): $${costoEnvioUSD.toFixed(2)}` : "";
  costoEnvioUYUDisplay.textContent = costoEnvioUYU > 0 ? `Costo de envío (UYU): $${costoEnvioUYU.toFixed(2)}` : "";
  totalUSDDisplay.textContent = totalUSD > 0 ? `Total (USD): $${totalUSD.toFixed(2)}` : "";
  totalUYUDisplay.textContent = totalUYU > 0 ? `Total (UYU): $${totalUYU.toFixed(2)}` : "";

}
document.getElementById("select-delivery").addEventListener("change", calcularCostos);

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
    cargarCarrito();  // Recargar el carrito (si tienes esta función implementada)
    
    // Actualizar el contador del carrito
    actualizarContadorCarrito();
     // Llamar a cargarCarrito para actualizar la vista, Parte 3
     cargarCarrito();
});

// Lógica principal cuando la página esté lista
document.addEventListener("DOMContentLoaded", () => {
    cargarCarrito();  // Asegúrate de que esta función renderiza los productos en el carrito
    actualizarContadorCarrito();  // Inicializa el contador del carrito
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
  
//Parte 4 Pau
document.getElementById('checkout-btn').addEventListener('click', finalizarCompra);

function finalizarCompra() {
    
  // Validación de dirección
  const nombreDepartamento = document.getElementById('nombreDepart').value.trim();
  const nombreLocalidad = document.getElementById('nombreLocalidad').value.trim();
  const numeroPuerta = document.getElementById('numeroPuerta').value.trim();
  const esquinaNombre = document.getElementById('esquinaNombre').value.trim();
  const nombreCalle = document.getElementById('nombreCalle').value.trim();

  if (!nombreDepartamento || !nombreLocalidad || !numeroPuerta || !esquinaNombre || !nombreCalle) {
    alert('Por favor, complete todos los campos de la dirección.');
    return;
  }


  // Validación de tipo de envío
  const tipoEnvio = document.getElementById('select-delivery').value;
  if (!tipoEnvio) {
    alert('Por favor, seleccione un tipo de envío.');
    return;
  }

  // Validación de cantidades de productos en el carrito
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
if (carrito.length === 0) {
    alert('El carrito está vacío. Agrega productos antes de finalizar la compra.');
    return;
}


  // Validación de forma de pago
  const formaDePago = document.querySelector('input[name="formaDePago"]:checked');
  if (!formaDePago) {
    alert('Por favor, seleccione una forma de pago.');
    return;
  }

  // Validación de campos de forma de pago seleccionada
  if (formaDePago.value === 'credit') {
    const numeroCredito = document.getElementById('numeroCredito').value.trim();
    const codigoSeguridad = document.getElementById('codigoSeguridad').value.trim();
    const vencimiento = document.getElementById('vencimiento').value.trim();

    if (!numeroCredito || !codigoSeguridad || !vencimiento) {
      alert('Por favor, complete todos los campos de la tarjeta de crédito.');
      return;
    }
  } else if (formaDePago.value === 'bank') {
    const numeroCuenta = document.getElementById('numeroCuenta').value.trim();
    if (!numeroCuenta) {
      alert('Por favor, complete el número de cuenta para la transferencia bancaria.');
      return;
    }
  }

  // Si todas las validaciones pasan, se muestra el mensaje de éxito
  alert('¡Compra finalizada con éxito! Gracias por su compra.');
}


// Pau Funcionalidad de la parte de pagos con tarjeta
// Elementos de los campos de pago
const radioCredito = document.getElementById("credito");
const radioTransferencia = document.getElementById("transferencia");
const numeroCredito = document.getElementById("numeroCredito");
const codigoSeguridad = document.getElementById("codigoSeguridad");
const vencimiento = document.getElementById("vencimiento");
const numeroCuenta = document.getElementById("numeroCuenta");

// Función para habilitar o deshabilitar campos según la opción de pago seleccionada
function actualizarCamposPago() {
  if (radioCredito.checked) {
    // Habilitar campos de tarjeta de crédito
    numeroCredito.disabled = false;
    codigoSeguridad.disabled = false;
    vencimiento.disabled = false;
    
    // Deshabilitar campo de transferencia bancaria
    numeroCuenta.disabled = true;
  } else if (radioTransferencia.checked) {
    // Habilitar campo de transferencia bancaria
    numeroCuenta.disabled = false;
    
    // Deshabilitar campos de tarjeta de crédito
    numeroCredito.disabled = true;
    codigoSeguridad.disabled = true;
    vencimiento.disabled = true;
  }
}

// Eventos para cambiar la selección de forma de pago
radioCredito.addEventListener("change", actualizarCamposPago);
radioTransferencia.addEventListener("change", actualizarCamposPago);

// Llama a la función al cargar la página para asegurarte de que los campos estén correctamente deshabilitados
actualizarCamposPago();
