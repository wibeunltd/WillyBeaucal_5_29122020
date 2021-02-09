// Récupération de l'URL et de l'id produit
const urlProduct = document.location.search;
  //console.log(urlProduct);
const idProduct = new URLSearchParams(urlProduct).get("id");
  //console.log(idProduct);
const apiUrl = "http://localhost:3000/api/teddies/" + idProduct;
  //console.log(apiUrl);

//Fonction asynchrone getProduct via la méthode fetch, récupère le produit
const getProduct = async function () {
  try {
    let response = await fetch(apiUrl);
    if (response.ok) {

// Réponse positive, récupération du produit
      let product = await response.json();
      //console.log(product);

//Formatage monétaire du prix des produits
let price = Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR", minimumFractionDigits: 2}).format(product.price / 100);

// Création de la carte produit     
      let productCard = "";
      document.querySelector("h1").textContent = "Découvrez " + product.name + " !";

//Gestion des couleurs du produit
      const colors = product.colors;
      //console.log(colors);
      let colorValueProductCard = "";
      colors.forEach((colorValue, index) => {
        colorValueProductCard +=
        `<option value="${index}">${colorValue}</option>`
      });
      //console.log(colorValueProductCard);

//Gestion de la quantité
      let productQuantity = "";
      for (let quantity = 1; quantity < 11; quantity++) {
        productQuantity +=
        `<option value="${quantity}">${quantity}</option>`
      };

//Création du code HTML
      productCard =
      `<div class="col-12 col-lg-7">
      <img class="border-light shadow img-fluid" src="${product.imageUrl}" alt="Ours en peluche ${product.name}">
      <div class="card-img-overlay text-right mr-3">
      <p class="btn btn-dark">Ajouter à ma wishlist<i class="fas fa-heart ml-2"></i></p>
      </div>
      </div>
      <aside class="col-12 col-lg-5 mt-4 mt-lg-0">
      <div class="card border-0">
      <div class="card-header bg-white">
      <h2>${product.name}</h2>
      <p class="small">ID Produit : ${product._id}</p>
      </div>
      <div class="card-body">
      <p class="font-weight-light mb-0">Prix</p>
      <h3 class="font-weight-bold text-info">${price}</h3>
      <p class="font-weight-light mb-1">Couleurs</p>
      <form class="mb-3">
      <select class="form-select" aria-label="Couleurs disponibles pour ${product.name}">
      <option selected disabled>Merci de choisir une couleur...</option>
      ${colorValueProductCard}
      </select>
      </form>
      <p class="font-weight-light mb-1">Quantité</p>
      <form class="mb-3">
      <select class="form-select product-quantity" aria-label="Quantité pour ${product.name}">
      ${productQuantity}
      </select>
      </form>
      <p class="font-weight-light mb-1">Description</p>
      <p class="card-text">${product.description}</p>
      <div class="d-grid gap-2 d-lg-block">
      <a href="panier.html" class="btn btn-info shadow-sm mr-sm-4"><i class="fas fa-cart-arrow-down mr-2"></i>Ajouter au panier</a>
      <a href="index.html" class="btn btn-dark shadow-sm"><i class="fas fa-shopping-basket mr-2"></i>Continuer vos achats</a>
      </div>
      </div>
      </div>
      </aside>`;
//Insertion du code HTML avec la méthode inner.HTML
        let elt = document.getElementById("product");
        elt.innerHTML = productCard;

//Définition de la quantité par défaut à 1 avec l'attribut selected
        document.querySelector('select.product-quantity').firstElementChild.setAttribute('selected', 'selected');

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
