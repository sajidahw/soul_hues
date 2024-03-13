// v4: https://github.com/openai/openai-node/discussions/217

// import Configuration from "openai";
import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

// export const configureOpenAI = () => {
//   const config = new Configuration({
//     apiKey: process.env.OPEN_AI_SECRET,
//     organization: process.env.OPENAI_ORGANIZATION_ID,
//   });
//   return config;
// };

// export const configureOpenAI = () => {
//   const config = new OpenAI({
//     apiKey: process.env.OPEN_AI_SECRET,
//     organization: process.env.OPENAI_ORGANIZATION_ID,
//   });
//   return config;
// };
// export const apiKey = process.env.REACT_APP_OPEN_AI_SECRET;
// export const organization = process.env.OPENAI_ORGANIZATION_ID;

// config
export const openai = new OpenAI({
  //openai
  apiKey: process.env.REACT_APP_OPEN_AI_SECRET, //apiKey,
  organization: process.env.OPENAI_ORGANIZATION_ID, //organization,
});
// console.log(apiKey, organization);
console.log(
  process.env.REACT_APP_OPEN_AI_SECRET,
  process.env.OPENAI_ORGANIZATION_ID
);
