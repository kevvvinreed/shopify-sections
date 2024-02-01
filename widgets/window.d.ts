export {};

declare global {
  interface Window {
    initReactComponent: (config: {
      mount_id: string;
      section_id: string;
      config: string;
    }) => void;
  }
}
