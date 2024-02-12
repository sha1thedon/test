import { z } from "zod";
import { Note } from "@prisma/client";

import { ActionState } from "@/lib/create-safe-action";

import { CreateNote } from "./schema";

export type InputType = z.infer<typeof CreateNote>;
export type ReturnType = ActionState<InputType, Note>;