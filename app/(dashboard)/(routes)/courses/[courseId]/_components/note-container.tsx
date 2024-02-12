"use client"

import { NoteWithCard } from "@/types"
import { Note } from "@prisma/client"
import { NoteForm } from "./note-form"
import { ElementRef, SetStateAction, useEffect, useRef, useState } from "react"
import { NoteItem } from "./note-item"
import { useParams } from "next/navigation"
import { useAction } from "@/hooks/use-action"
import { createNote } from "@/actions/create-note"
// import Note from "@/components/notes/note/page"

interface NoteContainerProps {
 
    data: NoteWithCard[]
   
    courseId: string
 
    
}

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const mic = new SpeechRecognition();

mic.continuous = true;
mic.interimResults = true;
mic.lang = "en-UK";

export const NoteContainer = ({ data, courseId }: NoteContainerProps) => {
    const [notes, setNotes] = useState<string[]>([]);
    const [orderedData, setOrderedData] = useState(data)
    const textareaRef = useRef<ElementRef<"textarea">>(null)
    // const [isEditing, setIsEditing] = useState(false)
    const [isEditing, setIsEditing] = useState<number | null>(null);

    const [newNote, setNewNote] = useState('');
    const params = useParams()
    const formRef = useRef<ElementRef<"form">>(null)
    const {execute, fieldErrors} = useAction(createNote, {
        onSuccess: (data) => {
            // toast.success("Note created")
            disableEditing()
            // router.push(`/dashboard/courses/${params.courseId}/notes/${data.id}`)
            formRef.current?.reset()
        },
        onError: (error) => {
            // toast.error(data.message)
            console.log(error)
        }
    
    })
    const disableEditing = () => {
        // setIsEditing(false)
        setIsEditing(null);
    }

    const enableEditing = (index:number) => {
        // setIsEditing(true)
        setIsEditing(index);
        setTimeout(() => {textareaRef.current?.focus()})
    }
    useEffect(() => {
        setOrderedData(data)
    }, [data])

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault(); // Prevent default form submission
      const formData = new FormData(e.currentTarget);
        const Content = formData.get("Content") as string
        const noteId = parseInt(formData.get("noteId") as string)
        const courseId = params.courseId as string

        execute({ Content, courseId}) // Add courseId property with an empty string value
    }

    const handleAddNote = () => {
        if (newNote.trim() !== '') {
         const updatedNotes =  [...notes, newNote];
         setNotes(updatedNotes)
          setNewNote('');
    
          localStorage.setItem('notes', JSON.stringify(updatedNotes));
        }
      };

      const handleTextToSpeech = (content: string) => {
        // Use the Web Speech API to speak the content
        const speechSynthesis = window.speechSynthesis;
        const utterance = new SpeechSynthesisUtterance(content);
        speechSynthesis.speak(utterance);
      };


    return (
        <ol>
            
            {orderedData.map((note, index) => {
                return (
                    <>
                        <NoteItem
                            key={note.id}
                            data={note}
                            index={index}
                        />
                        <button onClick={() => handleTextToSpeech(note.Content)} className="bg-green-500 text-white p-2">
                            Read Aloud
                        </button>
                    </>
                );
            })}
            <NoteForm  />
        </ol>
    )
}