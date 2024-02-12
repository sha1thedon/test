"use client"

import { Plus, X } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useState, useRef, ElementRef, useEffect } from "react";
import { useEventListener, useOnClickOutside } from "usehooks-ts";

import { useAction } from "@/hooks/use-action";
import { Button } from "@/components/ui/button";
import { createNote } from "@/actions/create-note";
import { FormInput } from "@/components/form/form-input";
import { FormSubmit } from "@/components/form/form-submit";

import { CourseWrapper } from "./course-wrapper";
import saveNote from "@/actions/create-note/page";
import { useSpeechRecognition } from "react-speech-recognition";


const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  const mic = new SpeechRecognition();
  
  mic.continuous = true;
  mic.interimResults = true;
  mic.lang = "en-UK";
export const NoteForm = () => {
  const [isListening, setIsListening] = useState(false);
  const [note, setNote] = useState('')
  const [savedNotes, setSavedNotes] = useState<string[]>([]);
  const [voiceNote, setvoiceNote] = useState('');


  
    const [isEditing, setIsEditing] = useState(false)
    const [newNote, setNewNote] = useState('');
    const formRef = useRef<ElementRef<"form">>(null)
    const inputRef = useRef<ElementRef<"input">>(null)
    const router = useRouter();
    const params = useParams();
    const enableEditing = () => {
        setIsEditing(true);
        setTimeout(() => {
          inputRef.current?.focus();
        });
      };
    
      const disableEditing = () => {
        setIsEditing(false);
      };

      const { execute, fieldErrors } = useAction(createNote, {
        onSuccess: (data) => {
          disableEditing();
          router.refresh();
        },
        onError: (error) => {
          console.log(error);
        },
      });
      const onKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          disableEditing();
        };
      };
    
      useEventListener("keydown", onKeyDown);
      useOnClickOutside(formRef, disableEditing);

      const onSubmit = (formData: FormData) => {
        const Content = formData.get("Content") as string;
        const courseId = formData.get("courseId") as string;
    
        execute({
          Content,
          courseId
        });
      }

     
      useEffect(() => {
        handleListen();
      }, [isListening]);
      
      const handleListen = () => {
        if (isListening) {
          mic.start();
          mic.onend = () => {
            console.log('continue..');
            mic.start();
          }
        } else {
          mic.stop();
          mic.onend = () => {
            console.log('Stopped Mic on Click');
          }
        }
        mic.onstart = () => {
          console.log('Mics on');
        }
      
        mic.onresult = (event) => {
          const transcript = Array.from(event.results)
            .map((result) => result[0])
            .map((result) => result.transcript)
            .join('');
          console.log(transcript);
          setNote(transcript);
          
          mic.onerror = (event) => {
            console.log(event.error)
          }
        }
      
      }

      const handleSaveNote = () => {
        setSavedNotes([...savedNotes, note])
        setNote('')
      }
   

      if (isEditing) {
        return (
        <CourseWrapper>
        <form
          action={onSubmit}
          ref={formRef}
          className="w-full p-3 rounded-md bg-white space-y-4 shadow-md"
        >
          <FormInput
            ref={inputRef}
            errors={fieldErrors}
            id="Content"
            className="text-sm px-2 py-1 h-7 font-medium border-transparent hover:border-input focus:border-input transition"
            placeholder="Enter list title..."
          />
          <input
            hidden
            value={params.courseId}
            name="courseId"
          />
          <div className="flex items-center gap-x-1">
            <FormSubmit>
              Add list
            </FormSubmit>
            <Button 
              onClick={disableEditing}
              size="sm"
              variant="ghost"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
        </form>
      </CourseWrapper>
        )
      }

    return(
    <>
    <h1>Voice Notes</h1>
    <div className="container">
      <div className="w-full p-2 border"> 
      <h2>Current Note</h2>
      {isListening ? <span>speak</span> : <span>not speaking</span>}
      <button onClick={handleSaveNote} disabled={!note}>Save Voice Note</button>
      <button onClick={() => setIsListening(prevState => !prevState)} className="bg-blue-400 text-white p-2 mr-2">
            Start Listening/StopListening</button>
            <p>{note}</p>
            </div>

      <div className="w-full p-2 border">
        <h2>Notes</h2>
        {savedNotes.map(n => (
          <p key={n}>
            {n}
          </p>
        ))}
      </div>
      </div>
        <CourseWrapper>
         
         
            
                <button
                    onClick={enableEditing}
                className="w-full rounded-md bg-white/80 hover:bg-white/50 transition p-3 flex items-center font-medium text-sm"
                >
                    <Plus className="h-4 w-4 mr-2"/>
                    Add a note
                </button>

            
        </CourseWrapper>

        </>
    )
}