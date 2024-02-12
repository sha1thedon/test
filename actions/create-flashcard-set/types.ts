import {z} from "zod"
import { FlashcardSet } from "@prisma/client"

import { ActionState } from "@/lib/create-safe-action"

import { CreateFlashcardSet } from "./schema"

export type InputType = z.infer<typeof CreateFlashcardSet>
export type ReturnType = ActionState<InputType, FlashcardSet>