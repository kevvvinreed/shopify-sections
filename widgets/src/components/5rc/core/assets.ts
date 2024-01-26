import config from "./config";

const assets = {
  nav: {
    transparentLogoWhite:
      config.assetBaseUrl + "/5rc/nav/transparent-icon-white.webp",
    cart: config.assetBaseUrl + "/5rc/nav/cart.svg",
  },
  home: {
    heroGif: config.assetBaseUrl + "/5rc/home/example-hero.gif",
  },
  products: [
    {
      name: "Treadmill SKU #1",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      cost: 899.99,
      glbUrl: config.assetBaseUrl + "/5rc/treadmill-0/3d.glb",
      images: [
        {
          src: config.assetBaseUrl + "/5rc/treadmill-0/img-0.webp",
        },
        {
          src: config.assetBaseUrl + "/5rc/treadmill-0/img-1.webp",
        },
        {
          src: config.assetBaseUrl + "/5rc/treadmill-0/img-2.webp",
        },
        {
          src: config.assetBaseUrl + "/5rc/treadmill-0/img-3.webp",
        },
      ],
    },
    {
      name: "Treadmill SKU #2",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      cost: 649.99,
      glbUrl: config.assetBaseUrl + "/5rc/treadmill-1/3d.glb",
      images: [
        {
          src: config.assetBaseUrl + "/5rc/treadmill-1/img-0.webp",
        },
        {
          src: config.assetBaseUrl + "/5rc/treadmill-1/img-1.webp",
        },
      ],
    },
  ],
};
export default assets;
