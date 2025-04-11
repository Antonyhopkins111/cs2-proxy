const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());

app.get('/csgo/matches', async (req, res) => {
  try {
    const response = await axios.get('https://api.pandascore.co/csgo/matches', {
      headers: {
        Authorization: `Bearer GtDhjhgIapOXpelI7yGoQa8TykTKuim5WyQox_blV23TtOtydnY`,
      },
    });
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: '❌ Failed to fetch matches' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
