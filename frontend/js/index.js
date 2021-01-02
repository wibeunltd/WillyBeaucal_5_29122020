

fetch('http://localhost:3000/api/cameras' , {
    method: 'GET',
}).then( data => {
    return data.json()
}).then(products => {
    console.log(products)

    let myHTML = "" ;
    products.forEach( product => {
        console.log(product.name)
        console.log(product.price)
        myHTML += `<h2>${product.name}</h2><p>${product.price}</p>`;
    })

    console.log(myHTML);

    let elt = document.getElementById('test');
    elt.innerHTML = myHTML;

})