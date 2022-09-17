let cartPhone = new Cart();
let arrListCart = [];
function dom(element) {
  return document.querySelector(element);
}
// lấy dữ liệu từ axios
getProducts();
function getProducts(searchType) {
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
          product.discription,
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
        product.discription,
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
          product.discription,
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
dom("#modal-close").addEventListener("click", (e) => {
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
  dom("#money").innerHTML = totalPrice.toLocaleString();
  dom("#moneyPay").innerHTML = totalPrice.toLocaleString();
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
}
//=============================================================
// A. Clean Cart
dom("#btn-garbage").addEventListener("click", () => {
  cartPhone.cart.length = 0;
  displayListPhone(cartPhone);
  saveLocalStorage(cartPhone);
});

// B. Form thanh toán
dom("#btn-purchase").addEventListener("click", () => {
  if (cartPhone.cart.length === 0) {
    false;
  } else {
    dom("#pay-Modal").style.display = "block";
    displayPay(cartPhone);
  }
});
function displayPay(cartPhone) {
  const html = cartPhone.cart.reduce((result, product) => {
    return (
      result +
      `
      <div>
    <tr>
    <td><img src="${product.image}" width="40px" height="40px"></td>
    <td>${product.name}</td>
    <td>$${product.price} x ${product.quantity} = </td>
    <td>${product.quantity * product.price}</td>
    </tr>
    </div>
    `
    );
  }, "");
  dom("#showCart").innerHTML = html;
}
