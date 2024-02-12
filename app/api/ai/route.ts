import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  const { content } = await req.json();
  const response = await openai.chat.completions.create({
    model: "ft:gpt-3.5-turbo-1106:personal::8qlEKg0p",
    messages: 
    [
      {role: "system", content: "Your AI assistant for computer science questions."},
      { role: "user", content: content }
    ],
    temperature:1,
      max_tokens:256,
      top_p:1,
      frequency_penalty:0,
      presence_penalty:0
  });

  const data = response.choices[0].message.content;

  return Response.json(data);
}

// export default async function handler(
//     req: NextApiRequest,
//     res: NextApiResponse
// ) {

//     const message = req.body

//     if (!message || message === ''){
//         return new Response('Please send your prompt', {status:400})
//     }

//     const completion = await openai.chat.completions.create({
//         messages: [{ role: "system", content: message }],
//         model: "gpt-3.5-turbo"
//       });


//     const assistantResponse = completion.choices[0].message.content
//     res.status(200).json({ answer: assistantResponse })
// }




