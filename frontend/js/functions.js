//Formatage monétaire du prix des produits
function formatPrice(productPrice) {
    return Intl.NumberFormat("fr-FR", {style: "currency", currency: "EUR", minimumFractionDigits: 2,}).format(productPrice / 100);
}

//Fonction Alert
function alertFade() {
    document.querySelector('.alert-status').removeAttribute('hidden');
      setTimeout(function() {
        document.querySelector('.alert-status').setAttribute('hidden', 'hidden')
      }, 5000)
}

function alertStatus(alertType) {
    if (alertType === 'colorEmpty'){
        document.querySelector('.alert-status').classList.remove('alert-success')
        document.querySelector('.alert-status').classList.add('alert-danger')
        document.querySelector('.alert-status').innerHTML = `<strong>Pour ajouter le produit au panier, merci de choisir une couleur !</strong> La plus belle couleur reste encore celle que l'on choisit.`;
        alertFade();
    } else if (alertType === 'addToCart') {
        document.querySelector('.alert-status').classList.remove('alert-danger')
        document.querySelector('.alert-status').classList.add('alert-success')
        document.querySelector('.alert-status').innerHTML = `<strong>Le produit a bien été rajouté au panier !</strong> Les autres jouets vont et viennent, mais un nounours est là pour la vie.`;
        alertFade();
    }     
};

// Nombre de produit(s) présent dans le panier
function cartTotalItems () {
    let totalItems = 0;
    let totalItemsDisplay = document.querySelector('.total-items');
    shoppingCart = JSON.parse(localStorage.getItem('shoppingCart'));
    if (shoppingCart) {
        shoppingCart.map(item => {
            totalItems += item.quantity;
        });
    };
    totalItemsDisplay.innerText = totalItems;
    return totalItems;
  };