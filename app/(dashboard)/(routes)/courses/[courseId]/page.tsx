import { auth } from "@clerk/nextjs"

import { db } from "@/lib/db"
import { string } from "zod"
import { NoteContainer } from "./_components/note-container"
import { NoteForm } from "./_components/note-form"
import { NoteWithCard } from "@/types"
import { ElementRef, useRef } from "react"

interface CourseIdPageProps{
    params: {
        courseId: string
        noteId: number
    }
    data: NoteWithCard
    
}

const CourseIdPage = async ({
    params,
    data
}: CourseIdPageProps) => {
    
    const {userId} = auth()

    if (!userId){
        return {
            error: "unauthorised"
        }
    }

    const notes = await db.note.findMany({
        where: {
            courseId: params.courseId,
            course: {
                userId
                

            },
        },
        include: {
            cards: {
                orderBy: {
                    
                }
            }
        }
    })


    return(
        <div className="p-4 h-full overflow-x-auto">
            CourseId Page
            <NoteContainer 
                courseId={params.courseId}
                data={notes} 
                
                
                // card={data}
                // noteId={params.noteId}                
                />
           
        </div>
    )
}

export default CourseIdPage