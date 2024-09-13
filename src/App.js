import React, { useState, useEffect } from 'react';
import './App.css';
import FlashcardEditor from './FlashcardEditor';

const defaultFlashcards = [
  { question: 'What is React?', answer: 'A JavaScript library for building user interfaces' },
  { question: 'What is JSX?', answer: 'A syntax extension for JavaScript' },
  { question: 'What is a component?', answer: 'A reusable piece of UI in React' },
  { question: 'What is state in React?', answer: 'A way to manage data in a component' },
];

function App() {
  const [flashcards, setFlashcards] = useState(() => {
    const storedFlashcards = localStorage.getItem('flashcards');
    return storedFlashcards ? JSON.parse(storedFlashcards) : defaultFlashcards;
  });
  
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    localStorage.setItem('flashcards', JSON.stringify(flashcards));
  }, [flashcards]);

  const handleNextCard = () => {
    setShowAnswer(false);
    setCurrentCardIndex((prevIndex) => (prevIndex + 1) % flashcards.length);
  };

  const handlePreviousCard = () => {
    setShowAnswer(false);
    setCurrentCardIndex((prevIndex) => (prevIndex - 1 + flashcards.length) % flashcards.length);
  };

  const toggleAnswer = () => {
    setShowAnswer(!showAnswer);
  };

  return (
    <div className="App">
      <button
        onClick={() => setEditing(!editing)}
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4 hover:bg-blue-700"
      >
        {editing ? 'Back to Flashcards' : 'Edit Flashcards'}
      </button>

      {editing ? (
        <FlashcardEditor flashcards={flashcards} setFlashcards={setFlashcards} />
      ) : (
        <div>
          <h1 className="text-4xl mb-4">Flashcards</h1>
          <div className="flashcard" onClick={toggleAnswer}>
            <h2>{showAnswer ? flashcards[currentCardIndex].answer : flashcards[currentCardIndex].question}</h2>
          </div>
          <div className="controls">
            <button onClick={handlePreviousCard} className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-700">
              Previous
            </button>
            <button onClick={handleNextCard} className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-700">
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;