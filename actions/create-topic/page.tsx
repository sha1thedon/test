"use server"

import {z} from 'zod';

const topicSchema = z.object({
    title: z.string(),
});

import { db } from "@/lib/db";
import { revalidatePath } from 'next/cache';

async function saveTopic(formData: FormData) {
    
    // const Content = formData.get('Content') as string; 

    const { title } = topicSchema.parse({
        title: formData.get('title'),
    });

   let topic

        try {
           
            topic = await db.topic.create({
                data: {
                    title,
                },
            });
        } catch (error) {
            return {
                error: "Internal Error",
            };
        }

        revalidatePath("/aitutor/" + topic.id);
    }

    export default saveTopic;
