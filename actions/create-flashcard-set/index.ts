"use server"

import { z } from "zod";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";


import { InputType, ReturnType } from "./types"
import { auth } from "@clerk/nextjs";
import { createSafeAction } from "@/lib/create-safe-action";
import { CreateFlashcardSet } from "./schema";

const handler = async (data:InputType): Promise<ReturnType> => {
    const {userId} = auth()

    if (!userId){
        return {
            error: "unauthorised"
        }
    }

    const { title } = data

    let flashcardSet

    try {
        flashcardSet = await db.flashcardSet.create({
            data: {
                title,
                userId
            }
        })
    }
    catch (error) {
        return {
            error :"FAiled to create"
        }
    }

    revalidatePath(`/flashcards/${flashcardSet.id}`)
    return {data: flashcardSet}
    
}

export const createFlashcardSet = createSafeAction(CreateFlashcardSet, handler)

// export type State = {
//     errors?: {
//         title?: string []
//     },
//     message?: string | null
// }

// const flashcardSetSchema = z.object({
//     title: z.string().min(3, {
//         message: "Minimum 3 letters"
//     }),
// })

// export async function create(prevState: State, formData: FormData) {
//     const validatedFields = flashcardSetSchema.safeParse({
//         title: formData.get('title'),
//     });
   
//     if (!validatedFields.success){
//         return {
//             errors: validatedFields.error.flatten().fieldErrors,
//             message: "Missing fields"
//     }
//     }

//     const {title} = validatedFields.data

// try{
//     await db.flashcardSet.create({
//         data: {
//             title,
            
//         },
//     });
// } catch(error){
//     return{
//         message: "Database error"
//     }
// }

//     revalidatePath("/flashcards");
//     redirect("/flashcards")
// }