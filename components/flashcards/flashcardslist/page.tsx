import Flashcard from "../page";

import React from 'react';



interface FlashcardListProps {
    flashcards: Array<{ id: number, question: string, answer:string, options: string[] }>;
}

const FlashcardList: React.FC<FlashcardListProps> = ({ flashcards }) => {
    return (
        <div >
            {flashcards.map(flashcard => (
                <div key={flashcard.id} className="bg-white p-4 rounded-md shadow-md">
                    <Flashcard flashcard={{ question: flashcard.question, answer: flashcard.answer, options: flashcard.options }} />
                </div>
            ))}
        </div>
    );
}

export default FlashcardList;


// Path: components/flashcards/page.tsx