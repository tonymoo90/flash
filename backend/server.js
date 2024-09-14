const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
const port = process.env.PORT || 5001;

// CORS setup to allow requests from your Netlify app
const corsOptions = {
  origin: ['https://extraordinary-hamster-30d45e.netlify.app', 'https://your-heroku-app.herokuapp.com'], // Your Netlify URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  optionsSuccessStatus: 204 // Some legacy browsers choke on 204
};
app.use(cors(corsOptions));

// Middleware to parse incoming requests with JSON payloads
app.use(bodyParser.json());

// PostgreSQL connection using your connection string
const pool = new Pool({
  connectionString: 'postgres://ucbjjlpqocwrmu:d27656fd8b67e443c6c5abcd1a51379cb26c24d6a8ba322fdec3833c9203d68d@ec2-34-236-100-103.compute-1.amazonaws.com:5432/d548t01krr7l7e',
  ssl: {
    rejectUnauthorized: false,  // Necessary for cloud-hosted PostgreSQL (like Heroku)
  },
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

// Fallback route for undefined routes
app.use((req, res, next) => {
  res.status(404).json({ error: 'Route not found' });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
