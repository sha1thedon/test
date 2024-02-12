"use client"

import { Button } from '@/components/ui/button'
import { GenericHTMLFormElement } from 'axios'
import React, {FormEvent, useEffect, useRef, useState} from 'react'
import { Form } from 'react-bootstrap'
import Link from "next/link"
import { PrismaClient } from '@prisma/client'
import saveTopic from '@/actions/create-topic/page'
import axios from 'axios'
import TopicSelector from '@/components/topicselector'
import QuestionGenerator from '@/components/questiongenerator'
import { generateQuestionForTopic } from '@/actions/generate-question/page'
const prisma = new PrismaClient()

interface Conversation {
  role: string
  content: string
}

export default function AITutor() {

  const [prompt, setPrompt] = React.useState("");
  const [completion, setCompletion] = React.useState("");
  const [selectedTopicId, setSelectedTopicId] = useState<number | null>(null);

  const [value, setValue] = React.useState<string>("")
  const [conversation, setConversation] = React.useState<Conversation[]>([])
  const inputRef = useRef<HTMLInputElement>(null)
  const [topics, setTopics] = useState([])
  const [topic, setTopic] = useState('')
  const [selectedTopic, setSelectedTopic] = useState('')
  const [input, setInput] = useState("")
  const [messages, setMessages] = useState([])
  const [questions, setQuestion] = useState('')
  const [questionstring, setQuestionString] = useState([])
  

  // useEffect(() => {
  //   const fetchTopics = async () => {
  //     try{
  //       const response = await fetch("/api/topic", {
  //         headers: {
  //           'Content-Type': 'application/json',
            
  //         }
  //       })
  //       const data = await response.json()
  //       setTopics(data)
  //       setSelectedTopic(data[0]?.name || ``)
  //       console.log('topic is', topics)
  //       console.log('data is', data)
  //     }
  //     catch (error) {
  //       console.error('error fetching topics', error)
  //     }
  //   }
  //   fetchTopics()
  // }, [])

  const handleSubmit = async () => {
    try {
      const response = await fetch('/api/topic'
      // , {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({ topic }),
      // }
      );
  
      if (!response.ok) {
        throw new Error('Failed to save topic');
      }
  
      const data = await response.json();
      console.log('Topic saved:', data);
      setTopic(data)
      setTopics(data)
  
      const questionResponse = await fetch('/api/questiongenerator', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content: topic }),
      });
  
      if (!questionResponse.ok) {
        throw new Error('Failed to generate question');
      }
  
      const questionData = await questionResponse.json();
      console.log('Question generated:', questionData.question);
      setQuestion(questionData.question);
    } catch (error) {
      console.error('Error:', error);
    }
  };
  

  console.log("Rendered topics:", topic)
  const handleInput = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setValue(e.target.value)
    },[]
  )

  const handleKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter"){
      const chatHistory = [...conversation, {role: "user", content:value} ]
      const response = await fetch("/api/ai", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({messages: chatHistory}),
      })
      console.log('response is' , response)

      const data = await response.json()
      return Response.json(data)
      setValue("")
      setConversation([
        ...chatHistory, {role: "assistant", content: data.result.choices[0].message.content},
      ])

    }
  }

  const handleRefresh = () => {
    inputRef.current?.focus()
    setValue("")
    setConversation([])
  }

  const handleClick = async () => {
    const response = await fetch("/api/ai", {
      method: "POST",
      body: JSON.stringify({ content: prompt }),
    });
    const data = await response.json();
    setCompletion(data);
  };

  const fetchTopics = async () => {
    const response = await fetch('/api/topic', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ topic }),
    });
    const data = await response.json();
    setTopics(data)
    console.log("topic is", topics)
  }


  const generateQuestion = async () => {

    // if (!selectedTopic){
    //   console.error("topic not found")
    //   return;
    // }

    const topicLowercase = selectedTopic.toLowerCase()

    const messageToSend = `generate ${topicLowercase}`

    try {
      const response = await fetch('/api/ai', {
        method: "POST",
        body: JSON.stringify({ content: topic }),
        headers: {
          'Content-Type': 'application/json',
        },
       

      });
      // setMessages(prevMessages => [...prevMessages, {
      //   text:data.answer,
      //   topic: selectedTopic,
      //   sender: 'ai'
      // }])

      const data = await response.json();
      
      setQuestion(data);

      
      console.log('question is', data)
    } catch (error) {
      console.error('Error generating question:', error);
    }
  };

  return (
    <>
    <div className="bg-blue p-10">
    <label htmlFor="prompt">Prompt</label>
    {/* <textarea
      onChange={(e) => setPrompt(e.target.value)}
      placeholder="enter promp..."
      name="prompt"
    /> */}
    <button
      className="bg-black text-white font-extrabold text-xl py-3 px-5 rounded-lg"
      onClick={handleClick}
    >
      enter
    </button>
    <br />
    <label htmlFor="completion">Completion</label>
    <p>{completion}</p>
    <form action={saveTopic}>
            <input
            id='title'
            name='title'
            placeholder="Write your topic here..."
            className="border-black border p-1"
            
            />
            <Button type="submit">
          Add Note
        </Button>
          </form>
    <button onClick={fetchTopics}>click</button>
    <button onClick={generateQuestion}>Generate Questions</button>
      <p>{questions}</p>
     
  </div>
  <div>
      <h1>Question Generator</h1>
      <select value={selectedTopic} onChange={(e) => setSelectedTopic(e.target.value)}>
        {topics.map(topic => (
          <option key={topic} value={topic}>{topic}</option>
        ))}
      </select>
      <button onClick={generateQuestion}>Generate Question</button>
      {questions && <p>Generated Question: {questions}</p>}
    </div>

    <div>
     
      <input
        type="text"
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
      />
      <button onClick={generateQuestion}>Generate</button>
      
      {questions && <div>{questions}</div>}
      {questions.length > 0 && (
        <>
          <h3>Generated Questions:</h3>
          <ul>
            {questionstring.map((question, index) => (
              <li key={index}>{question}</li>
            ))}
          </ul>
        </>
      )}
    </div>



  </>
  )
  // return(

  //   <div className='w-full'>
  //     <div className='flex flex-col items-center justify-center w-2/3 mx-auto mt-40 text-center'>
  //     <h1 className='text-6xl'>Hi there i am AI tutor</h1>
  //   </div>
  //   <div className='my-12'>
  //     <p className='mb-6 font-bold'>Please type your prompt</p>
  //     <input placeholder='type here' className='w-full max-w-xs input input-bordered input-secondary'
  //     value={value}
  //     onChange={handleInput}
  //     onKeyDown={handleKeyDown}
  //     />
      
  //     <button className='mt-6 btn btn-primary btn-xs' onClick={handleRefresh}>Start New Conversation</button>
  //     <div className='textarea'>
  //       {conversation.map((item, index) => (
  //         <React.Fragment key={index}>
  //           <br/>
  //           {item.role === "assistant"} ? (
  //             <div className='chat chat-end'>
  //               <div className='chat-bubble chat-bubble-secondary'>
  //                 <strong className='badge badge-primary'>AI</strong>
  //                 <br/>
  //                 {item.content}
  //               </div>
  //             </div>

  //           ) : (
  //             <div className='chat chat-start'>
  //               <div className='chat-bubble chat-bubble-primary'>
  //                 <strong className='badge badge-primary'>User</strong>
  //                 <br/>
  //                 {item.content}
  //               </div>
  //             </div>
  //           )
  //         </React.Fragment>
  //       ))}

  //     </div>

  //   </div>
  //   </div>
    
  // )
}














