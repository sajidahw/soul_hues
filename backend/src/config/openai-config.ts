// v4: https://github.com/openai/openai-node/discussions/217

// import Configuration from "openai";
import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

// GPT-4 config for OpenAi model gpt-4-turbo-preview (see ChatController.ts)
export const openai = new OpenAI({
  //openai
  apiKey: process.env.REACT_APP_OPEN_AI_SECRET, //apiKey,
  organization: process.env.OPENAI_ORGANIZATION_ID, //organization,
});

// console.log(apiKey, organization);
// console.log(
//   process.env.REACT_APP_OPEN_AI_SECRET,
//   process.env.OPENAI_ORGANIZATION_ID
// );

// DALL-E-3 config for OpenAi model dall-e-3 (see ChatController.ts)
