export {};

declare global {
  interface Window {
    initReactComponent: (config: {
      shop_id: string;
      section_id: string;
    }) => void;
  }
}
