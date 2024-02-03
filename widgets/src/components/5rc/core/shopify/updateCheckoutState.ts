import { IAppStore } from "@/src/index";
import getCheckoutId from "./getCheckoutId";
import getCheckoutUrl from "./getCheckoutUrl";

const updateCheckoutState = async (
  store: IAppStore,
  setStore: React.Dispatch<React.SetStateAction<IAppStore>>
): Promise<void> => {
  if (!store.initialized) {
    const checkoutId = await getCheckoutId(store);
    const checkoutUrl = await getCheckoutUrl(store);
    const checkout = await store.shopifyClient.checkout.fetch(checkoutId);
    const cartQuantity = checkout.lineItems.reduce(
      (total, item) => total + item.quantity,
      0
    );
    setStore((store) => ({
      ...store,
      checkoutId,
      cartQuantity,
      checkoutUrl,
      initialized: true,
      loading: false,
    }));
  } else {
    const checkout = await store.shopifyClient.checkout.fetch(store.checkoutId);
    const cartQuantity = checkout.lineItems.reduce(
      (total, item) => total + item.quantity,
      0
    );
    setStore((store) => ({
      ...store,
      cartQuantity,
      initialized: true,
      loading: false,
    }));
  }
};

export default updateCheckoutState;
