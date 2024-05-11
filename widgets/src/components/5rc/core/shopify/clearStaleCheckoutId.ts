const clearStaleCheckoutId = () => {
  let checkoutId = localStorage.getItem("checkoutId");
  if (checkoutId) {
    localStorage.removeItem("checkoutId");
  }
};

export default clearStaleCheckoutId;
