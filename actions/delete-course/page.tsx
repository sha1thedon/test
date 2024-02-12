"use server"
import { db } from "@/lib/db";

import { revalidatePath } from "next/cache";

export async function deleteCourse(id: string) {
    await db.course.delete({
        where: {
           id
        },
    });

    revalidatePath("/courses");
}