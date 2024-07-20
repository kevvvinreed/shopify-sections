import config from "./config";

const assets = {
  nav: {
    transparentLogoWhite:
      config.assetBaseUrl + "/5rc/nav/transparent-icon-white.webp",
    cart: config.assetBaseUrl + "/5rc/nav/cart.svg",
  },
  home: {
    desktopHeroImg: config.assetBaseUrl + "/5rc/home/dt.webp",
    heroGif: config.assetBaseUrl + "/5rc/home/example-hero.gif",
    mobileBgWebm: config.assetBaseUrl + "/5rc/home/mobile.webm",
    mobileBgMp4: config.assetBaseUrl + "/5rc/home/mobile.mp4",
  },
  terms: {
    version: "1.0",
    text: [
      "Last Updated: [Date]",
      "",
      "Welcome to 5th Round Cardio LLC. By accessing or using our website and purchasing our products, you agree to be bound by the following terms and conditions. Please read them carefully.",
      "",
      "1. General",
      "",
      "  1.1 These terms and conditions govern your use of our website and the purchase of treadmills from 5th Round Cardio LLC.",
      "",
      "  1.2 5th Round Cardio LLC reserves the right to update or modify these terms and conditions at any time without prior notice. Your continued use of the website following any changes constitutes your acceptance of the new terms and conditions.",
      "",
      "2. Products",
      "",
      "  2.1 All treadmills sold by 5th Round Cardio LLC are imported from overseas suppliers. We strive to ensure that the product descriptions and specifications are accurate. However, we do not warrant that product descriptions or other content on our website are error-free.",
      "",
      "  2.2 The price of the products is as stated on our website. We reserve the right to change prices at any time without prior notice.",
      "",
      "3. Orders and Payment",
      "",
      "  3.1 By placing an order with us, you are offering to purchase a product subject to these terms and conditions.",
      "",
      "  3.2 Payment must be made at the time of placing the order. We accept payment through [list payment methods].",
      "",
      "  3.3 Once your order is placed, you will receive an email confirmation. This email does not constitute acceptance of your order. Your order is only accepted when we dispatch the product to you.",
      "",
      "4. Shipping and Delivery",
      "",
      "  4.1 We aim to dispatch products within [number] business days of receiving your order. Delivery times may vary depending on your location.",
      "",
      "  4.2 We are not responsible for delays caused by customs clearance or other factors beyond our control.",
      "",
      "5. Returns and Refunds",
      "",
      "  5.1 We accept returns of undamaged products within 30 days of delivery if you are unsatisfied with your purchase. You will be responsible for paying the return shipping costs.",
      "",
      "  5.2 If you receive a damaged or dysfunctional product, please contact us within 30 days of delivery. We will arrange for the return shipping and reimburse you for the product.",
      "",
      "  5.3 To return a product, please contact our customer service team at [email] to obtain a return authorization.",
      "",
      "  5.4 Once we receive your returned product and verify its condition, we will process your refund within [number] business days. Refunds will be issued to the original payment method.",
      "",
      "6. Limitation of Liability",
      "",
      "  6.1 5th Round Cardio LLC is not liable for any indirect, incidental, or consequential damages arising from the use or inability to use our products.",
      "",
      "  6.2 Our liability for any claim related to the purchase of our products is limited to the amount you paid for the product.",
      "",
      "7. Governing Law",
      "",
      "  7.1 These terms and conditions are governed by and construed in accordance with the laws of [your state/country]. Any disputes arising out of or in connection with these terms and conditions shall be subject to the exclusive jurisdiction of the courts of [your state/country].",
      "",
      "8. Contact Us",
      "",
      "If you have any questions or concerns about these terms and conditions, please contact us at:",
      "",
      "5th Round Cardio LLC",
      "[Your Address]",
      "[City, State, ZIP Code]",
      "[Email Address]",
      "[Phone Number]",
      "",
      "Thank you for choosing 5th Round Cardio LLC.",
    ],
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
