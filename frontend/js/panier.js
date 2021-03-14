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
        cartSection.classList.add('d-none');
        jumbotron.innerHTML = emptyInfo;
        jumbotron.appendChild(emptyInfoPic);
        
    } else {
        jumbotron.innerHTML = fullInfo;
        cartSection.classList.remove('d-none');
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
    let priceForFreeDelivery = 69;
    let taxeDeliveryCosts = 6;
    let freeDeliveryCosts = 0;
    let discountCode = "ORI10";
      
    if (shoppingCart && shoppingCart.length >= 1) {
    shoppingCart.forEach(itemCart =>{

    // Calcul des prix panier
      // Prix d'un produit selon sa quantité
      itemCartTotalPrice = itemCart.quantity * parseFloat(itemCart.price);
      let itemCartTotalPriceFormat = formatPrice(itemCartTotalPrice * 100);
    
      // Prix total des produits
      cartTotalPrice += itemCartTotalPrice;

      // Prix des frais de livraison
      if (cartTotalPrice < priceForFreeDelivery) {
        deliveryCosts = taxeDeliveryCosts;
      } else if (cartTotalPrice >= priceForFreeDelivery) {
        deliveryCosts = freeDeliveryCosts;
      };

      // Gestion du code de réduction
      let eltDiscountCode = document.querySelector('.help-discount-code');
      let reduceCode = document.querySelector('.discount-code');
      reduceCode.innerText = formatPrice(discountCodePrice);

        // Vérification du code saisi
      eltDiscountCode.addEventListener('click', function discount() {
        let eltInputCode = document.getElementById('discountCode').value;

        // Code saisi incorrect
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

        // Code saisi correct
        } else if (eltInputCode == discountCode) {
          eltDiscountCode.classList.remove('btn-info');
          eltDiscountCode.classList.add('btn-success');
          eltDiscountCode.innerText = "La réduction a été appliquée";
          discountCodePrice = validDiscountCodePrice;
        };

        // Affichage du montant de la réduction et re-calcul montant total
        reduceCode.innerText = "- " + formatPrice(((cartTotalPrice + deliveryCosts) * discountCodePrice) * 100);
        toPay();
      });

      // Montant total du panier
      function toPay() {
        let finalPrice = document.querySelector('.final-price');
        priceToPay = (cartTotalPrice + deliveryCosts) - ((cartTotalPrice + deliveryCosts) * discountCodePrice);
        finalPrice.innerText = formatPrice(priceToPay * 100);
      };
      toPay();
    
      // Création du code HTML
      itemsCart +=
        `<div class="row mb-3 mt-3">
        <div class="col-md-5 col-lg-3 col-xl-3 pr-0">
        <div class="mb-3 mb-md-0">
        <a href="produit.html?id=${itemCart.id}"><img class="img-fluid img-thumbnail w-75" src="${itemCart.imageUrl}" alt="Ours en peluche ${itemCart.name}"></a>
        </div>
        </div>
        <div class="col-md-7 col-lg-9 col-xl-9 pl-0">
        <div>
        <h3><a class="text-info text-decoration-none" href="produit.html?id=${itemCart.id}">${itemCart.name}</a> <span class="btn btn-light btn-sm">( ${itemCart.quantity} x ${itemCart.price} )</span></h3>
        <div class="d-flex justify-content-between align-items-center">
        <p class="mb-0 text-secondary text-uppercase small d-inline">ID : ${itemCart.id}</p>
        </div>
        <div class="d-flex justify-content-between align-items-center">
        <div>
        <p class="mr-3 mb-2 text-uppercase small d-inline">Couleur : ${itemCart.color}</p>
        <p class="mb-2 text-uppercase small d-inline">Quantité : ${itemCart.quantity}</p>
        </div>
        <p class="mb-0 font-weight-bold">${itemCartTotalPriceFormat}</p>
        </div>
        </div>
        </div>
        </div>`;
    });
  };

// Insertion du code HTML
    // Insertion des produits sélectionnés
    let elt = document.querySelector('.card-header');
    elt.insertAdjacentHTML('afterend', itemsCart);
    let eltInfo = document.querySelector('.infoCart');

    // Insertion des montants
    let totalCart = document.querySelector('.total-cart');
    totalCart.innerText = formatPrice(cartTotalPrice * 100);

    let deliveryPrice = document.querySelector('.delivery-price');
    deliveryPrice.innerText = formatPrice(deliveryCosts * 100);

// Vider le panier
    let deleteCartButton = document.querySelector('.delete-cart');
    deleteCartButton.addEventListener('click', function clearCart() {
      localStorage.clear();
      window.location.reload();
    });

