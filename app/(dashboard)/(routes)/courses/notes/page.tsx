"use client"

import Note from "@/components/notes/note/page";
import Notes from "@/components/notes/page";
import React, { useState } from "react";

const NotesPage: React.FC = () => {
    const [notes, setNotes] = useState<string[]>([]);
    return ( 
        <div>
            <Notes notes={notes} setNotes={setNotes} />
        </div>
     );
}
 
export default NotesPage;
