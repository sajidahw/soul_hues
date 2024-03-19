import dotenv from "dotenv";
import { OpenAI } from "openai";
import { Request, Response } from "express";

// configure OpenAI moved top for image
const imageDalle = new OpenAI({ apiKey: process.env.REACT_APP_OPEN_AI_SECRET });

//node.js setup not recognized, using python's syntax
export const generateImage = async (req: Request, res: Response) => {
  const imagePrompt = req.body.prompt as string;

  try {
    const imageResponse = await imageDalle.images.generate({
      model: "dall-e-3",
      prompt: imagePrompt,
      n: 1,
      quality: "hd",
      size: "1024x1024",
    });
    const image_url = imageResponse.data[0].url;
    // console.log(image_url);

    // Send the image URL back to the frontend
    if (imageResponse.data && imageResponse.data.length > 0) {
      // const image_url = imageResponse.data[0].url;
      return res.status(200).json({ image: image_url });
    } else {
      return res.status(400).json({ message: "Image generation failed." });
    }
  } catch (error) {
    console.error("Error generating image", error);
    res.status(500).json({ message: error.message });
  }
};
