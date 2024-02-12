"use server"

import {z} from 'zod';

const topicSchema = z.object({
    title: z.string(),
});

import { db } from "@/lib/db";
import { revalidatePath } from 'next/cache';
import { NextApiRequest, NextApiResponse } from 'next';

async function getTopic(req: NextApiRequest, res: NextApiResponse) {

    const {id} = req.query
    
    // const Content = formData.get('Content') as string; 

  

        try {
           
            const topic = await db.topic.findUnique({
                where: {
                    id: Number(id),
                },
            });

            if (!topic){
                return res.status(404).json({ message: 'Topic not found' });
            }

            
        } catch (error) {
            return {
                error: "Internal Error",
            };
        }

        
    }

    export default getTopic;
