import React, { useState } from 'react';
import axios from 'axios';

function FlashcardEditor({ flashcards, setFlashcards, addFlashcard }) {
  const [newQuestion, setNewQuestion] = useState('');
  const [newAnswer, setNewAnswer] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (index, field, value) => {
    const updatedFlashcards = [...flashcards];
    updatedFlashcards[index][field] = value;
    setFlashcards(updatedFlashcards);
  };

  const handleAddFlashcard = () => {
    if (newQuestion.trim() === '' || newAnswer.trim() === '') {
      setError('Both question and answer are required.');
      return;
    }

    if (isSubmitting) return;
    setIsSubmitting(true);

    const newCard = {
      question: newQuestion,
      answer: newAnswer,
    };

    axios.post('https://your-heroku-app.herokuapp.com/api/flashcards', newCard)
      .then(response => {
        addFlashcard(response.data);
        setNewQuestion('');
        setNewAnswer('');
        setError('');
      })
      .catch(err => {
        setError('Failed to add flashcard. Try again.');
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  const deleteFlashcard = (index) => {
    const updatedFlashcards = flashcards.filter((_, i) => i !== index);
    setFlashcards(updatedFlashcards);
    // Add backend deletion logic if needed
  };

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Edit Flashcards</h2>
      {error && <div className="bg-red-100 border text-red-700">{error}</div>}
      <table className="min-w-full border border-gray-300 rounded-lg shadow-md">
        <thead className="bg-gray-100">
          <tr>
            <th>Question</th>
            <th>Answer</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {flashcards.map((card, index) => (
            <tr key={index} className="border-b">
              <td>
                <textarea
                  value={card.question}
                  onChange={(e) => handleInputChange(index, 'question', e.target.value)}
                  className="w-full p-2 border rounded resize-none"
                />
              </td>
              <td>
                <textarea
                  value={card.answer}
                  onChange={(e) => handleInputChange(index, 'answer', e.target.value)}
                  className="w-full p-2 border rounded resize-none"
                />
              </td>
              <td>
                <button onClick={() => deleteFlashcard(index)} className="bg-red-500 text-white px-4 py-2">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="mt-4">
        <h3>Add a New Flashcard</h3>
        <textarea value={newQuestion} onChange={(e) => setNewQuestion(e.target.value)} placeholder="Question" />
        <textarea value={newAnswer} onChange={(e) => setNewAnswer(e.target.value)} placeholder="Answer" />
        <button onClick={handleAddFlashcard} disabled={isSubmitting}>
          {isSubmitting ? 'Adding...' : 'Add Card'}
        </button>
      </div>
    </div>
  );
}

export default FlashcardEditor;
