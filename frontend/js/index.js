/* 
Récupération avec la méthode Fetch
Création d'une constante nommée qui contiendra l'url api
Fonction asynchrone car on doit attendre la récupération des données via l'api
*/
const apiUrl = "http://localhost:3000/api/teddies";

const getTeddies = async function () {
  try {
    let response = await fetch(apiUrl);
    if (response.ok) {
      let products = await response.json();
      console.log(products);
      products.forEach((product) => {
        console.log(product);
      });
    } else {
      console.error(
        "Une erreur " + response.status + " a été retournée par le serveur."
      );
    }
  } catch (e) {
    console.log(e);
  }

  //Test ajout d'informations
};

getTeddies();
