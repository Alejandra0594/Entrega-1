function showProducts(products) {
    
    const productList = document.getElementById ("product-list");
    productList.innerHTML = '';
  
    products.forEach(product => {
      const productHTML = `
        <div class="col-md-4">
          <div class="card mb-4 shadow-sm">
            <img src="${product.image}" class="card-img-top" alt="${product.name}">
            <div class="card-body">
              <h5 class="card-title">${product.name}</h5>
              <p class="card-text">${product.description}</p>
              <p class="card-text"><strong>Precio:</strong> ${product.currency}${product.cost}</p>
              <p class="card-text"><strong>Vendidos:</strong> ${product.soldCount}</p>
            </div>
          </div>
        </div>
      `;
      productList.insertAdjacentHTML('beforeend', productHTML);
    });
}
  
  const url = "https://japceibal.github.io/emercado-api/cats_products/101.json";
  
  fetch(url)
    .then(response => {
      if (!response.ok) {
        thrownewError('Error al cargar los datos');
      }
      return response.json();
    })
    .then(data => {
      console.log("Datos obtenidos:", data);
      showProducts(data.products);
    })
    .catch(error => {
      console.error('Hubo un problema con la solicitud Fetch:', error);
    });