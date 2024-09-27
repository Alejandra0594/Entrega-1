// Variable que guarda la data del producto
let productoActual = {};

// Función para mostrar la data del producto
function mostrarInfoProduct(product) {
    // Título del producto
    document.querySelector(".product-title").textContent = product.name;

    // Categoría del producto
    document.querySelector(".category-name").textContent = `Categoría: ${product.category}`;

    // Unidades vendidas
    document.querySelector(".sold-count").textContent = `${product.soldCount} vendidos`;

    // Precio del producto
    document.querySelector(".product-price").textContent = `${product.currency} ${product.cost}`;

    // Descripción del producto
    document.querySelector(".product-description").textContent = product.description;

    // Imagen principal 
    document.querySelector(".main-image").src = product.images[0];

    // Por si hay imágenes adicionales
    let thumbnailsContainer = document.querySelector(".product-thumbnails");
    thumbnailsContainer.innerHTML = "";

    // Recorro este array de imágenes para mostrarlas
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
// Paso 2,parte 2 Función para mostrar los comentarios
function mostrarComentarios(comentarios, clear = true) {
    const reviewsContainer = document.getElementById('reviews');

    // Solo limpiar el contenedor si es la primera vez (cuando clear = true)
    if (clear) {
        reviewsContainer.innerHTML = ''; // Limpiar contenido previo
    }

    if (!comentarios || comentarios.length === 0) {
        reviewsContainer.innerHTML = '<p>No hay comentarios disponibles.</p>';
        return;
    }

    comentarios.forEach(comentario => {
        const reviewElement = document.createElement('div');
        reviewElement.classList.add('review');

        reviewElement.innerHTML = `
            <div class="review-header">
                <div class="review-rating">${'★'.repeat(comentario.score)}${'☆'.repeat(5 - comentario.score)}</div>
                <div class="review-user-date">
                    <span class="review-user">${comentario.user}</span>
                    <span class="review-date">${new Date(comentario.dateTime).toLocaleDateString()}</span>
                </div>
            </div>
            <div class="review-comment">${comentario.description}</div>
        `;

        // Añadir cada comentario debajo de los existentes
        reviewsContainer.appendChild(reviewElement);
    });
}

// Función para obtener los comentarios desde la API
function fetchProductComments(productId) {
    const commentsUrl = `https://japceibal.github.io/emercado-api/products_comments/${productId}.json`;

    fetch(commentsUrl)
        .then(response => response.json())
        .then(comments => {
            mostrarComentarios(comments);  // Mostrar los comentarios obtenidos
        })
        .catch(error => console.error("Error al obtener los comentarios:", error));
}

// Paso 3 parte 2,Dentro de la función fetchProductInfo, se añadió la llamada a mostrarComentarios para pasar el array de comentarios del producto,
// Función que accede a la API para obtener la data del producto
function fetchProductInfo(productId) {
    const url = `https://japceibal.github.io/emercado-api/products/${productId}.json`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            productoActual = data; // Guardar la data del producto
            mostrarInfoProduct(productoActual); // Mostrar la data del producto
            fetchProductComments(productId); // Obtener y mostrar comentarios
        })
        .catch(error => console.error("Error al obtener los datos del producto:", error));
}

// Función que se ejecuta cuando se carga la página
document.addEventListener("DOMContentLoaded", () => {
    let productId = localStorage.getItem("id");

    // Pre-cargar el nombre del usuario si está en localStorage
    const savedUsername = localStorage.getItem("username");
    if (savedUsername) {
        document.getElementById("username").value = savedUsername;
    }

    if (productId) {
        fetchProductInfo(productId); // Llamar a la función con el ID
    } else {
        console.warn("No se encontró un ID de producto en localStorage."); // Mensaje de advertencia
    }
});

//desafiate Paso 2 capturar el nombre del usuario y usarlo al crear un nuevo comentario
document.getElementById("submit-review").addEventListener("click", function() {
    const rating = document.querySelector('input[name="rating"]:checked');
    const comment = document.getElementById("comment").value;
    const username = document.getElementById("username").value || "Usuario Anónimo"; // Usa un nombre por defecto si está vacío
    
    if (rating && comment) {
        const newComment = {
            score: parseInt(rating.value),
            description: comment,
            user: username, // Utiliza el nombre ingresado por el usuario
            dateTime: new Date().toISOString()
        };

        if (!productoActual.comments) {
            productoActual.comments = [];
        }

        // Almacenar el nombre del usuario en localStorage
        localStorage.setItem("username", username);

        // Añadir el nuevo comentario al final de la lista
        productoActual.comments.push(newComment);
        mostrarComentarios([newComment], false); // Insertar sin limpiar los comentarios anteriores

        // Limpiar el formulario
        document.querySelector('input[name="rating"]:checked').checked = false;
        document.getElementById("comment").value = '';
        // No limpiar el campo de nombre ya que lo queremos persistente
    } else {
        alert("Por favor, selecciona una calificación y escribe un comentario.");
    }
});

