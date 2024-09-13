import React, { useState, useEffect } from 'react';
import './App.css';
import FlashcardEditor from './FlashcardEditor';

const defaultFlashcards = [
  { question: 'What is React?', answer: 'A JavaScript library for building user interfaces' },
  { question: 'What is JSX?', answer: 'A syntax extension for JavaScript' },
];

function App() {
  const [flashcards, setFlashcards] = useState(() => {
    const storedFlashcards = localStorage.getItem('flashcards');
    return storedFlashcards ? JSON.parse(storedFlashcards) : defaultFlashcards;
  });
  
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    localStorage.setItem('flashcards', JSON.stringify(flashcards));
  }, [flashcards]);

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
          {/* Render flashcards normally */}
        </div>
      )}
    </div>
  );
}

export default App;
