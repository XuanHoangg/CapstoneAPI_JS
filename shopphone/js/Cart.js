class Cart {
  constructor() {
    this.cart = [];
  }

  addToCart(product) {
    const index = this.cart.findIndex((phone) => phone.id === product.id);
    if (index !== -1) {
      this.cart[index].quantity++;
    } else {
      this.cart.push(product);
    }
  }

  decreaseItemFromCart(productId) {
    const index = this.cart.findIndex((phone) => phone.id === productId);
    if (index !== -1) {
      this.cart[index].quantity--;
      if (this.cart[index].quantity === 0) {
        this.cart.splice(index, 1);
      }
    }
  }

  increaseItemFromCart(productId) {
    const index = this.cart.findIndex((phone) => phone.id === productId);

    if (index !== -1) {
      this.cart[index].quantity++;
    }
  }

  count() {
    return this.cart.reduce((total, item) => total + item.quantity, 0);
  }
}
/**
 * cartItem = {
 *  tat ca cac thuoc tinh cua product
 *  quantity: chua so luong cua product do
 * }
 */
