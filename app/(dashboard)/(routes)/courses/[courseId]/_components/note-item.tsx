"use client"

import { NoteWithCard } from "@/types"
import { useState, useRef, ElementRef } from "react"
import { NoteForm } from "./note-form"
import { cn } from "@/lib/utils"
import { NoteHeader } from "./note-header"



interface NoteItemProps {
    data: NoteWithCard
    index: number
//     enableEditing: (index: number) => void;
//   disableEditing: () => void;
//   isEditing: boolean;
}

export const NoteItem = ({
    data,
    index,
//     enableEditing,
//   disableEditing,
//   isEditing,
}: NoteItemProps) => {
    const textareaRef = useRef<ElementRef<"textarea">>(null)

    const [isEditing, setIsEditing] = useState(false)

    const disableEditing = () => {
        setIsEditing(false)
    }

    const enableEditing = () => {
        setIsEditing(true)
        setTimeout(() => {textareaRef.current?.focus()})
    }
    const handleTextToSpeech = () => {
        // Use the Web Speech API to speak the content
        const speechSynthesis = window.speechSynthesis;
        const utterance = new SpeechSynthesisUtterance(data.Content);
        speechSynthesis.speak(utterance);
      };


    return (
        <li className="shrink-0 h-full w-[272px] select-none">
            <div className="w-full rounded-md bg-[#f1f2f4] shadow-md pb-2">
                <NoteHeader data={data}/>
                
        
        </div></li>
        
    
    
    //   <div className="flex gap-x-3 h-full">
    //     <div>
    //       <div>
    //         {data.Content}
            
    //         <button
    //           onClick={handleTextToSpeech}
    //           className="bg-green-500 text-white p-2"
    //         >
    //           Read Aloud
    //         </button>
    //       </div>
    //     </div>
        
    //       <NoteForm
    //         noteId={data.id}
    //         ref={textareaRef}
    //         isEditing={isEditing}
    //           enableEditing={enableEditing}
    //           disableEditing={disableEditing}
    //       />
        
    //   </div>
    // </>
  );
}