function getApiProducts() {
    return axios({
        url: "https://6313479ba8d3f673ffc7c497.mockapi.io/products",
        method: "GET",
    })
}
function getAddProduct(phone) {
    return axios({
        url: "https://6313479ba8d3f673ffc7c497.mockapi.io/products",
        method: "POST",
        data: phone,
    })
}
function getDeleteProduct(phoneId) {
    return axios({
        url: `https://6313479ba8d3f673ffc7c497.mockapi.io/products/${phoneId}`,
        method: "DELETE"
    })
}
function getApiProductById(phoneId) {
    return axios({
        url: `https://6313479ba8d3f673ffc7c497.mockapi.io/products/${phoneId}`,
        method: "GET",
    })
}
function getUpdateProduct(phoneId, phone) {
    return axios({
        url: `https://6313479ba8d3f673ffc7c497.mockapi.io/products/${phoneId}`,
        method: "PUT",
        data: phone
    })
}