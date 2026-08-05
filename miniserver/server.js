const express = require('express');
const cors = require('cors');
const axios = require('axios');
require("dotenv").config();


const app = express();

const PORT = 5000;



app.use(cors({
  origin: true // change to your frontend's dev URL / deployed URL
}));

// Proxy route — frontend calls this instead of the external API directly
app.get('/api/movies/:id', async (req, res) => {
  try {
    
    const response = await axios.get(`${process.env.SITE_URL}${req.params.id}` );
    res.json(response.data);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Failed to fetch movie data' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});