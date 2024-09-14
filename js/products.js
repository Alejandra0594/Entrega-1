// Parte 1 Sofi ,Función para obtener los datos de productos desde la API
function fetchProducts(CatID) {
    const url = `https://japceibal.github.io/emercado-api/cats_products/${CatID}.json`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            currentProductsArray = data.products;
            showProducts(); // Mostrar productos iniciales
        });
}

// Función para establecer el ID del producto en el localStorage y redirigir a la página de información del producto
function setProductID(id) {
    localStorage.setItem("id", id);
    window.location = "product-info.html";
}

document.addEventListener("DOMContentLoaded", () => {
    let categoryId = localStorage.getItem('catID');

    if (!categoryId) {
        categoryId = 101; // Usar 101 como predeterminado si no hay ID en el localStorage
        console.warn('No se encontró un categoryId en localStorage. Usando el ID 101 por defecto.');
    }

    fetchProducts(categoryId);
});

// 
let minPrice = undefined;
let maxPrice = undefined;

//2 Manejo de eventos para el filtrado por precio
document.getElementById('rangeFilterCount').addEventListener('click', () => {
    minPrice = parseFloat(document.getElementById('rangeFilterCountMin').value) || undefined;
    maxPrice = parseFloat(document.getElementById('rangeFilterCountMax').value) || undefined;
    showProducts(document.getElementById('searchInput').value.toLowerCase());
});

document.getElementById('clearRangeFilter').addEventListener('click', () => {
    minPrice = undefined;
    maxPrice = undefined;
    document.getElementById('rangeFilterCountMin').value = '';
    document.getElementById('rangeFilterCountMax').value = '';
    showProducts(document.getElementById('searchInput').value.toLowerCase());
});

// 3 Función para mostrar productos en la página
function showProducts(searchTerm = "") {
    let htmlContentToAppend = "";
    for (let product of currentProductsArray) {
        if ((minPrice === undefined || product.cost >= minPrice) &&
            (maxPrice === undefined || product.cost <= maxPrice)) {
             //8 Filtrar productos por nombre o descripción DESAFIATE
            if (product.name.toLowerCase().includes(searchTerm) || product.description.toLowerCase().includes(searchTerm)) {
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
    }
    document.getElementById("product-list").innerHTML = htmlContentToAppend;
}

// 4 Definición de constantes para los criterios de ordenamiento, Sofi 2
const ORDER_ASC_BY_NAME = "AZ";  
const ORDER_DESC_BY_NAME = "ZA"; 
const ORDER_BY_PROD_COUNT = "Cant."; // Ordenar por cantidad vendida

// Variables globales para manejar el estado
let currentProductsArray = [];
let currentSortCriteria = undefined;



//5   Función para ordenar productos según el criterio seleccionado, Sofi 3
function sortProducts(criteria, array) {
    let result = [];
    if (criteria === ORDER_ASC_BY_NAME) {
        // Ordenar por nombre ascendente
        result = array.sort((a, b) => a.name.localeCompare(b.name));
    } else if (criteria === ORDER_DESC_BY_NAME) {
        // Ordenar por nombre descendente
        result = array.sort((a, b) => b.name.localeCompare(a.name));
    } else if (criteria === ORDER_BY_PROD_COUNT) {
        // Ordenar por cantidad vendida
        result = array.sort((a, b) => b.soldCount - a.soldCount);
    }
    return result;
}

//6 Manejo de eventos de los botones de orden PARTE 2 PAU, Sofi 4
document.getElementById('sortAsc').addEventListener('click', () => {
    currentSortCriteria = ORDER_ASC_BY_NAME;
    currentProductsArray = sortProducts(currentSortCriteria, currentProductsArray);
    showProducts(document.getElementById('searchInput').value.toLowerCase());
});

document.getElementById('sortDesc').addEventListener('click', () => {
    currentSortCriteria = ORDER_DESC_BY_NAME;
    currentProductsArray = sortProducts(currentSortCriteria, currentProductsArray);
    showProducts(document.getElementById('searchInput').value.toLowerCase());
});

document.getElementById('sortByCount').addEventListener('click', () => {
    currentSortCriteria = ORDER_BY_PROD_COUNT;
    currentProductsArray = sortProducts(currentSortCriteria, currentProductsArray);
    showProducts(document.getElementById('searchInput').value.toLowerCase());
});

//7 Manejo de eventos para la búsqueda de productos DESAFIATEf
document.getElementById('searchInput').addEventListener('input', () => {
    showProducts(document.getElementById('searchInput').value.toLowerCase());
});










