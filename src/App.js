import React, { useState, useEffect } from 'react';
import './App.css';
import FlashcardEditor from './FlashcardEditor';
import axios from 'axios';

function App() {
  const [flashcards, setFlashcards] = useState([]);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [editing, setEditing] = useState(false);

  // Fetch flashcards from the backend when the component mounts
  useEffect(() => {
    axios.get('http://localhost:5001/api/flashcards') // Make sure this is your backend URL
      .then(response => {
        setFlashcards(response.data);
      })
      .catch(error => {
        console.error('Error fetching flashcards:', error);
      });
  }, []); // Empty dependency array means this runs once when the component mounts

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

  const addFlashcard = (newCard) => {
    axios.post('http://localhost:5001/api/flashcards', newCard)
      .then(response => {
        setFlashcards(prevCards => [...prevCards, response.data]); // Use functional state update
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
        <FlashcardEditor flashcards={flashcards} addFlashcard={addFlashcard} />
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
