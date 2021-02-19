// Récupération de l'URL et de l'id produit
const urlProduct = document.location.search;
const idProduct = new URLSearchParams(urlProduct).get("id");
const apiUrl = "http://localhost:3000/api/teddies/" + idProduct;
//console.group('URL & ID Produit'); console.log('URL :', urlProduct); console.log('ID :', idProduct); console.log('URL API :', apiUrl); console.groupEnd('URL & ID Produit');

//Fonction asynchrone getProduct via la méthode fetch, récupère le produit
const getProduct = async function () {
  try {
    let response = await fetch(apiUrl);
    if (response.ok) {

// Réponse positive, récupération du produit
      let product = await response.json();

//Utilisation de la fonction formatPrice pour formatage monétaire du prix 
      let price = formatPrice(product.price);

// Création de la carte produit     
      let productCard = "";
      document.querySelector("h1").textContent = "Découvrez " + product.name + " !";

//Gestion des couleurs du produit
      const colors = product.colors;
      // console.group('Produit et Couleurs'); console.log('Produit :', product); console.log('Couleurs :', colors); console.groupEnd('Produit et Couleurs');
      let colorValueProductCard = "";
      colors.forEach((colorValue, index) => {
        colorValueProductCard +=
        `<option value="${colorValue}">${colorValue}</option>`
      });

//Création du code HTML
      productCard =
      `<div class="col-12 col-lg-7">
      <img class="border-light shadow img-fluid" src="${product.imageUrl}" alt="Ours en peluche ${product.name}">
      <div class="card-img-overlay text-right mr-3">
      <a class="btn btn-dark btn-wishlist">Ajouter à ma wishlist<i class="far fa-heart ml-2"></i></a>
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
      <select class="form-select product-color" aria-label="Couleurs disponibles pour ${product.name}">
      <option selected disabled>Merci de choisir une couleur...</option>
      ${colorValueProductCard}
      </select>
      </form>
      <p class="font-weight-light mb-1">Quantité</p>
      <form class="mb-3" aria-label="Quantité disponible pour ${product.name}">
      <input type="number" name="product-quantity" class="product-quantity" min="1" step="1" value="1">
      </form>
      <p class="font-weight-light mb-1">Description</p>
      <p class="card-text">${product.description}</p>
      <div class="d-grid gap-2 d-lg-block">
      <a href="#" class="btn btn-info btn-shopping-cart shadow-sm mb-lg-3 mb-xl-0 mr-sm-4"><i class="fas fa-cart-arrow-down mr-2"></i>Ajouter au panier</a>
      <a href="index.html" class="btn btn-dark shadow-sm"><i class="fas fa-shopping-basket mr-2"></i>Continuer vos achats</a>
      </div>
      </div>
      </div>
      </aside>`;
//Insertion du code HTML avec la méthode inner.HTML
        let elt = document.getElementById("product");
        elt.innerHTML = productCard;

//Enregistrement du produit dans le panier - LocalStorage
  
  //1-Clic sur le bouton ajouter au panier
        let shoppingCart = document.querySelector('.btn-shopping-cart');
        shoppingCart.addEventListener('click', function () {
  
  //2-Récupération de la couleur choisie et de la quantité
        let selectedColor = document.querySelector(".product-color").value;
        let selectedQuantity = Number(document.querySelector('.product-quantity').value);
        // console.group('Couleurs et Quantité'); console.log('Couleur choisie :', selectedColor); console.log('Quantité choisie :', selectedQuantity); console.groupEnd('Couleurs et Quantité');

  //4-Création du panier
          let shoppingCart = [];

          let productAdded = {
            id: product._id,
            price: price,
            color: selectedColor,
            quantity: selectedQuantity,
          }
          console.log('Produit ajouté :', productAdded)
    
    //4.1-Obligation de choisir une couleur
    if (selectedColor === "Merci de choisir une couleur...") {
      alertStatus('colorEmpty');
    
    //4.2-Si couleur choisie et localStorage vide, ajout du produit
    } else if (selectedColor != "Merci de choisir une couleur..." && localStorage.getItem('shoppingCart') === null) {     
        
       shoppingCart.push(productAdded);
       localStorage.setItem('shoppingCart', JSON.stringify(shoppingCart))
        console.log("Ajouté au panier");
    //4.3-
    } else if(localStorage.getItem('shoppingCart')) {
      shoppingCart = JSON.parse(localStorage.getItem('shoppingCart'));
      console.log(shoppingCart);

      shoppingCart.forEach((instance) => {
        console.log(instance.id , productAdded.id)
        console.log(instance.color , productAdded.color)
        if (instance.id == productAdded.id && instance.color ==  productAdded.color) {
          instance.quantity = instance.quantity + productAdded.quantity;
          console.log('ok')
        }else{
          
        }
        console.log(instance)
      })

      console.log("Ajouté au panier");
      

    }
     
    
  })

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