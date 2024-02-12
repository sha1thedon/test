"use server"

import { auth } from "@clerk/nextjs"
import { InputType, ReturnType } from "./types"
import { db } from "@/lib/db"
import { revalidatePath } from "next/cache"
import { createSafeAction } from "@/lib/create-safe-action"
import { CreateCourse } from "./schema"

const handler = async (data: InputType): Promise<ReturnType> => {
    const { userId } = auth()

    if (!userId) {
        return {
            error: "Unauthorised",
        }
    }

    // Add your logic here

    const { title } = data

    let course;

    try {
        course = await db.course.create({
            data: {
                title,
                userId,
            }
        })
    } catch (error) {
        return {
            error: "Internal Error",
        }
    }

    revalidatePath("/course/" + course.id)
    return {data: course}
}

export const createCourse = createSafeAction(CreateCourse, handler)

// import { z } from "zod"
// import { revalidatePath } from "next/cache"
// import { redirect } from "next/navigation"

// export type State = {
//     errors?:{
//         title?: string[]
    
//     },
//     message?: string | null
// }

// const courseSchema = z.object({
//     title: z.string().min(3, { message: "Course title must be at least 3 characters long" }),
    
// })

// import { db } from "@/lib/db"


// async function createCourse(prevState:State, formData: FormData) {
//     const validatedFields = courseSchema.safeParse({
//         title: formData.get("title"),
//     })

//     if (!validatedFields.success) {
//         return {
//             errors: validatedFields.error.flatten().fieldErrors,
//             message: "There were errors in your submission"
//         }
//     }

//     const { title } = validatedFields.data

//     try {
//     await db.course.create({
//         data: {
//             title,
//             userId: "1" // Replace "your_user_id_here" with the actual user ID
//         },
//     })

// }
// catch (error) {
//     return {
//         message: "database error"
//     }
// }
//     revalidatePath("/courses");
//     redirect("/courses");
// }

// export default createCourse