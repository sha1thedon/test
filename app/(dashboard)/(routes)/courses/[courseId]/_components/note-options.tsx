"use client"

import { Note } from "@prisma/client"

import {
    Popover,
    PopoverContent,
    PopoverTrigger,
    PopoverClose

} from "@/components/ui/popover"

import { useAction } from "@/hooks/use-action"
import { deleteNote } from "@/actions/delete-note"
import { Button } from "@/components/ui/button"
import { MoreHorizontal, X } from "lucide-react"
import { FormSubmit } from "@/components/form/form-submit"
import { on } from "events"
import { useRef, ElementRef } from "react"

interface NoteOptionsProps {
    data: Note
    onAddCard: () => void
}

export const NoteOptions = ({
    data,
    onAddCard
}: NoteOptionsProps) => {
    const closeRef = useRef<ElementRef<"button">>(null)


    const {execute: executeDelete} = useAction(deleteNote, {
        onSuccess: (data) => {
            console.log("Note deleted")
            closeRef.current?.click()
        }, 
        onError: (error) => {
            console.log(error)
        }
    })

    const onDelete = (formData: FormData) => {
        const id = formData.get("id") as string
        const courseId = formData.get("courseId") as string

        executeDelete({id, courseId})
    }
    return (
        <Popover>
            
            <PopoverTrigger asChild>
                <Button className="h-auto w-auto p-2" variant="ghost">
                    <MoreHorizontal className="h-4 w-4"/>
                </Button>
            </PopoverTrigger>
            <PopoverContent className="px-0 pt-3 pb-3" side="bottom" align="start">
                <div className="text-sm font-medium text-center text-neutral-600 pb-4">
                    List actions
                </div>
                <PopoverClose ref={closeRef} asChild>
                    <Button className="h-auto w-auto p-2 absolute top-2 right-2 text-neutral-600" variant="ghost">
                    <X className="h-4 w-4" />
                    </Button>
                    
                </PopoverClose>
                <Button
                onClick={onAddCard}
                className="rounded-none w-full h-auto p-2 px-5 justify-start font-normal text-sm"
                variant="ghost"
                >
                    Add note..
                </Button>
                <form>
                    <input hidden name="id" id="id" value={data.id}/>
                    <input hidden name="courseId" id="courseId" value={data.courseId}/>
                    <FormSubmit
                    variant="ghost"
                    className="rounded-none w-full h-auto p-2 px-5 justify-start font-normal text-sm"
                
                    >
                        Copy note...
                    </FormSubmit>
                </form>
                <form
                action={onDelete}
                >
                    <input hidden name="id" id="id" value={data.id}/>
                    <input hidden name="courseId" id="courseId" value={data.courseId}/>
                    <FormSubmit
                    variant="ghost"
                    className="rounded-none w-full h-auto p-2 px-5 justify-start font-normal text-sm"
                
                    >
                        Delete note...
                    </FormSubmit>
                </form>
            </PopoverContent>
        </Popover>
    )
}
