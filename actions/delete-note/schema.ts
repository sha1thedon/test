import {z } from "zod"

export const DeleteNote = z.object({
    id: z.string(),
    courseId: z.string(),
    })