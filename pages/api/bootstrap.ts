import { NextApiRequest, NextApiResponse } from "next";

const BASE_URL = "shopify-sections-yeqggr54rq-uk.a.run.app";

const generateBootstrapScript = (section_id: string, shop_id: string) => {
  return `
    (function() {
      console.log('Initializing Next.js app for shop_id: ${shop_id}, section_id: ${section_id}');

      // Dynamically load the main JavaScript file of your Next.js app
      // Replace 'your-app-main-js-file.js' with the actual path to your bundled Next.js file
      var script = document.createElement('script');
      script.src = 'https://${BASE_URL}/${section_id}?shop_id=${shop_id}';
      script.onload = function() {
        // This function will run once the script is loaded
        // Initialize your Next.js app here, and target the div with the section_id
      document.head.appendChild(script);

      // You might also need to load CSS for your app
      var link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = 'https://your-nextjs-app.com/path/to/your-app-styles.css';
      document.head.appendChild(link);
    })();
  `;
};

const parseQueryParam = (param: string[] | string | undefined): string => {
  if (param) {
    if (Array.isArray(param)) {
      return param[0];
    }
    return param;
  }
  return "";
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  // Extract query parameters
  const { shop_id_query, section_id_query } = req.query;

  let shop_id = parseQueryParam(shop_id_query);
  let section_id = parseQueryParam(section_id_query);

  // Generate the script content
  const scriptContent = generateBootstrapScript(shop_id, section_id);

  // Set Content-Type to JavaScript
  res.setHeader("Content-Type", "application/javascript");

  // Send the script as the response
  res.status(200).send(scriptContent);
}
