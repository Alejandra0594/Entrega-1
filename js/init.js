const CATEGORIES_URL = "http://localhost:3001/categories";
const PUBLISH_PRODUCT_URL = "http://localhost:3001/sell" ;
const PRODUCTS_URL = "http://localhost:3001/categories/:id";
const PRODUCT_INFO_URL = "http://localhost:3001/products/:id";  
const PRODUCT_INFO_COMMENTS_URL = "http://localhost:3001/products_comments/:id"; 
const CART_INFO_URL = "http://localhost:3001/user_cart";
const CART_BUY_URL = "http://localhost:3001/cart";
const EXT_TYPE = ".json";

let showSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "block";
}

let hideSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "none";
}

let getJSONData = function(url){
    let result = {};
    showSpinner();
    return fetch(url,{headers:{'access-token':localStorage.getItem('token')}})
    .then(response => {
      if (response.ok) {
        return response.json();
      }else{
        throw Error(response.statusText);
      }
    })
    .then(function(response) {
          result.status = 'ok';
          result.data = response;
          hideSpinner();
          return result;
    })
    .catch(function(error) {
        result.status = 'error';
        result.data = error;
        hideSpinner();
        return result;
    });
}