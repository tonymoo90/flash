const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
const port = process.env.PORT || 5001;

// CORS setup to allow requests from your Netlify app
const corsOptions = {
  origin: [
    'https://extraordinary-hamster-30d45e.netlify.app',
    'https://flash-670fb56ffbd7.herokuapp.com',
    'http://localhost:3000'
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  optionsSuccessStatus: 204
};

app.use(cors(corsOptions));

// Middleware to parse incoming requests with JSON payloads
app.use(bodyParser.json());

// PostgreSQL connection using your connection string
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

// Add this near the top of your routes
app.get('/', (req, res) => {
  res.send('Backend is running');
});

// API Endpoint to get flashcards
app.get('/api/flashcards', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM flashcards ORDER BY id');
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching flashcards:', err.message);
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
    console.error('Error adding flashcard:', err.message);
    res.status(500).json({ error: 'Server error' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});