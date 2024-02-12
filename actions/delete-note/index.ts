"use server";

import { auth } from "@clerk/nextjs";
import { revalidatePath } from "next/cache";

import { db } from "@/lib/db";
import { createSafeAction } from "@/lib/create-safe-action";

import { DeleteNote } from "./schema";
import { InputType, ReturnType } from "./types";

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId } = auth();

  if (!userId ) {
    return {
      error: "Unauthorized",
    };
  }

  const { id, courseId } = data;
  let note;

  try {
    note = await db.note.delete({
      where: {
        id: parseInt(id),
        courseId,
        course: {
          userId,
        },
      },
    });

    // await createAuditLog({
    //   entityTitle: list.title,
    //   entityId: list.id,
    //   entityType: ENTITY_TYPE.LIST,
    //   action: ACTION.DELETE,
    // })
  } catch (error) {
    return {
      error: "Failed to delete."
    }
  }

  revalidatePath(`/course/${courseId}`);
  return { data: note };
};

export const deleteNote = createSafeAction(DeleteNote, handler);