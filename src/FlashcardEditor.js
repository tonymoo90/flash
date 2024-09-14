import React, { useState } from 'react';
import axios from 'axios';

function FlashcardEditor({ flashcards, addFlashcard }) {
  const [newQuestion, setNewQuestion] = useState('');
  const [newAnswer, setNewAnswer] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false); // Prevent double submissions

  const handleAddFlashcard = () => {
    if (newQuestion.trim() === '' || newAnswer.trim() === '') {
      setError('Both question and answer are required.');
      return;
    }

    if (isSubmitting) return; // Stop function execution if already submitting
    setIsSubmitting(true);

    const newCard = {
      question: newQuestion,
      answer: newAnswer,
    };

    // Post new flashcard to the backend API using Axios
    axios.post('https://flash-670fb56ffbd7.herokuapp.com/api/flashcards', newCard)
      .then(response => {
        addFlashcard(response.data);
        setNewQuestion('');
        setNewAnswer('');
        setError(''); // Clear error message
      })
      .catch(err => {
        console.error('Error adding flashcard:', err);
        setError('Failed to add flashcard. Try again.');
      })
      .finally(() => {
        setIsSubmitting(false); // Re-enable the button
      });
  };

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Edit Flashcards</h2>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <div className="mt-6">
        <h3 className="text-xl mb-2">Add a New Flashcard</h3>
        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
          <textarea
            value={newQuestion}
            onChange={(e) => setNewQuestion(e.target.value)}
            className="flex-grow p-2 border rounded"
            placeholder="New question"
            rows={3}
          />
          <textarea
            value={newAnswer}
            onChange={(e) => setNewAnswer(e.target.value)}
            className="flex-grow p-2 border rounded"
            placeholder="New answer"
            rows={3}
          />
          <button
            onClick={handleAddFlashcard}
            className={`bg-blue-500 text-white px-6 py-3 rounded hover:bg-blue-700 ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={isSubmitting} // Disable the button while submitting
          >
            {isSubmitting ? 'Adding...' : 'Add Card'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default FlashcardEditor;

