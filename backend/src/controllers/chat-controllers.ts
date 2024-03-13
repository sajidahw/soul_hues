// import { configureOpenAI } from './../config/openai-config';
import User from "../models/User.js";
import { Request, Response, NextFunction } from "express";
import { userNotRegOrBadToken } from "../utils/constants.js";
// import { configureOpenAI } from "../config/openai-config.js";
import { openai } from "../config/openai-config.js"; //apiKey
import { OpenAI } from "openai";
// import { apiKey } from "../config/openai-config.js";

//version updates via https://github.com/openai/openai-node/discussions/217

export const generateChatCompletion = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // configure OpenAI
  const { message } = req.body;

  try {
    // verify user's details
    const user = await User.findById(res.locals.jwtData.id);
    if (!user) return res.status(401).json({ message: userNotRegOrBadToken }); // see constants.ts

    // grab all user chats to get text content from OpenAI
    const chats = user.chats.map(({ role, content }) => ({
      role,
      content,
    })) as OpenAI.Chat.ChatCompletionMessageParam[]; //ChatCompletionRequestMessage[];

    chats.push({ content: message, role: "user" }); // get latest content pulled in to static array for memory

    user.chats.push({ content: message, role: "user" }); // now storing to user object

    // send all chats with new conversation to OpenAI API
    //   const config = configureOpenAI();
    // const openai = new OpenAI(); //configureOpenAI(); // new OpenAI();
    const openai = new OpenAI({ apiKey: process.env.REACT_APP_OPEN_AI_SECRET }); // Update to use apiKey directlyy
    // const openai = new OpenAI(config);

    // get latest response
    const chatResponse = await openai.chat.completions.create({
      model: "gpt-4-turbo-preview", //gpt-4-turbo-preview, gpt-3.5-turbo
      messages: chats,
      temperature: 1,
      max_tokens: 256,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    });
    user.chats.push(chatResponse.choices[0].message); // v4Update to use choices directly; chatResponse.choices[0].message
    await user.save();
    return res.status(200).json({ chats: user.chats });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Yikes, an error occurred!" });
  }
};

//https://platform.openai.com/docs/guides/text-generation/chat-completions-api?lang=node.js

//compare version updates: https://github.com/openai/openai-node/discussions/217

// where can i specify what the content message should be depending on if it's a user or assistant?

// how to set the content message depending on the role? and include a systems content message?

// chats.forEach((chat) => {
//   if (chat.role === "user") {
//     chat.content = "User message content here";
//   } else if (chat.role === "assistant") {
//     chat.content =
//       "I'm a chatbot AI. I'm here to help you with your personality color and create it into artwork!";
//   }
// });
