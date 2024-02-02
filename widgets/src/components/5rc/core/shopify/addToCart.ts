import { shopifyClient } from "@/src/index";
import Client from "shopify-buy";
import getVariantIdFromSKU from "./getVariantIdFromSKU";

const addToCart = async (
  shopifyClient: Client,
  sku: string,
  quantity: number
) => {
  const variantId = await getVariantIdFromSKU(shopifyClient, sku);

  if (!variantId) {
    console.error("Variant not found for SKU:", sku);
    return;
  }

  // Check if there's an existing checkout ID stored, else create a new one
  let checkoutId = localStorage.getItem("checkoutId");
  if (!checkoutId) {
    const checkout = await shopifyClient.checkout.create();
    checkoutId = checkout.id;
    localStorage.setItem("checkoutId", checkoutId); // Store checkout ID for future use
  }

  // Prepare line item to add to the cart
  const lineItemsToAdd = [{ variantId, quantity }];

  // Add the item to the checkout
  try {
    const checkout = await shopifyClient.checkout.addLineItems(
      checkoutId,
      lineItemsToAdd
    );
    return checkoutId;
  } catch (error) {
    console.error("Error adding item to cart:", error);
    return null;
  }
};

export default addToCart;
