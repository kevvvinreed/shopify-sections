import { IAppStore } from "@/src/index";
import getCheckoutId from "./getCheckoutId";

const getCheckoutUrl = async (store: IAppStore) => {
  const checkoutId = await getCheckoutId(store);

  const checkoutObject = await store.shopifyClient.checkout.fetch(checkoutId);
  return checkoutObject.webUrl;
};

export default getCheckoutUrl;
