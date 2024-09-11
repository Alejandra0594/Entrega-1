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