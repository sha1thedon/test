"use client"

import {
    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverClose,
   
} from "@/components/ui/popover"

import { useAction } from "@/hooks/use-action"
import { createCourse } from "@/actions/create-course"

import { FormInput } from "./form-input"
import { FormSubmit } from "./form-submit"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"
import { toast } from "sonner"
import { ElementRef, use, useRef } from "react"
import { useRouter } from "next/navigation"
import { createFlashcardSet } from "@/actions/create-flashcard-set"


interface FlashcardSetPopoverProps {
    children: React.ReactNode
    side?: "left" | "right" | "top" | "bottom"
    align?: "start" | "center" | "end"
    sideOffset?: number
}

export const FlashcardSetPopover = ({
    children,
    side = "bottom",
    align,
    sideOffset=0,


}: FlashcardSetPopoverProps) => {

    const router = useRouter()

    const closeRef = useRef<ElementRef<"button">>(null)

    const {execute, fieldErrors} = useAction(createFlashcardSet, {
        onSuccess: (data) => {
        console.log(data)
        // toast.success("Course created")
        closeRef.current?.click()
        router.push(`/flashcards/${data.id}`)
    }, onError: (error) => {
        console.error(error)
}})

const onSubmit = (formData: FormData) => {
    const title = formData.get('title') as string;
    const userId = formData.get('userId') as string;

    execute({ title });
};


    return (
        <Popover>
            <PopoverTrigger asChild>
                {children}
            </PopoverTrigger>
            <PopoverContent side={side} align={align} sideOffset={sideOffset} className="w-80 pt-3">
                <div className="text-sm font-medium text-center text-neutral-600 pb-4">
                    Create 
                </div>
                <PopoverClose ref={closeRef} asChild>
                    <Button className="h-auto w-auto p-2 absolute top-2 right-2 text-neutral-600" variant="ghost">
                        <X className="h-4 w-4"></X>
                    </Button>
                </PopoverClose>
                <form action={onSubmit} className="space-y-4">
                    <div className="flex flex-col space-y-2">
                        <FormInput
                        label="Title"
                        id="title"
                        type="text"
                        errors={fieldErrors}
                        />
                    </div>
                    <FormSubmit className="w-full">
                        Create 
                    </FormSubmit>
                </form>
            </PopoverContent>
        </Popover>
    )
    
}