const saveCartItems = (c) => {
  localStorage.setItem('cartItems', c);
};

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
