function dom(element) {
    return document.querySelector(element);
}
getProducts();
function getProducts(searchType) {
    getApiProducts(searchType)
        .then((respone) => {
            console.log(respone.data);
            let products = respone.data.map((product) => {
                return new Product(
                    product.name,
                    product.price,
                    product.screen,
                    product.backCamera,
                    product.frontCamera,
                    product.image,
                    product.discription,
                    product.type,
                );
            });
            display(products);
        })
        .catch((error) => {
            console.log(error);
        })
}
function display(products) {
    let output = products.reduce((result, product, index) => {
        return result + `
        <div class="card">
            <div class="card-header">
                <img src="${product.image}" class="image">  
            </div>
            <div class="card-body">    
                <div class="name">${product.name}</div>
                <div class="screen">Màn hình ${product.screen}</div>
                <div class="backCamera">Cam sau ${product.backCamera}</div>
                <div class="frontCamera">Cam trước ${product.frontCamera}</div>
                <div class="description">${product.description}</div>
            </div>
            <div class="card-footer">
                <div class="price">$${product.price}</div>
                <button class="btn-add">Add cart</button>
            </div>
        </div>
        `
    }, "")
    dom("#products").innerHTML = output;
}

function searchProduct() {
    let items = dom("#chooseProducts").value
    getProducts(items);
}























