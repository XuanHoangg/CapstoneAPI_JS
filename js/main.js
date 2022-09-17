let cartPhone = new Cart();
let arrListCart = [];
function dom(element) {
    return document.querySelector(element);
}
// lấy dữ liệu từ axios
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
    getFromLocalStorage();
    getApiProducts(searchType)
        .then((respone) => {
            let productList = respone.data.map((product) => {
                return new Product(
                    product.name,
                    product.price,
                    product.screen,
                    product.backCamera,
                    product.frontCamera,
                    product.image,
                    product.description,
                    product.type,
                    product.id
                );
            });
            display(productList);
        })
        .catch((error) => {
            console.log(error);
        });
}
// hiển thị giao diện sản phẩm
function display(products) {
    let output = products.reduce((result, product) => {
        return (
            result +
            `
        <div class="card cart-item">
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
                <button class="btn-add btn btn-success" data-id ="${product.id}">Add cart</button>
            </div>
        </div>
        `
        );
    }, "");
    dom("#products").innerHTML = output;
}

// hiển thị giỏ hàng
function displayListPhone(cartPhone) {
    if (cartPhone.cart.length === 0) {
        dom(".text").style.display = "block";
    } else {
        dom(".text").style.display = "none";
    }
    let output = cartPhone.cart.reduce((result, product) => {
        return (
            result +
            `
            <tr>
                <td>
                    <img src="${product.image}" width="60px" height="60px">
                </td>
                <td class= "phoneName">${product.name}</td>
                <td>
                    <button onclick = "decrease('${product.id}')"><i class="fa-solid fa-angle-left"></i></button>
                    <span>${product.quantity}</span>
                    <button onclick = "increase('${product.id}')"><i class="fa-solid fa-angle-right"></i></button>
                </td>
                <td>$${product.price}</td>
                 <td>
                 <button class ="btn-PhoneTrash btn-danger" >
                 <i class="fa-solid fa-trash" data-id="${product.id}" data-type="delete"></i>
             </button>
                </td>
            </tr>
        `
        );
    }, "");
    dom("#cart-item").innerHTML = output;
    totalCart();
}
// Lưu dữ liệu vào localStorange
function saveLocalStorage(cartPhone) {
    localStorage.setItem("cart", JSON.stringify(cartPhone.cart));
}
function getFromLocalStorage() {
    const items = JSON.parse(localStorage.getItem("cart"));
    if (items) {
        items.forEach((product) => {
            const p = new Product(
                product.name,
                product.price,
                product.screen,
                product.backCamera,
                product.frontCamera,
                product.image,
                product.description,
                product.type,
                product.id,
                product.quantity
            );
            cartPhone.addToCart(p);
            countCartItem();
            displayListPhone(cartPhone);
        });
    }
}
//=============================================================
// 1. search
function searchProduct() {
    let items = dom("#chooseProducts").value;
    getProducts(items);
}
// 2. đếm slg sản phẩm
function countCartItem() {
    dom("#number").innerHTML = cartPhone.count();
}
// 3. Thêm sp
dom("#products").addEventListener("click", (e) => {
    // let idProduct = e.target.getAttribute("data-id");
    // if (!idProduct) {
    //     return false;
    // }
    // getApiProductById(idProduct)
    //     .then((respone) => {
    //         let smartPhone = respone.data.map((product) => {
    //             return new Product(
    //                 product.id,
    //                 product.name,
    //                 product.price,
    //                 product.screen,
    //                 product.backCamera,
    //                 product.frontCamera,
    //                 product.image,
    //                 product.description,
    //                 product.type,

    //             );
    //         });
    //         // let ac = cartPhone.filter((phone) => phone.id === smartPhone[0].id)
    //         // console.log(ac);
    //         // for (let i = 0; i < cartPhone.length; i++) {
    //         //     if (cartPhone[i].id === smartPhone[0].id) {
    //         //         console.log("có");
    //         //     }
    //         // }
    //         cartPhone.push(smartPhone[0]);
    //         console.log(cartPhone);
    //         if (cartPhone === []) {
    //             dom(".text").style.display = "block"
    //         } else {
    //             dom(".text").style.display = "none"
    //             dom("#number").innerHTML = cartPhone.length;
    //             displayListPhone(cartPhone);
    //         }
    //     })
    //     .catch((error) => {
    //         console.log(error);
    //     });
    let idProduct = e.target.getAttribute("data-id");
    if (!idProduct) {
        return false;
    }
    getApiProductById(idProduct)
        .then((respone) => {
            let smartPhone = respone.data.map((product) => {
                return new Product(
                    product.name,
                    product.price,
                    product.screen,
                    product.backCamera,
                    product.frontCamera,
                    product.image,
                    product.description,
                    product.type,
                    product.id,
                    1
                );
            });
            cartPhone.addToCart(smartPhone[0]);
            saveLocalStorage(cartPhone);

            if (cartPhone.cart.length === 0) {
                dom(".text").style.display = "block";
            } else {
                dom(".text").style.display = "none";
                dom("#number").innerHTML = cartPhone.cart.reduce(
                    (total, item) => total + item.quantity,
                    0
                );
                displayListPhone(cartPhone);
            }
        })

        .catch((error) => {
            console.log(error);
        });
});

