const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
const port = process.env.PORT || 5001;

app.use(bodyParser.json());
app.use(cors());


// PostgreSQL connection using your connection string
const pool = new Pool({
  connectionString: 'postgres://ucbjjlpqocwrmu:d27656fd8b67e443c6c5abcd1a51379cb26c24d6a8ba322fdec3833c9203d68d@ec2-34-236-100-103.compute-1.amazonaws.com:5432/d548t01krr7l7e',
  ssl: {
    rejectUnauthorized: false,  // Needed for connecting to cloud-hosted PostgreSQL
  },
});

// API Endpoint to get flashcards
app.get('/api/flashcards', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM flashcards ORDER BY id');
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Server error' });
  }
});

// API Endpoint to add a new flashcard
app.post('/api/flashcards', async (req, res) => {
  const { question, answer } = req.body;

  try {
    const result = await pool.query(
      'INSERT INTO flashcards (question, answer) VALUES ($1, $2) RETURNING *',
      [question, answer]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Server error' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});