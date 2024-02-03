import getCheckoutId from "./getCheckoutId";
import getVariantIdFromSKU from "./getVariantIdFromSKU";
import { IAppStore } from "@/src/index";
import updateCheckoutState from "./updateCheckoutState";

const addToCart = async (
  store: IAppStore,
  setStore: React.Dispatch<React.SetStateAction<IAppStore>>,
  sku: string,
  quantity: number
) => {
  setStore((store) => ({ ...store, loading: true }));
  const variantId = await getVariantIdFromSKU(store.shopifyClient, sku);

  if (!variantId) {
    console.error("Variant not found for SKU:", sku);
    return;
  }

  const checkoutId = await getCheckoutId(store);

  // Prepare line item to add to the cart
  const lineItemsToAdd = [{ variantId, quantity }];

  // Add the item to the checkout
  try {
    await store.shopifyClient.checkout.addLineItems(checkoutId, lineItemsToAdd);
    await updateCheckoutState(store, setStore);
  } catch (error) {
    console.error("Error adding item to cart:", error);
    return null;
  }
};

export default addToCart;
