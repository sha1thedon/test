"use server"

import {z} from 'zod';

const toDoSchema = z.object({
    title: z.string(),
});

import { db } from "@/lib/db";
import { revalidatePath } from 'next/cache';

async function saveToDo(formData: FormData) {
    
    // const Content = formData.get('Content') as string; 

    const { title } = toDoSchema.parse({
        title: formData.get('title'),
    });

   let toDo

        try {
            toDo = await db.toDo.create({
                data: {
                    title,
                },
            });
        } catch (error) {
            return {
                error: "Internal Error",
            };
        }

        revalidatePath("/dashboard/" + toDo.id);
    }

    export default saveToDo;
