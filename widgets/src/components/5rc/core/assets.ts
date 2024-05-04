import config from "./config";

const assets = {
  nav: {
    transparentLogoWhite:
      config.assetBaseUrl + "/5rc/nav/transparent-icon-white.webp",
    cart: config.assetBaseUrl + "/5rc/nav/cart.svg",
  },
  home: {
    heroGif: config.assetBaseUrl + "/5rc/home/example-hero.gif",
    mobileBgWebm: config.assetBaseUrl + "/5rc/home/mobile.webm",
    mobileBgMp4: config.assetBaseUrl + "/5rc/home/mobile.mp4",
  },
  products: [
    {
      name: "The Middle Weight",
      description: [
        "Experience the durability and performance of our Middleweight Treadmill, designed for intense workouts and heavy use. With a rugged design and an added resistance dial, this treadmill offers customizable intensity, making it perfect for universities/colleges, apartment complexes, and fitness centers.",
        "The Middleweight Treadmill is engineered to withstand rigorous training sessions while providing a challenging workout experience. Its durable construction and versatility make it an ideal choice for facilities seeking reliable and high-performance cardio equipment.",
      ],
      cost: 2250,
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
      name: "The Executive",
      description: [
        "The pinnacle of sophistication and functionality in the world of cardio equipment. Crafted with precision and engineered for excellence, this self-powered treadmill redefines your workout experience with its unique blend of style and innovation.",
        'Elevate your fitness routine with the seamless synergy of modern technology and timeless design. "The Executive" features stunning wooden accents that exude elegance and refinement, making it a statement piece in any home or commercial gym.',
      ],
      cost: 2000,
      glbUrl: config.assetBaseUrl + "/5rc/treadmill-1/3d.glb",
      images: [
        {
          src: config.assetBaseUrl + "/5rc/treadmill-1/img-0.webp",
        },
        {
          src: config.assetBaseUrl + "/5rc/treadmill-1/img-1.webp",
        },
        {
          src: config.assetBaseUrl + "/5rc/treadmill-1/img-2.webp",
        },
        {
          src: config.assetBaseUrl + "/5rc/treadmill-1/img-3.webp",
        },
      ],
    },
    {
      name: "Treadmill SKU #3",
      description: [
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      ],
      cost: 800,
      glbUrl: config.assetBaseUrl + "/5rc/treadmill-2/3d.glb",
    },
  ],
};
export default assets;
