import Client from "shopify-buy";

const getVariantIdFromSKU = async (shopifyClient: Client, sku: string) => {
  const products = await shopifyClient.product.fetchAll();

  for (const product of products) {
    for (const variant of product.variants) {
      if (variant.sku === sku) {
        return variant.id;
      }
    }
  }
};

export default getVariantIdFromSKU;
