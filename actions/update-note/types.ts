import { z } from "zod";
import { Note } from "@prisma/client";

import { ActionState } from "@/lib/create-safe-action";

import { UpdateNote } from "./schema";

export type InputType = z.infer<typeof UpdateNote>;
export type ReturnType = ActionState<InputType, Note>;