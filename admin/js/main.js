function dom(selector) {
    return document.querySelector(selector);
}
getProducts()
function getProducts(phoneId) {
    getApiProducts(phoneId)
        .then((respone) => {
            let phone = respone.data.map((phone) => {
                return new Product(
                    phone.id,
                    phone.name,
                    phone.price,
                    phone.screen,
                    phone.backCamera,
                    phone.frontCamera,
                    phone.image,
                    phone.description,
                    phone.type,
                );
            });
            display(phone);
        })
        .catch((error) => {
            console.log(error);
        });
}
//Hiển thị
function display(phones) {
    let html = phones.reduce((result, phone, index) => {
        return result + `
            <tr>
                <td>${index + 1}</td>
                <td>${phone.name}</td>
                <td>$${phone.price}</td>
                <td>
                <img src="${phone.image}" width = "50px" height = "50px">  
                </td>
                <td>${phone.description}</td>
                <td>
                    <button class = "btn btn-success" data-type ="update" data-id ="${phone.id}">Cập nhật</button>
                    <button class = "btn btn-danger" data-type ="delete" data-id ="${phone.id}">Xóa</button>
                </td>
            </tr>`
    }, "")
    dom("#showInfo").innerHTML = html;
}
// hàm thêm sản phẩm
function addPhone() {
    let name = dom("#name").value;
    let typeOfPhone = dom("#typeOfPhone").value;
    let price = dom("#price").value;
    let typeOfScreen = dom("#typeOfScreen").value;
    let backc = dom("#backc").value;
    let frontc = dom("#frontc").value;
    let img = dom("#img").value;
    let desc = dom("#desc").value;
    let phone = new Product(null, name, price, typeOfScreen, backc, frontc, img, desc, typeOfPhone)
    if (!validateForm()) {
        return false;
    }
    getAddProduct(phone)
        .then(() => {
            getProducts();
            deleteInfo();
        })
        .catch((error) => {
            console.log(error);
        })
}
//cập nhật sản phẩm
function update() {
    let id = dom("#id").value;
    let name = dom("#name").value;
    let typeOfPhone = dom("#typeOfPhone").value;
    let price = dom("#price").value;
    let typeOfScreen = dom("#typeOfScreen").value;
    let backc = dom("#backc").value;
    let frontc = dom("#frontc").value;
    let img = dom("#img").value;
    let desc = dom("#desc").value;
    let phone = new Product(null, name, price, typeOfScreen, backc, frontc, img, desc, typeOfPhone)
    if (!validateForm()) {
        return false;
    }
    getUpdateProduct(id, phone)
        .then(() => {
            getProducts();
            deleteInfo();
            dom("#btn-add").disabled = false;
        })
        .catch((error) => {
            console.log(error);
        })
}
//Xóa , cập nhật sản phẩm
dom("#showInfo").addEventListener("click", (evt) => {
    let phoneId = evt.target.getAttribute("data-id");
    let elementType = evt.target.getAttribute("data-type");
    if (!phoneId) {
        return false;
    }
    //xóa sản phẩm
    if (elementType === "delete") {
        getDeleteProduct(phoneId)
            .then(() => {
                getProducts()
            })
            .catch((error) => {
                console.log(error);
            })
    }
    //fill thông tin lên ô inputs
    if (elementType === "update") {
        getApiProductById(phoneId)
            .then((respone) => {
                let phone = respone.data
                dom("#id").value = phone.id
                dom("#name").value = phone.name
                dom("#typeOfPhone").value = phone.type
                dom("#price").value = phone.price
                dom("#typeOfScreen").value = phone.screen
                dom("#backc").value = phone.backCamera
                dom("#frontc").value = phone.frontCamera
                dom("#img").value = phone.image
                dom("#desc").value = phone.description;
                dom("#btn-add").disabled = true;
            })
            .catch((error) => {
                console.log(error);
            })
    }
})
//xóa thông tin trên ô input
function deleteInfo() {
    dom("#id").value = "";
    dom("#name").value = "";
    dom("#typeOfPhone").value = "";
    dom("#price").value = "";
    dom("#typeOfScreen").value = "";
    dom("#backc").value = "";
    dom("#frontc").value = "";
    dom("#img").value = "";
    dom("#desc").value = "";
}

function validateForm() {
    // đặt cờ hiệu, mặc định ban đầu xem như form hợp lệ
    let isValid = true;
    isValid = validateType() &
        validateName() &
        validatePrice() &
        validateBackCamera() &
        validateFrontCamera() &
        validatePicture() &
        validateDescription();
    if (!isValid) {
        // alert("Form không hợp lệ");
        return false;
    }
    return true;
}
function validateType() {
    let type = dom("#typeOfPhone").value;
    let spanEL = dom("#spanType");
    if (!type) {
        spanEL.innerHTML = "Chọn loại điện thoại"
        return false;
    }
    spanEL.innerHTML = "";
    return true;
}
function validateName() {
    let name = dom("#name").value;
    let spanEL = dom("#spanName");
    if (!name) {
        spanEL.innerHTML = "Không được để trống"
        return false;
    }
    spanEL.innerHTML = "";
    return true;
}
function validatePrice() {
    let price = dom("#price").value;
    let spanEL = dom("#spanPrice");
    if (!price) {
        spanEL.innerHTML = "Không được để trống"
        return false;
    }
    spanEL.innerHTML = "";
    return true;
}
function validateScreen() {
    let screen = dom("#typeOfScreen").value;
    let spanEL = dom("#spanScreen");
    if (!screen) {
        spanEL.innerHTML = "Không được để trống"
        return false;
    }
    spanEL.innerHTML = "";
    return true;
}
function validateBackCamera() {
    let backCamera = dom("#backc").value;
    let spanEL = dom("#spanBackC");
    if (!backCamera) {
        spanEL.innerHTML = "Không được để trống"
        return false;
    }
    spanEL.innerHTML = "";
    return true;
}
function validateFrontCamera() {
    let frontCamera = dom("#frontc").value;
    let spanEL = dom("#spanFrontC");
    if (!frontCamera) {
        spanEL.innerHTML = "Không được để trống"
        return false;
    }
    spanEL.innerHTML = "";
    return true;
}
function validatePicture() {
    let picture = dom("#img").value;
    let spanEL = dom("#spanPicture");
    if (!picture) {
        spanEL.innerHTML = "Không được để trống"
        return false;
    }
    spanEL.innerHTML = "";
    return true;
}
function validateDescription() {
    let description = dom("#desc").value;
    let spanEL = dom("#spanDesc");
    if (!description) {
        spanEL.innerHTML = "Không được để trống"
        return false;
    }
    spanEL.innerHTML = "";
    return true;
}



















