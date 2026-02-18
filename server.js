const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.options('/load', (req, res) => {
  res.sendStatus(200);
});

app.use(express.json());

app.post('/load', (req, res) => {
  const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
  const page = req.body.page || 'unknown';
  const now = new Date();
  const date = now.toLocaleDateString('en-US', { timeZone: 'America/Halifax', year: 'numeric', month: 'long', day: 'numeric' });
  const time = now.toLocaleTimeString('en-US', { timeZone: 'America/Halifax', hour: '2-digit', minute: '2-digit', second: '2-digit' });
  console.log(`Page: ${page} | IP: ${ip} | Date: ${date} | Time: ${time}`);
  res.sendStatus(200);
});


app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


