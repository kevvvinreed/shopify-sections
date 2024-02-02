const getCheckoutUrl = async (shopifyClient: Client, checkoutId: string) => {
  const checkoutObject = await shopifyClient.checkout.fetch(checkoutId);
  return checkoutObject.webUrl;
};

export default getCheckoutUrl;
