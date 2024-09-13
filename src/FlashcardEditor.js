import React, { useState } from 'react';

function FlashcardEditor({ flashcards, setFlashcards }) {
  const [newQuestion, setNewQuestion] = useState('');
  const [newAnswer, setNewAnswer] = useState('');

  const handleInputChange = (index, field, value) => {
    const updatedFlashcards = [...flashcards];
    updatedFlashcards[index][field] = value;
    setFlashcards(updatedFlashcards);
  };

  const addFlashcard = () => {
    setFlashcards([
      ...flashcards,
      { question: newQuestion, answer: newAnswer }
    ]);
    setNewQuestion('');
    setNewAnswer('');
  };

  const deleteFlashcard = (index) => {
    const updatedFlashcards = flashcards.filter((_, i) => i !== index);
    setFlashcards(updatedFlashcards);
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Edit Flashcards</h2>
      <table className="min-w-full border border-gray-200 rounded-lg shadow-md">
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
                <input
                  type="text"
                  value={card.question}
                  onChange={(e) => handleInputChange(index, 'question', e.target.value)}
                  className="w-full p-2 border rounded resize-none"
                  placeholder="Edit question"
                  style={{ width: '400px' }} // Increase width for better visibility
                />
              </td>
              <td className="px-4 py-2">
                <input
                  type="text"
                  value={card.answer}
                  onChange={(e) => handleInputChange(index, 'answer', e.target.value)}
                  className="w-full p-2 border rounded resize-none"
                  placeholder="Edit answer"
                  style={{ width: '400px' }} // Increase width for better visibility
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

      <div className="mt-4">
        <h3 className="text-xl mb-2">Add a New Flashcard</h3>
        <div className="flex space-x-4">
          <input
            type="text"
            value={newQuestion}
            onChange={(e) => setNewQuestion(e.target.value)}
            className="flex-grow p-2 border rounded"
            placeholder="New question"
            style={{ width: '400px' }} // Increase width for better visibility
          />
          <input
            type="text"
            value={newAnswer}
            onChange={(e) => setNewAnswer(e.target.value)}
            className="flex-grow p-2 border rounded"
            placeholder="New answer"
            style={{ width: '400px' }} // Increase width for better visibility
          />
          <button
            onClick={addFlashcard}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Add Card
          </button>
        </div>
      </div>
    </div>
  );
}

export default FlashcardEditor;
