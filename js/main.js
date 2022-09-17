let cartPhone = [];
function dom(element) {
    return document.querySelector(element);
}
getProducts();
function getProducts(searchType) {
    getApiProducts(searchType)
        .then((respone) => {
            let productList = respone.data.map((product) => {
                return new Product(
                    product.id,
                    product.name,
                    product.price,
                    product.screen,
                    product.backCamera,
                    product.frontCamera,
                    product.image,
                    product.description,
                    product.type,
                );
            });
            display(productList);
        })
        .catch((error) => {
            console.log(error);
        })
}
function display(products) {
    let output = products.reduce((result, product) => {
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
                <button class="btn-add" data-id ="${product.id}">Add cart</button>
            </div>
        </div>
        `
    }, "")
    dom("#products").innerHTML = output;
}
function displayListPhone(cartPhone) {
    let output = cartPhone.reduce((result, product) => {
        return result + `
            <tr>
                <td>
                    <img src="${product.image}" width="60px" height="60px">
                </td>
                <td class= "phoneName">${product.name}</td>
                <td>
                    <button onclick = "decrease()"><i class="fa-solid fa-angle-left"></i></button>
                    <span >1</span>
                    <button onclick = "increase()"><i class="fa-solid fa-angle-right"></i></button>
                </td>
                <td>$${product.price}</td>
                 <td>
                    <button class ="btn-PhoneTrash" onclick ="delete()">
                        <i class="fa-solid fa-trash"></i>
                    </button>
                </td>
            </tr>
        `
    }, "")
    dom("#cart-item").innerHTML = output;
}
function searchProduct() {
    let items = dom("#chooseProducts").value
    getProducts(items);
}
dom("#products").addEventListener("click", (e) => {
    let idProduct = e.target.getAttribute("data-id");
    if (!idProduct) {
        return false;
    }
    getApiProductById(idProduct)
        .then((respone) => {
            let smartPhone = respone.data.map((product) => {
                return new Product(
                    product.id,
                    product.name,
                    product.price,
                    product.screen,
                    product.backCamera,
                    product.frontCamera,
                    product.image,
                    product.description,
                    product.type,

                );
            });
            // let ac = cartPhone.filter((phone) => phone.id === smartPhone[0].id)
            // console.log(ac);
            // for (let i = 0; i < cartPhone.length; i++) {
            //     if (cartPhone[i].id === smartPhone[0].id) {
            //         console.log("có");
            //     }
            // }
            cartPhone.push(smartPhone[0]);
            console.log(cartPhone);
            if (cartPhone === []) {
                dom(".text").style.display = "block"
            } else {
                dom(".text").style.display = "none"
                dom("#number").innerHTML = cartPhone.length;
                displayListPhone(cartPhone);
            }
        })
        .catch((error) => {
            console.log(error);
        });
});
