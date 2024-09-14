 HEAD
//var que guarda la data del producto
let productoActual = {};

//funcion para mostrar la data del producto
function mostrarInfoProduct(product) {
    //titulo del producto
    document.querySelector(".product-title").textContent = product.name;

    //categoria del producto
    document.querySelector(".category-name").textContent = `Categoría: ${product.category}`;

    //unidades vendidas
    document.querySelector(".sold-count").textContent = `${product.soldCount} vendidos`;

    //precio del producto
    document.querySelector(".product-price").textContent = `${product.currency} ${product.cost}`;

    //desc del producto
    document.querySelector(".product-description").textContent = product.description;

    //imagen principal 
    document.querySelector(".main-image").src = product.images[0];

    //por si hay imagenes adicionales
    let thumbnailsContainer = document.querySelector(".product-thumbnails");
    thumbnailsContainer.innerHTML = "";

    //recorro este array de imagenes para mostrarlas
    for (let image of product.images) {
        //creo un div para cada imagen nueva
        let thumbDiv = document.createElement("div");
        thumbDiv.className = "col-2 mb-2";  //se le asigna los estilos de bootstrap para que se vea bien cada imagen nueva

        //creo la imagen nueva 
        let thumbnail = document.createElement("img");
        thumbnail.src = image;  //fuente de la imagen
        thumbnail.className = "img-thumbnail img-fluid";  //esticos de bootstrap para que se vea bien
        thumbnail.alt = "Miniatura del producto";  //txt por si llega a fallar la imagen

        //agrego la imagen al div
        thumbDiv.appendChild(thumbnail);

        //agrego el div al contenedor de las miniaturas
        thumbnailsContainer.appendChild(thumbDiv);
    }
}

//funcion que accede a la API para obtener la data del producto
function fetchProductInfo(productId) {
    //url de la API con el id del producto
    const url = `https://japceibal.github.io/emercado-api/products/${productId}.json`;

    //se hace la peticion a la API y se obtienen los datos del producto
    fetch(url)
        .then(response => response.json())  //convierto la respuesta a JSON
        .then(data => {
            productoActual = data;  //hago uso de la variable productoActual para guardar la data del producto
            mostrarInfoProduct(productoActual);  //muestro la data del producto con la funcion mostrarInfoProduct
        })
        .catch(error => console.error("Error al obtener los datos del producto:", error));  //por si falla la peticion a la API
}

//funcion que se ejecuta cuando se carga la pagina
document.addEventListener("DOMContentLoaded", () => {
    //obtengo el id del producto desde el localStorage
    let productId = localStorage.getItem("id");

    //compuebo si hay un id en el localStorage
    if (productId) {
        fetchProductInfo(productId);  //si hay un id, llamo a la funcion fetchProductInfo con el id
    } else {
        console.warn("No se encontró un ID de producto en localStorage.");  //si no hay, muestro un mensaje de advertencia
    }
});

/* function fetchProducts(productID) {
    const url = `https://japceibal.github.io/emercado-api/cats_products/${productID}.json`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            currentProductsArray = data.products;
            showProducts(); // Mostrar productos iniciales
        });

        function setProductID(id) {
            localStorage.setItem("id", id);
            window.location = "product-info.html";
        }
        
document.addEventListener("DOMContentLoaded", () => {
    let productId = localStorage.getItem('productID');

    if (!productId) {
        productId = 101; // Usar 101 como predeterminado si no hay ID en el localStorage
        console.warn('No se encontró un categoryId en localStorage. Usando el ID 101 por defecto.');
    }

    fetchProducts(productId);
});
}
function displayProductDetails(product) {
    // Reemplaza estos selectores con los selectores de tu HTML
    const productTitle = document.getElementById('name');
    const productDescription = document.getElementById('description');
    const productPrice = document.getElementById('cost');
    
    if (productTitle) productTitle.textContent = product.name || 'Nombre no disponible';
    if (productDescription) productDescription.textContent = product.description || 'Descripción no disponible';
    if (productPrice) productPrice.textContent = product.price ? `$${product.price.toFixed(2)}` : 'Precio no disponible';
} */
    document.addEventListener("DOMContentLoaded", () => {
        const productId = localStorage.getItem('productID');
    
        if (!productId) {
            console.warn('No se encontró un productID en localStorage.');
            return;
        }
    
        fetchProduct(productId);
    });
    
    function fetchProduct(productID) {
        const url = `https://japceibal.github.io/emercado-api/cats_products/${productID}.json`;
    
        fetch(url)
            .then(response => response.json())
            .then(data => {
                const product = data.products[0]; // Asumiendo que la respuesta contiene una lista de productos, usa el primer producto
                displayProductDetails(product);
            })
            .catch(error => console.error('Error fetching product:', error));
    }
    
    function displayProductDetails(product) {
        const productTitle = document.getElementById('name');
        const productDescription = document.getElementById('description');
        const productPrice = document.getElementById('cost');
    
        if (productTitle) productTitle.textContent = product.name || 'Nombre no disponible';
        if (productDescription) productDescription.textContent = product.description || 'Descripción no disponible';
        if (productPrice) productPrice.textContent = product.price ? `$${product.price.toFixed(2)}` : 'Precio no disponible';
    }

