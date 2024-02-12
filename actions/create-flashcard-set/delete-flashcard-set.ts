"use server"

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function deleteFlashcardSet(id: string) {
    await db.flashcardSet.delete({
        where: {
            id,
        },
    });

    revalidatePath("/flashcards");

}