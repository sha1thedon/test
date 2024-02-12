import { z } from "zod";
import { ToDo } from "@prisma/client";

import { ActionState } from "@/lib/create-safe-action";

import { CreateToDo } from "./schema";

export type InputType = z.infer<typeof CreateToDo>;
export type ReturnType = ActionState<InputType, ToDo>;