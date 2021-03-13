//Récupération du localStorage
let order = JSON.parse(localStorage.getItem('order'));
let info = JSON.parse(localStorage.getItem('additionalInfo'));

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

    //Adresse
let clientCity = document.querySelector('.client-city');
clientCity.innerHTML = info.zip + ' ' + order.contact.city;

let clientName = document.querySelector('.client-name');
clientName.innerHTML = order.contact.lastName + ' ' + order.contact.firstName;

// Gestion de la date
let date1 = new Date();

let dateLocale = date1.toLocaleString('fr-FR',{
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
});

let hourLocale = date1.toLocaleString('fr-FR', {
    hour: 'numeric',
    minute: 'numeric',
});

let date = document.querySelector('.date-locale');
date.innerHTML = dateLocale + ' à ' + hourLocale;

cartTotalItems();