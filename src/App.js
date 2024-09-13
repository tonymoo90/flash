import React, { useState } from 'react';
import './App.css';
import FlashcardEditor from './FlashcardEditor'; // Import the new component

const initialFlashcards = [
  { question: 'What is the capital of France?', answer: 'Paris' },
  { question: 'What is the tallest mountain in the world?', answer: 'Mount Everest' },
  { question: 'Who wrote "Hamlet"?', answer: 'William Shakespeare' },
  { question: 'What is the speed of light?', answer: '299,792,458 meters per second' },
];

function App() {
  const [flashcards, setFlashcards] = useState(initialFlashcards); // Track flashcards in state
  const [currentCard, setCurrentCard] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [editing, setEditing] = useState(false); // Toggle between views

  const handleCardClick = () => {
    setShowAnswer(!showAnswer);
  };

  const nextCard = () => {
    setCurrentCard((prev) => (prev + 1) % flashcards.length);
    setShowAnswer(false);
  };

  const prevCard = () => {
    setCurrentCard((prev) => (prev - 1 + flashcards.length) % flashcards.length);
    setShowAnswer(false);
  };

  return (
    <div className="App">
      <button onClick={() => setEditing(!editing)}>
        {editing ? 'Back to Flashcards' : 'Edit Flashcards'}
      </button>

      {editing ? (
        <FlashcardEditor flashcards={flashcards} setFlashcards={setFlashcards} />
      ) : (
        <>
          <div className="flashcard" onClick={handleCardClick}>
            <h2>{showAnswer ? flashcards[currentCard].answer : flashcards[currentCard].question}</h2>
          </div>
          <div className="controls">
            <button onClick={prevCard}>Previous</button>
            <button onClick={nextCard}>Next</button>
          </div>
        </>
      )}
    </div>
  );
}

export default App;
