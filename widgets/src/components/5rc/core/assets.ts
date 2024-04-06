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
        "Introducing the Middleweight Treadmill - where durability meets performance for an unbeatable workout experience. Built to withstand the toughest of challenges, this treadmill combines rugged design with advanced features to push your fitness journey to new heights.",
        "Designed with the same sleek aesthetics as our flagship model, The Executive, the Middleweight Treadmill exudes strength and resilience. Its robust construction ensures stability even during the most intense workouts, making it the perfect companion for your fitness regimen.",
        "What sets the Middleweight Treadmill apart is its innovative resistance dial. With a simple twist, you can dial up the intensity of your run, adding an extra layer of challenge to your workout. Whether you're looking to build endurance or ramp up your calorie burn, this feature allows you to tailor your workout to your fitness goals with ease.",
        "Powered by your own momentum, the Middleweight Treadmill offers a natural and fluid running experience. The curved design promotes a more efficient stride, engaging more muscles and reducing the risk of injury. Say goodbye to the monotony of traditional treadmills and hello to a dynamic workout that keeps you coming back for more.",
      ],
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
      name: "The Executive",
      description: [
        "The pinnacle of sophistication and functionality in the world of cardio equipment. Crafted with precision and engineered for excellence, this self-powered treadmill redefines your workout experience with its unique blend of style and innovation.",
        'Elevate your fitness routine with the seamless synergy of modern technology and timeless design. "The Executive" features stunning wooden accents that exude elegance and refinement, making it a statement piece in any home or commercial gym.',
      ],
      cost: 649.99,
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
      cost: 649.99,
      glbUrl: config.assetBaseUrl + "/5rc/treadmill-2/3d.glb",
    },
  ],
};
export default assets;