// Validation du formulaire
    // Définition des champs du formulaire
    let lastName = document.getElementById('lastname');
    let firstName = document.getElementById('firstname');
    let address = document.getElementById('address');
    let zip = document.getElementById('zip');
    let city = document.getElementById('city');
    let mail = document.getElementById('mail');
    let phone = document.getElementById('phone');
    let termsOfUse = document.getElementById('gridCheck');
    let checkTermsOfUse = document.querySelector('.check-form-status');    

    // RegEx
    let nameRegEx = /^[A-Za-zàçéèêëîïôöûüÿÀÉÈËÎÏÔÖÛÜ]+([-'\s][A-Za-zàçéèêëîïôöûüÿÀÉÈËÎÏÔÖÛÜ]+)?$/;
    let addressRegEx = /^[^&~"#{([|`_\\\^@\])}=+°¨$£¤%!§:;.?<>/*]+$/;
    let zipRegEx = /^\d{5}$/;
    let cityRegEx = /^[A-Za-zàçéèêëîïôöûüÿÀÉÈËÎÏÔÖÛÜ]+(([-'\s][A-Za-zàçéèêëîïôöûüÿÀÉÈËÎÏÔÖÛÜ]+)+)?$/;
    let mailRegEx = /^[A-Za-z0-9](([_\.\-]?[a-zA-Z0-9]+)+)@([A-Za-z0-9]+)(([\-]?[a-zA-Z0-9]+)+)\.([A-Za-z]{2,4})$/;
    let phoneRegEX = /^(((\+)33|0)([-.\s]?)[1-9](([-.\s]?)(\d{2})){4})$|(((\+)33|0)([-.\s]?)(([-.\s]?)(\d{3})){3})$/; 

    // Fonction de validation des inputs
    function validInputForm (elt, regEx) {
      if (regEx.test(elt.value) === true) {
          elt.nextElementSibling.setAttribute('hidden', 'hidden');
          elt.classList.remove('is-invalid');
          elt.classList.add('is-valid');
          return true;
      } else {
          elt.classList.remove('is-valid');
          elt.classList.add('is-invalid');
          elt.nextElementSibling.removeAttribute('hidden');
          return false;
      };
    }

    // Vérification au clic du bouton "Valider votre commande"
    let formValidButton = document.querySelector('.form-validation');
    formValidButton.addEventListener('click', function formValidation() {
      let resLastName = validInputForm(lastName, nameRegEx);
      let resFirstName = validInputForm(firstName, nameRegEx);
      let resAddress = validInputForm(address, addressRegEx);
      let resZip = validInputForm(zip, zipRegEx);
      let resCity = validInputForm(city, cityRegEx);
      let resMail = validInputForm(mail, mailRegEx);
      let resPhone = validInputForm(phone, phoneRegEX);
      let resTermsOfUse = termsOfUse.checked;
    
    // Vérification de l'acceptation des CGU
    if (!resTermsOfUse) {
      checkTermsOfUse.removeAttribute('hidden');
    } else {
      checkTermsOfUse.setAttribute('hidden', 'hidden');
    };
    
    // Vérification des champs formulaires
    if (resLastName && resFirstName && resAddress && resZip && resCity && resMail && resPhone && resTermsOfUse) {
      // Création du contact
      let contact = {
        firstName: firstName.value,
        lastName: lastName.value,
        address: address.value,
        city: city.value,
        email: mail.value,
      };

      // Création des informations contact non obligatoires
      let contactMore = {
        zip: zip.value,
        phone: phone.value,
        total: formatPrice(priceToPay * 100),
      };

      // Création produits
      let products = [];
      shoppingCart = JSON.parse(localStorage.getItem('shoppingCart'));
      shoppingCart.forEach(product => {
        products.push(product.id);
      });

      // Création du corps de la demande
      let confirmedOrder = {
        contact,
        products,
      };

      // Fonction d'envoi du corps de la demande et retour serveur
      const getOrder = async function() {
        try {
          let resCart = await fetch("http://localhost:3000/api/teddies/order", {
          headers: {
            'Content-Type': 'application/json',
          },
          method: "POST",
          body: JSON.stringify(confirmedOrder),
      });
      
      // Réponse positive
        if(resCart.ok) {
          // Création localStorage de la commande, des informations additionnelles et suppression du panier
          let order = await resCart.json();
          localStorage.setItem('order', JSON.stringify(order));
          localStorage.setItem('additionalInfo', JSON.stringify(contactMore));
          localStorage.removeItem('shoppingCart');

          // Bouton validation de commande
          formValidButton.classList.remove('btn-primary');
          formValidButton.classList.add('btn-success');
          formValidButton.innerHTML = '<span class="spinner-grow spinner-grow-sm mr-2" role="status" aria-hidden="true"></span> Validation de votre commande';
          
          // Délai d'attente avant chargement de la page commande
          setTimeout(function orderConfirmation() {
            window.location.href = 'commande.html';
          }, 3500);

      } else {
      // Réponse négative
        console.error(
          "Une erreur " + resCart.status + " a été retournée par le serveur."
        );
      }
        } catch (e) {
          console.log("Message d'erreur : ", e);
        }
      };
    getOrder();
  };
});   

cartTotalItems();