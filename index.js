const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
const port = process.env.PORT || 10000;

app.use(cors());
app.use(express.json());

app.use('/', async (req, res) => {
  try {
    const targetUrl = req.url.slice(1); // видаляємо перший символ '/' з шляху
    const response = await axios({
      method: req.method,
      url: targetUrl,
      headers: {
        ...req.headers,
        host: '', // очищаємо host, щоб не конфліктувало
      },
      data: req.body,
    });

    res.status(response.status).json(response.data);
  } catch (err) {
    console.error('Proxy error:', err.message);
    res.status(err.response?.status || 500).json({ error: err.message });
  }
});

app.listen(port, () => {
  console.log(`🟢 Проксі сервер працює на порту ${port}`);
});
