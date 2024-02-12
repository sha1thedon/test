import { useState } from 'react';

interface FlashcardProps {
    flashcard: {
        answer: string;
        question: string;
        options: string[];
    };
}

const Flashcard = ({ flashcard }: FlashcardProps) => {
    const [flip, setFlip] = useState(true);
    

 

    return (
      <div className="bg-white p-4 rounded-md shadow-md" onClick={() => setFlip(!flip)}>
        {flip ? (
          <div >
            <p>{flashcard.question}</p>
            <ul >
              {flashcard.options.map((option, index) => (
                <li key={index}>{option}</li>
              ))}
            </ul>
          </div>
        ) : (
          <p>{flashcard.answer}</p>
        )}
      </div>
    );
    
    

   
    
    
  
}

export default Flashcard;