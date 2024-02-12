import { FlashcardSetList } from "./[flashcardId]/_components/flashcardset-list"
import { Info } from "./[flashcardId]/_components/info"

const FlashcardSetPage = async () => {

    return (
        <div className="w-full mb-20">
            <Info />
            <div className="px-2 md:px-4">
                <FlashcardSetList />
            </div>
        </div>
    )

}

export default FlashcardSetPage


// "use client"


// import { useState } from "react";
// import FlashcardList from "@/components/flashcards/flashcardslist/page";
// import Link from "next/link";
// import { Button } from "@/components/ui/button";
// import CreateFlashcard from "./create/page";

// const FlashcardsPage = () => {

//     const [flashcards, setFlashcards] = useState(SAMPLE_FLASHCARDS);
//     return( 
// <>
//         <FlashcardList flashcards={flashcards} />
//         <Link href="/flashcards/create">
//     <Button>
//         Create Flashcard
//     </Button>
   

// </Link>
// </>


//     )
// }

// const SAMPLE_FLASHCARDS = [
//     {
//         id:1,
//         question: "What is the capital of France?",
//         answer: "Paris",
//         options: ["London", "Paris", "Berlin", "Madrid"]
//     },
//     {
//         id:2,
//         question: "What is the capital of Germany?",
//         answer: "Berlin",
//         options: ["London", "Paris", "Berlin", "Madrid"]
//     },
//     {
//         id:3,
//         question: "What is the capital of Spain?",
//         answer: "Madrid",
//         options: ["London", "Paris", "Berlin", "Madrid"]
//     },
//     {
//         id:4,
//         question: "What is the capital of England?",
//         answer: "London",
//         options: ["London", "Paris", "Berlin", "Madrid"]
//     }
// ]

// export default FlashcardsPage;