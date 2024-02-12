"use server";

import { auth } from "@clerk/nextjs";
import { revalidatePath } from "next/cache";

import { db } from "@/lib/db";
import { createSafeAction } from "@/lib/create-safe-action";

import { UpdateNote } from "./schema";
import { InputType, ReturnType } from "./types";
// import { createAuditLog } from "@/lib/create-audit-log";
// import { ACTION, ENTITY_TYPE } from "@prisma/client";

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId } = auth();

  if (!userId) {
    return {
      error: "Unauthorized",
    };
  }

  const { Content, id, courseId } = data;
  let note;

  try {
    note = await db.note.update({
      where: {
        id,
        courseId,
        course: {
            userId,
        }
      },
      data: {
        Content,
      },
    });

    // await createAuditLog({
    //   entityTitle: list.title,
    //   entityId: list.id,
    //   entityType: ENTITY_TYPE.CARD,
    //   action: ACTION.UPDATE,
    // })
  } catch (error) {
    return {
      error: "Failed to update."
    }
  }

  revalidatePath(`/course/${courseId}`);
  return { data: note };
};

export const updateNote = createSafeAction(UpdateNote, handler);