import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

/**  Send a request to OpenAI
 * @param messages: The messages to send to OpenAI
 * @param response_format: The response format to send to OpenAI
 * @returns The response from OpenAI
 */
export const sendOpenAIRequest = async (
  messages: OpenAI.ChatCompletionMessageParam[],
  response_format: any
) => {
  try {
    console.log(response_format);
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages,
      temperature: 0.2,
      response_format: response_format,
    });
    if (response.choices[0].message.content) {
      const responseAsJSON = JSON.parse(response.choices[0].message.content);
      return responseAsJSON;
    } else {
      throw new Error("Error in OpenAI response"); // No response from OpenAI
    }
  } catch (error) {
    console.log(error);
    throw new Error("Error in OpenAI response"); // Error in OpenAI response
  }
};
