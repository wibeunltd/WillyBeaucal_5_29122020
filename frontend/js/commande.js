// Contenu si aucune commande
let invalidOrdered = document.querySelector('.invalid-ordered');
let contentInvalidOrdered = document.querySelector('.content-invalid-ordered');
let emptyOrdered =
`<h1 class="display-4 font-weight-bold">Oups !</h1>
<p class="lead">Il semblerait que vous soyez ici par hasard. Pas de panique, on s'occupe de vous rediriger.</p>`
let emptyOrderedPic = document.createElement('div');
emptyOrderedPic.classList.add('text-center', 'mt-2');
emptyOrderedPic.innerHTML = `<img src="img/empty-shop.png" alt="Panier triste" class="img-fluid">`;

//Récupération du localStorage
let order = JSON.parse(localStorage.getItem('order'));
let info = JSON.parse(localStorage.getItem('additionalInfo'));

// Affichage de la page commande
let validOrdered = document.querySelector('.valid-ordered');
if (localStorage.getItem('order') < 1) {
    validOrdered.classList.add('d-none');
    contentInvalidOrdered.innerHTML = emptyOrdered;
    contentInvalidOrdered.appendChild(emptyOrderedPic);
    setTimeout(function backToIndex() {
        window.location.href = 'index.html';
      }, 5000);
    
} else {
    invalidOrdered.classList.add('d-none');

    //Affichage des informations
    //Nom - Prénom
    let clientFirstName = document.querySelector('.client-firstname');
    clientFirstName.innerHTML = 'Merci ' + order.contact.firstName + ',';

    //Numéro de commande
    let orderId = document.querySelector('.order-id');
    orderId.innerHTML = order.orderId;

    //Total commande
    let totalOrder = document.querySelector('.total-order');
    totalOrder.innerHTML = info.total;

    //Mail
    let clientMail = document.querySelectorAll('.client-mail');
    clientMail.forEach(element => {
        element.innerHTML += order.contact.email;
    });

    //Phone
    let clientPhone = document.querySelectorAll('.client-phone');
    clientPhone.forEach(element => {
        element.innerHTML += info.phone;
    });

    //Adresse
    let clientAddress = document.querySelector('.client-address');
    clientAddress.innerHTML = order.contact.address;

    //Ville
    let clientCity = document.querySelector('.client-city');
    clientCity.innerHTML = info.zip + ' ' + order.contact.city;

    // Nom et prénom
    let clientName = document.querySelector('.client-name');
    clientName.innerHTML = order.contact.lastName + ' ' + order.contact.firstName;

    // Gestion de la date
    let date1 = new Date();

    // Date format français
    let dateLocale = date1.toLocaleString('fr-FR',{
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

    // Heure format français
    let hourLocale = date1.toLocaleString('fr-FR', {
        hour: 'numeric',
        minute: 'numeric',
    });

    // Affichage date et heure de commande
    let date = document.querySelector('.date-locale');
    date.innerHTML = dateLocale + ' à ' + hourLocale;

    setTimeout(function orderValided() {
        localStorage.clear();
        window.location.href = 'index.html';
      }, 45000);
};

cartTotalItems();