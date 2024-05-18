// const apiKey = 'sk-proj-eALFfO9u6YmIAQAsKRqqT3BlbkFJ7lPN3lI6UqcSO1el0Pl5';

const OpenAI = require('openai');

const openai = new OpenAI({
  apiKey: process.env.REACT_APP_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true // This is also the default, can be omitted
});

export async function sendMsgToOpenAI(message) {
  try {
    const res = await openai.chat.completions.create({
      model: "gpt-3.5-turbo-0125",
      messages: [{"role": "user", "content": message}],
      temperature: 0.7,
      max_tokens: 1000,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0
    });

    if (res && res.id && res.object === 'chat.completion' && res.choices && res.choices.length > 0 && res.choices[0].message) {
      return res.choices[0].message.content;
    } else {
      console.error('Unexpected response from OpenAI:', res);
      throw new Error('Unexpected response from OpenAI');
    }
  } catch (error) {
    console.error('Error communicating with OpenAI:', error);
    throw error;
  }
}