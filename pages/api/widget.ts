import { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import path from "path";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const directoryPath = path.resolve("./widgets/dist/assets");
  const filePattern = /^app-.*\.js$/;
  try {
    const files = fs.readdirSync(directoryPath);

    // Search for the file
    const foundFile = files.find((file) => filePattern.test(file));

    if (foundFile) {
      const filePath = path.join(directoryPath, foundFile);
      const fileContents = fs.readFileSync(filePath, "utf8");

      const allowedOrigins = ["shopify.com", "myshopify.com"];
      const origin = req.headers.origin || "";
      if (allowedOrigins.includes(origin)) {
        res.setHeader("Access-Control-Allow-Origin", origin);
      }
      res.setHeader("Access-Control-Allow-Origin", "*");
      res.setHeader("Content-Type", "application/javascript");
      res.send(fileContents);
    } else {
      res.status(400).send("No widget app build file found");
    }
  } catch (error) {
    res.status(400).send("Error reading the directory");
  }
}
