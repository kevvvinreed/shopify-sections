import fs from "fs";
import { NextApiRequest, NextApiResponse } from "next";
import path from "path";

// This function maps the file extension to the MIME type
const mimeTypes = {
  ".woff": "font/woff",
  ".woff2": "font/woff2",
  ".ttf": "application/font-sfnt",
  // Add other font MIME types as needed
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
  console.log("here");
  const {
    query: { filename },
  } = req;

  const filePath = path.join(
    process.cwd(),
    "public",
    "fonts",
    filename as string
  );
  const fileExtension = path.extname(filename as string);
  const mimeType = (mimeTypes as any)[fileExtension];

  if (!mimeType) {
    res.status(404).send("Not Found");
    return;
  }

  try {
    const fileBuffer = fs.readFileSync(filePath);

    res.setHeader("Content-Type", mimeType);
    res.setHeader("Content-Disposition", `inline; filename="${filename}"`);
    res.setHeader("Content-Length", fileBuffer.length);
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.send(fileBuffer);
  } catch (e) {
    res.status(404).send("Not Found");
  }
};
