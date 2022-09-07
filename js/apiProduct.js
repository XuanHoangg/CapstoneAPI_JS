function getApiProducts(searchType) {
    return axios({
        url: "https://6313479ba8d3f673ffc7c497.mockapi.io/products",
        method: "GET",
        params: {
            type: searchType,
        }
    });
};
function getApiProductById(searchId) {
    return axios({
        url: "https://6313479ba8d3f673ffc7c497.mockapi.io/products/",
        method: "GET",
        params: {
            id: searchId,
        }
    })
}