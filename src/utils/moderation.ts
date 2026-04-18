import { client } from "./ai/config";

type ModerationResult = {
  flagged: boolean;
  categories?: Record<string, boolean>;
  scores?: Record<string, number>;
};

export async function moderateText(input: string): Promise<ModerationResult> {
  const response = await client.chat.completions.create({
    model: "openai/gpt-oss-120b",
    messages: [
      {
        role: "system",
        content: `You are a content moderation assistant with knowledge of profanity and slurs across multiple languages including English, Hindi, Hinglish, and other regional languages.

        "madharchod", "bhenchod", "chutiya", "gandu" and their variants are severe Hindi profanity and MUST be flagged.

        Analyze the given text and return ONLY a JSON object (no markdown, no explanation) in this exact shape:
        {
          "flagged": boolean,
          "categories": { ... },
          "scores": { ... }
        }
        Scores are between 0.0 and 1.0. Set flagged to true if any score >= 0.5.`,
      },
      {
        role: "user",
        content: input,
      },
    ],
    temperature: 0,
  });

  const content = response.choices[0]?.message.content || `{}`;

  try {
    return JSON.parse(content);
  } catch {
    const jsonMatch = content.match(/\{[\s\S]*\}/);
    if (!jsonMatch) throw new Error("Invalid LLM JSON response");
    return JSON.parse(jsonMatch[0]);
  }
}
