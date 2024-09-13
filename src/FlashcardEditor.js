import React, { useState } from 'react';

function FlashcardEditor({ flashcards, setFlashcards }) {
  const handleInputChange = (index, field, value) => {
    const updatedFlashcards = [...flashcards];
    updatedFlashcards[index][field] = value;
    setFlashcards(updatedFlashcards);
  };

  return (
    <div>
      <h2>Edit Flashcards</h2>
      {flashcards.map((card, index) => (
        <div key={index}>
          <input
            type="text"
            value={card.question}
            onChange={(e) => handleInputChange(index, 'question', e.target.value)}
            placeholder="Edit question"
          />
          <input
            type="text"
            value={card.answer}
            onChange={(e) => handleInputChange(index, 'answer', e.target.value)}
            placeholder="Edit answer"
          />
        </div>
      ))}
    </div>
  );
}

export default FlashcardEditor;
