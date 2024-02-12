"use server"

import {z} from 'zod';

import { revalidatePath } from 'next/cache';
const noteSchema = z.object({
    Content: z.string(),
    courseId: z.string()
});

import { db } from "@/lib/db";

async function saveNote(formData: FormData) {
    
    // const Content = formData.get('Content') as string; 

    const { Content, courseId } = noteSchema.parse({
        Content: formData.get('Content'),
        courseId: formData.get("courseId")
    });

    // const course = { connect: { id: 'your_course_id' } }; // Replace 'your_course_id' with the actual course ID

    await db.note.create({
        data: {
            Content,
            course: { connect: { id: courseId } },
        },
    });


}

export default saveNote

