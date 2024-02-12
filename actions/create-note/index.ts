"use server";

import { auth } from "@clerk/nextjs";
import { revalidatePath } from "next/cache";

import { db } from "@/lib/db";
import { createSafeAction } from "@/lib/create-safe-action";

import { CreateNote } from "./schema";
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

  const { Content, courseId } = data;
  let note;

  try {
    const course = await db.course.findUnique({
      where: {
        id: courseId,
        userId
      },
    });

    if (!course) {
      return {
        error: "Course not found",
      };
    }

    const lastNote = await db.course.findFirst({
      where: { id: courseId },
     
    });

    // const newOrder = lastList ? lastList.order + 1 : 1;

    note = await db.note.create({
      data: {
        Content,
        courseId,
        
      },
    });

    // await createAuditLog({
    //   entityTitle: list.title,
    //   entityId: list.id,
    //   entityType: ENTITY_TYPE.LIST,
    //   action: ACTION.CREATE,
    // })
  } catch (error) {
    return {
      error: "Failed to create."
    }
  }

  revalidatePath(`/courses/${courseId}`);
  return { data: note };
};

export const createNote = createSafeAction(CreateNote, handler);