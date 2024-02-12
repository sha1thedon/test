// components/Notes/Notes.tsx
import React, { useEffect, useState } from 'react';
// import '../styles/globals.css'; // Import Tailwind CSS
import Note from './note/page';
import '@/app/globals.css'


import saveNote from '@/actions/create-note/page';

import { db } from '@/lib/db';
import { useSpeechRecognition } from 'react-speech-recognition';

interface NotesProps {
    notes: string[];
    setNotes: React.Dispatch<React.SetStateAction<string[]>>;
  }
  
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  const mic = new SpeechRecognition();
  
  mic.continuous = true;
  mic.interimResults = true;
  mic.lang = "en-UK";

//   const [notes, setNotes] = useState<string[]>([]);
const Notes: React.FC<NotesProps> =  ({ notes, setNotes }) => {
    const [newNote, setNewNote] = useState('');
    const { transcript, resetTranscript } = useSpeechRecognition();

  const [isListening, setIsListening] = useState(false);
  const [voiceNote, setvoiceNote] = useState('');
  const [savedNotes, setSavedNotes] = useState<string[]>([]);
   
    const [isEditing, setEditing] = useState(false);


//   useEffect(() => {
//     // Load notes from local storage on component mount
//     const storedNotes = localStorage.getItem('notes');
//     if (storedNotes) {
//       setNotes(JSON.parse(storedNotes));
//     }
//   }, []);
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
    setvoiceNote(transcript);
    mic.onerror = (event) => {
      console.log(event.error)
    }
  }

}

  const handleAddNote = () => {
    if (newNote.trim() !== '') {
     const updatedNotes =  [...notes, newNote];
     setNotes(updatedNotes)
      setNewNote('');

      localStorage.setItem('notes', JSON.stringify(updatedNotes));
    }
  };

  const handleAddVoiceNote = () => {
    
     const updatedNotes =  [...notes, voiceNote];
     setNotes(updatedNotes)
      setNewNote('');

      localStorage.setItem('notes', JSON.stringify(updatedNotes));
    
  };
  const handleSaveClick = () => {
    // Handle saving changes
    setEditing(false);
    setSavedNotes([...savedNotes, voiceNote]);
    setvoiceNote('');
  };
 

  return (
    <div className="max-w-xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4"> Notes</h1>
      <div className="mb-4">
        {/* <textarea
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
          className="w-full p-2 border"
          placeholder="Type your note here..."
        />
        <button onClick={handleAddNote} className="bg-green-500 text-white p-2 mt-2">
          Add Note
        </button> */}

        <form action={saveNote} className='w-full p-2 border'>
          <input
            id='Content'
            name='Content'
            // value={newNote}
            required
            onChange={(e) => setNewNote(e.target.value)}
            className="w-full p-2 border"
            placeholder="Type your note here..."
            />
            <button onClick={handleAddNote} className="bg-green-500 text-white p-2 mt-2">
          Add Note
        </button>
        
        </form>
        <form action={saveNote} className='w-full p-2 border'>
          <input
            id='Content'
            name='Content'
            // value={newNote}
            onChange={(e) => setNewNote(e.target.value)}
            
            />
             {isListening ? <span>speak</span> : <span>not speaking</span>}
          <button onClick={handleSaveClick} className="bg-blue-500 text-white p-2 mr-2">
            Save
          </button>
          <button onClick={() => setIsListening(prevState => !prevState)} className="bg-blue-400 text-white p-2 mr-2">
            Start Listening/StopListening</button>
            <p>{voiceNote}</p>
            <button onClick={handleAddVoiceNote} className="bg-green-500 text-white p-2 mt-2">
          Add Note
        </button>
            
        
        </form>
       
        
      </div>
      {notes.map((note, index) => (
        <Note key={index} content={note} />
      ))}
    </div>
  );
};

export default Notes;
function setNotes(updatedNotes: any[]) {
    throw new Error('Function not implemented.');
}


