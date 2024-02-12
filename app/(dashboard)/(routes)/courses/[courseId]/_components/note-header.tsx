"use client"

import { updateNote } from "@/actions/update-note"
import { FormInput } from "@/components/form/form-input"
import { Input } from "@/components/ui/input"
import { useAction } from "@/hooks/use-action"
import { Note } from "@prisma/client"
import { useState, useRef, ElementRef } from "react"
import { useEventListener } from "usehooks-ts"
import { NoteOptions } from "./note-options"

interface NoteHeaderProps {
    data: Note
}

export const NoteHeader = ({
    data
}: NoteHeaderProps) => {
    const [title, setTitle] = useState(data.Content)
    const [isEditing, setIsEditing] = useState(false)

    const formRef = useRef<ElementRef<"form">>(null)
    const inputRef = useRef<ElementRef<"input">>(null)

    const enableEditing = () => {
        setIsEditing(true)
        setTimeout(() => {
            inputRef.current?.focus()
            inputRef.current?.select()
        })
    }

    const disableEditing = () => {
        setIsEditing(false)
    }

    const {execute} = useAction(updateNote, {
        onSuccess: (data) => {
            console.log("renamed")
            setTitle(data.Content)
            disableEditing()
        },
        onError: (error) => {
            console.log("error")
        }
    })

    const handleSubmit = (formData: FormData) => {
        const Content = formData.get("Content") as string
        const idString = formData.get("id") as string
        const id = parseInt(idString)
        const courseId = formData.get("courseId") as string

        if (Content === data.Content){
            return disableEditing()
        }
        execute({
            Content,
            id,
            courseId
        })
    }

    const onBlur = () => {
        formRef.current?.requestSubmit()
    }
    const onKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape"){
            formRef.current?.requestSubmit()
        }
    }
    useEventListener("keydown", onKeyDown)

    return(
        <div className="pt-2 px-2 text-sm font-semibold flex justify-between items-start- gap-x-2">
            {isEditing ? (
                <form 
                ref={formRef}
                action={handleSubmit}
                className="flex-1 px-[2px]"
                
                >
                    <input hidden id="id" name="id" value={data.id} />
                    <input hidden id="courseId" name="courseId" value={data.courseId} />

                    <FormInput 
                    ref={inputRef}
                    onBlur={onBlur}
                    id="Content"
                    placeholder="Note title"
                    defaultValue={title}
                    className="text-sm px-[7px] py-1 h-7 font-medium border-transparent hover:border-input focus:border-input transition truncate bg-transparent focus:bg-white"
                    />

                    <button type="submit" hidden/>
                </form>
            ): (
            <div 
            onClick={enableEditing}
            className="w-full text-sm px-2.5 py-1 h-7 font-medium border-transparent">
                {title}
            </div> )}
            <NoteOptions
            onAddCard= { () => {}}
            data={data}
            />
        </div>
    )
}