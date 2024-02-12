// pages/api/topics/[id]/questions.ts

// import { NextApiRequest, NextApiResponse } from 'next';
// import { db } from '@/lib/db';

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   if (req.method === 'GET') {
//     try {
//       const { id } = req.query;
      
//       // Retrieve questions for the specified topic ID
//       const topic = await db.topic.findMany({
//         where: {
//           id: Number(id),
//         },
//       });

//       return res.status(200).json({ topic });
//     } catch (error) {
//       console.error('Error fetching questions:', error);
//       return res.status(500).json({ message: 'Internal server error' });
//     }
//   } else {
//     return res.status(405).json({ message: 'Method Not Allowed' });
//   }
// }


// "use server"

// import {z} from 'zod';

// const topicSchema = z.object({
//     title: z.string(),
// });

// import { db } from "@/lib/db";
// import { revalidatePath } from 'next/cache';
// import { NextApiRequest, NextApiResponse } from 'next';


// async function getTopic(req: NextApiRequest, res: NextApiResponse) {

//     const {id} = req.query
    
//     // const Content = formData.get('Content') as string; 

  

//         try {
           
//             const topic = await db.topic.findUnique({
//                 where: {
//                     id: Number(id),
                    
//                 },
//             });

//             if (!topic){
//                 return res.status(404).json({ message: 'Topic not found' });
//             }
//             return res.status(200).json({topic})

            
//         } catch (error) {
//             return {
//                 error: "Internal Error",
//             };
//         }

        
//     }

//     export default getTopic;


import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const topics = await prisma.topic.findMany();
      return res.status(200).json(topics);
    } catch (error) {
      console.error('Error fetching topics:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }
}