// 4. xoá sản phẩm
dom("#cart-item").addEventListener("click", (e) => {
    console.log(e.target);
    let id = e.target.getAttribute("data-id");
    let typeEl = e.target.getAttribute("data-type");
    if (typeEl === "delete") {
        deleteProduct(id);
    }
});
function deleteProduct(productId) {
    cartPhone.cart = cartPhone.cart.filter((phone) => phone.id !== productId);
    if (cartPhone.cart.length === 0) {
        dom(".text").style.display = "block";
    } else {
        dom(".text").style.display = "none";
    }
    countCartItem();
    saveLocalStorage(cartPhone);
    displayListPhone(cartPhone);
}

// 5. tính tổng tiền giỏ hàng
function totalCart() {
    let totalPrice = cartPhone.cart.reduce((total, item) => {
        return total + item.quantity * item.price;
    }, 0);
    dom("#money").innerHTML = totalPrice;
}

// 6. tăng giảm số lượng giỏ hàng
//  + giảm
function decrease(productId) {
    cartPhone.decreaseItemFromCart(productId);
    saveLocalStorage(cartPhone);
    displayListPhone(cartPhone);
    countCartItem();

}
//  + tăng
function increase(productId) {
    cartPhone.increaseItemFromCart(productId);
    saveLocalStorage(cartPhone);
    displayListPhone(cartPhone);
    countCartItem();
    dom("#modal-container").classList.add("show");
}
//=============================================================
// A. Clean Cart
dom("#btn-garbage").addEventListener("click", () => {
    cartPhone.cart.length = 0;
    displayListPhone(cartPhone);
    saveLocalStorage(cartPhone);
});

dom("#btn-purchase").addEventListener("click", () => {
    if ((cartPhone.cart.length = 0)) {
        return false;
    } else {
        pay();
    }
});
function pay() {
    let toPay = document.getElementsByClassName("#money").innerText;
    let productNames = cartPhone.cart.map((item) => {
        return `<span>${item.quantity} x ${item.name}</span>`;
    });
    let productPrice = cartPhone.cart.map((item) => {
        return `<span>${item.quantity * item.price}</span>`;
    });
    return `
  <div class='invoice'>
    <div class='shipping-items'>
      <div class='item-names'>${productNames.join("")}</div>
      <div class='items-price'>${productPrice.join("+")}</div>
    </div>
  <hr>
    <div class='payment'>
      <em>payment</em>
      <div>
        <p>total amount to be paid:</p><span class='pay'>₹ ${toPay}</span>
      </div>
    </div>
    <div class='order'>
      <button onclick='order()' class='btn-order btn'>Order Now</button>
      <button onclick='buy(0)' class='btn-cancel btn'>Cancel</button>
    </div>
  </div>`;
}
