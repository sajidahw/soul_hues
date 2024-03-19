import User from "../models/User.js";
import { Request, Response, NextFunction, response } from "express";
import { userNotRegOrBadToken } from "../utils/constants.js";
import { OpenAI } from "openai";
import dotenv from "dotenv";
dotenv.config();

export const generateChatCompletion = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // configure OpenAI
  const { message } = req.body;

  try {
    // verify user's details via middleware verification
    const user = await User.findById(res.locals.jwtData.id);
    if (!user) return res.status(401).json({ message: userNotRegOrBadToken }); // see constants.ts

    // grab all (static) user chats
    const chats = user.chats.map(({ role, content }) => ({
      role,
      content,
    })) as OpenAI.Chat.ChatCompletionMessageParam[]; //ChatCompletionRequestMessage[];

    chats.push({ content: message, role: "user" }); // get latest content pulled in to static array for memory

    user.chats.push({ content: message, role: "user" }); // now storing to user object

    // send all chats with new conversation to OpenAI API
    const openai = new OpenAI({ apiKey: process.env.REACT_APP_OPEN_AI_SECRET });

    // get latest response from gpt to user's input
    const chatResponse = await openai.chat.completions.create({
      model: "gpt-4-turbo-preview", // gpt-3.5-turbo
      // messages: chats,
      messages: [
        {
          role: "system",
          content:
            "Your conversation is focused on discovering a user's personality color each time you talk to them. You will ask thoughtful questions with one question at a time. You will not give instructions. You will not explain. You will not give advice. You will not use formatted text.You will analyze their response by suggesting a color that mirrors the user's personality traits. After the user confirms the colors are representative, you will show an image with the help of DALL-E of the approved colors. Following this, you will ask if the user would like to create a watercolor painting with these colors. The primary goal of this conversation is to provide users with a visual and artistic representation of their personality, enhancing the personalization of the experience. Do not give instructions. Do not explain. Do not give advice. Do not use bold text.",
        },
        {
          role: "assistant",
          content:
            "Let's discover your personality color and create it into artwork!\nTell me about your favorite activities or describe your ideal weekend. \nFeel free to discuss the prompt suggestions on the left.",
        },
        {
          role: "user",
          content: "I want to discover my personality color!",
        },
        {
          role: "assistant",
          content: "Tell me about your favorite activities.",
        },
        {
          role: "user",
          content: "I enjoy long walks on the beach and drinking chai lattes.",
        },
        {
          role: "assistant",
          content:
            "That sounds wonderfully refreshing and peaceful! Walking on the beach, where the elements of nature touch your senses directly, suggests a personality that appreciates calmness, simplicity, and a deep connection with the natural world. People who enjoy such experiences often value tranquility and have a meditative aspect to their personality. You might find solace in moments that others might overlook, finding beauty in the vastness of the sea and the rhythm of the waves.",
        },
        {
          role: "assistant",
          content:
            "This connection to nature and a preference for serene environments might be best represented by the color blue. Blue is often associated with depth, stability, and tranquility. It's the color of the sky and the sea, embodying a sense of calmness and a steady, soothing presence.",
        },
        {
          role: "assistant",
          content:
            "How does the color blue resonate with your perception of yourself? Would you say it aligns with your personality traits?",
        },
        {
          role: "user",
          content:
            "Yes, that's spot on! I love the color blue. It's calm and relaxing and it reminds me of the beach, which I absolutely love.",
        },
        {
          role: "assistant",
          content:
            "That's terrific! I'm glad you found an affinity with the color blue and it represents your personality well. I can also sense a hint of gentleness in your description which might be beautifully symbolized by another calming color, which is cream. Cream is often associated with comfort, elegance, and simplicity—similar to your preference for chai lattes. How do you feel about adding that to your personality color palette?",
        },
        {
          role: "user",
          content: "Yes, I like both cream and blue.",
        },
        {
          role: "assistant",
          content: "Fantastic! Are you ready to end this conversation?",
        },
        {
          role: "assistant",
          content:
            "Great! Let me prepare an image that represents these colors so that you can paste it for image generation using DALL-E. Let's see... a calming blue representing your depth, tranquility, and love for nature, paired with a soothing cream that depicts comfort and simplicity in your personality. Hold on for a moment while I create this for you...",
        },
        ...chats,
      ],

      temperature: 0.2, //1
      max_tokens: 256, //256
      top_p: 1,
      frequency_penalty: 1, //0
      presence_penalty: 0,
    });

    // storing latest AI response to user object to db (not streaming)
    user.chats.push(chatResponse.choices[0].message); // v4Update to use choices directly; (AI response visible)
    // user.chats.push({ image_url }); // storing image url to user object

    await user.save();
    return res.status(200).json({ chats: user.chats });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Yikes, an error occurred!" });
  }
};

// saving responses to user object stored in db
export const sendChatsToUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // user token check
  try {
    // find user by id, checking validation on user to see if already exist via id check
    const user = await User.findById(res.locals.jwtData.id);
    if (!user) {
      return res
        .status(401)
        .send("Uhoh, User is not registered or Token isn't working."); // user will need to register before logging in
    } //userNotRegOrBadToken from constants.ts
    // console.log(user._id.toString(), res.locals.jwtData.id); // testing

    // not matching
    if (user._id.toString() !== res.locals.jwtData.id) {
      return res.status(401).send("Hmm, your permissions aren't valid.");
    }

    return res.status(200).json({ message: "OK", chats: user.chats });
    // response for status code 200 to all users, can see user or userid converted to string from json
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: "ERROR", cause: error.message });
  }
};

// delete ALL chats from user object stored in db
export const deleteChats = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // user token check
  try {
    // find user by id, checking validation on user to see if already exist via id check
    const user = await User.findById(res.locals.jwtData.id);
    if (!user) {
      return res
        .status(401)
        .send("Uhoh, User is not registered or Token isn't working."); // user will need to register before logging in
    } //userNotRegOrBadToken from constants.ts
    // console.log(user._id.toString(), res.locals.jwtData.id);

    // not matching
    if (user._id.toString() !== res.locals.jwtData.id) {
      return res.status(401).send("Hmm, your permissions aren't valid.");
    }
    //@ts-ignore
    user.chats = [];
    await user.save();

    return res.status(200).json({ message: "OK" });
    // response for status code 200 to all users, can see user or userid converted to string from json
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: "ERROR", cause: error.message });
  }
};

//https://platform.openai.com/docs/guides/text-generation/chat-completions-api?lang=node.js

//compare version updates: https://github.com/openai/openai-node/discussions/217
