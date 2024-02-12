import { FlashcardSetPopover } from "@/components/form/flashcardset-popover"
import { User2 } from "lucide-react"
import { db } from "@/lib/db"
import { auth } from "@clerk/nextjs"
import Link from "next/link"


export const FlashcardSetList = async () => {

    const {userId} = auth()

    if (!userId) {
        return null
    }

    const flashcardSets = await db.flashcardSet.findMany({
        where: {
            userId
            
        }
    })
    return (
        <div className="space-y-4">
            <div className="flex items-center font-semibold text-lg text-neutral-700">
                
                <User2 className="w-6 h-6 ml-2 text-neutral-500" />
                <h2>Flashcard Sets</h2>
            </div>
            <div className="grid grid-col-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {flashcardSets.map((flashcardSet) => (
                    <Link
                    key={flashcardSet.id}
                    href={`/flashcards/${flashcardSet.id}`}
                    className="group relative aspect-video bg-no-repeat bg-center bg-cover bg-blue-400 rounded-sm h-full w-full p-2 overflow-hidden"
                    >
                        <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition"/>
                        <p>{flashcardSet.title}</p>
                    </Link>
                ))}
                <FlashcardSetPopover sideOffset={10} side="right">
                <div
                role="button"
                className="aspect-video relative h-full w-full bg-muted rounded-sm flex flex-col gap-y-1 items-center justify-center hover:opacity-75 transition"
                >
                
                    <p className="text-sm">Create a new flashcard set</p>
                    

                </div>
                </FlashcardSetPopover>
                
            </div>
            
        </div>


    )
}