// import OpenAI  from "openai";
// import { useState } from "react"
// import { NextApiRequest, NextApiResponse } from "next";



// const openai = new OpenAI({
//     apiKey: process.env.OPENAI_KEY
// })

// interface AITutorProps {
//     response?: string;
//   }

//   const AITutor: React.FC<AITutorProps> = ({ response }) => {
//     const [prompt, setPrompt] = useState<string>("");
  
//     const handleGenerateResponse = async () => {
//       try {
//         const requestBody: OpenAI.CompletionCreateParamsNonStreaming = {
//           model: "text-davinci-003",
//           prompt: prompt,
//           max_tokens: 2048,
//           temperature: 1,
//         };
  
//         const apiResponse = await openai.completions.create(requestBody);
  
//         // Update the response state
//         setResponse(apiResponse.choices[0]?.text);
//       } catch (error) {
//         console.error("Error communicating with OpenAI API:", error.message);
//       }
//     };
  
//     const setResponse = (text: string | undefined) => {
//       // Handle the response as needed
//     };
  
//     return (
//       <div>
//         <input type="text" value={prompt} onChange={(e) => setPrompt(e.target.value)} />
//         <button onClick={handleGenerateResponse}>Generate Response</button>
//         <h1>Response: {response}</h1>
//       </div>
//     );
//   };
  
//   export default AITutor;
  
//   // Define the API route
//   export const config = {
//     api: {
//       bodyParser: {
//         sizeLimit: "1mb",
//       },
//     },
//   };
  
//   export default async function handler(
//     req: NextApiRequest,
//     res: NextApiResponse
//   ) {
//     if (req.method === "POST") {
//       const { prompt } = req.body;
  
//       try {
//         const requestBody: OpenAI.CompletionCreateParamsNonStreaming = {
//           model: "text-davinci-003",
//           prompt: prompt,
//           max_tokens: 2048,
//           temperature: 1,
//         };
  
//         const apiResponse = await openai.completions.create(requestBody);
  
//         res.status(200).json({
//           response: apiResponse.choices[0]?.text || "No response",
//         });
//       } catch (error) {
//         console.error("Error communicating with OpenAI API:", error.message);
//         res.status(500).json({ error: "Internal Server Error" });
//       }
//     } else {
//       res.status(405).json({ error: "Method Not Allowed" });
//     }
//   }


// const AITutor = () => {
//     return(
//         <h1>Hello World</h1>
//     )
// }

// export default AITutor
