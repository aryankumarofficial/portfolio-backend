import Groq from "groq-sdk";

export const client = new Groq({
  apiKey: process.env.GROK_API_KEY,
});
