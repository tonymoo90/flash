import React, { useState, useEffect } from 'react';
import './App.css';
import FlashcardEditor from './FlashcardEditor';
import axios from 'axios';

const defaultFlashcards = [
  { question: 'What is React?', answer: 'A JavaScript library for building user interfaces' },
  { question: 'What is JSX?', answer: 'A syntax extension for JavaScript' },
  { question: 'What is a component?', answer: 'A reusable piece of UI in React' },
  { question: 'What is state in React?', answer: 'A way to manage data in a component' },
];

function App() {
  const [flashcards, setFlashcards] = useState([]);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [editing, setEditing] = useState(false);

  // Fetch flashcards from the backend when the component mounts
  useEffect(() => {
    axios.get('http://localhost:5001/api/flashcards') // Change to your backend URL
      .then(response => {
        setFlashcards(response.data);
      })
      .catch(error => {
        console.error('Error fetching flashcards:', error);
        setFlashcards(defaultFlashcards); // Use default flashcards if there's an error
      });
  }, []);

  // Update localStorage whenever flashcards are updated
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

  // Function to add a new flashcard through the backend
  const addFlashcard = (newCard) => {
    axios.post('http://localhost:5001/api/flashcards', newCard)
      .then(response => {
        setFlashcards([...flashcards, response.data]); // Append the new flashcard to the state
      })
      .catch(error => {
        console.error('Error adding flashcard:', error);
      });
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
        <FlashcardEditor flashcards={flashcards} setFlashcards={setFlashcards} addFlashcard={addFlashcard} />
      ) : (
        <div>
          {flashcards.length > 0 ? (
            <>
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
            </>
          ) : (
            <p>Loading flashcards...</p>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
