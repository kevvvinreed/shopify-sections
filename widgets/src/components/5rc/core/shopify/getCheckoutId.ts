import { IAppStore } from "@/src/index";

const getCheckoutId = async (store: IAppStore): Promise<string> => {
  let checkoutId = localStorage.getItem("checkoutId");
  if (!checkoutId) {
    const checkout = await store.shopifyClient.checkout.create();
    checkoutId = checkout.id;
    localStorage.setItem("checkoutId", checkoutId);
  }

  return checkoutId;
};

export default getCheckoutId;
