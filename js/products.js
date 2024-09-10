// Definición de constantes para los criterios de ordenamiento
const ORDER_ASC_BY_NAME = "AZ";  // Ordenar por precio ascendente
const ORDER_DESC_BY_NAME = "ZA"; // Ordenar por precio descendente
const ORDER_BY_PROD_COUNT = "Cant."; // Ordenar por cantidad vendida

// Variables globales para manejar el estado
let currentProductsArray = [];
let currentSortCriteria = undefined;
let minPrice = undefined;
let maxPrice = undefined;

// Función para ordenar productos según el criterio seleccionado
function sortProducts(criteria, array) {
    let result = [];
    if (criteria === ORDER_ASC_BY_NAME) {
        result = array.sort((a, b) => a.cost - b.cost); // Ordenar por precio ascendente
    } else if (criteria === ORDER_DESC_BY_NAME) {
        result = array.sort((a, b) => b.cost - a.cost); // Ordenar por precio descendente
    } else if (criteria === ORDER_BY_PROD_COUNT) {
        result = array.sort((a, b) => b.soldCount - a.soldCount); // Ordenar por cantidad vendida
    }
    return result;
}

// Función para mostrar productos en la página
function showProducts() {
    let htmlContentToAppend = "";
    for (let product of currentProductsArray) {
        if ((minPrice === undefined || product.cost >= minPrice) &&
            (maxPrice === undefined || product.cost <= maxPrice)) {
            htmlContentToAppend += `
            <div onclick="setProductID(${product.id})" class="list-group-item list-group-item-action cursor-active">
                <div class="row">
                    <div class="col-3">
                        <img src="${product.image}" class="img-thumbnail">
                    </div>
                    <div class="col">
                        <div class="d-flex w-100 justify-content-between">
                            <h4 class="mb-1">${product.name} - ${product.currency} ${product.cost}</h4>
                            <small class="">${product.soldCount} vendidos</small>
                        </div>
                        <p class="mb-1">${product.description}</p>
                    </div>
                </div>
            </div>`;
        }
    }
    document.getElementById("product-list").innerHTML = htmlContentToAppend;
  
}


// Función para obtener los datos de productos desde la API
function fetchProducts(CatID) {
    const url = `https://japceibal.github.io/emercado-api/cats_products/${CatID}.json`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            currentProductsArray = data.products;
            showProducts(); // Mostrar productos iniciales
          
        })
}

// Función para establecer el ID del producto en el localStorage y redirigir a la página de información del producto
function setProductID(id) {
    localStorage.setItem("id", id);
    window.location = "product-info.html";
}

    
    //Parte 1 Sofi
 document.addEventListener("DOMContentLoaded", () => {
    let categoryId = localStorage.getItem('catID');
  
    if (!categoryId) {
      categoryId = 101; // Usar 101 como predeterminado si no hay ID en el localStorage
      console.warn('No se encontró un categoryId en localStorage. Usando el ID 101 por defecto.');
    }
  
    fetchProducts(categoryId);
  });

  //Parte 2 Pau

    document.getElementById('sortAsc').addEventListener('click', () => {
        currentSortCriteria = ORDER_ASC_BY_NAME;
        currentProductsArray = sortProducts(currentSortCriteria, currentProductsArray);
        showProducts();
    });

    document.getElementById('sortDesc').addEventListener('click', () => {
        currentSortCriteria = ORDER_DESC_BY_NAME;
        currentProductsArray = sortProducts(currentSortCriteria, currentProductsArray);
        showProducts();
    });

    document.getElementById('sortByCount').addEventListener('click', () => {
        currentSortCriteria = ORDER_BY_PROD_COUNT;
        currentProductsArray = sortProducts(currentSortCriteria, currentProductsArray);
        showProducts();
    });

    document.getElementById('rangeFilterCount').addEventListener('click', () => {
        minPrice = parseFloat(document.getElementById('rangeFilterCountMin').value) || undefined;
        maxPrice = parseFloat(document.getElementById('rangeFilterCountMax').value) || undefined;
        showProducts();
    });

    document.getElementById('clearRangeFilter').addEventListener('click', () => {
        minPrice = undefined;
        maxPrice = undefined;
        document.getElementById('rangeFilterCountMin').value = '';
        document.getElementById('rangeFilterCountMax').value = '';
        showProducts();
    });


  



  
