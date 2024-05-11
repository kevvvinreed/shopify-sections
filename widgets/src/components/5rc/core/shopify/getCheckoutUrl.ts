import { IAppStore } from "@/src/index";
import getCheckoutId from "./getCheckoutId";
import clearStaleCheckoutId from "./clearStaleCheckoutId";

const getCheckoutUrl = async (store: IAppStore) => {
  const checkoutId = await getCheckoutId(store);
  try {
    const checkoutObject = await store.shopifyClient.checkout.fetch(checkoutId);
    return checkoutObject.webUrl;
  } catch (error) {
    clearStaleCheckoutId();
    const checkoutId = await getCheckoutId(store);
    const checkoutObject = await store.shopifyClient.checkout.fetch(checkoutId);
    return checkoutObject.webUrl;
  }
};

export default getCheckoutUrl;
