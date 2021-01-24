const apiUrl = "http://localhost:3000/api/teddies"; //Constante nommée apiURL, contient l'url de l'api

const getProduct = async function () { //Fonction asynchrone getProduct via la méthode fetch, récupère les produits
  try {
    let response = await fetch(apiUrl);
    if (response.ok) { // Réponse positive, récupération des produits
      let products = await response.json();
      console.log(products);
      let teddiesCards = ""; // Création des cards html
      products.forEach((product) => {
        console.log(product);
        teddiesCards +=
          `<div class="col-12 col-lg-4">
        <div class="card mb-4 mb-lg-4 border-light shadow">
          <img src="${product.imageUrl}" alt="Ours en peluche ${product.name}"/>
          <div class="card-body">
            <h2 class="card-title">${product.name}</h2>
            <p class="card-text">${product.price} €</p>
            <a href="produit.html?id=${product._id}" class="btn btn-info stretched-link"
              >Découvrir ${product.name}</a
            >
          </div>
        </div>
      </div>`;
      });
      console.log(teddiesCards);
      let elt = document.getElementById('teddies');
      elt.innerHTML = teddiesCards;

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
