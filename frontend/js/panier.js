// Contenu jumbotron si panier vide
    let jumbotron = document.querySelector('.jumbotron');
    let emptyInfo =
    `<h1 class="display-4 font-weight-bold">Votre panier !</h1>
    <p class="lead">Oups, il semblerait que votre panier soit vide. En manque d'inspiration ?</p>
    <a href="index.html" class="btn btn-outline-success" type="button">Trouver des idées</a>`
    let emptyInfoPic = document.createElement('div');
    emptyInfoPic.classList.add('text-center', 'mt-2');
    emptyInfoPic.innerHTML = `<img src="img/panier-vide.gif" alt="Animation OVNI aspirant panier vide" class="img-fluid">`;

// Contenu jumbotron si panier possède du contenu
    let fullInfo =
    `<h1 class="display-4 font-weight-bold">Votre panier !</h1>
    <p class="lead">Il est bon d'avoir vos oeufs dans le même panier tant que vous contrôlez ce qu'il advient de ce panier.</p>`;

// Vérification de l'état du panier et affichage en fonction de celui-ci
    let cartSection = document.querySelector('.full-cart');
    if (localStorage.getItem('shoppingCart') < 1) {
        jumbotron.innerHTML = emptyInfo;
        jumbotron.appendChild(emptyInfoPic);
        cartSection.setAttribute('hidden', 'hidden');
        
    } else {
        jumbotron.innerHTML = fullInfo;
        cartSection.removeAttribute('hidden');
    };

// Récupération du panier
    shoppingCart = JSON.parse(localStorage.getItem('shoppingCart'));

// Création du contenu du panier et définition des variables pour les prix
    let itemsCart = "";
    let cartTotalPrice = 0;
    let itemCartTotalPrice = 0;
    let deliveryCosts = 0;
    let priceToPay = 0;
    let discountCodePrice = 0;
    let validDiscountCodePrice = 0.1;
    const priceForFreeDelivery = 69;
    const taxeDeliveryCosts = 6;
    const freeDeliveryCosts = 0;
    const discountCode = "ORI10";
      
    if (shoppingCart && shoppingCart.length >= 1) {
    shoppingCart.forEach(itemCart =>{

    // Calcul des prix panier

      // Prix d'un produit selon sa quantité
      itemCartTotalPrice = itemCart.quantity * parseFloat(itemCart.price);
      let itemCartTotalPriceFormat = formatPrice(itemCartTotalPrice * 100);

      // Prix total des produits
      cartTotalPrice += itemCartTotalPrice;

      //Prix des frais de livraison
      if (cartTotalPrice < priceForFreeDelivery) {
        deliveryCosts = taxeDeliveryCosts;
      } else if (cartTotalPrice >= priceForFreeDelivery) {
        deliveryCosts = freeDeliveryCosts;
      };

      // Gestion du code de réduction
      let eltDiscountCode = document.querySelector('.help-discount-code');
      let reduceCode = document.querySelector('.discount-code');
      reduceCode.innerText = formatPrice(discountCodePrice);

      eltDiscountCode.addEventListener('click', function () {
        let eltInputCode = document.getElementById('discountCode').value;
        if (eltInputCode !== discountCode) {
          eltDiscountCode.classList.remove('btn-info');
          eltDiscountCode.classList.add('btn-danger');
          eltDiscountCode.innerText = "Le code saisi n'est pas valide";
          setTimeout(function() {
            eltDiscountCode.classList.remove('btn-danger');
            eltDiscountCode.classList.add('btn-info');
            eltDiscountCode.innerText = 'Appliquer la réduction';
          }, 2000);
            discountCodePrice = discountCodePrice;
        } else if (eltInputCode == discountCode) {
          eltDiscountCode.classList.remove('btn-info');
          eltDiscountCode.classList.add('btn-success');
          eltDiscountCode.innerText = "La réduction a été appliquée";
          discountCodePrice = validDiscountCodePrice;
        };

        reduceCode.innerText = "- " + formatPrice(((cartTotalPrice + deliveryCosts) * discountCodePrice) * 100);
        priceToPay = (cartTotalPrice + deliveryCosts) - ((cartTotalPrice + deliveryCosts) * discountCodePrice);
        finalPrice.innerText = formatPrice(priceToPay * 100);
      });

      // Montant total du panier
      priceToPay = (cartTotalPrice + deliveryCosts) - ((cartTotalPrice + deliveryCosts) * discountCodePrice);  
    
    // Création du code HTML
    itemsCart +=
      `<div class="row mb-3 mt-3">
      <div class="col-md-5 col-lg-3 col-xl-3 pr-0">
      <div class="mb-3 mb-md-0">
      <img class="img-fluid img-thumbnail w-75" src="${itemCart.imageUrl}" alt="Ours en peluche ${itemCart.name}">
      </div>
      </div>
      <div class="col-md-7 col-lg-9 col-xl-9 pl-0">
      <div>
      <h3>${itemCart.name} <span class="btn btn-light btn-sm">( ${itemCart.quantity} x ${itemCart.price} )</span></h3>
      <div class="d-flex justify-content-between align-items-center">
      <p class="mb-0 text-secondary text-uppercase small d-inline">ID : ${itemCart.id}</p>
      <p class="mb-0 font-weight-bold">${itemCartTotalPriceFormat}</p>
      </div>
      <div class="d-flex justify-content-between align-items-center">
      <div>
      <p class="mr-3 mb-2 text-uppercase small d-inline">Couleur : ${itemCart.color}</p>
      <p class="mb-2 text-uppercase small d-inline">Quantité : ${itemCart.quantity}</p>
      </div>
      <a href="#!" type="button" class="text-info small text-uppercase"><i class="fas fa-trash-alt text-info mr-1"></i> Supprimer</a>
      </div>
      </div>
      </div>
      </div>`;
      //console.log(itemsCart);
      //console.log(typeof itemsCart);

});
    };

