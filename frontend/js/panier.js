/* Si panier vide affichage panier vide localStorage === null

localStorage.getItem //retourne value d'une clé
localStorage.setItem // stocker clé/valeur
localStorage.clear // efface toutes les paires clé/valeur
localStorage.key(index) //retourne la clé stockée par l'index

Si localStorage # vide afficher contenu nom produit- prix - photo & total */

// Contenu jumbotron si panier vide
let jumbotron = document.querySelector('.jumbotron');
let emptyInfo =
`<h1 class="display-4 font-weight-bold">Votre panier !</h1>
<p class="lead">Oups, il semblerait que votre panier soit vide. En manque d'inspiration ?</p>
<a href="index.html" class="btn btn-outline-success" type="button">Trouver des idées</a>`
let emptyInfoPic = document.createElement('div');
emptyInfoPic.classList.add('text-center');
emptyInfoPic.innerHTML = `<img src="img/panier-vide.gif" alt="Animation OVNI aspirant panier vide" class="img-fluid">`

// Contenu jumbotron si panier possède du contenu
let fullInfo =
`<h1 class="display-4 font-weight-bold">Votre panier !</h1>
<p class="lead">Il est bon d'avoir vos oeufs dans le même panier tant que vous contrôlez ce qu'il advient de ce panier.</p>`


// Vérification de l'état du panier et affichage en fonction de celui-ci
if (localStorage.getItem('shoppingCart') === null) {
    console.log('panier vide');
    jumbotron.innerHTML = emptyInfo;
    jumbotron.appendChild(emptyInfoPic);
    
} else {
    console.log('panier avec contenu')
    jumbotron.innerHTML = fullInfo;
}

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
