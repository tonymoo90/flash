import React, { useState } from 'react';

function ListView({ flashcards, onEditFlashcard }) {
  const [editIndex, setEditIndex] = useState(null);
  const [newQuestion, setNewQuestion] = useState('');
  const [newAnswer, setNewAnswer] = useState('');

  const handleEdit = (index) => {
    setEditIndex(index);
    setNewQuestion(flashcards[index].question);
    setNewAnswer(flashcards[index].answer);
  };

  const handleSave = (index) => {
    onEditFlashcard(index, newQuestion, newAnswer);
    setEditIndex(null); // Exit edit mode
  };

  return (
    <div>
      <h3>Edit Flashcards</h3>
      <ul>
        {flashcards.map((card, index) => (
          <li key={index}>
            {editIndex === index ? (
              <div>
                <input
                  type="text"
                  value={newQuestion}
                  onChange={(e) => setNewQuestion(e.target.value)}
                  placeholder="Edit question"
                />
                <input
                  type="text"
                  value={newAnswer}
                  onChange={(e) => setNewAnswer(e.target.value)}
                  placeholder="Edit answer"
                />
                <button onClick={() => handleSave(index)}>Save</button>
              </div>
            ) : (
              <div>
                <strong>{card.question}</strong> - {card.answer}{' '}
                <button onClick={() => handleEdit(index)}>Edit</button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ListView;
