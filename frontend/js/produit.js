// Récupération de l'URL et de l'id produit
const urlProduct = document.location.search;
console.log(urlProduct);
const idProduct = new URLSearchParams(urlProduct).get("id");
console.log(idProduct);
const apiUrl = "http://localhost:3000/api/teddies/" + idProduct;
console.log(apiUrl);

const getProduct = async function () {
  //Fonction asynchrone getProduct via la méthode fetch, récupère les produits
  try {
    let response = await fetch(apiUrl);
    if (response.ok) {
      // Réponse positive, récupération des produits
      let products = await response.json();
      console.log(products);
      let productsCards = ""; // Création des cards html
      [products].forEach((product) => {
        console.log(product);
        document.querySelector("h1").textContent =
          "Découvrez " + product.name + " !";

        productsCards += `<div class="col-12 col-lg-8">
          <img class="border-light shadow img-fluid" src="${
            product.imageUrl
          }" alt="Ours en peluche ${product.name}">
            <div class="card-img-overlay text-right mr-3">
            <p class="btn btn-dark">Ajouter à ma wishlist<i class="fas fa-heart ml-2"></i></p>
            </div>
        </div>
        <div class="col-12 col-lg-4 mt-4 mt-lg-0">
          <div class="card">
              <div class="card-header">
                  <h2>${product.name}</h2>
                  <p class="small">Référence : ${product._id.substring(
                    0,
                    12
                  )}</p>
              </div>
              <div class="card-body">
              <p class="small mb-0"><u>Prix</u></p>
              <h2 class="font-weight-bold text-info">${Intl.NumberFormat(
                "fr-FR",
                {
                  style: "currency",
                  currency: "EUR",
                  minimumFractionDigits: 2,
                }
              ).format(product.price / 100)}</h2>
              <p class="small mb-0"><u>Couleurs</u></p>
              <div id="product-color">
              </div>
              <p class="small mb-0"><u>Description</u></p>
              <p class="card-text">${product.description}</p>
              <a href="#" class="btn btn-info mb-2 mr-sm-4"><i class="fas fa-cart-arrow-down mr-2"></i>Ajouter à votre panier</a>
              <a href="index.html" class="btn btn-dark mb-2"><i class="fas fa-shopping-basket mr-2"></i>Continuer vos achats</a>
              </div>
          </div>
        </div>`;

        const colors = product.colors;
        console.log(colors);
        let colorValueCard = "";
        colors.forEach((colorValue, index) => {
          colorValueCard += `<div  class="form-check mb-2"><input class="form-check-input" type="radio" name="${colorValue}" id="${colorValue}" value="${index}">
      <label class="form-check-label" for="${colorValue}">${colorValue}</label></div>`;

          console.log(colorValueCard);
        });
        console.log(productsCards);
        let elt = document.getElementById("product");
        elt.innerHTML = productsCards;
        let eltColor = document.getElementById("product-color");
        console.log(eltColor);
        eltColor.innerHTML = colorValueCard;
      });
    } else {
      console.error(
        "Une erreur " + response.status + " a été retournée par le serveur."
      );
    }
  } catch (e) {
    console.log(e);
  }
};

getProduct();
