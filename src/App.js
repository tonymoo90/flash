import React, { useState } from 'react';
import './App.css';

const flashcards = [
  { question: 'What is the capital of France?', answer: 'Paris' },
  { question: 'What is the tallest mountain in the world?', answer: 'Mount Everest' },
  { question: 'Who wrote "Hamlet"?', answer: 'William Shakespeare' },
  { question: 'What is the speed of light?', answer: '299,792,458 meters per second' },
];

function App() {
  const [currentCard, setCurrentCard] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);

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
      <div className="flashcard" onClick={handleCardClick}>
        <h2>{showAnswer ? flashcards[currentCard].answer : flashcards[currentCard].question}</h2>
      </div>
      <div className="controls">
        <button onClick={prevCard}>Previous</button>
        <button onClick={nextCard}>Next</button>
      </div>
    </div>
  );
}

export default App;