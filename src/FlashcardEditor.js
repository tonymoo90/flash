import React, { useState } from 'react';

function FlashcardEditor({ flashcards, setFlashcards }) {
  const [newQuestion, setNewQuestion] = useState('');
  const [newAnswer, setNewAnswer] = useState('');
  const [error, setError] = useState('');

  const handleInputChange = (index, field, value) => {
    const updatedFlashcards = [...flashcards];
    updatedFlashcards[index][field] = value;
    setFlashcards(updatedFlashcards);
  };

  const addFlashcard = () => {
    if (newQuestion.trim() === '' || newAnswer.trim() === '') {
      setError('Both question and answer are required.');
      return;
    }
    setFlashcards([
      ...flashcards,
      { question: newQuestion, answer: newAnswer }
    ]);
    setNewQuestion('');
    setNewAnswer('');
    setError(''); // Clear the error after successful addition
  };

  const deleteFlashcard = (index) => {
    const updatedFlashcards = flashcards.filter((_, i) => i !== index);
    setFlashcards(updatedFlashcards);
  };

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Edit Flashcards</h2>

      {/* Display error message if necessary */}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4" role="alert">
          <span className="block sm:inline">{error}</span>
        </div>
      )}

      <table className="min-w-full border border-gray-300 rounded-lg shadow-md">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2 text-left">Question</th>
            <th className="px-4 py-2 text-left">Answer</th>
            <th className="px-4 py-2"></th>
          </tr>
        </thead>
        <tbody>
          {flashcards.map((card, index) => (
            <tr key={index} className="border-b">
              <td className="px-4 py-2">
                <textarea
                  value={card.question}
                  onChange={(e) => handleInputChange(index, 'question', e.target.value)}
                  className="w-full p-2 border rounded resize-none"
                  placeholder="Edit question"
                  rows={3} // Adjust height for better visibility of large questions
                />
              </td>
              <td className="px-4 py-2">
                <textarea
                  value={card.answer}
                  onChange={(e) => handleInputChange(index, 'answer', e.target.value)}
                  className="w-full p-2 border rounded resize-none"
                  placeholder="Edit answer"
                  rows={3} // Adjust height for better visibility of large answers
                />
              </td>
              <td className="px-4 py-2">
                <button
                  onClick={() => deleteFlashcard(index)}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="mt-6">
        <h3 className="text-xl mb-2">Add a New Flashcard</h3>
        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
          <textarea
            type="text"
            value={newQuestion}
            onChange={(e) => setNewQuestion(e.target.value)}
            className="flex-grow p-2 border rounded"
            placeholder="New question"
            rows={3}
          />
          <textarea
            type="text"
            value={newAnswer}
            onChange={(e) => setNewAnswer(e.target.value)}
            className="flex-grow p-2 border rounded"
            placeholder="New answer"
            rows={3}
          />
          <button
            onClick={addFlashcard}
            className="bg-blue-500 text-white px-6 py-3 rounded hover:bg-blue-700"
          >
            Add Card
          </button>
        </div>
      </div>
    </div>
  );
}

export default FlashcardEditor;
