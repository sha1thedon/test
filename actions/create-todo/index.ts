import { auth } from "@clerk/nextjs";
import { revalidatePath } from "next/cache";

import { db } from "@/lib/db";
import { createSafeAction } from "@/lib/create-safe-action";

import { CreateToDo } from "./schema";
import { InputType, ReturnType } from "./types";


const handler = async (data: InputType): Promise<ReturnType> => {
    const { userId } = auth()

    if (!userId) {
        return {
            error: "Unauthorised",
        }
    }

    // Add your logic here

    const { title } = data

    let todo;

    try {
        todo = await db.toDo.create({
            data: {
                title
                
            }
        })
    } catch (error) {
        return {
            error: "Internal Error",
        }
    }

    revalidatePath("/dashboard/" )
    return {data: todo}
}

export const createTodo = createSafeAction(CreateToDo, handler)