const url = "https://japceibal.github.io/emercado-api/cats_products/101.json";

function showProducts(products) {
 const productList = document.getElementById("product-list");
 productList.innerHTML = ''; // Limpia el contenedor antes de agregar los productos

 products.forEach(product => {
 const productHTML = `
 <div class="product-item">
 <img src="${product.image}" alt="${product.name}">
 <div class="card-body">
 <h5>${product.name}</h5>
 <p>${product.description}</p>
 <p><strong>Precio:</strong> ${product.currency}${product.cost}</p>
<p><strong>Vendidos:</strong> ${product.soldCount}</p>
</div>
 </div>
 `;
 productList.insertAdjacentHTML('beforeend', productHTML);
});
 }

 fetch(url)
 .then(response => {
if (!response.ok) {
 throw new Error('Error al cargar los datos');
 }
 return response.json();
 })
 .then(data => {
 showProducts(data.products);
 })
 .catch(error => {
 console.error('Hubo un problema con la solicitud Fetch:', error);
 });