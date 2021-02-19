//Formatage monétaire du prix des produits
function formatPrice(productPrice) {
    return Intl.NumberFormat("fr-FR", {style: "currency", currency: "EUR", minimumFractionDigits: 2,}).format(productPrice / 100);
}

function alertFade() {
    document.querySelector('.alert-status').removeAttribute('hidden');
      setTimeout(function() {
        document.querySelector('.alert-status').setAttribute('hidden', 'hidden')
      }, 4500)
}

function alertStatus(alertType) {
    if (alertType === 'colorEmpty'){
        document.querySelector('.alert-status').classList.remove('alert-success')
        document.querySelector('.alert-status').classList.add('alert-danger')
        document.querySelector('.alert-status').innerHTML = `<strong>Merci de choisir une couleur !</strong> La plus belle couleur au monde, reste encore celle qu'on choisit.`;
        alertFade();
    } else if (alertType === 'addToCart') {
        document.querySelector('.alert-status').classList.remove('alert-danger')
        document.querySelector('.alert-status').classList.add('alert-success')
        document.querySelector('.alert-status').innerHTML = `<strong>Nobert a bien été rajouté au panier !</strong> Les autres jouets vont et viennent, mais un nounours est là pour la vie.`;
        alertFade();
    }     
}