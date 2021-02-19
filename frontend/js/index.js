//Constante nommée apiURL, contient l'url de l'api
const apiUrl = "http://localhost:3000/api/teddies";

//Fonction asynchrone getProduct via la méthode fetch, afin de récupérer les produits
const getProduct = async function () {
  try {
    let response = await fetch(apiUrl);
    if (response.ok) {

// Réponse positive, récupération des produits
      let products = await response.json();
      //console.log('Liste des produits :', products);

//Création des cards produits     
      let productsCards = "";
      products.forEach((product) => {
      //console.table('Produit :', { product });

//Utilisation de la fonction formatPrice (functions.js) pour formatage monétaire du prix 
      let price = formatPrice(product.price);

// Création du code HTML
        productsCards +=
        `<div class="col-12 col-lg-4">
        <div class="card mb-4 mb-lg-4 border-light shadow">
        <img src="${product.imageUrl}" alt="Ours en peluche ${product.name}" />
        <div class="card-img-overlay text-right">
        <p class="card-text btn btn-info">${price}</p>
        </div>
        <div class="card-body">
        <a href="produit.html?id=${product._id}" class="card-link stretched-link">Découvrez ${product.name}</a>
        </div>
        </div>
        </div>`;
      });

//Insertion du code HTML avec la méthode inner.HTML
      let elt = document.getElementById("products");
      elt.innerHTML = productsCards;

//Les ours n'aiment pas le vide - Création d'une carte bientôt disponible et insertion avec la méthode inner.HTML et appendChild
      let availableSoon = document.createElement('div');
      availableSoon.classList.add('col-12', 'col-lg-4');
      availableSoon.innerHTML =
      `<div class="card mb-4 mb-lg-4 border-light shadow">
      <img src="/backend/images/teddy_0.jpg" alt="Ours en peluche bientôt disponible" />
      <div class="card-img-overlay text-right">
      <p class="card-text btn btn-warning">Bientôt disponible</p>
      </div>
      <div class="card-body">
      <a href="" class="card-link stretched-link">M'avertir de la disponibilité</a>
      </div>
      </div>`;
      elt.appendChild(availableSoon)
      
// En cas de réponse négative, affichage de la réponse serveur
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