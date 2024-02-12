import { z } from "zod";

export const CreateNote = z.object({
  Content: z.string({
    required_error: "Content is required",
    invalid_type_error: "Content is required",
  }).min(3, {
    message: "Title is too short",
  }),
  courseId: z.string(),
});