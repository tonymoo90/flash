import React, { useState } from 'react';
import './App.css';
import FlashcardView from './components/FlashcardView'; // Importing FlashcardView
import ListView from './components/ListView'; // Importing ListView

const initialFlashcards = [
  { question: 'What is the capital of France?', answer: 'Paris' },
  { question: 'What is the tallest mountain in the world?', answer: 'Mount Everest' },
  { question: 'Who wrote "Hamlet"?', answer: 'William Shakespeare' },
  { question: 'What is the speed of light?', answer: '299,792,458 meters per second' },
];

function App() {
  const [flashcards, setFlashcards] = useState(initialFlashcards);
  const [viewMode, setViewMode] = useState('flashcards'); // 'flashcards' or 'list'

  const handleAddFlashcard = (newQuestion, newAnswer) => {
    setFlashcards([...flashcards, { question: newQuestion, answer: newAnswer }]);
  };

  const handleEditFlashcard = (index, updatedQuestion, updatedAnswer) => {
    const updatedFlashcards = flashcards.map((card, i) =>
      i === index ? { question: updatedQuestion, answer: updatedAnswer } : card
    );
    setFlashcards(updatedFlashcards);
  };

  return (
    <div className="App">
      <div className="toggle-view">
        <button onClick={() => setViewMode('flashcards')}>Flashcards View</button>
        <button onClick={() => setViewMode('list')}>List View</button>
      </div>

      {viewMode === 'flashcards' ? (
        <FlashcardView flashcards={flashcards} />
      ) : (
        <ListView flashcards={flashcards} onEditFlashcard={handleEditFlashcard} />
      )}
    </div>
  );
}

export default App;