//Insertion du code HTML
    //Insertion des produits sélectionnés
    let elt = document.querySelector('.card-header');
    elt.insertAdjacentHTML('afterend', itemsCart);
    let eltInfo = document.querySelector('.infoCart');

    //Insertion partie montant
    let totalCart = document.querySelector('.total-cart');
    totalCart.innerText = formatPrice(cartTotalPrice * 100);

    let deliveryPrice = document.querySelector('.delivery-price');
    deliveryPrice.innerText = formatPrice(deliveryCosts * 100);

    let finalPrice = document.querySelector('.final-price');
    finalPrice.innerText = formatPrice(priceToPay * 100);


    

/* // Regex
let verifName = /^[a-zA-ZéèîïÉÈÎÏ][a-zéèêàçîï]+([-'\s][a-zA-ZéèîïÉÈÎÏ][a-zéèêàçîï]+)?$/;
let verifMail = /[A-Za-z0-9](([_\.\-]?[a-zA-Z0-9]+)*)@([A-Za-z0-9]+)(([_\.\-]?[a-zA-Z0-9]+)*)\.([A-Za-z]{2,})/;
let verifAdresse = /^[^@&"()!_$*€£`%+=\/;?#]+$/;

// Inputs de l'utilisateur
let formNom = document.getElementById("formNom").value;
let formPrenom = document.getElementById("formPrenom").value;
let formMail = document.getElementById("formMail").value;
let formAdresse = document.getElementById("formAdresse").value;
let formVille = document.getElementById("formVille").value;

// Vérifier les inputs de l'utilisateur
if (checkString.test(formNom) === false) {
  console.log("incorrect");
  return false;
} else if (checkString.test(formPrenom) === false) {
  console.log("incorrect");
  return false;
} else if (checkMail.test(formMail) === false) {
  console.log("incorrect");
  return false;
} else if (checkAdresse.test(formAdresse) === false) {
  console.log("incorrect");
  return false;
} else if (checkAdresse.test(formVille) === false) {
  console.log("incorrect");
  return false;
} else {
  return true;
} */

cartTotalItems ();