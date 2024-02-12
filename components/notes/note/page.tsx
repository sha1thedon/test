// components/Note/Note.tsx
import React, { useEffect, useState } from 'react';
import '@/app/globals.css'
import { set } from 'zod';
import Graph from "react-graph-vis";
// import '../styles/globals.css'; // Import Tailwind CSS
// import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
const DEFAULT_PARAMS = {
  "model": "text-davinci-003",
  "temperature": 0.3,
  "max_tokens": 800,
  "top_p": 1,
  "frequency_penalty": 0,
  "presence_penalty": 0
}

const SELECTED_PROMPT = "STATELESS"

const options = {
  layout: {
    hierarchical: false
  },
  edges: {
    color: "#34495e"
  }
};

interface NoteProps {
  content: string;
}

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const mic = new SpeechRecognition();

mic.continuous = true;
mic.interimResults = true;
mic.lang = "en-UK";

const Note: React.FC<NoteProps> = ({ content }) => {
  const [isEditing, setEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(content);
  // const { transcript, resetTranscript } = useSpeechRecognition();

  const [isListening, setIsListening] = useState(false);
  const [voiceNote, setvoiceNote] = useState('');
  const [savedNotes, setSavedNotes] = useState<string[]>([]);

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


  const handleEditClick = () => {
    setEditing(true);
  };

  const handleSaveClick = () => {
    // Handle saving changes
    setEditing(false);
    setSavedNotes([...savedNotes, voiceNote]);
    setvoiceNote('');
  };

  const handleTextToSpeech = () => {
    // Use the Web Speech API to speak the content
    const speechSynthesis = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(content);
    speechSynthesis.speak(utterance);
  };

  const handleSpeechRecognition = () => {
    // Start listening for speech recognition
    // SpeechRecognition.startListening();
  };




  const handleStopSpeechRecognition = () => {
    // Stop listening for speech recognition
    // SpeechRecognition.stopListening();

    // Set the recognized transcript as the edited content
    // setEditedContent(transcript);
  };

  const handleSaveNote = () => {
    setSavedNotes([...savedNotes, voiceNote]);
    setvoiceNote('');
  };
  
  return (
    <div className="p-4 border mb-4">
      {isEditing ? (
        <div>
          <textarea
            value={editedContent}
            onChange={(e) => setEditedContent(e.target.value)}
            className="w-full mb-2 p-2 border"
          />
          {isListening ? <span>speak</span> : <span>not speaking</span>}
          <button onClick={handleSaveClick} className="bg-blue-500 text-white p-2 mr-2">
            Save
          </button>
          <button onClick={() => setIsListening(prevState => !prevState)} className="bg-blue-500 text-white p-2 mr-2">
            Start Listening/StopListening</button>
            <p>{voiceNote}</p>
        </div>
      ) : (
        <div>
          <p>{content}</p>
          <button onClick={handleEditClick} className="bg-yellow-500 text-white p-2 mr-2">
            Edit
          </button>
          <button onClick={handleTextToSpeech} className="bg-green-500 text-white p-2">
            Read Aloud
          </button>
          {/* <button onClick={handleSpeechRecognition} className="bg-blue-500 text-white p-2 mr-2">
            Start Listening
          </button>
          <button onClick={handleStopSpeechRecognition} className="bg-red-500 text-white p-2 mr-2">
            Stop Listening and Save
          </button>
          <button onClick={resetTranscript} className="bg-gray-500 text-white p-2">
            Reset Transcript
          </button> */}
          
        </div>
      )}
    </div>
  );
};

export default Note;
